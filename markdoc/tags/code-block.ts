import { CodeBlock } from "@/components/docs/CodeBlock";

export const codeblock = {
  render: CodeBlock,
  attributes: {
    language: { type: String, default: "text" },
    title: { type: String },
  },
};
