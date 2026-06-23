export default function ChangelogPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Changelog</h1>
        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-2">v0.1.0 — June 2026</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Initial release — auth, payments, dashboard, AI chat</li>
              <li>Supabase + Stripe integration</li>
              <li>DeepSeek / OpenAI / Groq AI provider support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
