"use client";

import { useState, type ReactNode } from "react";

export function Tabs({
  labels,
  children,
}: {
  labels: string[];
  children: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const childArray = Array.isArray(children) ? children : [children];
  return (
    <div className="my-4">
      <div className="flex border-b border-slate-600">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            className={`border-b-2 px-4 py-2 text-base font-medium ${
              i === active
                ? "border-blue-1000 text-blue-1000"
                : "border-transparent text-slate-1100 hover:text-slate-1200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-2">{childArray[active] ?? null}</div>
    </div>
  );
}
