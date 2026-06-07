import { Mail, MessageCircle, Rss, Send } from "lucide-react";
import { categories } from "@/data/lifeverse";

const links = [
  { label: "Home", href: "/" },
  { label: "Discover", href: "/trending" },
  { label: "Categories", href: "/categories" },
  { label: "Create", href: "/create" },
  { label: "Creator", href: "/creator" },
  { label: "Premium", href: "/premium" },
  { label: "About", href: "/about" },
  { label: "Account", href: "/account" }
];
const socials = [MessageCircle, Send, Mail, Rss];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a className="text-2xl font-black tracking-tight text-slate-950" href="/">
            LifeVerse
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
            A visual discovery home for saving useful ideas, following interests,
            and building personal boards for everyday life.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-slate-950">Quick links</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-500">
            {links.map((link) => (
              <a className="hover:text-slate-950" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-950">Categories</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-500">
            {categories.slice(0, 5).map((item) => (
              <a className="hover:text-slate-950" href={`/categories/${item.slug}`} key={item.slug}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-950">Social</h3>
          <div className="mt-4 flex gap-3">
            {socials.map((Icon, index) => (
              <a
                aria-label={`Social link ${index + 1}`}
                className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-950 hover:text-white"
                href="#"
                key={Icon.displayName ?? index}
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
