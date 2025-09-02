import type { ChatMsg } from "./types";

export async function askCeci(messages: ChatMsg[]): Promise<string> {
  const res = await fetch("/api/cecibot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return (data.reply as string) || "(no reply)";
}
