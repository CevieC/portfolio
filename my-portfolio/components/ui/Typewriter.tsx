"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type TypewriterProps = {
  words: string[];
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
};

export default function Typewriter({
  words,
  typingMs = 60,
  deletingMs = 40,
  holdMs = 1000,
  loop = true,
  className,
  cursorClassName,
}: TypewriterProps) {
  const safeWords = useMemo(() => (words && words.length > 0 ? words : [""]), [words]);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const currentWord = safeWords[wordIndex % safeWords.length];

    function schedule(fn: () => void, ms: number) {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(fn, ms);
    }

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        schedule(() => setText(currentWord.slice(0, text.length + 1)), typingMs);
      } else {
        schedule(() => setPhase("holding"), holdMs);
      }
      return;
    }

    if (phase === "holding") {
      schedule(() => setPhase("deleting"), holdMs);
      return;
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        schedule(() => setText(text.slice(0, -1)), deletingMs);
      } else {
        const nextIndex = wordIndex + 1;
        if (!loop && nextIndex >= safeWords.length) return;
        setWordIndex(nextIndex % safeWords.length);
        setPhase("typing");
      }
      return;
    }
  }, [safeWords, wordIndex, text, phase, typingMs, deletingMs, holdMs, loop]);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  return (
    <span className={className} aria-live="polite" aria-label={safeWords[wordIndex % safeWords.length]}>
      {text}
      <span className={cursorClassName || "ml-1 inline-block w-[1ch] animate-pulse"}>|</span>
    </span>
  );
}


