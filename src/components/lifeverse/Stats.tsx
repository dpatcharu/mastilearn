"use client";

import { motion } from "framer-motion";

const stats = [
  ["10k+", "Articles"],
  ["50+", "Categories"],
  ["100k+", "Readers"]
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 rounded-[2rem] bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70 sm:grid-cols-3"
        initial={{ opacity: 0, y: 18 }}
        transition={{ delay: 0.15, duration: 0.55 }}
      >
        {stats.map(([value, label]) => (
          <div className="rounded-[1.5rem] bg-slate-50 px-6 py-7 text-center" key={label}>
            <p className="text-4xl font-black tracking-tight text-slate-950">{value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
