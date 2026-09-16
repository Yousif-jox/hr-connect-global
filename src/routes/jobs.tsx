import { Link, createFileRoute } from "@tanstack/react-router";

import { JobCard } from "@/components/JobCard";
import { PageHero } from "@/components/PageHero";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { JOB_COUNT, jobs } from "@/data/jobs";
import { useLang } from "@/lib/lang";

/** Localised digits — the Arabic copy uses Arabic-Indic numerals throughout. */
const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const arNum = (n: number) => String(n).replace(/\d/g, (d) => AR_DIGITS[Number(d)]!);

const copy = {
  en: {
    eyebrow: "OPEN ROLES",
    title: "Roles we are hiring for right now.",
    sub: "Live mandates across our client portfolio. Open a role for the full requirements, then apply once — our recruiters match you to every fitting position.",
    filtersNote: `Updated weekly · ${JOB_COUNT} active mandates this month.`,
    apply: "Apply now",
    reqLink: "Read the hiring requirements",
    typeLabel: "Type",
    locLabel: "Location",
    expLabel: "Experience",
    detailsLabel: "Job details",
    requirementsLabel: "Requirements",
    responsibilitiesLabel: "What you will do",
  },
  ar: {
    eyebrow: "الوظائف المتوفرة",
    title: "وظائف نبحث عن شاغليها الآن.",
    sub: "فرص حقيقية لدى عملائنا. افتح الوظيفة لقراءة المتطلبات كاملة، ثم قدّم مرة واحدة ويرشّحك فريقنا لكل وظيفة تناسبك.",
    filtersNote: `يتم التحديث أسبوعيًا · ${arNum(JOB_COUNT)} وظيفة نشطة هذا الشهر.`,
    apply: "قدّم الآن",
    reqLink: "اطّلع على شروط التوظيف",
    typeLabel: "نوع الدوام",
    locLabel: "الموقع",
    expLabel: "الخبرة",
    detailsLabel: "تفاصيل الوظيفة",
    requirementsLabel: "المتطلبات",
    responsibilitiesLabel: "المهام الأساسية",
  },
};

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Open Roles | Acwad HR Careers & Live Mandates" },
      {
        name: "description",
        content:
          "Browse Acwad HR's live job openings in payroll, recruitment, compliance, training and HR operations across Cairo, Dubai, Riyadh and remote.",
      },
      { property: "og:title", content: "Open Roles at Acwad HR" },
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
  const list = jobs[lang];

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-cream font-sans">
      <SiteHeader lang={lang} onToggle={toggle} />

      <PageHero eyebrow={c.eyebrow} title={c.title} sub={c.sub}>
        <Link
          to="/requirements"
          className="rounded-full border border-cream/25 px-6 py-3 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
        >
          {c.reqLink}
        </Link>
        <p className="text-sm text-cream/45">{c.filtersNote}</p>
      </PageHero>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-14 md:grid-cols-2">
          {list.map((job) => (
            <JobCard key={job.id} job={job} c={c} />
          ))}
        </div>
      </section>

      <SiteFooter lang={lang} />
    </div>
  );
}
