import { CreatePostPanel } from "@/components/lifeverse/CreatePostPanel";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <CreatePostPanel />
      <Footer />
    </main>
  );
}
