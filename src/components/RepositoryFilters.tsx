import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Search } from "lucide-react";
import type { FilterType } from "../types/github";
import { useState, useEffect, useMemo } from "react";
import { debounce } from "../utils/helpers";

interface RepositoryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
  languageFilter: string | null;
  setLanguageFilter: (language: string | null) => void;
}

export const RepositoryFilters = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  languageFilter,
  setLanguageFilter,
}: RepositoryFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 2000),
    [setSearchQuery],
  );

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSetSearch(value);
  };
  const typeFilters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "forks", label: "Forks" },
    { value: "archived", label: "Archived" },
  ];

  const languageFilters = [
    { value: "", label: "All Languages" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "CSS", label: "CSS" },
    { value: "Rust", label: "Rust" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57606a]" />
        <Input
          placeholder="Search Here"
          className="pl-10 h-10 border-[#d0d7de] rounded-md focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#0969da]"
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex gap-4 w-full sm:w-auto">
        <Select
          options={typeFilters}
          value={filterType}
          onChange={(val) => setFilterType(val as FilterType)}
          placeholder="Type"
          className="flex-1 sm:flex-none"
        />

        <Select
          options={languageFilters}
          value={languageFilter || ""}
          onChange={(val) => setLanguageFilter(val || null)}
          placeholder="Language"
          className="flex-1 sm:flex-none"
        />
      </div>
    </div>
  );
};
