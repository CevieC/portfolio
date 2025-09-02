"use client";
import { useCallback, useState } from "react";
import type { Line, ChatMsg } from "@/lib/types";
import { askCeci } from "@/lib/cecibot";

const BOOT: Line[] = [
  { role: "sys", text: "CeciOS v0.3.7 — build 0925" },
  { role: "sys", text: "System initialized successfully." },
  { role: "sys", text: "Persona: Cecila Chew loaded." },
  { role: "sys", text: "Type 'help' for commands." },
];

export function useCeciChat() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [busy, setBusy] = useState(false);

  const print = useCallback((text: string, role: Line["role"] = "sys") => {
    setLines((ls) => [...ls, { role, text }]);
  }, []);

  const handleCommand = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      print(`$ ${cmd}`, "user");

      if (["help", "?"].includes(cmd)) {
        print("Commands: help, clear, about, theme, ask <question>", "sys");
        return;
      }
      if (cmd === "clear") {
        setLines(BOOT);
        return;
      }
      if (cmd === "about") {
        print("CeciBot answers in Cecila's style: concise, modern, friendly.", "sys");
        return;
      }
      if (cmd === "theme") {
        const el = document.documentElement;
        el.classList.toggle("dark");
        print(`Theme: ${el.classList.contains("dark") ? "dark" : "light"}`, "sys");
        return;
      }

      const isAsk = cmd.startsWith("ask ");
      const question = isAsk ? cmd.slice(4) : cmd;

      const history: ChatMsg[] = lines
        .filter((l) => l.role !== "sys")
        .slice(-10)
        .map((l) => ({ role: l.role === "user" ? "user" : "assistant", content: l.text }));

      setBusy(true);
      try {
        const reply = await askCeci([...history, { role: "user", content: question }]);
        print(reply, "assistant");
      } catch (e: any) {
        print("[error] " + (e?.message || "unknown"), "sys");
      } finally {
        setBusy(false);
      }
    },
    [lines, print]
  );

  return { lines, busy, handleCommand };
}
