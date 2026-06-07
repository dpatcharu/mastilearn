import { businessModel } from "@/data/lifeverse";

export function BusinessModel() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-normal text-slate-400">
          Membership
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Free to explore, premium to collect deeper.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-500">
          Public visitors get a taste. Members and subscribers get more reads,
          more saves, creator tools, and deeper collections worth paying for.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {businessModel.map((item) => (
          <article
            className="rounded-[2rem] bg-slate-50 p-7 ring-1 ring-slate-200/70"
            key={item.title}
          >
            <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
            <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
