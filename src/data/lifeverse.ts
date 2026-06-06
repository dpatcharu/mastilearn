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
    description: "Study habits, career clarity, and useful learning guides.",
    icon: GraduationCap,
    image: "/images/students-learning.png",
    tone: "from-sky-50 to-indigo-50"
  },
  {
    title: "Business & Money",
    description: "Simple ideas for earning, saving, and building smarter.",
    icon: BriefcaseBusiness,
    image: "/images/business-ideas.png",
    tone: "from-emerald-50 to-lime-50"
  },
  {
    title: "Home & Interior",
    description: "Beautiful spaces, better routines, and practical decor.",
    icon: Home,
    image: "/images/home-interior.png",
    tone: "from-rose-50 to-orange-50"
  },
  {
    title: "Events",
    description: "Thoughtful planning tips for memorable celebrations.",
    icon: CalendarHeart,
    image: "/images/events-celebration.png",
    tone: "from-fuchsia-50 to-pink-50"
  },
  {
    title: "Food",
    description: "Healthy meals, quick recipes, and everyday kitchen joy.",
    icon: Salad,
    image: "/images/healthy-food.png",
    tone: "from-amber-50 to-yellow-50"
  },
  {
    title: "DIY",
    description: "Hands-on projects that make daily life feel more creative.",
    icon: Hammer,
    image: "/images/diy.png",
    tone: "from-cyan-50 to-teal-50"
  },
  {
    title: "Lifestyle",
    description: "Gentle upgrades for wellness, habits, and personal style.",
    icon: HeartPulse,
    image: "/images/lifestyle.png",
    tone: "from-violet-50 to-purple-50"
  },
  {
    title: "Games",
    description: "Playful ideas, puzzles, and digital fun for quick breaks.",
    icon: Gamepad2,
    image: "/images/games.png",
    tone: "from-slate-50 to-blue-50"
  }
];

export const articles = [
  {
    title: "7 tiny study rituals that make focus feel easier",
    category: "Students",
    image: "/images/students-learning.png",
    time: "5 min read",
    source: "Inspired by Wikimedia learning topics"
  },
  {
    title: "A calm home corner you can create this weekend",
    category: "Interior",
    image: "/images/home-interior.png",
    time: "4 min read",
    source: "Original LifeVerse summary"
  },
  {
    title: "Fresh bowls for busy days without the fuss",
    category: "Food",
    image: "/images/healthy-food.png",
    time: "6 min read",
    source: "Recipe data can use TheMealDB"
  },
  {
    title: "Small celebration details that feel premium",
    category: "Events",
    image: "/images/events-celebration.png",
    time: "3 min read",
    source: "Original LifeVerse summary"
  },
  {
    title: "Business ideas you can validate before spending big",
    category: "Money",
    image: "/images/business-ideas.png",
    time: "7 min read",
    source: "Public-domain/open data friendly"
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
