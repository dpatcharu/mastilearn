import { BookmarkCheck, Compass, Crown, Flame } from "lucide-react";
import { socialFeatures } from "@/data/lifeverse";

const icons = [Compass, BookmarkCheck, Flame, Crown];

export function SocialFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="rounded-[2.5rem] bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-white/45">
              Why people return
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              More than articles. A personal idea network.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/65">
            LifeVerse is designed around quick discovery, visual saves, followed interests,
            and premium collections readers can actually use.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {socialFeatures.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                className="rounded-[1.5rem] bg-white/[0.06] p-5 ring-1 ring-white/10"
                key={feature.title}
              >
                <div className="grid size-11 place-items-center rounded-2xl bg-white text-slate-950">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-black">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
