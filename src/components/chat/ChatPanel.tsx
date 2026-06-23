"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChatPanel() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto space-y-3 mb-4 text-sm">
          {messages.length === 0 && (
            <p className="text-muted-foreground text-center pt-16">
              Ask anything — summarize, brainstorm, debug...
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-2 rounded-lg ${
                m.role === "user"
                  ? "bg-primary/10 ml-8"
                  : "bg-muted mr-8"
              }`}
            >
              <p className="whitespace-pre-wrap">{
                m.parts?.map((part, i) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null
                )
              }</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted mr-8 p-2 rounded-lg text-sm text-muted-foreground">
              Thinking...
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} size="sm">
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
