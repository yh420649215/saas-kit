import { Shield, CreditCard, BarChart3, Globe, Users, Layers, Zap } from "lucide-react";

export const features = [
  { title: "Authentication", description: "Email, Google, and GitHub OAuth out of the box. Protected routes with middleware.", icon: Shield },
  { title: "Payments", description: "Stripe integration with webhooks. Subscription management built in.", icon: CreditCard },
  { title: "Dashboard", description: "Beautiful admin dashboard with stats, user management, and settings.", icon: BarChart3 },
  { title: "Internationalization", description: "Multi-language support with next-intl. English and Chinese included.", icon: Globe },
  { title: "Team Management", description: "Invite team members, set roles, and manage permissions.", icon: Users },
  { title: "Modular Architecture", description: "Clean, well-organized codebase. Easy to extend and customize.", icon: Layers },
  { title: "Lightning Fast", description: "Next.js App Router with server components. 100 Lighthouse score.", icon: Zap },
  { title: "Dark Mode", description: "Full dark mode support with next-themes. System preference detection.", icon: Zap },
  { title: "SEO Optimized", description: "Metadata, Open Graph, sitemap, and robots.txt configured.", icon: Globe },
];

export const testimonials = [
  { quote: "Shipped my SaaS in 3 days instead of 3 weeks. The template saved me so much time.", name: "Alex Chen", role: "Indie Hacker" },
  { quote: "Everything just works. Auth, payments, dashboard — all configured perfectly.", name: "Sarah Kim", role: "Full-stack Developer" },
  { quote: "Best investment for any indie hacker. Clean code, great docs, frequent updates.", name: "Mike Johnson", role: "SaaS Founder" },
];

export const faqs = [
  { question: "What do I get with this template?", answer: "A complete Next.js application with authentication, payments (Stripe), user dashboard, landing page, blog, and all the boilerplate code you need to launch a SaaS product." },
  { question: "Can I use this for commercial projects?", answer: "Yes! You get a lifetime license to use the code in unlimited commercial and personal projects." },
  { question: "What's included in the free tier?", answer: "The free tier includes 1 project, basic analytics, community support, and 1,000 API calls per month." },
  { question: "How do I deploy this?", answer: "One-click deploy to Vercel. We also support Netlify and Cloudflare Pages with minor configuration changes." },
  { question: "Do I need to know Next.js?", answer: "Basic knowledge of React and TypeScript helps, but the code is well-documented and easy to follow even if you're new to Next.js." },
];
