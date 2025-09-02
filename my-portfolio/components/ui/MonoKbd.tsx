"use client";
import React from "react";

export default function MonoKbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="text-[10px] px-1.5 py-0.5 border border-neutral-700 rounded text-neutral-500">
      {children}
    </kbd>
  );
}