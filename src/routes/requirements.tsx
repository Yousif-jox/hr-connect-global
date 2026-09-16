import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { useLang } from "@/lib/lang";

const copy = {
  en: {
    eyebrow: "HIRING REQUIREMENTS",
    title: "What we look for, and how the process runs.",
    sub: "Clear criteria before you apply — no guesswork, no wasted weeks.",
    jobsLink: "See open roles",
    generalTitle: "General requirements",
    general: [
      "Valid national ID or residency permit for the role's country.",
      "Recognized degree or professional certificate relevant to the function.",
      "Minimum two years of documented, verifiable experience.",
      "Working proficiency in Arabic and English, written and spoken.",
      "Two professional references from the last five years.",
      "Clean labor and criminal record, verified before the offer.",
    ],
    docsTitle: "Documents to prepare",
    docs: [
      "Updated CV (PDF, max 2 pages)",
      "Copy of ID / passport",
      "Academic and professional certificates",
      "Previous employment certificates",
      "Recent personal photo",
    ],
    processTitle: "The hiring process",
    process: [
      { step: "01", title: "Application review", desc: "We screen your file within 5 working days." },
      { step: "02", title: "Screening call", desc: "A 20-minute call on experience and expectations." },
      { step: "03", title: "Technical interview", desc: "A structured interview with the hiring manager." },
      { step: "04", title: "Verification", desc: "References, documents and background checks." },
      { step: "05", title: "Offer & onboarding", desc: "Written offer, contract and start-date planning." },
    ],
    noteTitle: "Good to know",
    note: "Meridian HR never charges candidates any fee at any stage. All offers are issued in writing from a @meridianhr.com address.",
  },
  ar: {
    eyebrow: "شروط التوظيف",
    title: "ما الذي نبحث عنه، وكيف تسير عملية التوظيف.",
    sub: "معايير واضحة قبل أن تقدّم — بلا تخمين ولا أسابيع ضائعة.",
    jobsLink: "شاهد الوظائف المتوفرة",
    generalTitle: "الشروط العامة",
    general: [
      "بطاقة هوية وطنية سارية أو إقامة نظامية في بلد الوظيفة.",
      "مؤهل دراسي معترف به أو شهادة مهنية في مجال الوظيفة.",
      "خبرة موثّقة لا تقل عن سنتين وقابلة للتحقق.",
      "إتقان العربية والإنجليزية تحدثًا وكتابة بمستوى العمل.",
      "مرجعان مهنيان خلال السنوات الخمس الأخيرة.",
      "سجل عمّالي وجنائي نظيف، يتم التحقق منه قبل العرض.",
    ],
    docsTitle: "المستندات المطلوبة",
    docs: [
      "سيرة ذاتية محدّثة (PDF، صفحتان كحد أقصى)",
      "صورة من الهوية أو جواز السفر",
      "الشهادات الدراسية والمهنية",
      "شهادات الخبرة السابقة",
      "صورة شخصية حديثة",
    ],
    processTitle: "مراحل التوظيف",
    process: [
      { step: "٠١", title: "مراجعة الطلب", desc: "نراجع ملفك خلال ٥ أيام عمل." },
      { step: "٠٢", title: "مكالمة تعريفية", desc: "مكالمة ٢٠ دقيقة حول الخبرة والتوقعات." },
      { step: "٠٣", title: "المقابلة الفنية", desc: "مقابلة منظمة مع مدير التوظيف." },
      { step: "٠٤", title: "التحقق", desc: "المراجع والمستندات والفحص الخلفي." },
      { step: "٠٥", title: "العرض والالتحاق", desc: "عرض مكتوب وعقد وتحديد موعد المباشرة." },
    ],
    noteTitle: "معلومة مهمة",
    note: "لا تتقاضى مريديان أي رسوم من المرشحين في أي مرحلة. وكل العروض تصدر كتابيًا من بريد @meridianhr.com فقط.",
  },
};

export const Route = createFileRoute("/requirements")({
  head: () => ({
    meta: [
      { title: "Hiring Requirements | Meridian HR Candidate Criteria" },
      {
        name: "description",
        content:
          "Meridian HR hiring requirements: eligibility criteria, documents to prepare and the five-stage recruitment process, in English and Arabic.",
      },
      { property: "og:title", content: "Hiring Requirements | Meridian HR" },
      {
        property: "og:description",
        content: "Clear criteria, required documents and our five-stage recruitment process.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RequirementsPage,
});

function RequirementsPage() {
  const { lang, toggle, dir } = useLang();
  const c = copy[lang];

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-cream font-sans">
      <SiteHeader lang={lang} onToggle={toggle} />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.15] lg:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65">{c.sub}</p>
          <Link
            to="/jobs"
            className="mt-7 inline-block rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-soft"
          >
            {c.jobsLink}
          </Link>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 lg:grid-cols-3">
          <div className="rounded-2xl border border-ink/5 bg-white p-7 lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-ink">{c.generalTitle}</h2>
            <ul className="mt-5 space-y-3">
              {c.general.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-mist p-7">
            <h2 className="font-display text-2xl font-semibold text-ink">{c.docsTitle}</h2>
            <ul className="mt-5 space-y-3">
              {c.docs.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-navy" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy-800 text-cream">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="font-display text-3xl font-semibold lg:text-4xl">{c.processTitle}</h2>
          <ol className="mt-9 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
            {c.process.map((p) => (
              <li key={p.step} className="border-t-2 border-gold pt-4">
                <p className="font-display text-2xl font-bold text-gold">{p.step}</p>
                <h3 className="mt-2 font-bold text-cream">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gold">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-3xl bg-navy px-8 py-10 md:px-14">
            <h2 className="font-display text-2xl font-semibold text-cream">{c.noteTitle}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-cream/70">{c.note}</p>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </div>
  );
}
