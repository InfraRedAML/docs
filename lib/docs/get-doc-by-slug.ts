import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface DocFrontmatter {
  title?: string;
  description?: string;
}

export interface DocResult {
  frontmatter: DocFrontmatter;
  body: string;
  slug: string[];
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function parseFrontmatter(raw: string): DocFrontmatter {
  try {
    const parsed = yaml.load(raw) as Record<string, unknown>;
    return {
      title: typeof parsed?.title === "string" ? parsed.title : undefined,
      description:
        typeof parsed?.description === "string" ? parsed.description : undefined,
    };
  } catch {
    return {};
  }
}

function resolveSlugToPath(slug: string[]): string | null {
  if (slug.length === 0) return null;
  const relative = path.join(...slug);
  const withExt = path.join(CONTENT_ROOT, `${relative}.mdoc`);
  if (fs.existsSync(withExt)) return withExt;
  const indexPath = path.join(CONTENT_ROOT, ...slug, "index.mdoc");
  if (fs.existsSync(indexPath)) return indexPath;
  return null;
}

export function getDocBySlug(slug: string[]): DocResult | null {
  const filePath = resolveSlugToPath(slug);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const parts = raw.startsWith("---")
    ? raw.slice(3).split(/\n---\n/, 2)
    : [null, raw];
  const frontmatterRaw = parts[0];
  const body = parts[1]?.trim() ?? raw;
  const frontmatter = frontmatterRaw ? parseFrontmatter(frontmatterRaw) : {};
  return { frontmatter, body, slug };
}

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];
  function walk(dir: string, prefix: string[] = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const name = e.name;
      if (e.isDirectory() && !name.startsWith(".")) {
        walk(path.join(dir, name), [...prefix, name]);
      } else if (e.isFile() && name.endsWith(".mdoc")) {
        const base = name === "index.mdoc" ? prefix : [...prefix, name.replace(/\.mdoc$/, "")];
        if (base.length > 0) slugs.push(base);
      }
    }
  }
  if (fs.existsSync(CONTENT_ROOT)) walk(CONTENT_ROOT);
  return slugs;
}
