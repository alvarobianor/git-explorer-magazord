import { useState, type FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
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
  );
};
