import { FileText, LayoutDashboard, ShieldCheck, Tags } from "lucide-react";
import { AuthStatus } from "@/components/lifeverse/AuthStatus";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { PageHero } from "@/components/lifeverse/PageHero";
import { adminFeatures, articles, categories } from "@/data/lifeverse";

const cards = [
  { label: "Draft articles", value: articles.length, icon: FileText },
  { label: "Categories", value: categories.length, icon: Tags },
  { label: "Featured slots", value: 5, icon: LayoutDashboard }
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="This is the first admin preview: a static dashboard showing what the real content management area should become once backend auth and storage are connected."
        eyebrow="Admin Preview"
        title="Manage LifeVerse content from one calm workspace."
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-8">
          <AuthStatus />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article className="rounded-[2rem] bg-slate-50 p-7 ring-1 ring-slate-200/70" key={card.label}>
              <card.icon className="size-6 text-slate-400" />
              <p className="mt-8 text-4xl font-black tracking-tight text-slate-950">{card.value}</p>
              <p className="mt-1 text-sm font-bold text-slate-500">{card.label}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="size-5 text-emerald-600" />
              <h2 className="text-xl font-black">Next integration steps</h2>
            </div>
            <div className="grid gap-3">
              {adminFeatures.map((feature) => (
                <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600" key={feature}>
                  {feature}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-7 text-white">
            <h2 className="text-xl font-black">Recommended stack</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Use Supabase or Firebase for authentication, database storage,
              article drafts, roles, and newsletter signups. Keep GitHub Pages
              for the static marketing site, or move to Vercel/Netlify when
              server-side dashboards and APIs are needed.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
