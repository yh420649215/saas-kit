# 🚀 SaaS Kit — Launch Your SaaS in Days

A production-ready Next.js template for indie hackers. Auth, payments, dashboard, landing page — all done for you.

[English](#english) | [中文](#chinese)

---

## English

### What's Included

- ✅ Authentication — Email + Google + GitHub OAuth (Supabase)
- ✅ Payments — Stripe Checkout + Webhook
- ✅ Dashboard — Stats, charts, settings
- ✅ Landing Page — Hero, Features, Pricing, Testimonials, FAQ
- ✅ Dark Mode — Full light/dark via next-themes
- ✅ SEO — Metadata, Open Graph, robots.txt
- ✅ TypeScript — Fully typed
- ✅ Mobile-first — Responsive design

### Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | Supabase Auth |
| DB | Supabase PostgreSQL |
| Payments | Stripe |
| Email | Resend |
| Deploy | Vercel |

### Quick Start

```bash
git clone <repo> && cd <repo>
npm install
cp .env.example .env.local  # Edit with your keys
npm run dev
```

### Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Landing page, pricing
│   ├── (dashboard)/     # Dashboard, settings
│   ├── auth/            # Login, register, OAuth
│   └── api/             # Stripe, signout
├── components/
│   ├── ui/              # shadcn/ui
│   ├── layout/          # Header, Footer, Sidebar
│   └── landing/         # Sections
├── config/              # site.ts, pricing.ts
├── lib/                 # supabase/, stripe/
└── middleware.ts
```

### Template License

**$199 — Lifetime**
- Unlimited personal + commercial projects
- 1 year free updates
- Discord access

---

## 中文

### 包含功能

- ✅ 用户认证 — 邮箱 + Google + GitHub（Supabase）
- ✅ 支付系统 — Stripe Checkout + Webhook
- ✅ 管理后台 — 统计、图表、设置
- ✅ 落地页 — Hero、功能、定价、评价、FAQ
- ✅ 暗色模式 — next-themes
- ✅ SEO优化 — Metadata + Open Graph
- ✅ TypeScript + 移动端响应式

### 快速开始

```bash
git clone <repo> && cd <repo>
npm install
cp .env.example .env.local  # 编辑填入密钥
npm run dev
```

### 模板定价

**¥299 — 永久授权**
- 无限项目（商业+个人）
- 1年免费更新
- 社群支持

---

Built by [@yourhandle](https://twitter.com/yourhandle)
