import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { getDocNav, getApiNav } from "@/lib/docs/get-doc-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = getDocNav();
  const apiNav = getApiNav();
  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-hidden bg-gray-100">
      <Navbar apiNav={apiNav} />
      <div className="flex min-w-0">
        <Sidebar nav={nav} apiNav={apiNav} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
