import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="flex flex-col gap-6 rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Get the best drops weekly.</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            A short email with visual ideas, trending saves, and new premium boards.
          </p>
        </div>
        <form className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-md">
          <input
            aria-label="Email address"
            className="min-h-12 flex-1 rounded-full border-0 bg-white px-5 text-sm text-slate-950 outline-none ring-1 ring-white/10 placeholder:text-slate-400"
            placeholder="Email address"
            type="email"
          />
          <Button className="bg-white text-slate-950 hover:bg-slate-100">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
