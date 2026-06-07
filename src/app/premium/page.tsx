import { Check } from "lucide-react";
import { BusinessModel } from "@/components/lifeverse/BusinessModel";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { PageHero } from "@/components/lifeverse/PageHero";
import { PremiumCTA } from "@/components/lifeverse/PremiumCTA";
import { premiumBenefits } from "@/data/lifeverse";

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="Go beyond quick inspiration with deeper guides, printable resources, templates, and focused plans."
        eyebrow="Premium"
        title="A richer way to learn and plan."
      />
      <BusinessModel />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {premiumBenefits.map((benefit) => (
            <div
              className="flex items-start gap-4 rounded-[1.75rem] bg-slate-50 p-6 ring-1 ring-slate-200/70"
              key={benefit}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-emerald-600 shadow-sm">
                <Check className="size-5" />
              </span>
              <p className="font-semibold leading-7 text-slate-700">{benefit}</p>
            </div>
          ))}
        </div>
      </section>
      <PremiumCTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
