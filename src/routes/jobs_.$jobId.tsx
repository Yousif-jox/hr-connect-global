import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { ApplicationForm } from "@/components/ApplicationForm";
import { JobCard } from "@/components/JobCard";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { findJob, relatedJobs } from "@/data/jobs";
import { useLang } from "@/lib/lang";

const card = {
  en: {
    typeLabel: "Type",
    locLabel: "Location",
    expLabel: "Experience",
    detailsLabel: "Job details",
    requirementsLabel: "Requirements",
    responsibilitiesLabel: "What you will do",
    apply: "Apply now",
  },
  ar: {
    typeLabel: "نوع الدوام",
    locLabel: "الموقع",
    expLabel: "الخبرة",
    detailsLabel: "تفاصيل الوظيفة",
    requirementsLabel: "المتطلبات",
    responsibilitiesLabel: "المهام الأساسية",
    apply: "قدّم الآن",
  },
};

const copy = {
  en: {
    home: "Home",
    jobs: "Open roles",
    apply: "Apply for this role",
    allJobs: "All open roles",
    requirements: "Requirements",
    responsibilities: "What you will do",
    summary: "AT A GLANCE",
    department: "Department",
    reference: "Reference",
    checkFirst: "Applying for the first time?",
    checkFirstBody:
      "Read our hiring requirements and the documents we ask for before you submit — it saves a round of emails.",
    reqLink: "Hiring requirements",
    related: "MORE ROLES",
    relatedTitle: "Other roles you may fit",
  },
  ar: {
    home: "الرئيسية",
    jobs: "الوظائف المتوفرة",
    apply: "تقدّم على هذه الوظيفة",
    allJobs: "كل الوظائف المتاحة",
    requirements: "المتطلبات",
    responsibilities: "المهام الأساسية",
    summary: "نظرة سريعة",
    department: "القسم",
    reference: "المرجع",
    checkFirst: "أول مرة تقدّم معنا؟",
    checkFirstBody: "اقرأ شروط التوظيف والمستندات المطلوبة قبل إرسال طلبك — يوفّر عليك جولة مراسلات كاملة.",
    reqLink: "شروط التوظيف",
    related: "وظائف أخرى",
    relatedTitle: "وظائف قد تناسبك أيضًا",
  },
};

export const Route = createFileRoute("/jobs_/$jobId")({
  loader: ({ params }) => {
    if (!findJob("en", params.jobId)) throw notFound();
    return { jobId: params.jobId };
  },
  head: ({ params }) => {
    const job = findJob("en", params.jobId);
    if (!job) {
      return { meta: [{ title: "Role not found | Acwad HR" }] };
    }
    return {
      meta: [
        { title: `${job.title} — ${job.dept} | Acwad HR Careers` },
        {
          name: "description",
          content: `${job.desc} ${job.type} · ${job.loc} · ${job.exp}. Apply through Acwad HR.`,
        },
        { property: "og:title", content: `${job.title} — Acwad HR` },
        { property: "og:description", content: job.desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: JobDetailPage,
});

function JobDetailPage() {
  const { jobId } = Route.useParams();
  const { lang, toggle, dir } = useLang();
  const c = copy[lang];
  const job = findJob(lang, jobId)!;
  const related = relatedJobs(lang, jobId, 3);

  const meta: [string, string][] = [
    [c.department, job.dept],
    [card[lang].typeLabel, job.type],
    [card[lang].locLabel, job.loc],
    [card[lang].expLabel, job.exp],
    [c.reference, job.id],
  ];

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-cream font-sans">
      <SiteHeader lang={lang} onToggle={toggle} />

      <section className="bg-navy text-cream">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-cream/50">
            <Link to="/" className="transition-colors hover:text-gold">
              {c.home}
            </Link>
            <span className="text-cream/25">/</span>
            <Link to="/jobs" className="transition-colors hover:text-gold">
              {c.jobs}
            </Link>
            <span className="text-cream/25">/</span>
            <span className="text-cream/80">{job.title}</span>
          </nav>

          <span className="w-fit rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy">
            {job.dept}
          </span>

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.15] lg:text-5xl">
            {job.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65">{job.desc}</p>

          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 text-xs">
            {meta.map(([label, value]) => (
              <div key={label}>
                <dt className="text-cream/45">{label}</dt>
                <dd className="mt-1 font-semibold text-cream">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#apply"
              className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-soft"
            >
              {c.apply}
            </a>
            <Link
              to="/jobs"
              className="rounded-full border border-cream/25 px-6 py-3 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {c.allJobs}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.requirements}</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xs font-semibold tracking-[0.18em] text-navy">
              {c.responsibilities}
            </h2>
            <ul className="mt-4 space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-navy" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <ApplicationForm jobId={job.id} jobTitle={job.title} lang={lang} />
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-2xl border border-ink/5 bg-white p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.summary}</p>
              <dl className="mt-4 space-y-3 text-xs">
                {meta.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <dt className="text-slate-2">{label}</dt>
                    <dd className="text-end font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#apply"
                className="mt-6 block w-full rounded-full bg-navy px-5 py-2.5 text-center text-sm font-bold text-cream transition-colors hover:bg-navy-800"
              >
                {c.apply}
              </a>
            </div>

            <div className="rounded-2xl border border-ink/5 bg-mist p-6">
              <p className="text-sm font-bold text-navy">{c.checkFirst}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink/70">{c.checkFirstBody}</p>
              <Link
                to="/requirements"
                className="mt-3 inline-block text-xs font-semibold text-navy underline decoration-gold decoration-2 underline-offset-2 transition-colors hover:text-gold"
              >
                {c.reqLink}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.related}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{c.relatedTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <JobCard key={item.id} job={item} c={card[lang]} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <SiteFooter lang={lang} />
    </div>
  );
}
