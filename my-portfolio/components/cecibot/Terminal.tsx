"use client";
import React, { useState } from "react";
import TerminalFrame from "./TerminalFrame";
import MonoKbd from "@/components/ui/MonoKbd";
import { useCeciChat } from "@/hooks/useCeciChat";
import type { Line } from "@/lib/types";

export default function Terminal({ onClose }: { onClose?: () => void }) {
  const { lines, busy, handleCommand } = useCeciChat();
  const [input, setInput] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input;
    setInput("");
    handleCommand(cmd);
  }

  return (
    <div className="font-['JetBrains_Mono',monospace]">
      <TerminalFrame
        title=""
        onClose={onClose}
        footer={
          <form onSubmit={onSubmit} className="border-t border-neutral-800 bg-neutral-900 px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400 select-none font-bold">$</span>
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type your question…"
                className="flex-1 bg-transparent outline-none placeholder:text-gray-600 text-green-400 caret-green-400 font-['JetBrains_Mono',monospace]"
              />
              <span className="hidden sm:inline text-gray-500"><MonoKbd>Enter</MonoKbd></span>
            </div>
          </form>
        }
      >
        {lines.map((l: Line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-6">
            {l.role === "user" ? (
              <span className="text-green-400 font-bold">{l.text}</span>
            ) : l.role === "assistant" ? (
              <span className="text-cyan-300">{l.text}</span>
            ) : (
              <span className="text-gray-400">{l.text}</span>
            )}
          </div>
        ))}
        {busy && <div className="text-yellow-400">…thinking</div>}
      </TerminalFrame>
    </div>
  );
}
