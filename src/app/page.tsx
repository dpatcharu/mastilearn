import { ArticleCard } from "@/components/lifeverse/ArticleCard";
import { CategoryCard } from "@/components/lifeverse/CategoryCard";
import { DiscoveryFeed } from "@/components/lifeverse/DiscoveryFeed";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { Hero } from "@/components/lifeverse/Hero";
import { LiveDrops } from "@/components/lifeverse/LiveDrops";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { PremiumCTA } from "@/components/lifeverse/PremiumCTA";
import { SocialFeatures } from "@/components/lifeverse/SocialFeatures";
import { Stats } from "@/components/lifeverse/Stats";
import { articles, categories } from "@/data/lifeverse";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <Hero />
      <Stats />
      <DiscoveryFeed />
      <LiveDrops />
      <SocialFeatures />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20" id="categories">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-normal text-slate-400">
            Follow Interests
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Pick the channels that shape your feed.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-500">
            Readers can follow learning, home, money, food, events, DIY,
            lifestyle, and games to build a more personal discovery experience.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              href={`/categories/${category.slug}`}
              key={category.title}
              {...category}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20" id="trending">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-slate-400">
              Trending Saves
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Fresh ideas people are collecting now.
            </h2>
          </div>
          <a className="text-sm font-bold text-slate-500 transition hover:text-slate-950" href="/trending">
            View all trends
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              href={`/categories/${article.slug}`}
              key={article.title}
              {...article}
            />
          ))}
        </div>
      </section>

      <PremiumCTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
