import type { ReactNode } from "react";

/**
 * The dark page banner used across the site (same markup as the jobs and
 * requirements page heroes — extracted so every page keeps one identical look).
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.15] lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/65">{sub}</p>
        {children ? <div className="mt-7 flex flex-wrap items-center gap-4">{children}</div> : null}
      </div>
    </section>
  );
}

/** Small breadcrumb used on inner pages. */
export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-cream/50">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.to ? (
            <a href={item.to} className="transition-colors hover:text-gold">
              {item.label}
            </a>
          ) : (
            <span className="text-cream/80">{item.label}</span>
          )}
          {i < items.length - 1 ? <span className="text-cream/25">/</span> : null}
        </span>
      ))}
    </nav>
  );
}
