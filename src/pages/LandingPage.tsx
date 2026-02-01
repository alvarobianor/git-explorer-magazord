import { useState, type FormEvent } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Github, Star, FolderGit2 } from "lucide-react";
import { Layout, LayoutHeader } from "@/components/layout";

export const LandingPage = () => {
  const [inputValue, setInputValue] = useState("");
  const { setCurrentUser, resetFilters } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setCurrentUser(trimmedValue);
      resetFilters();
      navigate(`/${trimmedValue}`);
    }
  };

  return (
    <Layout>
      <LayoutHeader />
      <div className="min-h-[calc(100vh-72px)] bg-[#f6f8fa] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl space-y-8 text-center">
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="bg-[#24292f] p-4 rounded-full shadow-xl">
              <Github className="w-16 h-16 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#24292f] tracking-tight">
                GitHub Explorer
              </h1>
              <p className="text-lg text-[#57606a] max-w-md mx-auto">
                Discover repositories, users, and the amazing world of open
                source.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#d0d7de] animate-slide-up transform transition-all">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#57606a] group-focus-within:text-[#0969da] transition-colors" />
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter GitHub username (e.g. facebook)"
                  className="h-14 pl-12 pr-4 text-lg border-[#d0d7de] rounded-xl focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-[#0969da] transition-all"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 text-lg bg-[#24292f] hover:bg-[#1b1f23] rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Explore Profile
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in delay-200">
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-[#d0d7de]">
                <FolderGit2 className="w-6 h-6 text-[#0969da]" />
              </div>
              <span className="text-sm font-medium text-[#24292f]">
                Repo Lists
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-[#d0d7de]">
                <Star className="w-6 h-6 text-[#e3b341]" />
              </div>
              <span className="text-sm font-medium text-[#24292f]">
                Starred Repos
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-[#d0d7de]">
                <Github className="w-6 h-6 text-[#cf222e]" />
              </div>
              <span className="text-sm font-medium text-[#24292f]">
                User Bios
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
