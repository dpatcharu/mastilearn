import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-slate-950 text-white shadow-[0_18px_35px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800",
        variant === "secondary" &&
          "bg-white text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80 hover:-translate-y-0.5 hover:ring-slate-300",
        variant === "ghost" && "bg-transparent text-slate-700 hover:bg-slate-100",
        className
      )}
      {...props}
    />
  );
}
