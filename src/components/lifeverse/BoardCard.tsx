type BoardCardProps = {
  count: number;
  images: string[];
  title: string;
};

export function BoardCard({ count, images, title }: BoardCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="grid h-40 grid-cols-2 gap-1 bg-slate-100 p-1">
        <div className="overflow-hidden rounded-l-[1.35rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="size-full object-cover" src={images[0]} />
        </div>
        <div className="grid gap-1">
          {images.slice(1, 3).map((image) => (
            <div className="overflow-hidden first:rounded-tr-[1.35rem] last:rounded-br-[1.35rem]" key={image}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="size-full object-cover" src={image} />
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-xs font-bold uppercase text-slate-400">{count} pins</p>
      </div>
    </article>
  );
}
