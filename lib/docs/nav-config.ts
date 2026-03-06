export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const DOCS_NAV: NavItem[] = [
  { title: "Home", href: "/docs" },
  {
    title: "Extract",
    href: "/docs/document-extraction",
    children: [
      { title: "Overview", href: "/docs/document-extraction" },
      { title: "Upload a Document", href: "/docs/document-extraction/upload" },
      { title: "Extract Data", href: "/docs/document-extraction/extract" },
    ],
  },
];

export const API_NAV_SECTIONS: { title: string; href: string }[] = [
  { title: "Introduction", href: "/docs/api/introduction" },
  { title: "Authentication", href: "/docs/api/authentication" },
  { title: "Errors", href: "/docs/api/errors" },
];
