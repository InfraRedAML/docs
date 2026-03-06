"use client";

import type { NavItem } from "@/lib/docs/get-doc-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function HomeIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ExtractIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

type ApiNav = { sections: { title: string; href: string }[]; endpoints: { title: string; href: string }[] };

export function Sidebar({ nav, apiNav }: { nav: NavItem[]; apiNav?: ApiNav | null }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set());
  const isApiSection = pathname?.startsWith("/docs/api-reference");

  useEffect(() => {
    if (!isApiSection) {
      const active = new Set<string>();
      nav.forEach((item) => {
        if (item.children?.some((c) => pathname === c.href) || (item.children && pathname === item.href)) {
          active.add(item.href);
        }
      });
      setOpenSections((prev) => {
        const next = new Set(prev);
        active.forEach((href) => next.add(href));
        return next;
      });
    }
  }, [pathname, nav, isApiSection]);

  const toggle = (href: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  };

  if (isApiSection && apiNav) {
    return (
      <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto bg-slate-200 py-4">
        <nav className="space-y-0.5 px-3">
          <div className="space-y-0.5">
            {apiNav.sections.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.title === "Introduction" && pathname === "/docs/api-reference");
              const icon = item.title === "Introduction" ? <HomeIcon /> : item.title === "Authentication" ? <KeyIcon /> : <ErrorIcon />;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium ${isActive ? "text-blue-1000" : "text-slate-1100 hover:bg-slate-300 hover:text-slate-1200"
                    }`}
                >
                  {icon}
                  {item.title}
                </Link>
              );
            })}
          </div>
          <div className="my-3 border-t border-slate-600" />
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-slate-900">
            API Endpoints
          </p>
          <ul className="space-y-0.5">
            {apiNav.endpoints.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base ${isActive ? "font-medium text-blue-1100" : "text-slate-1100 hover:bg-slate-300 hover:text-slate-1200"
                      }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto bg-slate-200 py-4">
      <nav className="space-y-0.5 px-3">
        {nav.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openSections.has(item.href);
          const isSectionActive = pathname === item.href || (hasChildren && item.children!.some((c) => pathname === c.href));
          const productIcon =
            item.title === "Home" ? <HomeIcon /> :
            item.title === "Extract" ? <ExtractIcon /> : null;

          return (
            <div key={item.href}>
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggle(item.href)}
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium ${isSectionActive ? "bg-blue-300 text-slate-1200" : "text-slate-1100 hover:bg-slate-300 hover:text-slate-1200"
                      }`}
                  >
                    {productIcon}
                    <span className="min-w-0 flex-1">{item.title}</span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <ul className="ml-3 mt-0.5 space-y-0.5 py-1 pl-3">
                      {item.children!.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block rounded-md px-2 py-1.5 text-base ${isChildActive ? "font-medium text-blue-1100" : "text-slate-1100 hover:text-slate-1200"
                                }`}
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium ${isSectionActive ? "bg-blue-300 text-blue-1100" : "text-slate-1100 hover:bg-slate-300 hover:text-slate-1200"
                    }`}
                >
                  {productIcon}
                  {item.title}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
