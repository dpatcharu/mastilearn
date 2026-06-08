import {
  BadgeDollarSign,
  BookOpen,
  BriefcaseBusiness,
  CalendarHeart,
  Crown,
  Gamepad2,
  GraduationCap,
  Hammer,
  HeartPulse,
  Home,
  Salad,
  Sparkles
} from "lucide-react";

export const storyItems = [
  { label: "Your Story", avatar: "/images/hero-collage.png", tone: "from-slate-950 to-slate-700" },
  { label: "Study", avatar: "/images/students-learning.png", tone: "from-sky-400 to-indigo-500" },
  { label: "Money", avatar: "/images/business-ideas.png", tone: "from-emerald-400 to-lime-400" },
  { label: "Home", avatar: "/images/home-interior.png", tone: "from-rose-300 to-orange-400" },
  { label: "Food", avatar: "/images/healthy-food.png", tone: "from-amber-300 to-yellow-400" },
  { label: "Events", avatar: "/images/events-celebration.png", tone: "from-fuchsia-400 to-pink-500" },
  { label: "DIY", avatar: "/images/diy.png", tone: "from-cyan-400 to-teal-400" },
  { label: "Games", avatar: "/images/games.png", tone: "from-violet-400 to-blue-500" }
];

export const socialCategories = [
  { title: "Students", slug: "students-corner", icon: GraduationCap, tone: "bg-sky-50 text-sky-700", href: "/categories/students-corner/" },
  { title: "Business", slug: "business-money", icon: BriefcaseBusiness, tone: "bg-emerald-50 text-emerald-700", href: "/categories/business-money/" },
  { title: "Money", slug: "business-money", icon: BadgeDollarSign, tone: "bg-lime-50 text-lime-700", href: "/categories/business-money/" },
  { title: "Home", slug: "home-interior", icon: Home, tone: "bg-rose-50 text-rose-700", href: "/categories/home-interior/" },
  { title: "Events", slug: "events", icon: CalendarHeart, tone: "bg-fuchsia-50 text-fuchsia-700", href: "/categories/events/" },
  { title: "Food", slug: "food", icon: Salad, tone: "bg-amber-50 text-amber-700", href: "/categories/food/" },
  { title: "DIY", slug: "diy", icon: Hammer, tone: "bg-cyan-50 text-cyan-700", href: "/categories/diy/" },
  { title: "Lifestyle", slug: "lifestyle", icon: HeartPulse, tone: "bg-violet-50 text-violet-700", href: "/categories/lifestyle/" },
  { title: "Games", slug: "games", icon: Gamepad2, tone: "bg-indigo-50 text-indigo-700", href: "/categories/games/" }
];

export const creatorCards = [
  { name: "Skill Studio", username: "daily_skills", niche: "Study systems", avatar: "/images/students-learning.png", followers: "12.4k" },
  { name: "Money Maps", username: "money_maps", niche: "Business ideas", avatar: "/images/business-ideas.png", followers: "8.9k" },
  { name: "Home Glow", username: "home_glow", niche: "Interior saves", avatar: "/images/home-interior.png", followers: "6.7k" },
  { name: "Fresh Plate", username: "fresh_plate", niche: "Healthy meals", avatar: "/images/healthy-food.png", followers: "18.2k" },
  { name: "Party Lab", username: "party_lab", niche: "Events", avatar: "/images/events-celebration.png", followers: "5.1k" },
  { name: "Play Break", username: "play_break", niche: "Games", avatar: "/images/games.png", followers: "9.3k" }
];

export const premiumCollections = [
  { title: "Study Planner Pack", image: "/images/students-learning.png", badge: "Premium", icon: BookOpen, items: "18 templates" },
  { title: "Business Ideas Kit", image: "/images/business-ideas.png", badge: "Premium", icon: BriefcaseBusiness, items: "42 prompts" },
  { title: "Home Decor Guide", image: "/images/home-interior.png", badge: "Premium", icon: Home, items: "30 boards" },
  { title: "Healthy Recipe Plan", image: "/images/healthy-food.png", badge: "Premium", icon: Salad, items: "21 meals" },
  { title: "Creator Growth System", image: "/images/premium-gift.png", badge: "Premium", icon: Sparkles, items: "7 playbooks" }
];

export const savedBoards = [
  { title: "Daily Ideas", count: 18, images: ["/images/students-learning.png", "/images/healthy-food.png", "/images/lifestyle.png"] },
  { title: "Future Business", count: 9, images: ["/images/business-ideas.png", "/images/premium-gift.png", "/images/students-learning.png"] },
  { title: "Home Mood", count: 14, images: ["/images/home-interior.png", "/images/diy.png", "/images/events-celebration.png"] },
  { title: "Weekend Plans", count: 7, images: ["/images/events-celebration.png", "/images/healthy-food.png", "/images/games.png"] }
];

export const premiumBadge = Crown;
