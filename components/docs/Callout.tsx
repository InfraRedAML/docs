"use client";

import type { ReactNode } from "react";

type CalloutType = "note" | "warning" | "tip";

const typeStyles: Record<
  CalloutType,
  { bg: string; border: string; title: string }
> = {
  note: {
    bg: "bg-blue-300",
    border: "border-blue-1000",
    title: "text-blue-1100",
  },
  warning: {
    bg: "bg-orange-300",
    border: "border-orange-1000",
    title: "text-orange-1100",
  },
  tip: {
    bg: "bg-green-500",
    border: "border-green-1100",
    title: "text-green-1100",
  },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const style = typeStyles[type];
  return (
    <div
      className={`my-4 rounded-lg border-l-4 p-4 ${style.bg} ${style.border}`}
      role="note"
    >
      {title && (
        <p className={`mb-2 font-semibold ${style.title}`}>{title}</p>
      )}
      <div className="text-slate-1200 [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
