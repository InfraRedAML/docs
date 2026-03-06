"use client";

import Link from "next/link";

const LOGO_URL =
  "https://res.cloudinary.com/dsgseg9bz/image/upload/v1766447860/Logo-Text-Black_t0spik.svg";

export function Logo({
  className = "",
  label = "Docs",
}: {
  className?: string;
  label?: "Docs" | "API";
}) {
  const href = label === "API" ? "/docs/api-reference" : "/docs";
  return (
    <Link
      href={href}
      className={`flex max-w-[140px] items-center gap-2 ${className}`}
      aria-label={label === "API" ? "InfraRed API" : "InfraRed Documentation"}
    >
      <img src={LOGO_URL} alt="InfraRed" className="h-8 w-auto" />
      <span className="font-bold text-orange-1000 text-lg">{label}</span>
    </Link>
  );
}
