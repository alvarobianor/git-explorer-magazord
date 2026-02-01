import * as React from "react";
import { cn } from "@/lib/utils";
import { Star, GitFork } from "lucide-react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const RepositoryCardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white border-b border-[#F4F4F4] py-6 px-6 first:pt-6 last:border-b-0 last:pb-6 hover:bg-gray-50/50 transition-all duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
RepositoryCardRoot.displayName = "RepositoryCard";

interface HeaderProps {
  owner: string;
  name: string;
  className?: string;
}

const RepositoryCardHeader: React.FC<HeaderProps> = ({
  owner,
  name,
  className,
}) => (
  <div className={cn("mb-3", className)}>
    <div className="inline-flex items-baseline gap-1">
      <span className="text-[#262626] text-base font-normal leading-tight">
        {owner}
      </span>
      <span className="text-[#262626] text-base font-normal leading-tight">
        /
      </span>
      <span className="text-[#0587FF] text-base font-semibold leading-tight">
        {name}
      </span>
    </div>
  </div>
);

interface DescriptionProps {
  description?: string | null;
  className?: string;
}

const RepositoryCardDescription: React.FC<DescriptionProps> = ({
  description,
  className,
}) => {
  if (!description) return null;
  return (
    <p
      className={cn(
        "text-[#989898] text-sm leading-relaxed line-clamp-2 mb-4",
        className,
      )}
    >
      {description}
    </p>
  );
};

interface StatsProps {
  stars: number;
  forks: number;
  language?: string | null;
  className?: string;
}

const RepositoryCardStats: React.FC<StatsProps> = ({
  stars,
  forks,
  language,
  className,
}) => (
  <div className={cn("flex items-center gap-4", className)}>
    {language && (
      <span className="inline-flex items-center text-[#262626] text-sm font-medium">
        {language}
      </span>
    )}
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 text-[#989898]" />
      <span className="text-[#989898] text-sm font-normal">
        {stars.toLocaleString()}
      </span>
    </div>
    <div className="flex items-center gap-1.5">
      <GitFork className="w-4 h-4 text-[#989898]" />
      <span className="text-[#989898] text-sm font-normal">
        {forks.toLocaleString()}
      </span>
    </div>
  </div>
);

export {
  RepositoryCardRoot as RepositoryCard,
  RepositoryCardHeader,
  RepositoryCardDescription,
  RepositoryCardStats,
};
