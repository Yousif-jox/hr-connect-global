import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

import type { Job } from "@/data/jobs";

export type JobCardCopy = {
  typeLabel: string;
  locLabel: string;
  expLabel: string;
  detailsLabel: string;
  requirementsLabel: string;
  responsibilitiesLabel: string;
  apply: string;
};

/** Job card used on the jobs index and in the "related roles" lists. */
export function JobCard({ job, c }: { job: Job; c: JobCardCopy }) {
  return (
    <article className="flex flex-col rounded-2xl border border-ink/5 bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
      <span className="w-fit rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy">{job.dept}</span>

      <h2 className="mt-4 text-xl font-bold text-ink">
        <Link to="/jobs/$jobId" params={{ jobId: job.id }} className="transition-colors hover:text-gold">
          {job.title}
        </Link>
      </h2>

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

      <details className="group mt-5 border-t border-ink/5 pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-navy [&::-webkit-details-marker]:hidden">
          <span>{c.detailsLabel}</span>
          <ChevronDown className="size-4 shrink-0 text-slate-2 transition-transform group-open:rotate-180" />
        </summary>

        <div className="mt-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold">{c.requirementsLabel}</p>
          <ul className="mt-3 space-y-3">
            {job.requirements.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-navy">{c.responsibilitiesLabel}</p>
          <ul className="mt-3 space-y-3">
            {job.responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-navy" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </details>

      <Link
        to="/jobs/$jobId"
        params={{ jobId: job.id }}
        hash="apply"
        className="mt-6 w-fit rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:bg-navy-800"
      >
        {c.apply}
      </Link>
    </article>
  );
}
