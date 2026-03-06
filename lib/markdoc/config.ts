import Markdoc from "@markdoc/markdoc";
import { tags } from "@/markdoc/tags";
import { nodes } from "@/markdoc/nodes";

export const markdocConfig: Markdoc.Config = {
  tags: tags as Record<string, Markdoc.TagConfig>,
  nodes: nodes as Record<string, Markdoc.NodeConfig>,
};

export function parseAndTransform(content: string) {
  const ast = Markdoc.parse(content);
  return Markdoc.transform(ast, markdocConfig);
}
