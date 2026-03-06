import Markdoc, { type Config } from "@markdoc/markdoc";
import { tags } from "@/markdoc/tags";
import { nodes } from "@/markdoc/nodes";

export const markdocConfig: Config = {
  tags: tags as unknown as NonNullable<Config["tags"]>,
  nodes: nodes as unknown as NonNullable<Config["nodes"]>,
};

export function parseAndTransform(content: string) {
  const ast = Markdoc.parse(content);
  return Markdoc.transform(ast, markdocConfig);
}
