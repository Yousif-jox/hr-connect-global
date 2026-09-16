import { Link } from "@tanstack/react-router";

/**
 * The gold band + navy card call-to-action used at the foot of every page.
 * Same markup and classes as the closing section of the home page.
 */
export function CtaBand({
  title,
  body,
  primaryLabel,
  secondaryLabel,
  secondaryTo = "/jobs",
}: {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryTo?: string;
}) {
  return (
    <section className="bg-gold">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-8 rounded-3xl bg-navy px-8 py-12 md:grid-cols-2 md:px-14">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-cream lg:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-cream/70">{body}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@acwadhr.com"
              className="rounded-full bg-gold px-6 py-3.5 text-center font-bold text-navy transition-colors hover:bg-gold-soft"
            >
              {primaryLabel}
            </a>
            <Link
              to={secondaryTo}
              className="rounded-full border border-cream/30 px-6 py-3.5 text-center text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
