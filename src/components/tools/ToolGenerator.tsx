"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Copy, Check, ChevronLeft, ChevronRight, Eye, Heart, Feather, HeartHandshake, Briefcase, ClipboardCheck, FileText, Send } from "lucide-react";
import type { ToolScenario } from "@/config/tools";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Feather, HeartHandshake, Briefcase, ClipboardCheck, FileText, Send,
};

export function ToolGenerator({ tool }: { tool: ToolScenario }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(tool.steps.map(() => ""));
  const [selectedTone, setSelectedTone] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [showExample, setShowExample] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const Icon = iconMap[tool.theme.icon] || FileText;
  const currentStep = tool.steps[step];
  const isLast = step === tool.steps.length - 1;

  const updateAnswer = (value: string) => {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
  };

  const nextStep = () => { if (answers[step].trim()) setStep(step + 1); };
  const prevStep = () => setStep(Math.max(0, step - 1));

  const handleGenerate = async (toneIdx: number, skipLoading?: boolean) => {
    if (!skipLoading) {
      setLoading(true);
      setError("");
      setResults([]);
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const context = tool.steps.map((s, i) => `${s.question}\n${answers[i] || "N/A"}`).join("\n\n");
    const tone = tool.tones[toneIdx];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: `${tool.systemPrompt}\n\nTone: ${tone}.` },
            { role: "user", content: context },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) setError("Too many requests. Please wait a moment.");
        else if (status >= 500) setError("Server error. Please try again later.");
        else setError(`Request failed (${status}).`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) { setError("No response from server."); return; }

      const decoder = new TextDecoder();
      let text = "", buffer = "";

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
              if (data.type === "text-delta" && data.delta) text += data.delta;
              else if (data.type === "error") setError(data.errorText || "Generation failed.");
            } catch {}
          }
        }
      }

      if (text) {
        setResults((prev) => {
          const next = [...prev];
          next[toneIdx] = text;
          return next;
        });
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Network error. Check your connection.");
    } finally {
      if (!skipLoading) setLoading(false);
    }
  };

  const handleGenerateAll = async () => {
    setLoading(true);
    setError("");
    setResults([]);
    for (let i = 0; i < tool.tones.length; i++) {
      await handleGenerate(i, true);
    }
    setLoading(false);
  };

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {tool.steps.map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
              i < step ? "bg-primary text-primary-foreground" :
              i === step ? "bg-primary text-primary-foreground ring-2 ring-primary/30" :
              "bg-muted text-muted-foreground"
            )}>
              {i < step ? "✓" : i + 1}
            </div>
            {i < tool.steps.length - 1 && <div className="w-6 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm`}>
        <div className="flex items-center gap-3 px-6 pt-6 pb-2">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${tool.theme.accentLight} border ${tool.theme.border}`}>
            <Icon className={`h-5 w-5 ${tool.theme.text}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Step {step + 1} of {tool.steps.length}</p>
            <h2 className="font-semibold">{currentStep.question}</h2>
          </div>
        </div>
        <div className="p-6 pt-2">
          <Textarea
            value={answers[step]}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder={currentStep.placeholder}
            rows={5}
            disabled={loading}
            className="resize-y min-h-[100px]"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {step > 0 && (
                <Button variant="outline" size="sm" onClick={prevStep} disabled={loading}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              )}
              {!isLast ? (
                <Button size="sm" onClick={nextStep} disabled={!answers[step].trim()} className={tool.theme.accent}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button size="sm" onClick={handleGenerateAll} disabled={loading || answers.some((a) => !a.trim())} className={tool.theme.accent}>
                  {loading ? <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Generating...</> : `Generate ${tool.tones.length} Versions`}
                </Button>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowExample(!showExample)}>
              <Eye className="h-4 w-4 mr-1" />
              {showExample ? "Hide Example" : "See Example"}
            </Button>
          </div>
          {error && <p className="text-sm text-destructive mt-3">{error}</p>}
        </div>
      </div>

      {/* Example Preview */}
      {showExample && (
        <div className={`rounded-xl border ${tool.theme.border} ${tool.theme.accentLight} p-6 text-sm`}>
          <h4 className={`font-semibold mb-2 ${tool.theme.text}`}>Example output</h4>
          <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{tool.sampleOutput}</div>
        </div>
      )}

      {/* Results - Tabbed by tone */}
      {results.some((r) => r) && (
        <div className={`rounded-xl border ${tool.theme.border} bg-card shadow-sm`}>
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${tool.theme.accentLight} border ${tool.theme.border}`}>
                <Icon className={`h-5 w-5 ${tool.theme.text}`} />
              </div>
              <h2 className="font-semibold">{tool.outputLabel}</h2>
            </div>
          </div>
          <div className="p-6 pt-2">
            <Tabs defaultValue={String(0)}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {tool.tones.map((tone, i) => (
                  <TabsTrigger key={i} value={String(i)} disabled={!results[i]}>
                    {tone}
                    {results[i] && <Badge variant="secondary" className="ml-2 text-xs">Ready</Badge>}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tool.tones.map((tone, i) => (
                <TabsContent key={i} value={String(i)} className="mt-4">
                  {results[i] ? (
                    <>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{results[i]}</div>
                      <Button variant="ghost" size="sm" className="mt-4" onClick={() => handleCopy(results[i], i)}>
                        {copied === i ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied === i ? "Copied" : "Copy"}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <Loader2 className="h-6 w-6 mx-auto mb-2 animate-spin" />
                      Generating {tone.toLowerCase()} version...
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
