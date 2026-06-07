import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { CustomerAccountView } from "@/components/lifeverse/CustomerAccountView";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <CustomerAccountView />
      <Footer />
    </main>
  );
}
