import { RepositoryFilters } from "@/components/RepositoryFilters";
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
import { Button } from "@/components/ui/button";
import { BookMarked, FolderGit2, Github } from "lucide-react";
import { RepositoryList } from "@/components/RepositoryList";
import { cn } from "@/lib/utils";
import { ProfileSkeleton } from "@/components/ui/skeleton";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const MainExplorer = () => {
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
                      email={user.email}
                      x={user.twitter_username}
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

                <RepositoryFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterType={filterType}
                  setFilterType={setFilterType}
                  languageFilter={languageFilter}
                  setLanguageFilter={setLanguageFilter}
                />

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
