import { Bookmark, Compass, Crown, Grid3X3, Home, PlaySquare } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/home/" },
  { icon: Compass, label: "Explore", href: "/explore/" },
  { icon: Grid3X3, label: "Boards", href: "/saved/" },
  { icon: PlaySquare, label: "Create", href: "/create/" },
  { icon: Bookmark, label: "Saved", href: "/saved/" },
  { icon: Crown, label: "Premium", href: "/premium/" }
];

export function SidebarNav() {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-44 rounded-[2rem] bg-white p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
        {navItems.map((item, index) => (
          <a
            className={`flex items-center gap-3 rounded-[1.15rem] px-4 py-3 text-sm font-black transition ${
              index === 0 ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
            href={item.href}
            key={item.label}
          >
            <item.icon className="size-4" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
