"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function Heading({
  level,
  id: idProp,
  children,
}: {
  level: number;
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => {
    if (ref.current && !idProp) {
      const text = ref.current.textContent ?? "";
      ref.current.id = slugify(text);
    }
  }, [idProp]);
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <Tag ref={ref} id={idProp} className="scroll-mt-20">
      {children}
    </Tag>
  );
}
