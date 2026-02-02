import { useAppStore } from "../store/useAppStore";
import {
  useUserRepositories,
  useStarredRepositories,
} from "../hooks/useGithubData";
import {
  RepositoryCard,
  RepositoryCardHeader,
  RepositoryCardDescription,
  RepositoryCardStats,
} from "./RepositoryCard";
import { RepositoryCardSkeleton } from "./ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useMemo } from "react";
import type { SortType } from "../types/github";

export const RepositoryList = () => {
  const {
    currentUser,
    activeTab,
    filterType,
    sortType,
    searchQuery,
    languageFilter,
    currentPage,
    itemsPerPage,
    setCurrentPage,
  } = useAppStore();

  const apiSortType = useMemo(() => {
    if (sortType === "name") return "full_name" as SortType;
    if (sortType === "stars") return "updated" as SortType;
    return sortType;
  }, [sortType]);

  const {
    data: repositories,
    isLoading: isLoadingRepos,
    error: reposError,
  } = useUserRepositories(currentUser, filterType, apiSortType, 1, 30);

  const {
    data: starredRepos,
    isLoading: isLoadingStarred,
    error: starredError,
  } = useStarredRepositories(currentUser, 1, 30);

  const isLoading =
    activeTab === "repositories" ? isLoadingRepos : isLoadingStarred;
  const error = activeTab === "repositories" ? reposError : starredError;

  const filteredRepositories = useMemo(() => {
    const sourceData =
      activeTab === "repositories" ? repositories : starredRepos;
    if (!sourceData) return [];

    let filtered = [...sourceData];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query) ||
          repo.topics?.some((topic) => topic.toLowerCase().includes(query)),
      );
    }

    if (filterType !== "all") {
      const typeFilters = {
        forks: (repo: (typeof filtered)[0]) => repo.fork,
        public: (repo: (typeof filtered)[0]) => !repo.private,
        private: (repo: (typeof filtered)[0]) => repo.private,
      };
      const filterFn = typeFilters[filterType as keyof typeof typeFilters];
      if (filterFn) filtered = filtered.filter(filterFn);
    }

    if (languageFilter) {
      filtered = filtered.filter((repo) => repo.language === languageFilter);
    }

    if (sortType === "stars") {
      filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [
    repositories,
    starredRepos,
    activeTab,
    searchQuery,
    filterType,
    languageFilter,
    sortType,
  ]);

  const totalItems = filteredRepositories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedRepositories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRepositories.slice(startIndex, endIndex);
  }, [filteredRepositories, currentPage, itemsPerPage]);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <RepositoryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border border-destructive/20 p-12 text-center rounded-xl">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-destructive"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">
          Failed to Load Repositories
        </h3>
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      </div>
    );
  }

  if (!filteredRepositories || filteredRepositories.length === 0) {
    return (
      <div className="bg-card border border-border p-12 text-center rounded-xl">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">No Repositories Found</h3>
        <p className="text-muted-foreground">
          {searchQuery
            ? `No repositories match "${searchQuery}"`
            : `This user doesn't have any ${activeTab === "starred" ? "starred " : ""}repositories yet.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">{totalItems}</span>{" "}
          {totalItems === 1 ? "repository" : "repositories"}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        {totalPages > 1 && (
          <p className="text-muted-foreground text-sm">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>
      <div>
        {paginatedRepositories.map((repo) => (
          <RepositoryCard key={repo.id} repoUrl={repo.html_url}>
            <RepositoryCardHeader owner={repo.owner.login} name={repo.name} />
            <RepositoryCardDescription description={repo.description} />
            <RepositoryCardStats
              language={repo.language}
              stars={repo.stargazers_count}
              forks={repo.forks_count}
              className="mt-3"
            />
          </RepositoryCard>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 pb-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {pageNumbers.map((page, index) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page as number)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
