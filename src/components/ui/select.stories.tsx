import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";
import * as React from "react";

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "all", label: "All Repositories" },
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "forks", label: "Forks" },
  { value: "archived", label: "Archived" },
];

export const Default: Story = {
  args: {
    options,
    value: "all",
    placeholder: "Type",
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <div className="w-[400px] h-[300px] flex items-start justify-center pt-10">
        <Select
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v);
            args.onChange?.(v);
          }}
        />
      </div>
    );
  },
};

export const Language: Story = {
  args: {
    options: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
    ],
    value: "typescript",
    placeholder: "Language",
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <div className="w-[400px] h-[300px] flex items-start justify-center pt-10">
        <Select
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v);
            args.onChange?.(v);
          }}
        />
      </div>
    );
  },
};
