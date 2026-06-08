import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProfileHeaderProps = {
  bio?: string;
  displayName: string;
  initials?: string;
  username: string;
};

export function ProfileHeader({ bio, displayName, initials = "LV", username }: ProfileHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2.5rem] bg-slate-950 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
      <div className="h-48 bg-[radial-gradient(circle_at_12%_18%,rgba(251,191,36,0.48),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(56,189,248,0.36),transparent_32%),linear-gradient(135deg,#0f172a,#4c1d95_45%,#831843)]" />
      <div className="px-7 pb-8 sm:px-10">
        <div className="-mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="grid size-32 place-items-center rounded-[2rem] border-4 border-slate-950 bg-white text-4xl font-black text-slate-950 shadow-2xl">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-5xl font-black tracking-tight">{displayName}</h1>
                <BadgeCheck className="size-6 fill-sky-400 text-slate-950" />
              </div>
              <p className="mt-1 text-sm font-bold text-white/45">@{username}</p>
              <p className="mt-3 max-w-2xl leading-7 text-white/65">
                {bio || "Creator profile, boards, saves, posts, and premium collections."}
              </p>
            </div>
          </div>
          <a href="/create/">
            <Button className="bg-white text-slate-950 hover:bg-slate-100">Create content</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
