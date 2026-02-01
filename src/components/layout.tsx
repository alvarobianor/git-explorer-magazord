import * as React from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("min-h-screen bg-background", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Layout.displayName = "Layout";

interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  username?: string;
}

const LayoutHeader = React.forwardRef<HTMLElement, LayoutHeaderProps>(
  ({ className, username, ...props }, ref) => {
    const navigate = useNavigate();

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full bg-[#24292E] px-4 py-0 h-[72px] flex items-center shadow-md",
          className,
        )}
        {...props}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <svg
                className="w-8 h-8 text-white"
                viewBox="324 24 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M336 24C329.37 24 324 29.37 324 36C324 41.31 327.435 45.795 332.205 47.385C332.805 47.49 333.03 47.13 333.03 46.815C333.03 46.53 333.015 45.585 333.015 44.58C330 45.135 329.22 43.845 328.98 43.17C328.845 42.825 328.26 41.76 327.75 41.475C327.33 41.25 326.73 40.695 327.735 40.68C328.68 40.665 329.355 41.55 329.58 41.91C330.66 43.725 332.385 43.215 333.075 42.9C333.18 42.12 333.495 41.595 333.84 41.295C331.17 40.995 328.38 39.96 328.38 35.37C328.38 34.065 328.845 32.985 329.61 32.145C329.49 31.845 329.07 30.615 329.73 28.965C329.73 28.965 330.735 28.65 333.03 30.195C333.99 29.925 335.01 29.79 336.03 29.79C337.05 29.79 338.07 29.925 339.03 30.195C341.325 28.635 342.33 28.965 342.33 28.965C342.99 30.615 342.57 31.845 342.45 32.145C343.215 32.985 343.68 34.05 343.68 35.37C343.68 39.975 340.875 40.995 338.205 41.295C338.64 41.67 339.015 42.39 339.015 43.515C339.015 45.12 339 46.41 339 46.815C339 47.13 339.225 47.505 339.825 47.385C342.207 46.5807 344.277 45.0497 345.744 43.0074C347.21 40.965 347.999 38.5143 348 36C348 29.37 342.63 24 336 24Z"
                  fill="white"
                />
              </svg>
              <div className="flex items-center text-[22px] text-white leading-none">
                <span className="font-bold tracking-tight">GitHub</span>
                {username && (
                  <>
                    <span className="mx-3 font-extralight opacity-40">/</span>
                    <span className="font-normal opacity-80">{username}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  },
);
LayoutHeader.displayName = "LayoutHeader";

const LayoutMain = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main ref={ref} className={cn("flex-1", className)} {...props} />
));
LayoutMain.displayName = "LayoutMain";

const LayoutSidebar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn("w-full md:w-64 lg:w-80", className)}
    {...props}
  />
));
LayoutSidebar.displayName = "LayoutSidebar";

const LayoutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container mx-auto px-4 py-6", className)}
    {...props}
  />
));
LayoutContent.displayName = "LayoutContent";

interface LayoutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const LayoutGrid = React.forwardRef<HTMLDivElement, LayoutGridProps>(
  (
    { className, cols = { mobile: 1, tablet: 2, desktop: 3 }, ...props },
    ref,
  ) => {
    const gridClasses = cn(
      "grid gap-4",
      cols.mobile && `grid-cols-${cols.mobile}`,
      cols.tablet && `md:grid-cols-${cols.tablet}`,
      cols.desktop && `lg:grid-cols-${cols.desktop}`,
      className,
    );

    return <div ref={ref} className={gridClasses} {...props} />;
  },
);
LayoutGrid.displayName = "LayoutGrid";

export {
  Layout,
  LayoutHeader,
  LayoutMain,
  LayoutSidebar,
  LayoutContent,
  LayoutGrid,
};
