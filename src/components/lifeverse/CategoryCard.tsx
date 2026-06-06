import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

type CategoryCardProps = {
  description: string;
  href?: string;
  icon: LucideIcon;
  image: string;
  title: string;
  tone: string;
};

export function CategoryCard({
  description,
  href = "#",
  icon: Icon,
  image,
  title,
  tone
}: CategoryCardProps) {
  return (
    <a
      className={`group overflow-hidden rounded-[2rem] bg-gradient-to-br ${tone} transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(15,23,42,0.1)]`}
      href={href}
    >
      <div className="relative h-40 overflow-hidden bg-white/50">
        <Image
          alt=""
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          src={assetPath(image)}
        />
        <div className="absolute left-5 top-5 grid size-12 place-items-center rounded-2xl bg-white/90 text-slate-950 shadow-sm backdrop-blur">
          <Icon className="size-5" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </a>
  );
}
