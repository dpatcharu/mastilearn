import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/lifeverse/ArticleCard";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { categories, categoryGuides } from "@/data/lifeverse";
import { assetPath } from "@/lib/assetPath";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  return {
    title: category ? `${category.title} | LifeVerse` : "Category | LifeVerse",
    description: category?.description
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const guides = categoryGuides.filter((guide) => guide.slug === category.slug);
  const Icon = category.icon;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <section className={`bg-gradient-to-br ${category.tone}`}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-white/80 text-slate-950 shadow-sm">
              <Icon className="size-6" />
            </div>
            <p className="text-sm font-black uppercase tracking-normal text-slate-500">
              LifeVerse Category
            </p>
            <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              {category.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {category.description} Explore focused guides and ideas designed
              for quick, practical inspiration.
            </p>
          </div>
          <div className="relative h-[340px] overflow-hidden rounded-[2.5rem] bg-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <Image
              alt=""
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              src={assetPath(category.image)}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-slate-400">
              Starter Guides
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Start with these reads.
            </h2>
          </div>
          <a className="text-sm font-bold text-slate-500 hover:text-slate-950" href="/categories">
            All categories
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {guides.map((guide) => (
            <ArticleCard href={`/categories/${category.slug}`} key={guide.title} {...guide} />
          ))}
        </div>
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
