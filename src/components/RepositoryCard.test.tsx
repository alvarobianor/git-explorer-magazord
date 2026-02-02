import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  RepositoryCard,
  RepositoryCardHeader,
  RepositoryCardDescription,
  RepositoryCardStats,
} from "./RepositoryCard";

describe("RepositoryCard", () => {
  it("renders snapshot correctly", () => {
    const { container } = render(
      <RepositoryCard repoUrl="https://github.com/facebook/react">
        <RepositoryCardHeader owner="facebook" name="react" />
        <RepositoryCardDescription description="A JavaScript library for building user interfaces" />
        <RepositoryCardStats
          stars={200000}
          forks={40000}
          language="JavaScript"
        />
      </RepositoryCard>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders repository header with owner and name", () => {
    render(
      <RepositoryCard>
        <RepositoryCardHeader owner="facebook" name="react" />
      </RepositoryCard>,
    );

    expect(screen.getByText("facebook")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
  });

  it("renders repository description", () => {
    const description = "A JavaScript library for building user interfaces";
    render(
      <RepositoryCard>
        <RepositoryCardDescription description={description} />
      </RepositoryCard>,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders repository stats", () => {
    render(
      <RepositoryCard>
        <RepositoryCardStats
          stars={200000}
          forks={40000}
          language="JavaScript"
        />
      </RepositoryCard>,
    );

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("200,000")).toBeInTheDocument();
    expect(screen.getByText("40,000")).toBeInTheDocument();
  });

  it("renders as a link when repoUrl is provided", () => {
    const { container } = render(
      <RepositoryCard repoUrl="https://github.com/facebook/react">
        <RepositoryCardHeader owner="facebook" name="react" />
      </RepositoryCard>,
    );

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "https://github.com/facebook/react");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render description when not provided", () => {
    const { container } = render(
      <RepositoryCard>
        <RepositoryCardHeader owner="facebook" name="react" />
        <RepositoryCardDescription description={null} />
      </RepositoryCard>,
    );

    const descriptions = container.querySelectorAll("p");
    expect(descriptions.length).toBe(0);
  });
});
