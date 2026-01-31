import axios from "axios";
import type {
  GitHubUser,
  GitHubRepository,
  FilterType,
  SortType,
} from "../types/github";

const GITHUB_API_BASE_URL = "https://api.github.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

// Add request interceptor for potential token authentication
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

export const githubService = {
  /**
   * Fetch user information by username
   */
  async getUser(username: string): Promise<GitHubUser> {
    const { data } = await api.get<GitHubUser>(`/users/${username}`);
    return data;
  },

  /**
   * Fetch user repositories with optional filters
   */
  async getUserRepositories(
    username: string,
    type: FilterType = "all",
    sort: SortType = "updated",
    page: number = 1,
    perPage: number = 30,
  ): Promise<GitHubRepository[]> {
    const { data } = await api.get<GitHubRepository[]>(
      `/users/${username}/repos`,
      {
        params: {
          type,
          sort,
          page,
          per_page: perPage,
        },
      },
    );
    return data;
  },

  /**
   * Fetch user starred repositories
   */
  async getUserStarredRepos(
    username: string,
    page: number = 1,
    perPage: number = 30,
  ): Promise<GitHubRepository[]> {
    const { data } = await api.get<GitHubRepository[]>(
      `/users/${username}/starred`,
      {
        params: {
          page,
          per_page: perPage,
        },
      },
    );
    return data;
  },
};
