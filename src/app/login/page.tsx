import { ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import { AuthCard } from "@/components/lifeverse/AuthCard";
import { AuthForm } from "@/components/lifeverse/AuthForm";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { PageHero } from "@/components/lifeverse/PageHero";
import { customerFeatures } from "@/data/lifeverse";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="Save favorite reads, manage premium access, or enter the workspace for publishing and content management."
        eyebrow="Login"
        title="Welcome back to LifeVerse."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <AuthCard
          description="Save reads, manage premium access, and build a personal library of useful ideas."
          eyebrow="Customer"
          title="Reader login"
        >
          <AuthForm role="customer" />
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
          description="Access the publishing workspace for articles, categories, and featured content."
          eyebrow="Admin"
          title="Admin login"
        >
          <AuthForm role="admin" />
          <div className="mt-7 rounded-[1.25rem] bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <div className="mb-2 flex items-center gap-2 font-black">
              <ShieldCheck className="size-4" />
              Restricted access
            </div>
            Admin access is reserved for approved LifeVerse team members.
          </div>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950" href="/admin">
            Open admin workspace
            <ArrowRight className="size-4" />
          </a>
        </AuthCard>
      </section>
      <Footer />
    </main>
  );
}
