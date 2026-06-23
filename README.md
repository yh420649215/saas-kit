# 🚀 SaaS Kit

A production-ready Next.js 16 template for indie hackers. Auth, Stripe, AI chat, dashboard — everything you need to launch your SaaS in a day.

[English](#english) | [中文](#chinese)

---

## English

### What's Included

| Category | Features |
|----------|---------|
| **Auth** | Email + Google + GitHub OAuth (Supabase), forgot password, route protection |
| **Payments** | Stripe Checkout + Webhook, subscription lifecycle, success redirect |
| **AI Chat** | Streaming chat with DeepSeek / OpenAI / Groq (auto-selects by env var) |
| **Dashboard** | Real subscription data from Supabase, AI assistant panel |
| **Pages** | Landing, Pricing, Contact, Blog, About, Changelog, Privacy, Terms |
| **UX** | Dark mode, responsive, Suspense skeletons, Toast notifications |

### Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe |
| AI | Vercel AI SDK v6 (DeepSeek / OpenAI / Groq) |
| Email | Resend |

### Quick Start

```bash
git clone https://github.com/yh420649215/saas-kit.git
cd saas-kit
npm install
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```bash
# Required — Supabase (free at supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Required for AI chat — pick one (DeepSeek is cheapest)
DEEPSEEK_API_KEY=sk-...

# Optional — Stripe payments
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Then:

```bash
npm run dev
# Open http://localhost:3000
```

### After Launch — Customize

| File | What to change |
|------|---------------|
| `src/config/site.ts` | Your app name, description, social links |
| `src/config/pricing.ts` | Your plan names, prices, features |
| `src/config/landing.ts` | Hero text, features list, testimonials, FAQs |
| `src/app/(marketing)/page.tsx` | Landing page content |

### Project Structure

```
src/
├── app/
│   ├── (marketing)/      # /, /pricing, /blog, /about, /contact, etc.
│   ├── (dashboard)/      # /dashboard, /settings, analytics, team, billing
│   ├── auth/             # /auth/login, register, forgot-password, callback
│   └── api/              # /api/chat, /api/stripe/*
├── components/
│   ├── ui/               # 20 shadcn/ui components
│   ├── layout/           # Header, Footer, DashboardSidebar
│   ├── auth/             # LoginForm, RegisterForm, OAuthButtons
│   ├── chat/             # ChatPanel (AI assistant)
│   ├── landing/          # PricingCards
│   └── dashboard/        # Skeletons
├── config/               # site, pricing, landing, navigation, dashboard
├── lib/                  # supabase, stripe, subscription, email
└── middleware.ts          # Auth route protection + session refresh
```

### Database Setup

Run in Supabase SQL Editor:

```sql
CREATE TABLE subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT DEFAULT 'pro',
  status TEXT DEFAULT 'active',
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ADD UNIQUE (stripe_subscription_id);

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT USING (auth.uid() = user_id);
```

---

## 中文

### 包含功能

| 类别 | 功能 |
|------|------|
| **认证** | 邮箱 + Google + GitHub OAuth（Supabase）、忘记密码、路由保护 |
| **支付** | Stripe Checkout + Webhook、订阅生命周期、支付成功回跳 |
| **AI 聊天** | 流式聊天，支持 DeepSeek / OpenAI / Groq（自动按环境变量选择） |
| **仪表盘** | Supabase 真实订阅数据、AI 助手面板 |
| **页面** | 首页、定价、联系、博客、关于、更新日志、隐私、条款 |
| **体验** | 暗色模式、响应式、骨架屏加载、Toast 通知 |

### 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 认证 | Supabase Auth |
| 数据库 | Supabase (PostgreSQL) |
| 支付 | Stripe |
| AI | Vercel AI SDK v6 (DeepSeek / OpenAI / Groq) |
| 邮件 | Resend |

### 快速开始

```bash
git clone https://github.com/yh420649215/saas-kit.git
cd saas-kit
npm install
cp .env.example .env.local
# 编辑 .env.local 填入密钥
npm run dev
```

### 数据库初始化

在 Supabase SQL Editor 执行上面 English 部分的 SQL。

---

## License

MIT — use it for anything. Commercial, personal, client projects — all fine.

---

Built with [Claude Code](https://claude.ai/code) + [Next.js](https://nextjs.org) + [Supabase](https://supabase.com)
