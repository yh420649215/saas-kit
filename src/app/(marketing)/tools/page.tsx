import type { Metadata } from "next";
import { toolScenarios } from "@/config/tools";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Heart, Feather, HeartHandshake, Briefcase, ClipboardCheck, FileText, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Feather, HeartHandshake, Briefcase, ClipboardCheck, FileText, Send,
};

export const metadata: Metadata = {
  title: "Free AI Writing Tools — Wedding Speeches, Cover Letters, Eulogies & More",
  description: "8 free AI-powered writing tools. Generate wedding speeches, cover letters, eulogies, resignation letters, performance reviews, dating profiles, cold emails, and apology letters in seconds.",
  keywords: ["AI writing tools", "wedding speech generator", "cover letter AI", "eulogy writer", "resignation letter", "free AI tools", "AI text generator"],
  openGraph: {
    title: "Free AI Writing Tools — Generate Speeches, Letters & More",
    description: "8 free AI-powered writing tools for life's important moments.",
  },
};

export default function ToolsPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Free AI Writing Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When words matter most, AI helps you find them. From wedding speeches to farewell letters — write with confidence, for free.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            8 tools &middot; 2 free uses each &middot; $19 lifetime unlock
          </p>
        </div>

        {/* Tool Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {toolScenarios.map((tool) => {
            const Icon = iconMap[tool.theme.icon] || FileText;
            return (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group">
                <Card className="h-full hover:shadow-md transition-shadow border group-hover:border-primary/30">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${tool.theme.accentLight} border ${tool.theme.border} mb-3`}>
                      <Icon className={`h-6 w-6 ${tool.theme.text}`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        Free
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                        Try it <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-muted rounded-2xl p-8 max-w-lg">
            <h2 className="text-2xl font-bold mb-2">Need unlimited access?</h2>
            <p className="text-muted-foreground mb-4">
              $19 one-time. All 8 tools, unlimited generations, forever.
            </p>
            <a href="/pricing" className={buttonVariants({ size: "lg" })}>
              Get Full Access — $19
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
