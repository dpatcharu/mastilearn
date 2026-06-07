import { ArticleCard } from "@/components/lifeverse/ArticleCard";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { PageHero } from "@/components/lifeverse/PageHero";
import { articles, categoryGuides } from "@/data/lifeverse";

export default function TrendingPage() {
  const reads = [...articles, ...categoryGuides.slice(0, 7)];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="Browse what readers are collecting across learning, home, food, money, events, projects, lifestyle, and play."
        eyebrow="Trending Saves"
        title="What people are saving now."
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reads.map((article) => (
            <ArticleCard
              href={`/categories/${article.slug}`}
              key={`${article.title}-${article.category}`}
              {...article}
            />
          ))}
        </div>
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
