import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useUser,
  useUserRepositories,
  useStarredRepositories,
  useSearchRepositories,
} from "./useGithubData";
import { githubService } from "../services/github.service";
import React from "react";
import type { GitHubUser, GitHubRepository } from "../types/github";

// Mock the service
vi.mock("../services/github.service", () => ({
  githubService: {
    getUser: vi.fn(),
    getUserRepositories: vi.fn(),
    getUserStarredRepos: vi.fn(),
    searchUserRepositories: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("github hooks", () => {
  const mockUser = {
    login: "octocat",
    name: "The Octocat",
    id: 1,
    public_repos: 10,
  } as GitHubUser;
  const mockRepo = {
    id: 1,
    name: "hello-world",
    full_name: "octocat/hello-world",
  } as GitHubRepository;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useUser", () => {
    it("fetches user data", async () => {
      vi.mocked(githubService.getUser).mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useUser("octocat"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockUser);
      expect(githubService.getUser).toHaveBeenCalledWith("octocat");
    });
  });

  describe("useUserRepositories", () => {
    it("fetches user repositories", async () => {
      vi.mocked(githubService.getUserRepositories).mockResolvedValueOnce([
        mockRepo,
      ]);

      const { result } = renderHook(
        () => useUserRepositories("octocat", "all", "updated", 1, 10),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual([mockRepo]);
      expect(githubService.getUserRepositories).toHaveBeenCalledWith(
        "octocat",
        "all",
        "updated",
        1,
        10,
      );
    });
  });

  describe("useStarredRepositories", () => {
    it("fetches starred repositories", async () => {
      vi.mocked(githubService.getUserStarredRepos).mockResolvedValueOnce([
        mockRepo,
      ]);

      const { result } = renderHook(
        () => useStarredRepositories("octocat", 1, 10),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual([mockRepo]);
      expect(githubService.getUserStarredRepos).toHaveBeenCalledWith(
        "octocat",
        1,
        10,
      );
    });
  });

  describe("useSearchRepositories", () => {
    it("searches user repositories", async () => {
      const mockSearchData = { total_count: 1, items: [mockRepo] };
      vi.mocked(githubService.searchUserRepositories).mockResolvedValueOnce(
        mockSearchData,
      );

      const { result } = renderHook(
        () => useSearchRepositories("octocat", "hello", 1, 10),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockSearchData);
      expect(githubService.searchUserRepositories).toHaveBeenCalledWith(
        "octocat",
        "hello",
        1,
        10,
      );
    });
  });
});
