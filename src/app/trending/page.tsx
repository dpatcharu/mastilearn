import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { LiveDrops } from "@/components/lifeverse/LiveDrops";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { PageHero } from "@/components/lifeverse/PageHero";

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="Browse what readers are collecting across learning, home, food, money, events, projects, lifestyle, and play."
        eyebrow="Trending Saves"
        title="What people are saving now."
      />
      <LiveDrops />
      <Newsletter />
      <Footer />
    </main>
  );
}
