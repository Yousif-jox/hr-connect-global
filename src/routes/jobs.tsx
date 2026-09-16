import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { useLang } from "@/lib/lang";

const copy = {
  en: {
    eyebrow: "OPEN ROLES",
    title: "Roles we are hiring for right now.",
    sub: "Live mandates across our client portfolio. Apply once — our recruiters match you to every fitting role.",
    filtersNote: "Updated weekly. 24 active mandates this month.",
    apply: "Apply now",
    reqLink: "Read the hiring requirements",
    typeLabel: "Type",
    locLabel: "Location",
    expLabel: "Experience",
    jobs: [
      {
        title: "Senior Payroll Specialist",
        dept: "Payroll",
        type: "Full-time",
        loc: "Cairo · Hybrid",
        exp: "5+ years",
        desc: "Run multi-entity payroll cycles for three regional clients, own reconciliations and month-end reporting.",
      },
      {
        title: "Technical Recruiter",
        dept: "Recruitment",
        type: "Full-time",
        loc: "Dubai · On-site",
        exp: "3+ years",
        desc: "Full-cycle hiring for engineering mandates: sourcing, structured interviews, offer negotiation.",
      },
      {
        title: "HR Compliance Analyst",
        dept: "Compliance",
        type: "Full-time",
        loc: "Riyadh · Hybrid",
        exp: "4+ years",
        desc: "Labor-law audits, filings and inspection readiness across client entities in the Gulf.",
      },
      {
        title: "Learning & Development Facilitator",
        dept: "Training",
        type: "Contract",
        loc: "Remote",
        exp: "6+ years",
        desc: "Design and deliver leadership programs for mid-size client teams, in Arabic and English.",
      },
      {
        title: "HR Operations Coordinator",
        dept: "Operations",
        type: "Full-time",
        loc: "Cairo · On-site",
        exp: "2+ years",
        desc: "Onboarding logistics, contracts, HRIS records and employee documentation.",
      },
      {
        title: "Talent Sourcer (Arabic/English)",
        dept: "Recruitment",
        type: "Part-time",
        loc: "Remote",
        exp: "1+ years",
        desc: "Build bilingual candidate pipelines for high-volume commercial and retail mandates.",
      },
    ],
  },
  ar: {
    eyebrow: "الوظائف المتوفرة",
    title: "وظائف نبحث عن شاغليها الآن.",
    sub: "فرص حقيقية لدى عملائنا. قدّم مرة واحدة، ويرشّحك فريقنا لكل وظيفة تناسبك.",
    filtersNote: "يتم التحديث أسبوعيًا · ٢٤ وظيفة نشطة هذا الشهر.",
    apply: "قدّم الآن",
    reqLink: "اطّلع على شروط التوظيف",
    typeLabel: "نوع الدوام",
    locLabel: "الموقع",
    expLabel: "الخبرة",
    jobs: [
      {
        title: "أخصائي رواتب أول",
        dept: "الرواتب",
        type: "دوام كامل",
        loc: "القاهرة · هجين",
        exp: "٥ سنوات فأكثر",
        desc: "إدارة دورات الرواتب لثلاثة عملاء إقليميين، ومسؤولية التسويات وتقارير نهاية الشهر.",
      },
      {
        title: "أخصائي توظيف تقني",
        dept: "التوظيف",
        type: "دوام كامل",
        loc: "دبي · من المقر",
        exp: "٣ سنوات فأكثر",
        desc: "دورة توظيف كاملة للوظائف الهندسية: البحث، المقابلات المنظمة، والتفاوض على العروض.",
      },
      {
        title: "محلل امتثال موارد بشرية",
        dept: "الامتثال",
        type: "دوام كامل",
        loc: "الرياض · هجين",
        exp: "٤ سنوات فأكثر",
        desc: "تدقيق قانون العمل والإيداعات والجاهزية للتفتيش لدى كيانات العملاء في الخليج.",
      },
      {
        title: "مدرّب تطوير وتعلّم",
        dept: "التدريب",
        type: "عقد مؤقت",
        loc: "عن بُعد",
        exp: "٦ سنوات فأكثر",
        desc: "تصميم وتقديم برامج القيادة لفرق العملاء متوسطة الحجم، بالعربية والإنجليزية.",
      },
      {
        title: "منسّق عمليات موارد بشرية",
        dept: "العمليات",
        type: "دوام كامل",
        loc: "القاهرة · من المقر",
        exp: "سنتان فأكثر",
        desc: "ترتيبات الالتحاق، والعقود، وسجلات النظام، ووثائق الموظفين.",
      },
      {
        title: "باحث كفاءات (عربي/إنجليزي)",
        dept: "التوظيف",
        type: "دوام جزئي",
        loc: "عن بُعد",
        exp: "سنة فأكثر",
        desc: "بناء قوائم مرشحين ثنائية اللغة للوظائف التجارية وقطاع التجزئة عالية العدد.",
      },
    ],
  },
};

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Open Roles | Meridian HR Careers & Live Mandates" },
      {
        name: "description",
        content:
          "Browse Meridian HR's live job openings in payroll, recruitment, compliance, training and HR operations across Cairo, Dubai, Riyadh and remote.",
      },
      { property: "og:title", content: "Open Roles at Meridian HR" },
      {
        property: "og:description",
        content: "Live HR mandates across the region — apply once and get matched to every fitting role.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
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
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              to="/requirements"
              className="rounded-full border border-cream/25 px-6 py-3 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {c.reqLink}
            </Link>
            <p className="text-sm text-cream/45">{c.filtersNote}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-14 md:grid-cols-2">
          {c.jobs.map((job) => (
            <article
              key={job.title}
              className="flex flex-col rounded-2xl border border-ink/5 bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="w-fit rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy">
                {job.dept}
              </span>
              <h2 className="mt-4 text-xl font-bold text-ink">{job.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-2">{job.desc}</p>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/5 pt-4 text-xs">
                <div>
                  <dt className="text-slate-2">{c.typeLabel}</dt>
                  <dd className="mt-1 font-semibold text-ink">{job.type}</dd>
                </div>
                <div>
                  <dt className="text-slate-2">{c.locLabel}</dt>
                  <dd className="mt-1 font-semibold text-ink">{job.loc}</dd>
                </div>
                <div>
                  <dt className="text-slate-2">{c.expLabel}</dt>
                  <dd className="mt-1 font-semibold text-ink">{job.exp}</dd>
                </div>
              </dl>

              <a
                href={`mailto:careers@meridianhr.com?subject=${encodeURIComponent(job.title)}`}
                className="mt-6 w-fit rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-navy-800"
              >
                {c.apply}
              </a>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter lang={lang} />
    </div>
  );
}
