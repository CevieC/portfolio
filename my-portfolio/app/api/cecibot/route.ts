export const runtime = "edge";

import OpenAI from "openai";
import type { NextRequest } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const PERSONA = `You are CeciBot, speaking as Cecila Chew...`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = (body?.messages || []) as { role: "user" | "assistant"; content: string }[];

    const chat = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.6,
      messages: [{ role: "system", content: PERSONA }, ...messages],
    });

    const reply = chat.choices?.[0]?.message?.content?.trim() || "(no reply)";
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
