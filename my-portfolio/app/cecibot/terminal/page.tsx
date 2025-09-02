"use client";
import React from "react";
import Terminal from "@/components/cecibot/Terminal";

export default function TerminalPage() {
  return (
    <div className="min-h-[100svh] bg-neutral-950 text-neutral-200">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Terminal />
      </div>
    </div>
  );
}
