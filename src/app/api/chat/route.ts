import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const maxDuration = 30;

const model = getModel();

function getModel() {
  if (process.env.DEEPSEEK_API_KEY) {
    const deepseek = createOpenAI({
      baseURL: "https://api.deepseek.com/v1",
      apiKey: process.env.DEEPSEEK_API_KEY,
    });
    return deepseek.chat("deepseek-chat");
  }

  if (process.env.GROQ_API_KEY) {
    const groq = createOpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    });
    return groq.chat("llama-3.3-70b-versatile");
  }

  const baseURL = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;
  if (baseURL && apiKey) {
    const custom = createOpenAI({ baseURL, apiKey });
    return custom.chat(process.env.AI_MODEL ?? "gpt-4o-mini");
  }

  const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openai.chat("gpt-4o-mini");
}

export async function POST(req: Request) {
  const body = await req.json();

  const result = streamText({
    model,
    messages: convertMessages(body.messages),
  });

  return result.toUIMessageStreamResponse();
}

// Convert UIMessage (parts-based) to ModelMessage (content-based)
function convertMessages(messages: any[]) {
  return messages.map((m: any) => {
    // Already in ModelMessage format
    if (typeof m.content === "string") return { role: m.role, content: m.content };
    // UIMessage format — extract text from parts
    if (Array.isArray(m.parts)) {
      const text = m.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("");
      return { role: m.role, content: text };
    }
    return { role: m.role, content: "" };
  });
}
