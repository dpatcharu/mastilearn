type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ description, eyebrow, title }: PageHeroProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#fff_0%,#fff7f3_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-sm font-black uppercase tracking-normal text-slate-400">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}
