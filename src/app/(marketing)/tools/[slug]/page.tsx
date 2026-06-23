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
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">{tool.icon}</span>
          <h1 className="text-4xl font-bold tracking-tight">{tool.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{tool.description}</p>
        </div>
        <ToolGenerator tool={tool} />
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">More AI Tools</CardTitle>
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
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      <span>{t.icon}</span>
                      <span>{t.title.replace("AI ", "").replace(" Generator", "").replace(" Writer", "")}</span>
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
