"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Check, Heart, Feather, HeartHandshake, Briefcase, ClipboardCheck, FileText, Send } from "lucide-react";
import type { ToolScenario } from "@/config/tools";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Feather,
  HeartHandshake,
  Briefcase,
  ClipboardCheck,
  FileText,
  Send,
};

export function ToolGenerator({ tool }: { tool: ToolScenario }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult("");

    const controller = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: tool.systemPrompt },
            { role: "user", content: input },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) setError("Too many requests. Please wait a moment and try again.");
        else if (status >= 500) setError("Server error. Please try again later.");
        else setError(`Request failed (${status}). Please try again.`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setError("No response from server.");
        return;
      }

      const decoder = new TextDecoder();
      let text = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "text-delta" && data.delta) {
                text += data.delta;
              } else if (data.type === "error") {
                setError(data.errorText || "Generation failed. Please try again.");
              }
            } catch {
              // skip unparseable lines
            }
          }
        }
      }

      if (text) setResult(text);
      else if (!error) setError("No output generated. Try adding more details.");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = iconMap[tool.theme.icon] || FileText;

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm`}>
        <div className="flex items-center gap-3 px-6 pt-6 pb-2">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${tool.theme.accentLight} border ${tool.theme.border}`}>
            <Icon className={`h-5 w-5 ${tool.theme.text}`} />
          </div>
          <h2 className="font-semibold">{tool.inputLabel}</h2>
        </div>
        <div className="p-6 pt-2">
          <form onSubmit={handleGenerate} className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.inputPlaceholder}
              rows={6}
              disabled={loading}
              className="resize-y min-h-[120px]"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className={cn("w-full", tool.theme.accent)}
              size="lg"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Writing...</>
              ) : (
                <>Generate {tool.title.replace(" Writer", "").replace(" Generator", "")}</>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Loading */}
      {loading && !result && (
        <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm p-12 text-center`}>
          <Loader2 className={`h-8 w-8 mx-auto mb-4 animate-spin ${tool.theme.text}`} />
          <p className="text-muted-foreground text-sm">Crafting your words...</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm`}>
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${tool.theme.accentLight} border ${tool.theme.border}`}>
                <Icon className={`h-5 w-5 ${tool.theme.text}`} />
              </div>
              <h2 className="font-semibold">{tool.outputLabel}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={handleCopy} className="text-muted-foreground hover:text-foreground">
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="p-6 pt-2">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}
