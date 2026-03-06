import type { ReactNode } from "react";

export function Step({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-3 flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-1000 text-xs font-semibold text-white">
        •
      </span>
      <div>
        {title && <p className="font-medium text-slate-1200">{title}</p>}
        <div className="text-slate-1100 [&>p]:mb-1">{children}</div>
      </div>
    </div>
  );
}
