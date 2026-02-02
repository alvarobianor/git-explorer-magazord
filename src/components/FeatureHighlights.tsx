import { FolderGit2, Star, Github } from "lucide-react";

export const FeatureHighlights = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in delay-200">
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-[#d0d7de]">
          <FolderGit2 className="w-6 h-6 text-[#0969da]" />
        </div>
        <span className="text-sm font-medium text-[#24292f]">Repo Lists</span>
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
        <span className="text-sm font-medium text-[#24292f]">User Bios</span>
      </div>
    </div>
  );
};
