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
    title: "Study rituals worth saving before your next exam",
    category: "Students",
    slug: "students-corner",
    image: "/images/students-learning.png",
    time: "5 min read",
    source: "Inspired by Wikimedia learning topics"
  },
  {
    title: "A calm home corner that feels expensive",
    category: "Interior",
    slug: "home-interior",
    image: "/images/home-interior.png",
    time: "4 min read",
    source: "Original LifeVerse summary"
  },
  {
    title: "Fresh bowls people keep saving for busy days",
    category: "Food",
    slug: "food",
    image: "/images/healthy-food.png",
    time: "6 min read",
    source: "Recipe data can use TheMealDB"
  },
  {
    title: "Small celebration details that look premium",
    category: "Events",
    slug: "events",
    image: "/images/events-celebration.png",
    time: "3 min read",
    source: "Original LifeVerse summary"
  },
  {
    title: "Business ideas you can test this week",
    category: "Money",
    slug: "business-money",
    image: "/images/business-ideas.png",
    time: "7 min read",
    source: "Public-domain/open data friendly"
  }
];

export const discoveryPosts = [
  {
    title: "Minimal desk setup for deep work",
    category: "Students",
    image: "/images/students-learning.png",
    href: "/categories/students-corner",
    saves: "18.4k",
    vibe: "Focus"
  },
  {
    title: "Cozy corner ideas for small rooms",
    category: "Home",
    image: "/images/home-interior.png",
    href: "/categories/home-interior",
    saves: "22.1k",
    vibe: "Home"
  },
  {
    title: "Healthy bowl formulas you can repeat",
    category: "Food",
    image: "/images/healthy-food.png",
    href: "/categories/food",
    saves: "31.7k",
    vibe: "Fresh"
  },
  {
    title: "Premium party details on a simple budget",
    category: "Events",
    image: "/images/events-celebration.png",
    href: "/categories/events",
    saves: "12.8k",
    vibe: "Celebrate"
  },
  {
    title: "Tiny business ideas to validate fast",
    category: "Money",
    image: "/images/business-ideas.png",
    href: "/categories/business-money",
    saves: "15.2k",
    vibe: "Build"
  },
  {
    title: "DIY upgrades that make your space feel new",
    category: "DIY",
    image: "/images/diy.png",
    href: "/categories/diy",
    saves: "9.6k",
    vibe: "Make"
  },
  {
    title: "Morning routine cards for a cleaner day",
    category: "Lifestyle",
    image: "/images/lifestyle.png",
    href: "/categories/lifestyle",
    saves: "27.5k",
    vibe: "Reset"
  },
  {
    title: "Quick games for smarter screen breaks",
    category: "Games",
    image: "/images/games.png",
    href: "/categories/games",
    saves: "8.9k",
    vibe: "Play"
  }
];

export const socialFeatures = [
  {
    title: "For You feed",
    description: "A visual stream shaped around the categories each reader follows."
  },
  {
    title: "Boards and saves",
    description: "Readers collect ideas into boards for school, home, food, money, and events."
  },
  {
    title: "Daily drops",
    description: "Fresh inspiration appears in small daily batches so the site feels alive."
  },
  {
    title: "Premium collections",
    description: "Paid members unlock deeper guides, templates, and curated idea packs."
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
  "Premium boards for every major interest",
  "Printable checklists and templates",
  "Monthly curated discovery packs",
  "Ad-free browsing and unlimited saves",
  "Early access to new category drops",
  "Action plans for study, home, money, and events"
];

export const businessModel = [
  {
    title: "Free discovery",
    description:
      "Anyone can browse the visual feed, follow categories, and find useful ideas quickly."
  },
  {
    title: "Premium collections",
    description:
      "Members unlock deeper boards, templates, action plans, and cleaner saved collections."
  },
  {
    title: "Careful partners",
    description:
      "Future recommendations can support the business while keeping the experience calm and useful."
  }
];

export const customerFeatures = [
  "Save posts into personal boards",
  "Follow categories for a smarter feed",
  "Track daily discovery streaks",
  "Unlock premium collections"
];

export const adminFeatures = [
  "Create and edit articles",
  "Manage categories and featured reads",
  "Review editorial details",
  "Prepare premium content packs"
];

export const editorialPrinciples = [
  {
    title: "Save-worthy",
    description:
      "Every section should give readers something they want to keep, revisit, or share."
  },
  {
    title: "Personal by default",
    description:
      "Following interests and saving posts should make LifeVerse feel more useful every time."
  },
  {
    title: "Premium, not noisy",
    description:
      "The product can grow into social features and paid collections without becoming cluttered."
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
