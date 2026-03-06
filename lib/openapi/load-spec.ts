import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { OpenAPISpec } from "./types";

const specCache = new Map<string, OpenAPISpec>();

export function loadOpenAPISpec(specPath: string | null): OpenAPISpec | null {
  if (!specPath) return null;
  const cached = specCache.get(specPath);
  if (cached) return cached;
  if (!fs.existsSync(specPath)) return null;
  const raw = fs.readFileSync(specPath, "utf-8");
  const ext = path.extname(specPath).toLowerCase();
  const parsed =
    ext === ".json"
      ? (JSON.parse(raw) as OpenAPISpec)
      : (yaml.load(raw) as OpenAPISpec);
  specCache.set(specPath, parsed);
  return parsed;
}
