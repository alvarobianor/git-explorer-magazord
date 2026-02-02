import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin, Building2, Link as LinkIcon, Instagram } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect, forwardRef } from "react";

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const UserProfileRoot = forwardRef<HTMLDivElement, UserProfileProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
UserProfileRoot.displayName = "UserProfile";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  className?: string;
}

const UserProfileAvatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  className,
}) => {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  useEffect(() => {
    setImageStatus("loading");
  }, [src]);

  return (
    <div className={cn("relative w-40 h-40 mx-auto", className)}>
      <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl relative bg-white">
        {imageStatus === "loading" && (
          <Skeleton className="w-full h-full absolute inset-0 z-10" />
        )}
        <Avatar className="w-full h-full">
          <AvatarImage
            src={src}
            alt={alt}
            className={cn(
              "object-cover",
              imageStatus === "loading" ? "invisible" : "visible",
            )}
            onLoad={() => setImageStatus("loaded")}
            onError={() => setImageStatus("error")}
          />
          {imageStatus === "error" && (
            <AvatarFallback className="text-4xl bg-red-500 text-white font-bold w-full h-full flex items-center justify-center">
              {fallback}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </div>
  );
};

interface HeaderProps {
  name: string;
  bio?: string | null;
  role?: string | null;
  className?: string;
}

const UserProfileHeader: React.FC<HeaderProps> = ({
  name,
  bio,
  role,
  className,
}) => (
  <div className={cn("text-center space-y-2", className)}>
    <h1 className="text-3xl font-bold text-[#262626]">{name}</h1>
    {role && <p className="text-base text-[#989898] leading-relaxed">{role}</p>}
    {bio && <p className="text-base text-[#989898] leading-relaxed">{bio}</p>}
  </div>
);

interface InfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const UserProfileInfoItem: React.FC<InfoItemProps> = ({
  icon,
  children,
  href,
  className,
}) => {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 text-[#0587FF]",
        href && "hover:text-[#0470d9] transition-colors group cursor-pointer",
        className,
      )}
    >
      {icon}
      <span
        className={cn("text-base font-medium", href && "group-hover:underline")}
      >
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

interface InfoProps {
  location?: string | null;
  company?: string | null;
  website?: string | null;
  followers?: number;
  following?: number;
  instagram?: string | null;
  className?: string;
}

const UserProfileInfo: React.FC<InfoProps> = ({
  location,
  company,
  website,
  instagram,
  className,
}) => (
  <div className={cn("space-y-4 pt-4", className)}>
    {company && (
      <UserProfileInfoItem
        icon={<Building2 className="w-5 h-5 flex-shrink-0" />}
        href="#"
      >
        {company}
      </UserProfileInfoItem>
    )}
    {location && (
      <UserProfileInfoItem icon={<MapPin className="w-5 h-5 flex-shrink-0" />}>
        {location}
      </UserProfileInfoItem>
    )}
    {website && (
      <UserProfileInfoItem
        icon={<LinkIcon className="w-5 h-5 flex-shrink-0" />}
        href={website.startsWith("http") ? website : `https://${website}`}
      >
        {website.replace(/^https?:\/\//, "")}
      </UserProfileInfoItem>
    )}
    {instagram && (
      <UserProfileInfoItem
        icon={<Instagram className="w-5 h-5 flex-shrink-0" />}
        href={`https://instagram.com/${instagram.replace("@", "")}`}
      >
        {instagram}
      </UserProfileInfoItem>
    )}
  </div>
);

interface StatsProps {
  repositories?: number;
  starred?: number;
  className?: string;
}

const UserProfileStats: React.FC<StatsProps> = ({ className }) => (
  <div className={cn("flex items-center justify-center gap-2 pt-6", className)}>
    <div className="w-2 h-2 bg-[#0587FF] rounded-full"></div>
    <div className="w-2 h-2 bg-[#0587FF] rounded-full"></div>
    <div className="w-2 h-2 bg-[#0587FF] rounded-full opacity-50"></div>
  </div>
);

export {
  UserProfileRoot as UserProfile,
  UserProfileAvatar,
  UserProfileHeader,
  UserProfileInfo,
  UserProfileInfoItem,
  UserProfileStats,
};
