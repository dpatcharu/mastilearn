import {
  BriefcaseBusiness,
  CalendarHeart,
  Gamepad2,
  GraduationCap,
  Hammer,
  HeartPulse,
  Home,
  Salad
} from "lucide-react";

export const categories = [
  {
    title: "Students Corner",
    slug: "students-corner",
    description: "Study habits, career clarity, and useful learning guides.",
    icon: GraduationCap,
    image: "/images/students-learning.png",
    tone: "from-sky-50 to-indigo-50",
    focus: ["Study routines", "Career basics", "Reading lists"]
  },
  {
    title: "Business & Money",
    slug: "business-money",
    description: "Simple ideas for earning, saving, and building smarter.",
    icon: BriefcaseBusiness,
    image: "/images/business-ideas.png",
    tone: "from-emerald-50 to-lime-50",
    focus: ["Small ideas", "Money habits", "Validation steps"]
  },
  {
    title: "Home & Interior",
    slug: "home-interior",
    description: "Beautiful spaces, better routines, and practical decor.",
    icon: Home,
    image: "/images/home-interior.png",
    tone: "from-rose-50 to-orange-50",
    focus: ["Room refreshes", "Storage", "Calm corners"]
  },
  {
    title: "Events",
    slug: "events",
    description: "Thoughtful planning tips for memorable celebrations.",
    icon: CalendarHeart,
    image: "/images/events-celebration.png",
    tone: "from-fuchsia-50 to-pink-50",
    focus: ["Planning", "Decor", "Guest experience"]
  },
  {
    title: "Food",
    slug: "food",
    description: "Healthy meals, quick recipes, and everyday kitchen joy.",
    icon: Salad,
    image: "/images/healthy-food.png",
    tone: "from-amber-50 to-yellow-50",
    focus: ["Simple meals", "Healthy swaps", "Meal ideas"]
  },
  {
    title: "DIY",
    slug: "diy",
    description: "Hands-on projects that make daily life feel more creative.",
    icon: Hammer,
    image: "/images/diy.png",
    tone: "from-cyan-50 to-teal-50",
    focus: ["Weekend builds", "Repairs", "Creative reuse"]
  },
  {
    title: "Lifestyle",
    slug: "lifestyle",
    description: "Gentle upgrades for wellness, habits, and personal style.",
    icon: HeartPulse,
    image: "/images/lifestyle.png",
    tone: "from-violet-50 to-purple-50",
    focus: ["Wellness", "Routines", "Personal style"]
  },
  {
    title: "Games",
    slug: "games",
    description: "Playful ideas, puzzles, and digital fun for quick breaks.",
    icon: Gamepad2,
    image: "/images/games.png",
    tone: "from-slate-50 to-blue-50",
    focus: ["Puzzles", "Family games", "Brain breaks"]
  }
];

export const articles = [
  {
    title: "7 tiny study rituals that make focus feel easier",
    category: "Students",
    slug: "students-corner",
    image: "/images/students-learning.png",
    time: "5 min read",
    source: "Inspired by Wikimedia learning topics"
  },
  {
    title: "A calm home corner you can create this weekend",
    category: "Interior",
    slug: "home-interior",
    image: "/images/home-interior.png",
    time: "4 min read",
    source: "Original LifeVerse summary"
  },
  {
    title: "Fresh bowls for busy days without the fuss",
    category: "Food",
    slug: "food",
    image: "/images/healthy-food.png",
    time: "6 min read",
    source: "Recipe data can use TheMealDB"
  },
  {
    title: "Small celebration details that feel premium",
    category: "Events",
    slug: "events",
    image: "/images/events-celebration.png",
    time: "3 min read",
    source: "Original LifeVerse summary"
  },
  {
    title: "Business ideas you can validate before spending big",
    category: "Money",
    slug: "business-money",
    image: "/images/business-ideas.png",
    time: "7 min read",
    source: "Public-domain/open data friendly"
  }
];

export const categoryGuides = categories.flatMap((category) =>
  category.focus.map((topic, index) => ({
    title: `${topic} for ${category.title}`,
    category: category.title,
    slug: category.slug,
    image: category.image,
    time: `${index + 3} min read`,
    source:
      category.slug === "food"
        ? "Original summary, recipe-ready via TheMealDB"
        : category.slug === "students-corner"
          ? "Original summary, source-ready via Open Library"
          : "Original LifeVerse starter summary"
  }))
);

export const premiumBenefits = [
  "Deep-dive guides for every category",
  "Printable checklists and templates",
  "Monthly premium reading collections",
  "Ad-free browsing and saved favorites",
  "Early access to new category packs",
  "Simple action plans for students, homes, and small businesses"
];

export const businessModel = [
  {
    title: "Free reading",
    description:
      "Open categories and popular reads help every visitor find useful ideas quickly."
  },
  {
    title: "Premium tools",
    description:
      "Members unlock deeper guides, templates, saved collections, and printable action plans."
  },
  {
    title: "Selective partners",
    description:
      "Carefully chosen recommendations can support the site without crowding the reading experience."
  }
];

export const customerFeatures = [
  "Save favorite reads",
  "Track learning and lifestyle goals",
  "Access premium guides",
  "Manage newsletter and subscription settings"
];

export const adminFeatures = [
  "Create and edit articles",
  "Manage categories and featured reads",
  "Review editorial details",
  "Prepare premium content packs"
];

export const editorialPrinciples = [
  {
    title: "Practical first",
    description:
      "Every section is designed around useful ideas readers can understand and apply quickly."
  },
  {
    title: "Calm by design",
    description:
      "The experience favors clean navigation, generous spacing, and focused content over clutter."
  },
  {
    title: "Built to grow",
    description:
      "LifeVerse can expand into accounts, saved reads, premium resources, and an editor dashboard."
  }
];

export const freeContentSources = [
  {
    name: "Wikipedia & Wikibooks",
    description: "Open explainers for learning, DIY, lifestyle, and games with CC BY-SA attribution.",
    href: "https://www.mediawiki.org/wiki/Wikimedia_APIs/Content_reuse"
  },
  {
    name: "Openverse",
    description: "Creative Commons and public-domain image search with author and license metadata.",
    href: "https://api.openverse.org/"
  },
  {
    name: "TheMealDB",
    description: "Free recipe API for food inspiration and meal discovery content.",
    href: "https://www.themealdb.com/docs_api_guide.php"
  },
  {
    name: "Open Library",
    description: "Open book metadata for students, reading lists, and learning-resource pages.",
    href: "https://openlibrary.org/developers/api"
  }
];
