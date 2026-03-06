export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function getHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    if (h2) {
      headings.push({
        id: slugify(h2[1]),
        text: h2[1].trim(),
        level: 2,
      });
    } else if (h3) {
      headings.push({
        id: slugify(h3[1]),
        text: h3[1].trim(),
        level: 3,
      });
    }
  }
  return headings;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
