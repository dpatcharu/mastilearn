export type ReadSource = "book" | "game" | "meal";

export type ReadItemDetail = {
  attribution: string;
  category: string;
  description: string;
  facts: string[];
  image: string;
  originalHref: string;
  sourceName: string;
  title: string;
};

type MealDetail = {
  idMeal: string;
  strArea?: string;
  strCategory?: string;
  strInstructions?: string;
  strMeal: string;
  strMealThumb: string;
  strSource?: string;
  strTags?: string;
  strYoutube?: string;
};

type BookDetail = {
  covers?: number[];
  description?: string | { value?: string };
  first_publish_date?: string;
  subjects?: string[];
  title: string;
};

type GameDetail = {
  description?: string;
  developer?: string;
  freetogame_profile_url: string;
  genre?: string;
  id: number;
  minimum_system_requirements?: Record<string, string>;
  platform?: string;
  publisher?: string;
  release_date?: string;
  short_description?: string;
  thumbnail: string;
  title: string;
};

function cleanText(value?: string) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeDescription(description?: string | { value?: string }) {
  if (!description) {
    return "";
  }

  return typeof description === "string" ? cleanText(description) : cleanText(description.value);
}

export async function fetchReadItem(
  source: ReadSource,
  id: string
): Promise<ReadItemDetail> {
  if (source === "meal") {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error("Meal source unavailable");
    }

    const data = (await response.json()) as { meals?: MealDetail[] };
    const meal = data.meals?.[0];

    if (!meal) {
      throw new Error("Meal not found");
    }

    const tags = meal.strTags?.split(",").filter(Boolean) ?? [];

    return {
      attribution: "Recipe details provided by TheMealDB.",
      category: meal.strCategory ?? "Food",
      description: cleanText(meal.strInstructions) || "Recipe instructions are loading from the source.",
      facts: [meal.strArea, meal.strCategory, ...tags].filter(Boolean) as string[],
      image: meal.strMealThumb,
      originalHref: meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`,
      sourceName: "TheMealDB",
      title: meal.strMeal
    };
  }

  if (source === "book") {
    const response = await fetch(`https://openlibrary.org${id}.json`);
    if (!response.ok) {
      throw new Error("Book source unavailable");
    }

    const book = (await response.json()) as BookDetail;
    const cover = book.covers?.[0];

    return {
      attribution: "Book metadata and cover provided by Open Library.",
      category: "Reading",
      description:
        normalizeDescription(book.description) ||
        "This source item is available as a reading pick. Use the original source link for full library details.",
      facts: [book.first_publish_date, ...(book.subjects?.slice(0, 5) ?? [])].filter(Boolean) as string[],
      image: cover
        ? `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
        : "/images/students-learning.png",
      originalHref: `https://openlibrary.org${id}`,
      sourceName: "Open Library",
      title: book.title
    };
  }

  const response = await fetch(`https://www.freetogame.com/api/game?id=${encodeURIComponent(id)}`);
  if (!response.ok) {
    throw new Error("Game source unavailable");
  }

  const game = (await response.json()) as GameDetail;
  const requirements = game.minimum_system_requirements
    ? Object.values(game.minimum_system_requirements).filter(Boolean).slice(0, 3)
    : [];

  return {
    attribution: "Game details provided by FreeToGame.",
    category: game.genre ?? "Games",
    description: cleanText(game.description || game.short_description),
    facts: [
      game.platform,
      game.publisher,
      game.developer,
      game.release_date,
      ...requirements
    ].filter(Boolean) as string[],
    image: game.thumbnail,
    originalHref: game.freetogame_profile_url,
    sourceName: "FreeToGame",
    title: game.title
  };
}
