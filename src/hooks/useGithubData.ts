import { useQuery } from "@tanstack/react-query";
import { githubService } from "../services/github.service";
import type { FilterType, SortType } from "../types/github";

/**
 * Hook to fetch user data
 */
export const useUser = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => githubService.getUser(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch user repositories
 */
export const useUserRepositories = (
  username: string,
  type: FilterType = "all",
  sort: SortType = "updated",
  page: number = 1,
  perPage: number = 30,
) => {
  return useQuery({
    queryKey: ["repositories", username, type, sort, page, perPage],
    queryFn: () =>
      githubService.getUserRepositories(username, type, sort, page, perPage),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook to fetch user starred repositories
 */
export const useStarredRepositories = (
  username: string,
  page: number = 1,
  perPage: number = 30,
) => {
  return useQuery({
    queryKey: ["starred", username, page, perPage],
    queryFn: () => githubService.getUserStarredRepos(username, page, perPage),
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};
