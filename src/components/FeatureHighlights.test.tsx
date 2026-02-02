import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureHighlights } from "./FeatureHighlights";

describe("FeatureHighlights", () => {
  it("renders all highlights correctly", () => {
    const { container } = render(<FeatureHighlights />);
    expect(screen.getByText("Repo Lists")).toBeInTheDocument();
    expect(screen.getByText("Starred Repos")).toBeInTheDocument();
    expect(screen.getByText("User Bios")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
