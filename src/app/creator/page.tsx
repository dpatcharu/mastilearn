import { CreatorProfileView } from "@/components/lifeverse/CreatorProfileView";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";

export default function CreatorPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <CreatorProfileView />
      <Footer />
    </main>
  );
}
