"use client";
import React from "react";
import { X } from "lucide-react";

export default function TerminalFrame({
  title,
  children,
  footer,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="relative bg-black border border-neutral-800 overflow-hidden font-['JetBrains_Mono',monospace]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          {title && <span className="inline-block h-2 w-2 rounded-full bg-gray-500" />}
          {title}
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <span>type 'help' for commands</span>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded border border-gray-600 p-1 text-gray-200 hover:bg-gray-800 transition-colors"
              aria-label="Close terminal"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
      <div className="h-[70vh] sm:h-[72vh] overflow-y-auto p-4 text-sm bg-black text-green-400">{children}</div>
      {footer}
    </div>
  );
}
