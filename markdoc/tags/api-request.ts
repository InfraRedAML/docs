import { ApiRequest } from "@/components/docs/ApiRequest";

export const apirequest = {
  render: ApiRequest,
  attributes: {
    method: { type: String, required: true },
    path: { type: String, required: true },
  },
};
