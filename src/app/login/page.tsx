import { ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import { AuthCard } from "@/components/lifeverse/AuthCard";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { PageHero } from "@/components/lifeverse/PageHero";
import { customerFeatures } from "@/data/lifeverse";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="Choose the right entrance. Reader accounts are for customers, while admin access is only for the LifeVerse team."
        eyebrow="Login"
        title="One brand, two account paths."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <AuthCard
          description="For readers who want saved content, premium resources, and a calmer personal content hub."
          eyebrow="Customer"
          title="Reader login"
        >
          <div className="mt-7 grid gap-3">
            {customerFeatures.map((feature) => (
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-600" key={feature}>
                <UserRound className="size-4 text-slate-400" />
                {feature}
              </div>
            ))}
          </div>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950" href="/premium">
            View premium plan
            <ArrowRight className="size-4" />
          </a>
        </AuthCard>

        <AuthCard
          description="For content managers and owners. This page is UI-only for now; real admin auth needs a backend provider."
          eyebrow="Admin"
          title="Admin login"
        >
          <div className="mt-7 rounded-[1.25rem] bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <div className="mb-2 flex items-center gap-2 font-black">
              <ShieldCheck className="size-4" />
              Restricted access
            </div>
            Admin login should connect to a secure provider such as Supabase,
            Clerk, Auth.js, or Firebase before content editing is enabled.
          </div>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950" href="/admin">
            Open admin preview
            <ArrowRight className="size-4" />
          </a>
        </AuthCard>
      </section>
      <Footer />
    </main>
  );
}
