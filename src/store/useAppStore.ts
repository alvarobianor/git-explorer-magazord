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

  // Pagination state
  currentPage: number;
  itemsPerPage: number;

  // Actions
  setCurrentUser: (username: string) => void;
  setUserData: (user: GitHubUser | null) => void;
  setActiveTab: (tab: TabType) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: FilterType) => void;
  setSortType: (sort: SortType) => void;
  setLanguageFilter: (language: string | null) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
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
      currentPage: 1,
      itemsPerPage: 10,

      // Actions
      setCurrentUser: (username) => set({ currentUser: username }),

      setUserData: (user) => set({ userData: user }),

      setActiveTab: (tab) => set({ activeTab: tab, currentPage: 1 }),

      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

      setFilterType: (filter) => set({ filterType: filter, currentPage: 1 }),

      setSortType: (sort) => set({ sortType: sort }),

      setLanguageFilter: (language) =>
        set({ languageFilter: language, currentPage: 1 }),

      setCurrentPage: (page) => set({ currentPage: page }),

      setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),

      resetFilters: () =>
        set({
          filterType: "all",
          sortType: "updated",
          searchQuery: "",
          languageFilter: null,
          currentPage: 1,
        }),
    }),
    { name: "app-store" },
  ),
);
