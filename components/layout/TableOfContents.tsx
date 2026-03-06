"use client";

import { useState, useRef, useEffect } from "react";
import type { Heading } from "@/lib/docs/get-headings";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  if (headings.length === 0) return null;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md border border-slate-600 bg-gray-100 px-3 py-2 text-base font-medium text-slate-1100 hover:bg-slate-300 hover:text-slate-1200"
        aria-expanded={open}
        aria-haspopup="true"
      >
        On this page
        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1.5 w-56 rounded-lg border border-slate-600 bg-gray-100 py-2 shadow-lg">
          <ul className="max-h-[min(70vh,400px)] overflow-y-auto px-2">
            {headings.map((h) => (
              <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
                <a
                  href={`#${h.id}`}
                  className="block rounded-md py-1.5 px-2 text-base text-slate-1100 hover:bg-slate-300 hover:text-blue-1000"
                  onClick={() => setOpen(false)}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
