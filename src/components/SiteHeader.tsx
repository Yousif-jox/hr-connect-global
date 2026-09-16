import { Link } from "@tanstack/react-router";

import type { Lang } from "@/lib/lang";

const t = {
  en: {
    home: "Home",
    jobs: "Open roles",
    requirements: "Hiring requirements",
    contact: "Contact",
    langButton: "العربية",
    bookCall: "Book a call",
  },
  ar: {
    home: "الرئيسية",
    jobs: "الوظائف المتوفرة",
    requirements: "شروط التوظيف",
    contact: "تواصل معنا",
    langButton: "English",
    bookCall: "احجز مكالمة",
  },
};

export function SiteHeader({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  const c = t[lang];
  const link = "transition-colors hover:text-gold";

  return (
    <header className="bg-navy text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-md bg-gold font-extrabold text-navy">
            M
          </div>
          <div className="leading-tight">
            <p className="font-extrabold tracking-tight text-cream">Meridian HR</p>
            <p className="text-[11px] text-cream/50">مريديان للخدمات البشرية</p>
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
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggle}
            className="rounded-full border border-cream/20 px-4 py-1.5 text-xs font-semibold text-cream/70 transition-colors hover:border-gold hover:text-gold"
          >
            {c.langButton}
          </button>
          <a
            href="mailto:hello@meridianhr.com"
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
  return (
    <footer className="bg-navy text-cream/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm md:flex-row">
        <p className="font-bold text-cream">
          {lang === "en" ? "Meridian HR" : "مريديان للخدمات البشرية"}
        </p>
        <p>
          {lang === "en"
            ? "© 2024 Meridian HR Services · Recruitment · Payroll · Compliance · Training"
            : "© ٢٠٢٤ مريديان للخدمات البشرية · التوظيف · الرواتب · الامتثال · التدريب"}
        </p>
      </div>
    </footer>
  );
}
