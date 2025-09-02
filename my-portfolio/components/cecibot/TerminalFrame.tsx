"use client";
import React from "react";

export default function TerminalFrame({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative rounded-lg border border-neutral-800 bg-neutral-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/80">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="inline-block h-2 w-2 rounded-full bg-neutral-500" /> {title}
        </div>
        <div className="text-[10px] text-neutral-500">type 'help' for commands</div>
      </div>
      <div className="h-[70vh] sm:h-[72vh] overflow-y-auto p-4 text-sm">{children}</div>
      {footer}
    </div>
  );
}
