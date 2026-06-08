import { Bookmark, Home, Plus, Search, Users } from "lucide-react";

const mobileItems = [
  { icon: Home, label: "Home", href: "/home/" },
  { icon: Search, label: "Explore", href: "/explore/" },
  { icon: Plus, label: "Create", href: "/create/" },
  { icon: Bookmark, label: "Saved", href: "/saved/" },
  { icon: Users, label: "Me", href: "/creator/" }
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-[1.5rem] bg-slate-950/95 p-2 text-white shadow-[0_20px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl lg:!hidden">
      {mobileItems.map((item, index) => (
        <a
          className={`grid place-items-center gap-1 rounded-[1rem] py-2 text-[0.68rem] font-black ${
            index === 2 ? "bg-white text-slate-950" : "text-white/70"
          }`}
          href={item.href}
          key={item.label}
        >
          <item.icon className="size-5" />
          {item.label}
        </a>
      ))}
    </nav>
  );
}
