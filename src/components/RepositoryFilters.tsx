import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Search } from "lucide-react";
import type { FilterType } from "../types/github";

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
  const typeFilters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "forks", label: "Forks" },
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white z-10">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="h-[40px] bg-gradient-to-r from-[#0056A6] to-[#0587FF] hover:opacity-90 text-white border-none rounded-full pl-10 pr-6 font-medium cursor-pointer appearance-none text-sm min-w-[105px] w-full transition-all focus:ring-2 focus:ring-[#0969da] focus:ring-offset-2"
          >
            {typeFilters.map((filter) => (
              <option
                key={filter.value}
                value={filter.value}
                className="text-black bg-white"
              >
                {filter.label === "All" ? "Type" : filter.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="relative flex-1 sm:flex-none">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white z-10">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Select
            value={languageFilter || ""}
            onChange={(e) => setLanguageFilter(e.target.value || null)}
            className="h-[40px] bg-gradient-to-r from-[#0056A6] to-[#0587FF] hover:opacity-90 text-white border-none rounded-full pl-10 pr-6 font-medium cursor-pointer appearance-none text-sm min-w-[145px] w-full transition-all focus:ring-2 focus:ring-[#0969da] focus:ring-offset-2"
          >
            {languageFilters.map((lang) => (
              <option
                key={lang.value || "all"}
                value={lang.value}
                className="text-black bg-white"
              >
                {lang.value || "Language"}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
