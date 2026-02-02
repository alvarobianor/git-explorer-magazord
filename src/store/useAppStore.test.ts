import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    // Reset store to initial state
    useAppStore.setState({
      currentUser: "facebook",
      userData: null,
      activeTab: "repositories",
      searchQuery: "",
      filterType: "all",
      sortType: "updated",
      languageFilter: null,
      currentPage: 1,
      itemsPerPage: 10,
    });
  });

  it("has correct initial state", () => {
    const state = useAppStore.getState();

    expect(state.currentUser).toBe("facebook");
    expect(state.activeTab).toBe("repositories");
    expect(state.currentPage).toBe(1);
    expect(state.itemsPerPage).toBe(10);
    expect(state.filterType).toBe("all");
    expect(state.sortType).toBe("updated");
  });

  it("updates current user", () => {
    const { setCurrentUser } = useAppStore.getState();

    setCurrentUser("google");
    expect(useAppStore.getState().currentUser).toBe("google");
  });

  it("updates current page", () => {
    const { setCurrentPage } = useAppStore.getState();

    setCurrentPage(5);
    expect(useAppStore.getState().currentPage).toBe(5);
  });

  it("resets to page 1 when changing active tab", () => {
    const { setActiveTab, setCurrentPage } = useAppStore.getState();

    setCurrentPage(5);
    expect(useAppStore.getState().currentPage).toBe(5);

    setActiveTab("starred");
    expect(useAppStore.getState().currentPage).toBe(1);
    expect(useAppStore.getState().activeTab).toBe("starred");
  });

  it("resets to page 1 when changing search query", () => {
    const { setSearchQuery, setCurrentPage } = useAppStore.getState();

    setCurrentPage(3);
    expect(useAppStore.getState().currentPage).toBe(3);

    setSearchQuery("react");
    expect(useAppStore.getState().currentPage).toBe(1);
    expect(useAppStore.getState().searchQuery).toBe("react");
  });

  it("resets filters correctly", () => {
    const { setFilterType, setSortType, setSearchQuery, resetFilters } =
      useAppStore.getState();

    setFilterType("private");
    setSortType("stars");
    setSearchQuery("test");

    expect(useAppStore.getState().filterType).toBe("private");
    expect(useAppStore.getState().sortType).toBe("stars");
    expect(useAppStore.getState().searchQuery).toBe("test");

    resetFilters();

    expect(useAppStore.getState().filterType).toBe("all");
    expect(useAppStore.getState().sortType).toBe("updated");
    expect(useAppStore.getState().searchQuery).toBe("");
    expect(useAppStore.getState().currentPage).toBe(1);
  });
});
