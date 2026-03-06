import path from "path";
import fs from "fs";
import yaml from "js-yaml";

const API_SPEC_DIR = path.join(process.cwd(), "..", "api", "spec");

const SPEC_EXTENSIONS = [".yml", ".yaml", ".json"];
const SPEC_PREFIX = "openapi-";

export interface ApiVersion {
  id: string;
  label: string;
}

function discoverSpecFiles(): string[] {
  if (!fs.existsSync(API_SPEC_DIR)) return [];
  const files = fs.readdirSync(API_SPEC_DIR);
  return files.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    const base = path.basename(f, ext);
    return base.startsWith(SPEC_PREFIX) && SPEC_EXTENSIONS.includes(ext);
  });
}

function versionIdFromFileName(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const base = path.basename(fileName, ext);
  return base.slice(SPEC_PREFIX.length) || fileName;
}

function labelFromSpec(specPath: string, fallbackId: string): string {
  try {
    const raw = fs.readFileSync(specPath, "utf-8");
    const ext = path.extname(specPath).toLowerCase();
    const parsed =
      ext === ".json"
        ? (JSON.parse(raw) as Record<string, unknown>)
        : (yaml.load(raw) as Record<string, unknown>);
    const info = parsed?.info as Record<string, unknown> | undefined;
    if (!info) return fallbackId;
    const version = typeof info.version === "string" ? info.version : "";
    const codename =
      typeof (info["x-codename"] ?? info["x_codename"]) === "string"
        ? (info["x-codename"] ?? info["x_codename"]) as string
        : "";
    if (version && codename) return `${version}.${codename}`;
    if (version) return version;
    return fallbackId;
  } catch {
    return fallbackId;
  }
}

export function getApiVersions(): ApiVersion[] {
  const files = discoverSpecFiles();
  const versions: ApiVersion[] = [];
  const seen = new Set<string>();
  for (const file of files) {
    const id = versionIdFromFileName(file);
    if (seen.has(id)) continue;
    seen.add(id);
    const specPath = path.join(API_SPEC_DIR, file);
    const label = labelFromSpec(specPath, id);
    versions.push({ id, label });
  }
  versions.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  return versions;
}

export function getOpenApiSpecPath(versionId: string): string | null {
  for (const ext of SPEC_EXTENSIONS) {
    const fullPath = path.join(API_SPEC_DIR, `${SPEC_PREFIX}${versionId}${ext}`);
    if (fs.existsSync(fullPath)) return fullPath;
  }
  return null;
}

function resolveDefaultSpecPath(): string | null {
  if (process.env.OPENAPI_SPEC_PATH) {
    const envPath = path.isAbsolute(process.env.OPENAPI_SPEC_PATH)
      ? process.env.OPENAPI_SPEC_PATH
      : path.join(process.cwd(), process.env.OPENAPI_SPEC_PATH);
    return envPath;
  }
  const versions = getApiVersions();
  const first = versions[0];
  return first ? getOpenApiSpecPath(first.id) : null;
}

export const OPENAPI_SPEC_PATH = resolveDefaultSpecPath();

export const CONTENT_DIR = "content";
