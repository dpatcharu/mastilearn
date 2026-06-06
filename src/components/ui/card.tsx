import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-white/82 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/65 backdrop-blur",
        className
      )}
      {...props}
    />
  );
}
