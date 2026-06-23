export const siteConfig = {
  name: "SaaS Kit",
  description:
    "The fastest way to launch your SaaS. A production-ready Next.js template with auth, payments, dashboard, and more.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/images/og.png",
  links: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourhandle/saas-kit",
    discord: "https://discord.gg/yourinvite",
  },
  author: "SaaS Kit Team",
};

export type SiteConfig = typeof siteConfig;
