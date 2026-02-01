import { useAppStore } from "@/store/useAppStore";
import { useUser } from "@/hooks/useGithubData";
import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutMain,
  LayoutSidebar,
} from "@/components/layout";
import { UserProfileAvatar, UserProfileInfo } from "@/components/user-profile";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Search, BookMarked, FolderGit2, Github } from "lucide-react";
import { RepositoryList } from "@/components/RepositoryList";
import type { FilterType } from "@/types/github";
import { cn } from "@/lib/utils";
import { ProfileSkeleton } from "@/components/ui/skeleton";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const {
    currentUser,
    setCurrentUser,
    activeTab,
    setActiveTab,
    filterType,
    setFilterType,
    languageFilter,
    setLanguageFilter,
    searchQuery,
    setSearchQuery,
  } = useAppStore();

  useEffect(() => {
    if (username && username !== currentUser) {
      setCurrentUser(username);
    }
  }, [username, currentUser, setCurrentUser]);

  const {
    data: user,
    isLoading,
    error: userError,
  } = useUser(username || currentUser);

  useEffect(() => {
    if (!username && !currentUser) {
      navigate("/");
    }
  }, [username, currentUser, navigate]);

  const typeFilters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "forks", label: "Forks" },
  ];

  const languageFilters = [
    { value: "", label: "All Languages" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "CSS", label: "CSS" },
    { value: "Rust", label: "Rust" },
  ];

  return (
    <Layout className="bg-white min-h-screen">
      <LayoutHeader username={username} />

      <LayoutContent className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        {userError ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="bg-destructive/10 p-4 rounded-full">
              <Github className="w-12 h-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold">User Not Found</h2>
            <p className="text-muted-foreground">
              The user "{username}" does not exist or API limit reached.
            </p>
            <Button onClick={() => navigate("/")}>Go Back to Search</Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            <LayoutSidebar className="lg:w-72 flex-shrink-0">
              {isLoading ? (
                <ProfileSkeleton />
              ) : (
                user && (
                  <div className="flex flex-col space-y-6">
                    <UserProfileAvatar
                      src={user.avatar_url}
                      alt={user.name || user.login}
                      fallback={user.login.substring(0, 2).toUpperCase()}
                      className="!justify-start"
                    />
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-[#24292f] leading-tight">
                        {user.name || user.login}
                      </h2>
                      <p className="text-base text-[#57606a] leading-relaxed">
                        {user.bio}
                      </p>
                    </div>
                    <UserProfileInfo
                      location={user.location}
                      company={user.company}
                      website={user.blog}
                      followers={user.followers}
                      following={user.following}
                      className="!px-0 !py-0 border-none shadow-none text-sm text-[#24292f]"
                    />
                  </div>
                )
              )}
            </LayoutSidebar>

            <LayoutMain className="flex-1 min-w-0">
              <Tabs>
                <div className="border-b border-[#d0d7de] mb-6">
                  <TabsList className="bg-transparent h-auto p-0 gap-8">
                    <TabsTrigger
                      active={activeTab === "repositories"}
                      onClick={() => setActiveTab("repositories")}
                      className={cn(
                        "px-0 py-4 rounded-none border-b-2 bg-transparent shadow-none text-base transition-colors",
                        activeTab === "repositories"
                          ? "border-[#fd8c73] text-[#24292f] font-semibold"
                          : "border-transparent text-[#24292f] hover:border-[#d0d7de]",
                      )}
                    >
                      <FolderGit2 className="w-5 h-5 mr-3 text-[#57606a]" />
                      Repositories
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-[#afb8c1]/20 text-[#24292f]">
                        {user?.public_repos || 0}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      active={activeTab === "starred"}
                      onClick={() => setActiveTab("starred")}
                      className={cn(
                        "px-0 py-4 rounded-none border-b-2 bg-transparent shadow-none text-base transition-colors",
                        activeTab === "starred"
                          ? "border-[#fd8c73] text-[#24292f] font-semibold"
                          : "border-transparent text-[#24292f] hover:border-[#d0d7de]",
                      )}
                    >
                      <BookMarked className="w-5 h-5 mr-3 text-[#57606a]" />
                      Starred
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-[#afb8c1]/20 text-[#24292f]">
                        12
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex flex-col space-y-4 mb-8">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#57606a]" />
                      <Input
                        placeholder="Search Here"
                        className="pl-10 h-10 border-[#d0d7de] rounded-md focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#0969da]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-none">
                        <Select
                          value={filterType}
                          onChange={(e) =>
                            setFilterType(e.target.value as FilterType)
                          }
                          className="h-10 bg-[#0969da] text-white border-none rounded-full px-6 pr-10 font-medium cursor-pointer appearance-none text-sm min-w-[110px] w-full"
                        >
                          {typeFilters.map((filter) => (
                            <option
                              key={filter.value}
                              value={filter.value}
                              className="text-black"
                            >
                              {filter.label}
                            </option>
                          ))}
                        </Select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="relative flex-1 sm:flex-none">
                        <Select
                          value={languageFilter || ""}
                          onChange={(e) =>
                            setLanguageFilter(e.target.value || null)
                          }
                          className="h-10 bg-[#0969da] text-white border-none rounded-full px-6 pr-10 font-medium cursor-pointer appearance-none text-sm min-w-[120px] w-full"
                        >
                          {languageFilters.map((lang) => (
                            <option
                              key={lang.value || "all"}
                              value={lang.value}
                              className="text-black"
                            >
                              {lang.value || "Language"}
                            </option>
                          ))}
                        </Select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <TabsContent className="mt-0 ring-offset-0 focus-visible:ring-0">
                  <RepositoryList />
                </TabsContent>
              </Tabs>
            </LayoutMain>
          </div>
        )}
      </LayoutContent>
    </Layout>
  );
};
