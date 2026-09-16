import { useRef, useState } from "react";

import type { Lang } from "@/lib/lang";

const FALLBACK_EMAIL = "careers@acwadhr.com";

const copy = {
  en: {
    eyebrow: "APPLY",
    heading: "Apply for this role",
    intro: "One short form. Your CV goes straight to the recruiting team for this mandate.",
    fullName: "Full name",
    email: "Email",
    phone: "Phone (with country code)",
    location: "Current location",
    experience: "Years of experience",
    portfolioUrl: "LinkedIn or portfolio link (optional)",
    coverNote: "Anything we should know? (optional)",
    cv: "CV / résumé",
    cvHint: "PDF, DOC or DOCX — up to 5 MB.",
    consent: "I agree that Acwad HR may store and process my application for recruitment purposes.",
    privacyLink: "Privacy policy",
    submit: "Send application",
    sending: "Sending…",
    sentTitle: "Application received",
    sentBody: "Thank you. Our recruiting team reviews every application and will contact you if your profile matches this mandate.",
    sendAnother: "Submit another application",
    required: "Please complete this field correctly.",
    fileRequired: "Please attach your CV (PDF, DOC or DOCX).",
    fileTooLarge: "The file is larger than 5 MB. Please attach a smaller version.",
    fileType: "Only PDF, DOC or DOCX files are accepted.",
    consentRequired: "Please confirm the consent statement to continue.",
    notConfigured: "Direct upload is not active on this environment yet.",
    sendFailed: "We could not deliver your application right now.",
    genericError: "Something went wrong. Please try again, or email us directly.",
    mailFallback: "Send it by email instead",
    orEmail: "Or email your CV to",
    cvReadTitle: "CV read successfully",
    cvChars: "characters extracted",
    cvPreviewLabel: "First lines we read from your file",
    cvUnreadTitle: "CV file received",
    cvUnreadBody:
      "We could not read its text automatically. The file is attached to your application, so nothing is lost.",
  },
  ar: {
    eyebrow: "التقديم",
    heading: "تقدّم على هذه الوظيفة",
    intro: "نموذج قصير واحد، وسيرتك الذاتية تصل مباشرة لفريق التوظيف المسؤول عن هذه الوظيفة.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف (مع رمز الدولة)",
    location: "المدينة الحالية",
    experience: "سنوات الخبرة",
    portfolioUrl: "رابط LinkedIn أو ملف أعمال (اختياري)",
    coverNote: "أي شيء تحب أن نعرفه؟ (اختياري)",
    cv: "السيرة الذاتية",
    cvHint: "‏PDF أو DOC أو DOCX — بحد أقصى ٥ ميجابايت.",
    consent: "أوافق على أن تحتفظ اكواد للخدمات البشرية ببيانات طلبي وتعالجها لأغراض التوظيف.",
    privacyLink: "سياسة الخصوصية",
    submit: "أرسل الطلب",
    sending: "جارٍ الإرسال…",
    sentTitle: "تم استلام طلبك",
    sentBody: "شكرًا لك. فريق التوظيف يراجع كل الطلبات وسيتواصل معك إذا كان ملفك مناسبًا لهذه الوظيفة.",
    sendAnother: "إرسال طلب آخر",
    required: "يرجى إكمال هذا الحقل بشكل صحيح.",
    fileRequired: "يرجى إرفاق السيرة الذاتية (PDF أو DOC أو DOCX).",
    fileTooLarge: "حجم الملف أكبر من ٥ ميجابايت. يرجى إرفاق نسخة أصغر.",
    fileType: "الملفات المقبولة هي PDF أو DOC أو DOCX فقط.",
    consentRequired: "يرجى الموافقة على بيان الإقرار للمتابعة.",
    notConfigured: "الإرسال المباشر غير مفعّل على هذه البيئة بعد.",
    sendFailed: "لم نتمكن من تسليم طلبك في الوقت الحالي.",
    genericError: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا بالبريد مباشرة.",
    mailFallback: "أرسلها بالبريد بدلًا من ذلك",
    orEmail: "أو أرسل سيرتك الذاتية إلى",
    cvReadTitle: "تمت قراءة السيرة الذاتية",
    cvChars: "حرفًا تم استخراجه من ملفك",
    cvPreviewLabel: "أول سطور قرأناها من ملفك",
    cvUnreadTitle: "تم استلام ملف السيرة الذاتية",
    cvUnreadBody: "لم نتمكن من قراءة نصه آليًا. الملف مرفق بطلبك، فلا شيء مفقود.",
  },
};

const fieldKeys = ["fullName", "email", "phone", "location", "experience", "consent"] as const;

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate-2 focus:border-gold focus:bg-white";
const labelClass = "text-xs font-semibold text-navy";
const errorClass = "mt-1 text-xs font-semibold text-destructive";

export function ApplicationForm({
  jobId,
  jobTitle,
  lang,
}: {
  jobId: string;
  jobTitle: string;
  lang: Lang;
}) {
  const c = copy[lang];
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [fallbackEmail, setFallbackEmail] = useState(FALLBACK_EMAIL);
  const [cvRead, setCvRead] = useState<{ status: string; chars: number; preview: string } | null>(null);

  const count = (n: number) => n.toLocaleString(lang === "ar" ? "ar-EG" : "en-US");

  const fieldError = (key: string) => errors[key];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    data.set("jobId", jobId);
    data.set("jobTitle", jobTitle);

    setStatus("sending");
    setErrors({});
    setNotice(null);
    setCvRead(null);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: data });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: Record<string, string>;
        fallbackEmail?: string;
        cv?: { status: string; chars: number; preview: string };
      };

      if (payload.cv) setCvRead(payload.cv);

      if (res.ok && payload.ok) {
        setStatus("sent");
        formEl.reset();
        return;
      }

      if (payload.code === "VALIDATION" && payload.errors) {
        const next: Record<string, string> = {};
        for (const key of Object.keys(payload.errors)) {
          next[key] = key === "consent" ? c.consentRequired : c.required;
        }
        setErrors(next);
        setStatus("idle");
        return;
      }

      if (payload.code === "CV_MISSING") {
        setErrors({ cv: c.fileRequired });
        setStatus("idle");
        return;
      }
      if (payload.code === "CV_TYPE") {
        setErrors({ cv: c.fileType });
        setStatus("idle");
        return;
      }
      if (payload.code === "CV_TOO_LARGE") {
        setErrors({ cv: c.fileTooLarge });
        setStatus("idle");
        return;
      }

      if (payload.code === "NOT_CONFIGURED" || payload.code === "SEND_FAILED") {
        if (payload.fallbackEmail) setFallbackEmail(payload.fallbackEmail);
        setNotice(payload.code === "NOT_CONFIGURED" ? c.notConfigured : c.sendFailed);
        setStatus("error");
        return;
      }

      if (payload.code === "RATE_LIMITED") {
        setNotice(c.genericError);
        setStatus("error");
        return;
      }

      setNotice(c.genericError);
      setStatus("error");
    } catch {
      setNotice(c.genericError);
      setStatus("error");
    }
  }

  function openMailFallback() {
    const formEl = formRef.current;
    const value = (name: string) => {
      const field = formEl?.elements.namedItem(name);
      return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement
        ? field.value
        : "";
    };
    const subject = `${c.heading}: ${jobTitle} (${jobId})`;
    const body = [
      `${c.fullName}: ${value("fullName")}`,
      `${c.email}: ${value("email")}`,
      `${c.phone}: ${value("phone")}`,
      `${c.location}: ${value("location")}`,
      `${c.experience}: ${value("experience")}`,
      `${c.portfolioUrl}: ${value("portfolioUrl")}`,
      "",
      value("coverNote"),
      "",
      `${c.cv}: (attach your CV to this email)`,
    ].join("\n");
    window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  if (status === "sent") {
    return (
      <div id="apply" className="rounded-2xl border border-ink/5 bg-white p-6">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.eyebrow}</p>
        <h2 className="mt-3 text-2xl font-bold text-ink">{c.sentTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-2">{c.sentBody}</p>

        {cvRead && cvRead.status === "extracted" ? (
          <div className="mt-6 rounded-xl border border-ink/10 bg-mist p-5">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.cvReadTitle}</p>
            <p className="mt-2 text-sm font-semibold text-navy">
              {count(cvRead.chars)} {c.cvChars}
            </p>
            {cvRead.preview ? (
              <>
                <p className="mt-4 text-xs font-semibold text-slate-2">{c.cvPreviewLabel}</p>
                <pre className="mt-2 max-h-40 overflow-hidden whitespace-pre-wrap break-words rounded-lg bg-white p-3 text-xs leading-relaxed text-ink/75">
                  {cvRead.preview}
                </pre>
              </>
            ) : null}
          </div>
        ) : cvRead ? (
          <div className="mt-6 rounded-xl border border-ink/10 bg-mist p-5">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.cvUnreadTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{c.cvUnreadBody}</p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setCvRead(null);
            setStatus("idle");
          }}
          className="mt-6 rounded-full border border-ink/10 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
        >
          {c.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div id="apply" className="rounded-2xl border border-ink/5 bg-white p-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold text-ink">{c.heading}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-2">{c.intro}</p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* honeypot — hidden from users and assistive tech */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label className={labelClass} htmlFor="fullName">
            {c.fullName}
          </label>
          <input id="fullName" name="fullName" type="text" required className={`mt-2 ${inputClass}`} aria-invalid={Boolean(fieldError("fullName"))} />
          {fieldError("fullName") ? <p className={errorClass}>{fieldError("fullName")}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            {c.email}
          </label>
          <input id="email" name="email" type="email" required className={`mt-2 ${inputClass}`} aria-invalid={Boolean(fieldError("email"))} />
          {fieldError("email") ? <p className={errorClass}>{fieldError("email")}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            {c.phone}
          </label>
          <input id="phone" name="phone" type="tel" required className={`mt-2 ${inputClass}`} aria-invalid={Boolean(fieldError("phone"))} />
          {fieldError("phone") ? <p className={errorClass}>{fieldError("phone")}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="location">
            {c.location}
          </label>
          <input id="location" name="location" type="text" required className={`mt-2 ${inputClass}`} aria-invalid={Boolean(fieldError("location"))} />
          {fieldError("location") ? <p className={errorClass}>{fieldError("location")}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="experience">
            {c.experience}
          </label>
          <input id="experience" name="experience" type="text" required className={`mt-2 ${inputClass}`} aria-invalid={Boolean(fieldError("experience"))} />
          {fieldError("experience") ? <p className={errorClass}>{fieldError("experience")}</p> : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="portfolioUrl">
            {c.portfolioUrl}
          </label>
          <input id="portfolioUrl" name="portfolioUrl" type="url" className={`mt-2 ${inputClass}`} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="coverNote">
            {c.coverNote}
          </label>
          <textarea id="coverNote" name="coverNote" rows={4} className={`mt-2 ${inputClass}`} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="cv">
            {c.cv}
          </label>
          <input
            id="cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-slate-2 file:me-4 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-xs file:font-bold file:text-cream"
            aria-invalid={Boolean(fieldError("cv"))}
          />
          <p className="mt-1 text-xs text-slate-2">{c.cvHint}</p>
          {fieldError("cv") ? <p className={errorClass}>{fieldError("cv")}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/80" htmlFor="consent">
            <input id="consent" name="consent" type="checkbox" required className="mt-1 size-4 shrink-0 accent-gold" aria-invalid={Boolean(fieldError("consent"))} />
            <span>
              {c.consent}{" "}
              <a href="/privacy" className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-2 transition-colors hover:text-gold">
                {c.privacyLink}
              </a>
            </span>
          </label>
          {fieldError("consent") ? <p className={errorClass}>{fieldError("consent")}</p> : null}
        </div>

        {notice ? (
          <div className="sm:col-span-2 rounded-xl border border-ink/10 bg-mist px-4 py-3">
            <p className="text-sm leading-relaxed text-ink/80">{notice}</p>
            {status === "error" ? (
              <button
                type="button"
                onClick={openMailFallback}
                className="mt-3 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-navy-800"
              >
                {c.mailFallback}
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {status === "sending" ? c.sending : c.submit}
          </button>
          <p className="text-xs text-slate-2">
            {c.orEmail}{" "}
            <a href={`mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(`${jobTitle} (${jobId})`)}`} className="font-semibold text-navy transition-colors hover:text-gold">
              {FALLBACK_EMAIL}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
