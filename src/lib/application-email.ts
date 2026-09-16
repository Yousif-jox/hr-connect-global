/**
 * Builds the notification email that the recruiting team receives.
 * Kept separate from the HTTP handler so the rendered output can be tested
 * directly — the CV text must be present in the message, and every submitted
 * value must be escaped.
 */
export type CvTextStatus = "extracted" | "empty" | "unsupported" | "failed";

export type ApplicationEmailInput = {
  data: {
    jobId: string;
    jobTitle: string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    experience: string;
    portfolioUrl: string;
    coverNote: string;
  };
  cv: {
    name: string;
    sizeKb: number;
    status: CvTextStatus;
    chars: number;
    /** Full extracted text; only used when status is "extracted". */
    text: string;
  };
};

const FONT = "font-family:Arial,sans-serif";
const MONO = "font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Human label for how the CV read went — shown as a table row in the email. */
export function cvStatusLabel(status: CvTextStatus, chars: number): string {
  switch (status) {
    case "extracted":
      return `${chars} characters read`;
    case "empty":
      return "opened, but no readable text found (possibly a scanned image)";
    case "unsupported":
      return "text preview not available for this file type";
    default:
      return "could not be read";
  }
}

export function buildApplicationEmail({
  data,
  cv,
}: ApplicationEmailInput): { subject: string; html: string } {
  const rows: [string, string][] = [
    ["Role", `${data.jobTitle} (${data.jobId})`],
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Current location", data.location],
    ["Experience", data.experience],
    ["Portfolio / LinkedIn", data.portfolioUrl || "—"],
    ["CV file", `${cv.name} (${cv.sizeKb} KB)`],
    ["CV text", cvStatusLabel(cv.status, cv.chars)],
  ];

  const section = (title: string, inner: string) =>
    `<h3 style="${FONT};font-size:15px;margin:22px 0 6px">${escapeHtml(title)}</h3>${inner}`;

  const cvBlock =
    cv.status === "extracted"
      ? section(
          "CV contents (read automatically)",
          `<pre dir="auto" style="${MONO};font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word;border:1px solid #ddd;border-radius:6px;background:#fafafa;padding:14px;max-width:860px;margin:0">${escapeHtml(cv.text)}</pre>`,
        ) +
        `<p style="${FONT};font-size:12px;color:#777">Extracted automatically from the attached file, which remains the original document. Arabic punctuation can shift slightly when read from a PDF.</p>`
      : section(
          "CV contents",
          `<p style="${FONT};font-size:14px;color:#555">Not extracted — ${escapeHtml(cvStatusLabel(cv.status, cv.chars))}. Open the attachment.</p>`,
        );

  const html = [
    `<h2 style="${FONT}">New application — ${escapeHtml(data.jobTitle)} (${escapeHtml(data.jobId)})</h2>`,
    `<table cellpadding="6" style="${FONT};font-size:14px;border-collapse:collapse">`,
    ...rows.map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd;color:#555">${escapeHtml(k)}</td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
    ),
    `</table>`,
    data.coverNote
      ? section(
          "Cover note",
          `<p style="${FONT};font-size:14px;white-space:pre-wrap">${escapeHtml(data.coverNote)}</p>`,
        )
      : "",
    cvBlock,
    `<p style="${FONT};font-size:12px;color:#777">Submitted through acwadhr.com with consent to process the application.</p>`,
  ].join("");

  return {
    subject: `New application — ${data.jobTitle} (${data.jobId})`,
    html,
  };
}
