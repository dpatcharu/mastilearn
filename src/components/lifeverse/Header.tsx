"use client";

import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/trending" },
  { label: "Categories", href: "/categories" },
  { label: "Create", href: "/create" },
  { label: "Premium", href: "/premium" },
  { label: "About", href: "/about" }
];

export function Header() {
  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl"
      initial={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a className="text-2xl font-black tracking-tight text-slate-950" href="/">
          LifeVerse
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-slate-950" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            aria-label="Search"
            className="grid size-11 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
          >
            <Search className="size-4" />
          </button>
          <a href="/login">
            <Button variant="ghost">Login</Button>
          </a>
          <a href="/account">
            <Button variant="secondary">My Board</Button>
          </a>
          <a href="/premium">
            <Button>Go Premium</Button>
          </a>
        </div>

        <button
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-full bg-slate-100 text-slate-800 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>
    </motion.header>
  );
}
