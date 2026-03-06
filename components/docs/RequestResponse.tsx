import type { ReactNode } from "react";

export function RequestResponse({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="my-4 grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}
