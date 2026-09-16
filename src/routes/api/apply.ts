import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { JOB_IDS, findJob } from "@/data/jobs";
import { buildApplicationEmail } from "@/lib/application-email";
import { extractCvText } from "@/lib/cv-text";

/* ------------------------------------------------------------------ */
/* Job application endpoint                                            */
/*                                                                     */
/* Works as soon as an email service key is present in the environment: */
/*   RESEND_API_KEY    – API key for https://resend.com                */
/*   APPLY_TO_EMAIL    – where applications are delivered              */
/*   APPLY_FROM_EMAIL  – verified sender                               */
/*                                                                     */
/* When RESEND_API_KEY is absent the endpoint answers 503 with         */
/* code: "NOT_CONFIGURED" and the form falls back to a prefilled       */
/* mailto: link, so the site never loses an applicant.                 */
/* ------------------------------------------------------------------ */

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const schema = z.object({
  /* The role is taken from the submitted id but the title is looked up in our
     own data, so a caller cannot put arbitrary text into the notification. */
  jobId: z
    .string()
    .trim()
    .refine((value) => JOB_IDS.includes(value), { message: "unknown_job" }),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  location: z.string().trim().min(2).max(120),
  experience: z.string().trim().min(1).max(120),
  portfolioUrl: z.string().trim().max(400).optional().default(""),
  coverNote: z.string().trim().max(4000).optional().default(""),
  consent: z.string().trim().refine((v) => v === "on" || v === "true", {
    message: "consent_required",
  }),
});

/** Read an env var without assuming a Node-only runtime. */
function env(key: string): string | undefined {
  const fromProcess =
    typeof process !== "undefined" && process.env ? process.env[key] : undefined;
  if (fromProcess) return fromProcess;
  const fromImport = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const value = fromImport?.[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** Base64 encoding that works on both Node and worker runtimes. */
function toBase64(bytes: Uint8Array): string {
  const CHUNK = 8192;
  let binary = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/* Simple in-memory throttle. Per-runtime instance, and it keys off the proxy
   header, so treat it as a deterrent that complements the honeypot and the
   platform's own limits rather than as a hard boundary. */
const hits = new Map<string, number[]>();
function isRateLimited(ip: string, limit = 10, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export const Route = createFileRoute("/api/apply")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json({ ok: false, code: "BAD_REQUEST" }, 400);
        }

        // Honeypot: real users never fill a field they cannot see.
        if (String(form.get("company_website") ?? "").trim() !== "") {
          return json({ ok: true, id: "ignored" });
        }

        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "unknown";
        if (isRateLimited(ip)) return json({ ok: false, code: "RATE_LIMITED" }, 429);

        const parsed = schema.safeParse({
          jobId: String(form.get("jobId") ?? ""),
          fullName: String(form.get("fullName") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          location: String(form.get("location") ?? ""),
          experience: String(form.get("experience") ?? ""),
          portfolioUrl: String(form.get("portfolioUrl") ?? ""),
          coverNote: String(form.get("coverNote") ?? ""),
          consent: String(form.get("consent") ?? ""),
        });

        if (!parsed.success) {
          const errors: Record<string, string> = {};
          for (const issue of parsed.error.issues) {
            const key = String(issue.path[0] ?? "form");
            if (!errors[key]) errors[key] = issue.message;
          }
          return json({ ok: false, code: "VALIDATION", errors }, 400);
        }
        const data = parsed.data;
        /* authoritative role title, from our own data — never from the request */
        const jobTitle = findJob("en", data.jobId)?.title ?? data.jobId;

        const cv = form.get("cv");
        if (!(cv instanceof File) || cv.size === 0) {
          return json({ ok: false, code: "CV_MISSING" }, 400);
        }
        if (cv.size > MAX_CV_BYTES) {
          return json({ ok: false, code: "CV_TOO_LARGE", maxMb: MAX_CV_BYTES / 1024 / 1024 }, 413);
        }
        if (cv.type && !ALLOWED_CV_TYPES.includes(cv.type)) {
          return json({ ok: false, code: "CV_TYPE" }, 400);
        }

        /* Read the file once, then read its contents so the recruiting team
           receives the CV as text. Extraction is best effort and never blocks
           the application: the attachment is always the source of truth. */
        const cvBytes = new Uint8Array(await cv.arrayBuffer());
        const cvText = await extractCvText(cvBytes, cv.name, cv.type);
        const cvInfo = { status: cvText.status, chars: cvText.chars, preview: cvText.preview };

        const apiKey = env("RESEND_API_KEY");
        const to = env("APPLY_TO_EMAIL") ?? "careers@acwadhr.com";
        const from = env("APPLY_FROM_EMAIL") ?? "Acwad HR Careers <onboarding@resend.dev>";
        if (!apiKey) {
          return json({ ok: false, code: "NOT_CONFIGURED", fallbackEmail: to, cv: cvInfo }, 503);
        }

        const { subject, html } = buildApplicationEmail({
          data: { ...data, jobTitle },
          cv: {
            name: cv.name || "cv.pdf",
            sizeKb: Math.round(cv.size / 1024),
            status: cvText.status,
            chars: cvText.chars,
            text: cvText.text,
          },
        });

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: data.email,
              subject,
              html,
              attachments: [{ filename: cv.name || "cv.pdf", content: toBase64(cvBytes) }],
            }),
          });

          if (!res.ok) {
            console.error("apply: email service rejected the request", res.status, await res.text());
            return json({ ok: false, code: "SEND_FAILED", fallbackEmail: to, cv: cvInfo }, 502);
          }
          const payload = (await res.json().catch(() => ({}))) as { id?: string };
          return json({ ok: true, id: payload.id ?? "sent", cv: cvInfo });
        } catch (error) {
          console.error("apply: email service unreachable", error);
          return json({ ok: false, code: "SEND_FAILED", fallbackEmail: to, cv: cvInfo }, 502);
        }
      },
    },
  },
});
