import { Suspense } from "react";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { ReadItemView } from "@/components/lifeverse/ReadItemView";

export default function ReadPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <Suspense
        fallback={
          <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="rounded-[2rem] bg-slate-50 p-8 text-sm font-bold text-slate-500 ring-1 ring-slate-200/70">
              Loading this LifeVerse item.
            </div>
          </section>
        }
      >
        <ReadItemView />
      </Suspense>
      <Footer />
    </main>
  );
}
