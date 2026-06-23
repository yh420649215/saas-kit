import { notFound } from "next/navigation";
import { toolScenarios } from "@/config/tools";
import { ToolGenerator } from "@/components/tools/ToolGenerator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

  return (
    <div className={tool.theme.gradient}>
      <div className="container mx-auto px-4 max-w-3xl py-12">
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-bold tracking-tight ${tool.theme.text}`}>
            {tool.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            {tool.description}
          </p>
        </div>

        <ToolGenerator tool={tool} />

        {/* Example Output */}
        <div className={`mt-10 rounded-xl border ${tool.theme.border} ${tool.theme.accentLight} p-6`}>
          <h3 className={`text-sm font-semibold mb-3 ${tool.theme.text}`}>
            Example — {tool.title}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Sample Input
              </p>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tool.sampleInput}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Sample Output
              </p>
              <div className={`p-4 rounded-lg border ${tool.theme.border} bg-background leading-relaxed whitespace-pre-line`}>
                {tool.sampleOutput}
              </div>
            </div>
          </div>
        </div>

        {/* More Tools */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">More Writing Tools</CardTitle>
              <CardDescription>Try our other free generators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {toolScenarios
                  .filter((t) => t.slug !== slug)
                  .map((t) => (
                    <a
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${t.theme.border} hover:bg-muted transition-colors text-sm`}
                    >
                      <span className="text-lg">{getIconChar(t.slug)}</span>
                      <span>{t.title}</span>
                    </a>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getIconChar(slug: string): string {
  const map: Record<string, string> = {
    "wedding-speech": "❤️",
    "eulogy": "🙏",
    "apology-letter": "🫰",
    "resignation-letter": "💼",
    "performance-review": "📊",
    "cover-letter": "📄",
    "dating-profile": "💕",
    "cold-email": "✉️",
  };
  return map[slug] ?? "";
}
