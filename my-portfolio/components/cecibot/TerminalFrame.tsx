"use client";
import React from "react";
import Link from "next/link";

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
        <div className="flex items-center gap-3 text-[10px] text-neutral-500">
          <Link href="/" className="rounded border border-neutral-700 px-2 py-0.5 text-neutral-300 hover:bg-neutral-800">
            Home
          </Link>
          <span>type 'help' for commands</span>
        </div>
      </div>
      <div className="h-[70vh] sm:h-[72vh] overflow-y-auto p-4 text-sm">{children}</div>
      {footer}
    </div>
  );
}
