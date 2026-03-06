"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";

export function ApiResponse({
  status,
  children,
}: {
  status?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLPreElement>(null);
  const [code, setCode] = useState(typeof children === "string" ? children.trim() : "");
  useEffect(() => {
    if (typeof children !== "string" && ref.current) {
      setCode(ref.current.textContent ?? "");
    }
  }, [children]);
  return (
    <div className="my-4">
      {status && (
        <div className="rounded-t-lg border border-b-0 border-slate-600 bg-slate-400 px-3 py-2 text-base text-slate-1200">
          Response {status}
        </div>
      )}
      <div className="relative">
        <CopyButton text={code} />
        <pre
          ref={ref}
          className={`overflow-x-auto border border-slate-600 bg-slate-1200 p-4 text-base text-gray-100 ${
            status ? "rounded-b-lg" : "rounded-lg"
          }`}
        >
          <code>{typeof children === "string" ? children.trim() : children}</code>
        </pre>
      </div>
    </div>
  );
}
