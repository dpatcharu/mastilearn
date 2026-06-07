import { CategoryCard } from "@/components/lifeverse/CategoryCard";
import { Footer } from "@/components/lifeverse/Footer";
import { Header } from "@/components/lifeverse/Header";
import { Newsletter } from "@/components/lifeverse/Newsletter";
import { PageHero } from "@/components/lifeverse/PageHero";
import { categories } from "@/data/lifeverse";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header />
      <PageHero
        description="Follow the channels you care about and turn LifeVerse into a more personal feed."
        eyebrow="Categories"
        title="Choose your interests."
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              href={`/categories/${category.slug}`}
              key={category.slug}
              {...category}
            />
          ))}
        </div>
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
