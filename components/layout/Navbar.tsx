"use client";

import { Logo } from "@/components/layout/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ApiNav } from "@/lib/docs/get-doc-nav";

export function Navbar({ apiNav }: { apiNav?: ApiNav | null }) {
  const pathname = usePathname();
  const isApiSection = pathname?.startsWith("/docs/api");

  return (
    <header className="sticky top-0 z-40 flex h-14 min-w-0 items-center overflow-x-hidden border-b border-slate-300 bg-gray-100 px-4">
      <div className="flex w-full min-w-0 items-center justify-between gap-4">
        <Logo
          className="shrink-0"
          label={isApiSection ? "API" : "Docs"}
        />
        <nav className="flex min-w-0 shrink items-center gap-4">
          <Link
            href="/docs"
            className={`text-base font-medium ${isApiSection
              ? "text-slate-1100 hover:text-slate-1200"
              : "text-blue-1000 underline underline-offset-4"
              }`}
          >
            Docs
          </Link>
          <Link
            href="/docs/api"
            className={`text-base font-medium ${isApiSection
              ? "text-blue-1000 underline underline-offset-4"
              : "text-slate-1100 hover:text-slate-1200"
              }`}
          >
            API
          </Link>
        </nav>
      </div>
    </header>
  );
}
