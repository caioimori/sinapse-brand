"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  label = "COPY",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handle() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* fallback silencioso */
    }
  }

  return (
    <button
      type="button"
      onClick={handle}
      className={cn(
        "group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] px-4 py-2.5 border border-foreground hover:bg-foreground hover:text-background transition-colors magnet",
        copied && "bg-foreground text-background",
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {copied ? "COPIED" : label}
    </button>
  );
}
