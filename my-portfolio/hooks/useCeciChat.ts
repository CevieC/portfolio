"use client";
import { useCallback, useState } from "react";
import type { Line, ChatMsg } from "@/lib/types";
import { askCeci } from "@/lib/cecibot";

const BOOT: Line[] = [
  { role: "sys", text: "Terminal v1.0.0" },
  { role: "sys", text: "Connected to Cecila's AI assistant." },
  { role: "sys", text: "Type 'help' for available commands." },
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
        print("Available commands:", "sys");
        print("  help     - Show this help", "sys");
        print("  clear    - Clear terminal", "sys");
        print("  about    - About this assistant", "sys");
        print("  theme    - Toggle theme", "sys");
        print("  <question> - Ask me anything", "sys");
        return;
      }
      if (cmd === "clear") {
        setLines(BOOT);
        return;
      }
      if (cmd === "about") {
        print("I'm Cecila's AI assistant. I can help you with questions about her work,", "sys");
        print("experience, or anything else you'd like to know.", "sys");
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
