import type { ReactNode } from "react";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function AuthCard({ children, description, eyebrow, title }: AuthCardProps) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 sm:p-8">
      <p className="text-sm font-black uppercase tracking-normal text-slate-400">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      {children}
    </div>
  );
}
