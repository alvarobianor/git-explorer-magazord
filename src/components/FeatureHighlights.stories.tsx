import type { Meta, StoryObj } from "@storybook/react";
import { FeatureHighlights } from "./FeatureHighlights";

const meta = {
  title: "Components/FeatureHighlights",
  component: FeatureHighlights,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeatureHighlights>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
