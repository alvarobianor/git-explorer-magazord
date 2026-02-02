import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useUser,
  useUserRepositories,
  useStarredRepositories,
} from "./useGithubData";
import { githubService } from "../services/github.service";
import React from "react";

// Mock the service
vi.mock("../services/github.service", () => ({
  githubService: {
    getUser: vi.fn(),
    getUserRepositories: vi.fn(),
    getUserStarredRepos: vi.fn(),
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useUser", () => {
    it("fetches user data", async () => {
      const mockUser = { login: "octocat", name: "The Octocat" };
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
      const mockRepos = [{ id: 1, name: "hello-world" }];
      vi.mocked(githubService.getUserRepositories).mockResolvedValueOnce(
        mockRepos,
      );

      const { result } = renderHook(
        () => useUserRepositories("octocat", "all", "updated", 1, 10),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockRepos);
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
      const mockRepos = [{ id: 1, name: "octo-starred" }];
      vi.mocked(githubService.getUserStarredRepos).mockResolvedValueOnce(
        mockRepos,
      );

      const { result } = renderHook(
        () => useStarredRepositories("octocat", 1, 10),
        {
          wrapper: createWrapper(),
        },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(mockRepos);
      expect(githubService.getUserStarredRepos).toHaveBeenCalledWith(
        "octocat",
        1,
        10,
      );
    });
  });
});
