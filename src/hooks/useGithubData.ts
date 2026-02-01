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
) => {
  return useQuery({
    queryKey: ["repositories", username, type, sort],
    queryFn: () => githubService.getUserRepositories(username, type, sort),
    enabled: !!username,
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
};

/**
 * Hook to fetch user starred repositories
 */
export const useStarredRepositories = (username: string) => {
  return useQuery({
    queryKey: ["starred", username],
    queryFn: () => githubService.getUserStarredRepos(username),
    enabled: !!username,
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
};
