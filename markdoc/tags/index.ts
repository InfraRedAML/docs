import { callout } from "./callout";
import { codeblock } from "./code-block";
import { tabs } from "./tabs";
import { step } from "./step";
import { apirequest } from "./api-request";
import { apiresponse } from "./api-response";

export const tags = {
  callout,
  "code-block": codeblock,
  codeblock,
  tabs,
  step,
  apirequest: apirequest,
  "api-request": apirequest,
  apiresponse,
  "api-response": apiresponse,
};
