import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { PageHero } from "@/components/lifeverse/PageHero";
import { SourcePanel } from "@/components/lifeverse/SourcePanel";
import { editorialPrinciples } from "@/data/lifeverse";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="LifeVerse is a simple discovery site for practical everyday ideas across learning, money, home, food, events, projects, lifestyle, and games."
        eyebrow="About"
        title="A useful, calm content home for everyday life."
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {editorialPrinciples.map((principle) => (
            <article
              className="rounded-[2rem] bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70"
              key={principle.title}
            >
              <h2 className="text-xl font-black text-slate-950">{principle.title}</h2>
              <p className="mt-4 leading-7 text-slate-600">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>
      <SourcePanel />
      <Newsletter />
      <Footer />
    </main>
  );
}
