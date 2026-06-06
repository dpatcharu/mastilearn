import { ExternalLink } from "lucide-react";
import { freeContentSources } from "@/data/lifeverse";

export function SourcePanel() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="rounded-[2rem] bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            Free Content Plan
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Built around reusable sources, not copied blogs.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            LifeVerse can use open APIs for facts, recipes, book metadata, and
            Creative Commons images while keeping summaries original and attribution-ready.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {freeContentSources.map((source) => (
            <a
              className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
              href={source.href}
              key={source.name}
              rel="noreferrer"
              target="_blank"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-slate-950">{source.name}</h3>
                <ExternalLink className="size-4 shrink-0 text-slate-400" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {source.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
