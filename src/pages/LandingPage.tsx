import { Github } from "lucide-react";
import { Layout, LayoutHeader } from "@/components/layout";
import { SearchForm } from "@/components/SearchForm";
import { FeatureHighlights } from "@/components/FeatureHighlights";

export const LandingPage = () => {
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

          <SearchForm />

          <FeatureHighlights />
        </div>
      </div>
    </Layout>
  );
};
