"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";

export function CodeBlock({
  language = "text",
  title,
  children,
}: {
  language?: string;
  title?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLPreElement>(null);
  const [text, setText] = useState(
    typeof children === "string" ? children.trim() : ""
  );
  useEffect(() => {
    if (typeof children !== "string" && ref.current) {
      setText(ref.current.textContent ?? "");
    }
  }, [children]);
  const code = typeof children === "string" ? String(children).trim() : text;
  return (
    <div className="my-4">
      {title && (
        <div className="rounded-t-lg border border-b-0 border-slate-600 bg-slate-400 px-3 py-2 text-base font-medium text-slate-1200">
          {title}
        </div>
      )}
      <div className="relative">
        <CopyButton text={code} />
        <pre
          ref={ref}
          className={`overflow-x-auto rounded-lg border border-slate-600 bg-slate-1200 p-4 text-base text-gray-100 ${
            title ? "rounded-t-none" : ""
          }`}
        >
          <code data-language={language}>
            {typeof children === "string" ? children.trim() : children}
          </code>
        </pre>
      </div>
    </div>
  );
}
