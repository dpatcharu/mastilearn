import { AppHeader } from "@/components/lifeverse/AppHeader";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { MasonryFeed } from "@/components/lifeverse/MasonryFeed";
import { MobileBottomNav } from "@/components/lifeverse/MobileBottomNav";
import { SavedBoardsCarousel } from "@/components/lifeverse/SavedBoardsCarousel";
import { SidebarNav } from "@/components/lifeverse/SidebarNav";

export default function SavedPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-950">
      <Header />
      <AppHeader />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <SidebarNav />
        <section className="min-w-0">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <p className="text-xs font-black uppercase text-slate-400">Saved</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Boards worth returning to.</h1>
          </div>
          <div className="mt-6 grid gap-8">
            <SavedBoardsCarousel title="Your boards" />
            <MasonryFeed title="Saved pins" />
          </div>
        </section>
      </div>
      <MobileBottomNav />
      <Footer />
    </main>
  );
}
