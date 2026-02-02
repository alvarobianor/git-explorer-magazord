import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { githubService } from "./github.service";

// Mock axios
vi.mock("axios", () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
    },
    ...mockAxiosInstance,
  };
});

describe("githubService", () => {
  const mockUser = {
    login: "octocat",
    name: "The Octocat",
    public_repos: 8,
  };

  const mockRepo = {
    id: 1,
    name: "hello-world",
    stargazers_count: 100,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUser", () => {
    it("fetches user data successfully", async () => {
      const axiosInstance = axios.create();
      vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: mockUser });

      const user = await githubService.getUser("octocat");

      expect(user).toEqual(mockUser);
      expect(axiosInstance.get).toHaveBeenCalledWith("/users/octocat");
    });
  });

  describe("getUserRepositories", () => {
    it("fetches repositories with default params", async () => {
      const axiosInstance = axios.create();
      vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: [mockRepo] });

      const repos = await githubService.getUserRepositories("octocat");

      expect(repos).toEqual([mockRepo]);
      expect(axiosInstance.get).toHaveBeenCalledWith("/users/octocat/repos", {
        params: {
          type: "all",
          sort: "updated",
          page: 1,
          per_page: 30,
        },
      });
    });

    it("fetches repositories with custom params", async () => {
      const axiosInstance = axios.create();
      vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: [mockRepo] });

      await githubService.getUserRepositories(
        "octocat",
        "public",
        "name",
        2,
        10,
      );

      expect(axiosInstance.get).toHaveBeenCalledWith("/users/octocat/repos", {
        params: {
          type: "public",
          sort: "name",
          page: 2,
          per_page: 10,
        },
      });
    });
  });

  describe("getUserStarredRepos", () => {
    it("fetches starred repositories successfully", async () => {
      const axiosInstance = axios.create();
      vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: [mockRepo] });

      const starred = await githubService.getUserStarredRepos("octocat", 1, 10);

      expect(starred).toEqual([mockRepo]);
      expect(axiosInstance.get).toHaveBeenCalledWith("/users/octocat/starred", {
        params: {
          page: 1,
          per_page: 10,
        },
      });
    });
  });
});
