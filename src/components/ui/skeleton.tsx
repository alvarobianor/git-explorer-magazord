import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

// Profile Skeleton
export function ProfileSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6">
      {/* Avatar Skeleton */}
      <div className="relative w-40 h-40 mx-auto">
        <Skeleton className="w-full h-full rounded-full" />
      </div>

      {/* Name and Bio Skeleton */}
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>

      {/* Info Items Skeleton */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </div>
  );
}

// Repository Card Skeleton
export function RepositoryCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 pt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Language Badge */}
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );
}
