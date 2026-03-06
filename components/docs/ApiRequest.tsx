"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";

export function ApiRequest({
  method,
  path,
  children,
}: {
  method: string;
  path: string;
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
      <div className="rounded-t-lg border border-b-0 border-slate-600 bg-slate-400 px-3 py-2 text-base">
        <span className="font-semibold text-slate-1200">{method}</span>{" "}
        <span className="text-slate-1100">{path}</span>
      </div>
      <div className="relative">
        <CopyButton text={code} />
        <pre ref={ref} className="overflow-x-auto rounded-b-lg border border-slate-600 bg-slate-1200 p-4 text-base text-gray-100">
          <code>{typeof children === "string" ? children.trim() : children}</code>
        </pre>
      </div>
    </div>
  );
}
