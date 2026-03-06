import type { OpenAPISpec, ApiOperation } from "./types";

export interface ApiRefSlug {
  slug: string[];
  method: string;
  path: string;
  operationId?: string;
}

export function getApiRefSlugs(spec: OpenAPISpec | null): ApiRefSlug[] {
  if (!spec?.paths) return [];
  const slugs: ApiRefSlug[] = [];
  for (const [pathKey, pathItem] of Object.entries(spec.paths)) {
    if (!pathItem || typeof pathItem !== "object") continue;
    for (const method of ["get", "post", "put", "patch", "delete"] as const) {
      const op = pathItem[method];
      if (!op) continue;
      const pathSegments = pathKey.split("/").filter(Boolean);
      const slug = ["api", ...pathSegments, method];
      slugs.push({
        slug,
        method: method.toUpperCase(),
        path: pathKey,
        operationId: op.operationId,
      });
    }
  }
  return slugs;
}

export function getOperationBySlug(
  spec: OpenAPISpec | null,
  slug: string[]
): ApiOperation | null {
  if (!spec?.paths || slug.length < 3) return null;
  const segments = slug[0] === "api" ? slug.slice(1) : slug;
  const method = segments[segments.length - 1]?.toLowerCase();
  const pathSegments = segments.slice(0, -1);
  const pathKey = "/" + pathSegments.join("/");
  const pathItem = spec.paths[pathKey];
  if (!pathItem || !method) return null;
  const op = pathItem[method as keyof typeof pathItem];
  if (!op || typeof op !== "object") return null;
  const parameters = resolveRefs(spec, op.parameters);
  return {
    method: method.toUpperCase(),
    path: pathKey,
    operationId: op.operationId,
    summary: op.summary,
    description: op.description,
    tags: op.tags,
    parameters,
    requestBody: op.requestBody,
    responses: op.responses,
  };
}

function resolveRefs(spec: OpenAPISpec, arr: unknown[] | undefined): unknown[] {
  if (!arr?.length || !spec.components) return arr ?? [];
  const components = spec.components as Record<string, Record<string, unknown>>;
  return arr.map((item) => {
    const ref = (item as { $ref?: string })?.$ref;
    if (!ref || !ref.startsWith("#/components/")) return item;
    const parts = ref.split("/").slice(2);
    let current: unknown = components;
    for (const key of parts) {
      current = (current as Record<string, unknown>)?.[key];
    }
    return current ?? item;
  });
}

export function getApiRefNavItems(
  spec: OpenAPISpec | null
): { title: string; href: string }[] {
  return getApiRefSlugs(spec).map(({ slug, method, path: p, operationId }) => ({
    title: operationId ?? `${method} ${p}`,
    href: `/docs/${slug.join("/")}`,
  }));
}
