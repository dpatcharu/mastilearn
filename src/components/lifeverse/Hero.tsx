"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const collageImages = [
  { src: "/images/students-learning.png", alt: "Learning desk", className: "col-span-7 h-48 sm:h-64" },
  { src: "/images/home-interior.png", alt: "Home interior", className: "col-span-5 h-48 sm:h-64" },
  { src: "/images/healthy-food.png", alt: "Healthy food", className: "col-span-5 h-40 sm:h-52" },
  { src: "/images/events-celebration.png", alt: "Events celebration", className: "col-span-7 h-40 sm:h-52" }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[740px] bg-[radial-gradient(circle_at_top_left,rgba(251,207,232,0.55),transparent_34%),radial-gradient(circle_at_top_right,rgba(191,219,254,0.48),transparent_35%),linear-gradient(180deg,#ffffff_0%,#fffaf7_100%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-28">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/80">
            <Sparkles className="size-4 text-amber-500" />
            Daily ideas for a better life
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Learn. Grow. Inspire Every Day.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Discover simple ideas, practical skills, and inspiring content to
            improve your everyday life.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button className="gap-2 px-7">
              Explore Now
              <ArrowRight className="size-4" />
            </Button>
            <Button className="px-7" variant="secondary">
              Join Free
            </Button>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative"
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          transition={{ delay: 0.12, duration: 0.65, ease: "easeOut" }}
        >
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-pink-100 via-yellow-50 to-sky-100 blur-2xl" />
          <div className="grid grid-cols-12 gap-4 rounded-[2.5rem] bg-white/70 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] ring-1 ring-white">
            {collageImages.map((image) => (
              <div
                className={`${image.className} relative overflow-hidden rounded-[1.75rem] bg-slate-100`}
                key={image.src}
              >
                <Image
                  alt={image.alt}
                  className="object-cover transition duration-500 hover:scale-105"
                  fill
                  priority={image.src.includes("students")}
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  src={image.src}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
