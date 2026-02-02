import type { Meta, StoryObj } from "@storybook/react";
import { RepositoryFilters } from "./RepositoryFilters";
import { useState } from "react";
import type { FilterType } from "@/types/github";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/RepositoryFilters",
  component: RepositoryFilters,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    searchQuery: "",
    setSearchQuery: fn(),
    filterType: "all",
    setFilterType: fn(),
    languageFilter: null,
    setLanguageFilter: fn(),
  },
} satisfies Meta<typeof RepositoryFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [searchQuery, setSearchQuery] = useState(args.searchQuery);
    const [filterType, setFilterType] = useState<FilterType>(args.filterType);
    const [languageFilter, setLanguageFilter] = useState<string | null>(
      args.languageFilter,
    );

    return (
      <div className="w-[800px] p-4 bg-white">
        <RepositoryFilters
          {...args}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
        />
      </div>
    );
  },
};
