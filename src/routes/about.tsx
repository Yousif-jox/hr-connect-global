import { Link, createFileRoute } from "@tanstack/react-router";

import heroTeam from "@/assets/hero-team.jpg";
import outcomesDashboard from "@/assets/outcomes-dashboard.jpg";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { JOB_COUNT, jobCities, remoteRoleCount } from "@/data/jobs";
import { useLang } from "@/lib/lang";

const copy = {
  en: {
    eyebrow: "ABOUT Acwad HR",
    title: "We run the people operations that let growing companies scale.",
    sub: "Acwad HR is a regional HR services partner. We place, pay, protect and develop the teams our clients build — across Egypt, the Gulf and remote-first operations.",
    storyTitle: "How we started",
    story: [
      "Acwad HR began as a two-person recruiting desk serving one industrial client in Cairo. The mandates grew, and so did the questions around them: who runs payroll, who keeps us compliant, who develops the managers we just hired.",
      "Instead of referring that work out, we built the capability in-house. The same team now delivers recruitment, payroll, compliance and training under one account — which is why clients stop juggling four vendors and start planning a year ahead.",
      "We stay deliberately mid-sized. Every mandate has a named owner, and every client gets a service review with real numbers rather than a quarterly slide deck.",
    ],
    numbersTitle: "Where we stand today",
    numbers: [
      { value: "12k", label: "People placed across the region" },
      { value: "98%", label: "Payroll accuracy across client entities" },
      { value: "18d", label: "Average time to hire on live mandates" },
      { value: "45", label: "Industries served since we started" },
    ],
    valuesTitle: "How we work",
    values: [
      { title: "Named owners", body: "Every mandate and every payroll cycle has one accountable person — never a shared inbox." },
      { title: "Numbers we can defend", body: "We report time-to-hire, payroll accuracy and compliance findings, and we show the working behind them." },
      { title: "Local knowledge, regional reach", body: "Egyptian and Gulf labour practice in one team, with bilingual delivery as the default rather than an extra." },
      { title: "Respect for candidates", body: "No fees from candidates, one application across every mandate, and honest feedback even when the answer is no." },
    ],
    modelTitle: "How your account is staffed",
    modelIntro:
      "We are deliberately organised so that the person you speak to is the person accountable for the outcome.",
    model: [
      { role: "Account lead", body: "Owns the relationship, the service review and the escalation path for your whole portfolio." },
      { role: "Recruitment partner", body: "Runs your live mandates end to end, from intake briefing to signed offer." },
      { role: "Payroll desk", body: "Runs your monthly cycle, reconciliations and statutory filings with a documented checklist." },
      { role: "Compliance advisor", body: "Keeps contracts, policies and filings current, and prepares you for inspections." },
    ],
    coverageTitle: "Where we work",
    coverageBody: "Our teams are based across the region, and a share of our mandates are delivered fully remotely.",
    coverageRemote: "Fully remote roles",
    coverageCount: "roles currently tied to an office",
    ctaTitle: "Talk to us before your next hiring or payroll cycle.",
    ctaBody: "A 30-minute call is usually enough to tell you whether we can help — and if we cannot, we will say so.",
    ctaButton: "Book a 30-minute call",
    ctaSecondary: "See open roles",
  },
  ar: {
    eyebrow: "عن اكواد",
    title: "ندير عمليات الموظفين التي تتيح للشركات النامية أن تتوسّع.",
    sub: "اكواد للخدمات البشرية شريك إقليمي في خدمات الموارد البشرية. نوظّف ونصرف ونحمي ونطوّر الفرق التي تبنيها شركات عملائنا — في مصر والخليج والفرق العاملة عن بُعد.",
    storyTitle: "كيف بدأنا",
    story: [
      "بدأت اكواد بمكتب توظيف من شخصين لخدمة عميل صناعي واحد في القاهرة. كبرت المهام، وكبرت معها الأسئلة: من يُدير الرواتب؟ ومن يحافظ على امتثالنا؟ ومن يطوّر المدراء الذين عيّناهم للتو؟",
      "بدلًا من تحويل هذا العمل لجهات خارجية، بنينا القدرة داخليًا. اليوم يقدّم الفريق نفسه التوظيف والرواتب والامتثال والتدريب من خلال حساب واحد — ولهذا يتوقف عملاؤنا عن إدارة أربعة موردين ويبدأون التخطيط لسنة كاملة مقدمًا.",
      "نبقى بحجم متوسط باختيارنا. كل مهمة لها مسؤول مُسمّى، وكل عميل يحصل على مراجعة خدمة بأرقام حقيقية لا بعرض تقديمي كل ربع سنة.",
    ],
    numbersTitle: "أين نقف اليوم",
    numbers: [
      { value: "١٢ ألف", label: "شخص تم توظيفهم في المنطقة" },
      { value: "٩٨٪", label: "دقة الرواتب عبر كيانات العملاء" },
      { value: "١٨ يومًا", label: "متوسط زمن التعيين في المهام النشطة" },
      { value: "٤٥", label: "قطاعًا خدمناها منذ البداية" },
    ],
    valuesTitle: "كيف نعمل",
    values: [
      { title: "مسؤول مُسمّى لكل ملف", body: "كل مهمة وكل دورة رواتب لها شخص واحد مسؤول — لا صندوق بريد مشترك." },
      { title: "أرقام ندافع عنها", body: "نعرض زمن التعيين ودقة الرواتب وملاحظات الامتثال، ونوضّح طريقة حسابها." },
      { title: "معرفة محلية وانتشار إقليمي", body: "ممارسات العمل المصري والخليجي في فريق واحد، وتقديم ثنائي اللغة كأصل لا كخدمة إضافية." },
      { title: "احترام المرشح", body: "لا رسوم على المرشحين، وتقديم واحد لكل الوظائف، ورد صريح حتى عندما يكون الرد بالرفض." },
    ],
    modelTitle: "كيف يُبنى فريق حسابك",
    modelIntro: "نُظيم عملنا عمدًا بحيث يكون الشخص الذي تتحدث معه هو نفسه المسؤول عن النتيجة.",
    model: [
      { role: "قائد الحساب", body: "مسؤول عن العلاقة ومراجعة الخدمة ومسار التصعيد لمحفظتك بالكامل." },
      { role: "شريك التوظيف", body: "يُدير مهامك النشطة من البداية للنهاية، من جلسة التعريف حتى توقيع العرض." },
      { role: "مكتب الرواتب", body: "يُنفّذ دورتك الشهرية والتسويات والإقرارات القانونية وفق قائمة تحقق موثّقة." },
      { role: "مستشار الامتثال", body: "يحافظ على العقود والسياسات والإيداعات محدّثة، ويجهّزك للتفتيش." },
    ],
    coverageTitle: "أين نعمل",
    coverageBody: "فرقنا موزّعة على مدن المنطقة، وجزء من مهامنا يُنفَّذ بالكامل عن بُعد.",
    coverageRemote: "وظائف عن بُعد بالكامل",
    coverageCount: "وظيفة مرتبطة بمقر حاليًا",
    ctaTitle: "تحدّث معنا قبل دورة التوظيف أو الرواتب القادمة.",
    ctaBody: "مكالمة ٣٠ دقيقة عادة تكفي لمعرفة إن كنا نستطيع المساعدة — وإن لم نستطع، سنقولها بصراحة.",
    ctaButton: "احجز مكالمة ٣٠ دقيقة",
    ctaSecondary: "تصفّح الوظائف المتاحة",
  },
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Acwad HR | Regional HR Services Partner" },
      {
        name: "description",
        content:
          "Acwad HR delivers recruitment, payroll, compliance and training across Egypt, the Gulf and remote operations. Read how we work and where we operate.",
      },
      { property: "og:title", content: "About Acwad HR" },
      {
        property: "og:description",
        content: "A regional HR services partner: recruitment, payroll, compliance and training under one account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang, toggle, dir } = useLang();
  const c = copy[lang];
  const cities = jobCities(lang);
  const remote = remoteRoleCount(lang);

  return (
    <div dir={dir} lang={lang} className="min-h-screen bg-cream font-sans">
      <SiteHeader lang={lang} onToggle={toggle} />

      <PageHero eyebrow={c.eyebrow} title={c.title} sub={c.sub} />

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-14 lg:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.storyTitle}</h2>
            <div className="mt-5 space-y-4">
              {c.story.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <img
            src={heroTeam}
            alt={lang === "ar" ? "فريق اكواد للخدمات البشرية" : "The Acwad HR team at work"}
            className="aspect-[4/5] w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10"
            loading="lazy"
          />
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.numbersTitle}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.numbers.map((item) => (
              <div key={item.label} className="border-t-2 border-gold pt-5">
                <p className="font-display text-5xl font-bold text-navy">{item.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.valuesTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {c.values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-ink/5 bg-white p-6">
                <h3 className="text-lg font-bold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-2">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-2">
          <img
            src={outcomesDashboard}
            alt={lang === "ar" ? "لوحة مؤشرات أداء الموارد البشرية" : "An HR performance dashboard"}
            className="aspect-[5/4] w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-white/10"
            loading="lazy"
          />
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.modelTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink/80">{c.modelIntro}</p>
            <dl className="mt-6 space-y-4">
              {c.model.map((item) => (
                <div key={item.role} className="border-t border-ink/5 pt-4">
                  <dt className="text-sm font-bold text-navy">{item.role}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slate-2">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-gold">{c.coverageTitle}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80">{c.coverageBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {cities.map((city) => (
              <span key={city} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy">
                {city}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-2">
            {remote} {c.coverageRemote} · {JOB_COUNT - remote} {c.coverageCount}
          </p>
          <Link
            to="/jobs"
            className="mt-7 inline-block rounded-full bg-navy px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-navy-800"
          >
            {c.ctaSecondary}
          </Link>
        </div>
      </section>

      <CtaBand
        title={c.ctaTitle}
        body={c.ctaBody}
        primaryLabel={c.ctaButton}
        secondaryLabel={c.ctaSecondary}
      />

      <SiteFooter lang={lang} />
    </div>
  );
}
