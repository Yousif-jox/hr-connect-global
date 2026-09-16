import { Link } from "@tanstack/react-router";

import type { Lang } from "@/lib/lang";

const t = {
  en: {
    home: "Home",
    jobs: "Open roles",
    requirements: "Hiring requirements",
    about: "About us",
    faq: "FAQ",
    privacy: "Privacy",
    terms: "Terms",
    langButton: "العربية",
    bookCall: "Book a call",
  },
  ar: {
    home: "الرئيسية",
    jobs: "الوظائف المتوفرة",
    requirements: "شروط التوظيف",
    about: "عن الشركة",
    faq: "الأسئلة الشائعة",
    privacy: "الخصوصية",
    terms: "الشروط",
    langButton: "English",
    bookCall: "احجز مكالمة",
  },
};

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const localYear = (lang: Lang) => {
  const year = String(new Date().getFullYear());
  return lang === "ar" ? year.replace(/\d/g, (d) => AR_DIGITS[Number(d)]!) : year;
};

export function SiteHeader({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  const c = t[lang];
  const link = "transition-colors hover:text-gold";
  /* the two secondary links only join the nav on wide screens so the bar
     keeps its original spacing on tablets */
  const wideLink = `${link} hidden lg:block`;
  const wideActive = "text-gold hidden lg:block";

  return (
    <header className="bg-navy text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-md bg-gold font-extrabold text-navy">
            M
          </div>
          <div className="leading-tight">
            <p className="font-extrabold tracking-tight text-cream">Acwad HR</p>
            <p className="text-[11px] text-cream/50">اكواد للخدمات البشرية</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-cream/70 md:flex">
          <Link to="/" className={link} activeProps={{ className: "text-gold" }}>
            {c.home}
          </Link>
          <Link to="/jobs" className={link} activeProps={{ className: "text-gold" }}>
            {c.jobs}
          </Link>
          <Link to="/requirements" className={link} activeProps={{ className: "text-gold" }}>
            {c.requirements}
          </Link>
          <Link to="/about" className={wideLink} activeProps={{ className: wideActive }}>
            {c.about}
          </Link>
          <Link to="/faq" className={wideLink} activeProps={{ className: wideActive }}>
            {c.faq}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="rounded-full border border-cream/20 px-4 py-1.5 text-xs font-semibold text-cream/70 transition-colors hover:border-gold hover:text-gold"
          >
            {c.langButton}
          </button>
          <a
            href="mailto:hello@acwadhr.com"
            className="hidden rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-gold-soft sm:block"
          >
            {c.bookCall}
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const c = t[lang];
  const link = "transition-colors hover:text-gold";

  return (
    <footer className="bg-navy text-cream/60">
      <div className="mx-auto max-w-7xl px-6 py-8 text-sm">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
          <Link to="/" className={link}>
            {c.home}
          </Link>
          <Link to="/jobs" className={link}>
            {c.jobs}
          </Link>
          <Link to="/requirements" className={link}>
            {c.requirements}
          </Link>
          <Link to="/about" className={link}>
            {c.about}
          </Link>
          <Link to="/faq" className={link}>
            {c.faq}
          </Link>
          <Link to="/privacy" className={link}>
            {c.privacy}
          </Link>
          <Link to="/terms" className={link}>
            {c.terms}
          </Link>
        </nav>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 md:flex-row">
          <p className="font-bold text-cream">
            {lang === "en" ? "Acwad HR" : "اكواد للخدمات البشرية"}
          </p>
          <p>
            {lang === "en"
              ? `© ${localYear(lang)} Acwad HR Services · Recruitment · Payroll · Compliance · Training`
              : `© ${localYear(lang)} اكواد للخدمات البشرية · التوظيف · الرواتب · الامتثال · التدريب`}
          </p>
        </div>
      </div>
    </footer>
  );
}
