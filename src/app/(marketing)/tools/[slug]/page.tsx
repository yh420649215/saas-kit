import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { toolScenarios } from "@/config/tools";
import { ToolGenerator } from "@/components/tools/ToolGenerator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Feather, HeartHandshake, Briefcase, ClipboardCheck, FileText, Send } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Feather, HeartHandshake, Briefcase, ClipboardCheck, FileText, Send,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolScenarios.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.title} — Free AI-Powered Writing Tool`,
    description: tool.description,
    keywords: [tool.title, "AI writing tool", "free AI generator", tool.slug.replace("-", " ")],
    openGraph: {
      title: tool.title,
      description: tool.description,
    },
  };
}

export function generateStaticParams() {
  return toolScenarios.map((tool) => ({ slug: tool.slug }));
}

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ToolPageContent params={params} />;
}

async function ToolPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolScenarios.find((t) => t.slug === slug);
  if (!tool) notFound();

  const ToolIcon = iconMap[tool.theme.icon] || FileText;

  return (
    <div className={tool.theme.gradient}>
      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${tool.theme.accentLight} border ${tool.theme.border} mb-6`}>
            <ToolIcon className={`h-10 w-10 ${tool.theme.text}`} />
          </div>
          <h1 className={`text-4xl font-bold tracking-tight ${tool.theme.text}`}>
            {tool.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            {tool.description}
          </p>
        </div>

        <ToolGenerator tool={tool} />

        {/* More Tools */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">More writing tools</CardTitle>
              <CardDescription>Try our other free generators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {toolScenarios
                  .filter((t) => t.slug !== slug)
                  .map((t) => {
                    const ItemIcon = iconMap[t.theme.icon] || FileText;
                    return (
                      <a
                        key={t.slug}
                        href={`/tools/${t.slug}`}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${t.theme.border} hover:bg-muted transition-colors text-sm`}
                      >
                        <ItemIcon className={`h-4 w-4 ${t.theme.text}`} />
                        <span>{t.title}</span>
                      </a>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
