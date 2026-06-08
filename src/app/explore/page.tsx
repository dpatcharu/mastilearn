import { Search } from "lucide-react";
import { AppHeader } from "@/components/lifeverse/AppHeader";
import { CategoryCarousel } from "@/components/lifeverse/CategoryCarousel";
import { CreatorCarousel } from "@/components/lifeverse/CreatorCarousel";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { MasonryFeed } from "@/components/lifeverse/MasonryFeed";
import { MobileBottomNav } from "@/components/lifeverse/MobileBottomNav";
import { SidebarNav } from "@/components/lifeverse/SidebarNav";

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <Header />
      <AppHeader />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <SidebarNav />
        <section className="min-w-0">
          <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="flex min-h-14 items-center gap-3 rounded-full bg-slate-100 px-5 text-sm font-bold text-slate-400">
              <Search className="size-5" />
              Search categories, creators, boards, ideas
            </div>
          </div>
          <div className="mt-6 grid gap-8">
            <CategoryCarousel />
            <CreatorCarousel title="Trending creators" />
            <MasonryFeed title="Explore ideas" />
          </div>
        </section>
      </div>
      <MobileBottomNav />
      <Footer />
    </main>
  );
}
