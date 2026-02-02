import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfileSkeleton, RepositoryCardSkeleton, Skeleton } from "./skeleton";

describe("Skeletons", () => {
  it("renders base skeleton correctly", () => {
    const { container } = render(<Skeleton className="h-4 w-4" />);
    expect(container.firstChild).toHaveClass("animate-pulse");
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders ProfileSkeleton correctly", () => {
    const { container } = render(<ProfileSkeleton />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders RepositoryCardSkeleton correctly", () => {
    const { container } = render(<RepositoryCardSkeleton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
