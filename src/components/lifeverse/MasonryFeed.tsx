import { discoveryPosts } from "@/data/lifeverse";
import { DiscoveryCard } from "./DiscoveryCard";

type MasonryFeedProps = {
  items?: typeof discoveryPosts;
  title?: string;
};

export function MasonryFeed({ items = discoveryPosts, title }: MasonryFeedProps) {
  return (
    <section>
      {title ? <h2 className="mb-5 text-2xl font-black tracking-tight text-slate-950">{title}</h2> : null}
      <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
        {items.map((item) => (
          <DiscoveryCard key={`${item.title}-${item.href}`} {...item} />
        ))}
      </div>
    </section>
  );
}
