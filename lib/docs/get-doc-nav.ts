import { DOCS_NAV, API_NAV_SECTIONS } from "./nav-config";
import { OPENAPI_SPEC_PATH } from "./config";
import { loadOpenAPISpec } from "@/lib/openapi/load-spec";
import { getApiRefNavItems } from "@/lib/openapi/generate-pages";

export type { NavItem } from "./nav-config";

export type ApiNav = {
  sections: { title: string; href: string }[];
  endpoints: { title: string; href: string }[];
};

function buildApiSections(): { title: string; href: string }[] {
  return API_NAV_SECTIONS.map((s) => ({ title: s.title, href: s.href }));
}

export function getDocNav() {
  return DOCS_NAV;
}

export function getApiNav(): ApiNav {
  const spec = loadOpenAPISpec(OPENAPI_SPEC_PATH);
  return {
    sections: buildApiSections(),
    endpoints: getApiRefNavItems(spec),
  };
}
