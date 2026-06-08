import { CategoryCarousel } from "@/components/lifeverse/CategoryCarousel";
import { CreatorCarousel } from "@/components/lifeverse/CreatorCarousel";
import { DiscoveryFeed } from "@/components/lifeverse/DiscoveryFeed";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { Hero } from "@/components/lifeverse/Hero";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { PremiumCTA } from "@/components/lifeverse/PremiumCTA";
import { PremiumCollectionCarousel } from "@/components/lifeverse/PremiumCollectionCarousel";
import { Stats } from "@/components/lifeverse/Stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <Hero />
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <CategoryCarousel />
      </section>
      <Stats />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8">
        <CreatorCarousel title="Trending creators" />
        <PremiumCollectionCarousel title="Premium collections" />
        <div id="discover">
          <DiscoveryFeed />
        </div>
      </section>
      <PremiumCTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
