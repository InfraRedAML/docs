"use client";

import { useCallback, useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);
  return (
    <button
      type="button"
      onClick={copy}
      className="absolute right-2 top-2 rounded border border-slate-600 bg-slate-200 px-2 py-1 text-xs text-slate-1100 hover:bg-slate-300"
      aria-label="Copy to clipboard"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
