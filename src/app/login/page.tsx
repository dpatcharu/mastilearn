import Image from "next/image";
import { ArrowRight, BookmarkCheck, Flame, Layers3, Sparkles } from "lucide-react";
import { AuthCard } from "@/components/lifeverse/AuthCard";
import { AuthForm } from "@/components/lifeverse/AuthForm";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { PageHero } from "@/components/lifeverse/PageHero";
import { customerFeatures } from "@/data/lifeverse";
import { assetPath } from "@/lib/assetPath";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="Create a reader account to save ideas, follow interests, and build personal boards across LifeVerse."
        eyebrow="Account"
        title="Your saved world starts here."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <AuthCard
          description="Sign in or create a free account to collect the content you want to revisit."
          eyebrow="Reader"
          title="Login to LifeVerse"
        >
          <AuthForm role="customer" />
          <div className="mt-7 grid gap-3">
            {customerFeatures.map((feature) => (
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-600" key={feature}>
                <BookmarkCheck className="size-4 text-slate-400" />
                {feature}
              </div>
            ))}
          </div>
          <a className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950" href="/premium">
            Compare premium
            <ArrowRight className="size-4" />
          </a>
        </AuthCard>

        <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="relative h-72 bg-slate-900 sm:h-80">
            <Image
              alt=""
              className="object-cover opacity-80"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={assetPath("/images/hero-collage.png")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950">
                <Sparkles className="size-3.5 text-amber-500" />
                Personal feed preview
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight">
                Save it once. Find it anytime.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 p-6 sm:p-8">
            {[
              {
                icon: Layers3,
                title: "Boards",
                text: "Organize saves by mood, category, project, or goal."
              },
              {
                icon: Flame,
                title: "Daily streaks",
                text: "Return for small drops of ideas that keep the feed fresh."
              },
              {
                icon: BookmarkCheck,
                title: "Smart saves",
                text: "Keep your best finds ready for later instead of losing them in tabs."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="flex gap-4 rounded-[1.5rem] bg-white/[0.06] p-4 ring-1 ring-white/10" key={item.title}>
                  <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-slate-950">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
