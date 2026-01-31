import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  GitHubUser,
  FilterType,
  SortType,
  TabType,
} from "../types/github";

interface AppState {
  // User state
  currentUser: string;
  userData: GitHubUser | null;

  // UI state
  activeTab: TabType;
  searchQuery: string;
  filterType: FilterType;
  sortType: SortType;
  languageFilter: string | null;

  // Actions
  setCurrentUser: (username: string) => void;
  setUserData: (user: GitHubUser | null) => void;
  setActiveTab: (tab: TabType) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: FilterType) => void;
  setSortType: (sort: SortType) => void;
  setLanguageFilter: (language: string | null) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      currentUser: "facebook",
      userData: null,
      activeTab: "repositories",
      searchQuery: "",
      filterType: "all",
      sortType: "updated",
      languageFilter: null,

      // Actions
      setCurrentUser: (username) => set({ currentUser: username }),

      setUserData: (user) => set({ userData: user }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setFilterType: (filter) => set({ filterType: filter }),

      setSortType: (sort) => set({ sortType: sort }),

      setLanguageFilter: (language) => set({ languageFilter: language }),

      resetFilters: () =>
        set({
          filterType: "all",
          sortType: "updated",
          searchQuery: "",
          languageFilter: null,
        }),
    }),
    { name: "app-store" },
  ),
);
