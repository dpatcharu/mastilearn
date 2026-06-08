import { CustomerAccountView } from "@/components/lifeverse/CustomerAccountView";
import { Header } from "@/components/lifeverse/Header";

export default function HomeFeedPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <CustomerAccountView />
    </main>
  );
}
