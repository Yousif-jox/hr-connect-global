export type LegalSection = { heading: string; body: string[]; list?: string[] };

/** Long-form reading layout for the policy pages — same tokens, prose-friendly width. */
export function LegalBody({ sections }: { sections: LegalSection[] }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-6 py-14">
        {sections.map((section, index) => (
          <div key={section.heading} className={index === 0 ? "" : "mt-10"}>
            <h2 className="text-lg font-bold text-navy">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-ink/80">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.list ? (
              <ul className="mt-4 space-y-3">
                {section.list.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
