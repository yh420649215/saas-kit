"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
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
  const [copied, setCopied] = useState(false);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const lastMessage = messages.filter((m) => m.role === "assistant").pop();
  const result = lastMessage?.parts
    ?.filter((p: any) => p.type === "text")
    .map((p: any) => p.text)
    .join("") ?? "";

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({
      text: `${tool.systemPrompt}\n\nUser details:\n${input}`,
    });
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
      {/* Input Card */}
      <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm`}>
        <div className={`flex items-center gap-3 px-6 pt-6 pb-2 ${tool.theme.text}`}>
          <Icon className="h-5 w-5" />
          <h2 className="font-semibold">{tool.inputLabel}</h2>
        </div>
        <div className="p-6 pt-2">
          <form onSubmit={handleGenerate} className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.inputPlaceholder}
              rows={6}
              disabled={isLoading}
              className="resize-y min-h-[120px]"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn("w-full", tool.theme.accent)}
              size="lg"
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Writing...</>
              ) : (
                <>Generate {tool.title.replace(" Writer", "").replace(" Generator", "")}</>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm animate-in fade-in slide-in-from-top-4 duration-300`}>
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <div className={`flex items-center gap-2 ${tool.theme.text}`}>
              <Icon className="h-4 w-4" />
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

      {/* Loading State */}
      {isLoading && !result && (
        <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm p-12 text-center`}>
          <Loader2 className={`h-8 w-8 mx-auto mb-4 animate-spin ${tool.theme.text}`} />
          <p className="text-muted-foreground text-sm">Crafting your words...</p>
        </div>
      )}
    </div>
  );
}
