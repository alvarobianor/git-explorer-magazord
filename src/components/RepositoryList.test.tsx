import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { RepositoryList } from "./RepositoryList";
import { useAppStore } from "../store/useAppStore";
import {
  useUser,
  useUserRepositories,
  useStarredRepositories,
} from "../hooks/useGithubData";

// Mock the store
vi.mock("../store/useAppStore", () => ({
  useAppStore: vi.fn(),
}));

// Mock the hooks
vi.mock("../hooks/useGithubData", () => ({
  useUser: vi.fn(),
  useUserRepositories: vi.fn(),
  useStarredRepositories: vi.fn(),
}));

describe("RepositoryList", () => {
  const mockRepos = [
    {
      id: 1,
      name: "react",
      owner: { login: "facebook" },
      description: "A library for UIs",
      stargazers_count: 200000,
      forks_count: 40000,
      language: "JavaScript",
      html_url: "https://github.com/facebook/react",
    },
  ];

  const mockUser = {
    login: "facebook",
    public_repos: 100,
  };

  const defaultStore = {
    currentUser: "facebook",
    activeTab: "repositories",
    filterType: "all",
    sortType: "updated",
    searchQuery: "",
    languageFilter: null,
    itemsPerPage: 10,
    currentPage: 1,
    setCurrentPage: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Default store mock
    (useAppStore as any).mockReturnValue(defaultStore);

    // Default hooks mock
    (useUser as any).mockReturnValue({ data: mockUser });
    (useUserRepositories as any).mockReturnValue({
      data: mockRepos,
      isLoading: false,
    });
    (useStarredRepositories as any).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  it("renders loading skeletons when loading", () => {
    (useUserRepositories as any).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { container } = render(<RepositoryList />);

    // Check for skeletons (RepositoryCardSkeleton)
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders repository cards when data is loaded", () => {
    render(<RepositoryList />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("A library for UIs")).toBeInTheDocument();
    expect(screen.getByText("200,000")).toBeInTheDocument();
  });

  it("renders empty state when no repositories are found", () => {
    (useUserRepositories as any).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<RepositoryList />);

    expect(
      screen.getByText(/This user doesn't have any repositories yet/),
    ).toBeInTheDocument();
  });

  it("calculates total pages correctly", () => {
    (useUser as any).mockReturnValue({ data: { public_repos: 25 } });
    (useAppStore as any).mockReturnValue({
      ...defaultStore,
      itemsPerPage: 10,
      currentPage: 1,
    });

    render(<RepositoryList />);

    expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument();
    expect(screen.getByText(/25/)).toBeInTheDocument();
  });

  it("shows search match message when searchQuery is active", () => {
    (useAppStore as any).mockReturnValue({
      ...defaultStore,
      searchQuery: "react",
    });

    render(<RepositoryList />);

    expect(screen.getByText(/matching "react"/)).toBeInTheDocument();
  });

  it("renders starred repositories when activeTab is starred", () => {
    (useAppStore as any).mockReturnValue({
      ...defaultStore,
      activeTab: "starred",
    });
    (useStarredRepositories as any).mockReturnValue({
      data: mockRepos,
      isLoading: false,
    });

    render(<RepositoryList />);

    expect(screen.getByText("react")).toBeInTheDocument();
  });
});
