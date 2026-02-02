import type { Meta, StoryObj } from "@storybook/react";
import { SearchForm } from "./SearchForm";
import { MemoryRouter } from "react-router-dom";

const meta = {
  title: "Components/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
