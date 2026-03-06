import { Heading } from "@/components/docs/Heading";

export const heading = {
  render: Heading,
  attributes: {
    id: { type: String },
    level: { type: Number, required: true },
  },
};
