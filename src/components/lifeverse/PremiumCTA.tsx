import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = ["Exclusive guides", "Ad-free reading", "Premium templates"];

export function PremiumCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-100 via-amber-50 to-yellow-100 p-8 shadow-[0_30px_90px_rgba(190,80,120,0.14)] sm:p-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-rose-600">
            LifeVerse Premium
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Unlock Premium Content
          </h2>
          <ul className="mt-7 grid gap-3 text-slate-700 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <li className="flex items-center gap-2 font-semibold" key={benefit}>
                <span className="grid size-6 place-items-center rounded-full bg-white text-emerald-600">
                  <Check className="size-4" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <Button className="mt-8 px-7">Start 7-Day Free Trial</Button>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[300px]">
          <Image
            alt="Premium gift box"
            className="object-contain drop-shadow-2xl"
            fill
            sizes="300px"
            src="/images/premium-gift.png"
          />
        </div>
      </div>
    </section>
  );
}
