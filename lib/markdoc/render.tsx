import React from "react";
import Markdoc from "@markdoc/markdoc";
import { parseAndTransform } from "./config";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Tabs } from "@/components/docs/Tabs";
import { Step } from "@/components/docs/Step";
import { ApiRequest } from "@/components/docs/ApiRequest";
import { ApiResponse } from "@/components/docs/ApiResponse";
import { Heading } from "@/components/docs/Heading";

const components: Record<string, React.ComponentType<any>> = {
  callout: Callout,
  codeblock: CodeBlock,
  "code-block": CodeBlock,
  tabs: Tabs,
  step: Step,
  apirequest: ApiRequest,
  "api-request": ApiRequest,
  apiresponse: ApiResponse,
  "api-response": ApiResponse,
  heading: Heading,
  Heading,
};

export function renderMarkdoc(content: string): React.ReactElement {
  const ast = parseAndTransform(content);
  return Markdoc.renderers.react(ast, React, { components }) as React.ReactElement;
}
