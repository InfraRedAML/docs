import { Callout } from "@/components/docs/Callout";

export const callout = {
  render: Callout,
  attributes: {
    type: { type: String, default: "note" },
    title: { type: String },
  },
};
