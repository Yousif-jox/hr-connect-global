import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import heroTeam from "@/assets/hero-team.jpg";
import outcomesDashboard from "@/assets/outcomes-dashboard.jpg";
import headshotLayla from "@/assets/headshot-layla.jpg";
import headshotOmar from "@/assets/headshot-omar.jpg";
import headshotDana from "@/assets/headshot-dana.jpg";
import headshotRami from "@/assets/headshot-rami.jpg";

type Lang = "en" | "ar";

const copy = {
  en: {
    dir: "ltr" as const,
    htmlLang: "en",
    nav: {
      services: "Services",
      results: "Results",
      clients: "Clients",
      contact: "Contact",
    },
    langButton: "العربية",
    bookCall: "Book a call",
    hero: {
      badge: "HUMAN RESOURCES, HANDLED END-TO-END",
      titleLead: "The HR partner behind ",
      titleGold: "hundreds of teams",
      titleTail: " that grow with confidence.",
      sub: "Recruitment, payroll, compliance and training — run for you, so you can run the business.",
      ctaPrimary: "Start your search",
      ctaSecondary: "Download capabilities",
      stats: [
        { value: "12k", label: "people placed" },
        { value: "98%", label: "payroll accuracy" },
        { value: "45", label: "industries served" },
      ],
      quote:
        "Meridian took our hiring and payroll off our plate completely. Time-to-fill dropped by a third.",
      quoteName: "Layla Haddad",
      quoteRole: "COO, Northgate Logistics",
      trustedBy: "Trusted by",
    },
    services: {
      eyebrow: "WHAT WE DO",
      title: "Four disciplines, one accountable partner.",
      note: "Every engagement is managed by a single dedicated HR lead.",
      items: [
        {
          num: "01",
          title: "Recruitment",
          desc: "Full-cycle sourcing to onboarding, with a median 18-day time-to-fill.",
        },
        {
          num: "02",
          title: "Payroll",
          desc: "Accurate, on-time runs across multiple currencies and entities.",
        },
        {
          num: "03",
          title: "Compliance",
          desc: "Labor-law audits and filings that keep you inspection-ready.",
        },
        {
          num: "04",
          title: "Training",
          desc: "Leadership and skills programs built to your team's roadmap.",
        },
      ],
    },
    outcomes: {
      eyebrow: "OUTCOMES",
      title: "Numbers our clients actually hold us to.",
      stats: [
        { value: "18d", label: "median time-to-fill" },
        { value: "98%", label: "payroll accuracy rate" },
        { value: "3.2x", label: "ROI on training programs" },
        { value: "0", label: "compliance findings in 2024" },
      ],
    },
    clients: {
      eyebrow: "CLIENTS",
      title: "What leaders say after the first year.",
      items: [
        {
          quote:
            "They rebuilt our payroll in a weekend and it's never slipped since. The reporting is something we actually read.",
          name: "Omar Khalidi",
          role: "CFO, Velaris Group",
        },
        {
          quote:
            "Recruitment used to eat my week. Now I get shortlists Friday and sign offers Monday.",
          name: "Dana Faris",
          role: "Founder, Corelink",
        },
        {
          quote:
            "Their compliance audit caught gaps we'd missed for years. Insurance and filings are simply handled now.",
          name: "Rami Soliman",
          role: "Ops Head, Northgate",
        },
      ],
    },
    cta: {
      title: "Ready to hand off your people operations?",
      sub: "Tell us where it hurts. We'll map a plan in one working session — no obligation.",
      button: "Book a 30-minute session",
    },
    footer: {
      brand: "Meridian HR",
      line: "© 2024 Meridian HR Services · Recruitment · Payroll · Compliance · Training",
    },
  },
  ar: {
    dir: "rtl" as const,
    htmlLang: "ar",
    nav: {
      services: "خدماتنا",
      results: "النتائج",
      clients: "عملاؤنا",
      contact: "تواصل معنا",
    },
    langButton: "English",
    bookCall: "احجز مكالمة",
    hero: {
      badge: "الموارد البشرية، مُدارة بالكامل",
      titleLead: "شريك الموارد البشرية وراء ",
      titleGold: "مئات الفرق",
      titleTail: " التي تنمو بثقة.",
      sub: "التوظيف والرواتب والامتثال والتدريب — نديرها عنك، لتدير أنت العمل.",
      ctaPrimary: "ابدأ معنا",
      ctaSecondary: "حمّل ملف قدراتنا",
      stats: [
        { value: "12k", label: "شخص تم توظيفهم" },
        { value: "98%", label: "دقة الرواتب" },
        { value: "45", label: "قطاعًا نخدمه" },
      ],
      quote:
        "تولّت ميريديان التوظيف والرواتب بالكامل عنّا، وانخفض زمن التعيين بمقدار الثلث.",
      quoteName: "ليلى حداد",
      quoteRole: "مديرة العمليات، نورثغيت للخدمات اللوجستية",
      trustedBy: "شركاء الثقة",
    },
    services: {
      eyebrow: "ماذا نقدم",
      title: "أربع تخصصات، شريك واحد مسؤول.",
      note: "كل مشروع يديره مختص موارد بشرية واحد مُكرَّس.",
      items: [
        {
          num: "01",
          title: "التوظيف",
          desc: "من البحث إلى التعيين بدورة كاملة، بمتوسط ١٨ يومًا لإغلاق الوظيفة.",
        },
        {
          num: "02",
          title: "الرواتب",
          desc: "صرف دقيق وفي موعده عبر عملات وكيانات متعددة.",
        },
        {
          num: "03",
          title: "الامتثال",
          desc: "تدقيق قانون العمل والإيداعات التي تُبقيك جاهزين للفحص دائمًا.",
        },
        {
          num: "04",
          title: "التدريب",
          desc: "برامج قيادة ومهارات مبنية على خطة فريقك.",
        },
      ],
    },
    outcomes: {
      eyebrow: "النتائج",
      title: "أرقام يقيس عملاؤنا بها التزامنا.",
      stats: [
        { value: "18d", label: "متوسط زمن التعيين" },
        { value: "98%", label: "دقة الرواتب" },
        { value: "3.2x", label: "عائد برامج التدريب" },
        { value: "0", label: "ملاحظات امتثال في ٢٠٢٤" },
      ],
    },
    clients: {
      eyebrow: "عملاؤنا",
      title: "ما يقوله القادة بعد السنة الأولى.",
      items: [
        {
          quote:
            "أعادوا بناء نظام الرواتب في عطلة نهاية أسبوع، ولم يتأخر منذ ذلك الحين. التقارير صارت نقرأها فعلًا.",
          name: "عمر الخالدي",
          role: "المدير المالي، مجموعة فيلاريس",
        },
        {
          quote:
            "التوظيف كان يستهلك أسبوعي بالكامل. الآن أستلم القوائم المختصرة يوم الجمعة وأوقّع العروض يوم الاثنين.",
          name: "دانا فارس",
          role: "مؤسِّسة، كورلينك",
        },
        {
          quote:
            "كشف تدقيق الامتثال عن فجوات لم نلاحظها لسنوات. التأمين والإيداعات صارت مُدارة تلقائيًا.",
          name: "رامي سليمان",
          role: "رئيس العمليات، نورثغيت",
        },
      ],
    },
    cta: {
      title: "جاهز لتسليم عمليات الموارد البشرية؟",
      sub: "أخبرنا بما يُرهاقك. سنضع الخطة في جلسة عمل واحدة — دون أي التزام.",
      button: "احجز جلسة ٣٠ دقيقة",
    },
    footer: {
      brand: "مريديان للخدمات البشرية",
      line: "© ٢٠٢٤ مريديان للخدمات البشرية · التوظيف · الرواتب · الامتثال · التدريب",
    },
  },
};

const testimonials = [
  { photo: headshotOmar, width: 816, height: 816 },
  { photo: headshotDana, width: 816, height: 816 },
  { photo: headshotRami, width: 816, height: 816 },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian HR | Recruitment, Payroll, Compliance & Training" },
      {
        name: "description",
        content:
          "Meridian HR is your end-to-end HR partner: recruitment, payroll, compliance and training for growing teams. Bilingual EN/AR services across the region.",
      },
      { property: "og:title", content: "Meridian HR | End-to-End HR Services" },
      {
        property: "og:description",
        content:
          "Recruitment, payroll, compliance and training — run for you, so you can run the business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.documentElement.dir = t.dir;
  }, [t.htmlLang, t.dir]);

  return (
    <div dir={t.dir} lang={t.htmlLang} className="min-h-screen bg-cream font-sans">
      {/* ===== Header ===== */}
      <header className="bg-navy text-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-gold font-extrabold text-navy">
              M
            </div>
            <div className="leading-tight">
              <p className="font-extrabold tracking-tight text-cream">Meridian HR</p>
              <p className="text-[11px] text-cream/50">مريديان للخدمات البشرية</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-cream/70 md:flex">
            <a href="#services" className="transition-colors hover:text-gold">
              {t.nav.services}
            </a>
            <a href="#results" className="transition-colors hover:text-gold">
              {t.nav.results}
            </a>
            <a href="#clients" className="transition-colors hover:text-gold">
              {t.nav.clients}
            </a>
            <a href="#contact" className="transition-colors hover:text-gold">
              {t.nav.contact}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="rounded-full border border-cream/20 px-4 py-1.5 text-xs font-semibold text-cream/70 transition-colors hover:border-gold hover:text-gold"
            >
              {t.langButton}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-gold-soft sm:block"
            >
              {t.bookCall}
            </a>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="top" className="relative overflow-hidden bg-navy text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-gold-soft">
              <span className="size-1.5 rounded-full bg-gold" />
              {t.hero.badge}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] text-cream lg:text-5xl">
              {t.hero.titleLead}
              <span className="text-gold">{t.hero.titleGold}</span>
              {t.hero.titleTail}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/65">
              {t.hero.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-soft"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#services"
                className="rounded-full border border-cream/25 px-6 py-3 text-sm text-cream transition-colors hover:bg-cream/5"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {t.hero.stats.map((s) => (
                <div key={s.label} className="border-t-2 border-gold pt-3">
                  <p className="font-display text-3xl font-bold text-cream">{s.value}</p>
                  <p className="mt-1 text-xs text-cream/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src={heroTeam}
              alt={
                lang === "en"
                  ? "Meridian HR team collaborating in a modern office"
                  : "فريق ميريديان للموارد البشرية أثناء العمل"
              }
              width={912}
              height={1088}
              className="aspect-[4/5] w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10"
            />
            <div className="mt-4 rounded-2xl bg-cream p-5 text-ink">
              <p className="text-sm leading-relaxed">“{t.hero.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={headshotLayla}
                  alt={t.hero.quoteName}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold">{t.hero.quoteName}</p>
                  <p className="text-xs text-slate-2">{t.hero.quoteRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted-by strip */}
        <div className="border-t border-cream/10">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-5">
            <p className="whitespace-nowrap text-xs uppercase tracking-[0.18em] text-cream/40">
              {t.hero.trustedBy}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-display text-sm font-bold text-cream/55">
              <span>Northgate</span>
              <span>Velaris</span>
              <span>Atlas &amp; Co</span>
              <span>Meridian Foods</span>
              <span>Corelink</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-gold">
                {t.services.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink lg:text-4xl">
                {t.services.title}
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm text-slate-2 md:block">
              {t.services.note}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.services.items.map((item) => (
              <div
                key={item.num}
                className="rounded-2xl border border-ink/5 bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="grid size-11 place-items-center rounded-lg bg-mist font-display text-xl text-navy">
                  {item.num}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Outcomes ===== */}
      <section id="results" className="bg-navy-800 text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-gold-soft">
              {t.outcomes.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight lg:text-4xl">
              {t.outcomes.title}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              {t.outcomes.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-5xl font-bold text-gold">{s.value}</p>
                  <p className="mt-1 text-sm text-cream/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src={outcomesDashboard}
            alt={
              lang === "en"
                ? "Analytics dashboard with HR performance metrics"
                : "لوحة تحليلات بمؤشرات أداء الموارد البشرية"
            }
            width={1088}
            height={864}
            loading="lazy"
            className="aspect-[5/4] w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10"
          />
        </div>
      </section>

      {/* ===== Clients ===== */}
      <section id="clients" className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold">
            {t.clients.eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold text-ink lg:text-4xl">
            {t.clients.title}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.clients.items.map((item, i) => (
              <figure key={item.name} className="rounded-2xl border border-ink/5 bg-white p-6">
                <blockquote className="leading-relaxed text-ink/80">“{item.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img
                    src={testimonials[i].photo}
                    alt={item.name}
                    width={testimonials[i].width}
                    height={testimonials[i].height}
                    loading="lazy"
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-ink">{item.name}</p>
                    <p className="text-xs text-slate-2">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" className="bg-gold">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-8 rounded-3xl bg-navy px-8 py-12 md:grid-cols-2 md:px-14">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight text-cream lg:text-4xl">
                {t.cta.title}
              </h2>
              <p className="mt-4 text-cream/70">{t.cta.sub}</p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@meridianhr.com"
                className="rounded-full bg-gold px-6 py-3.5 text-center font-bold text-navy transition-colors hover:bg-gold-soft"
              >
                {t.cta.button}
              </a>
              <a
                href="mailto:hello@meridianhr.com"
                dir="ltr"
                className="rounded-full border border-cream/30 px-6 py-3.5 text-center text-cream transition-colors hover:border-gold hover:text-gold"
              >
                hello@meridianhr.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-navy text-cream/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm md:flex-row">
          <p className="font-bold text-cream">{t.footer.brand}</p>
          <p>{t.footer.line}</p>
        </div>
      </footer>
    </div>
  );
}
