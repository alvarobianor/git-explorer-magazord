import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import React from "react";

describe("Tabs", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Tabs>
        <TabsList>
          <TabsTrigger active>Tab 1</TabsTrigger>
          <TabsTrigger>Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent>Content 1</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("applies active styling to the active trigger", () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger active data-testid="active-tab">
            Tab 1
          </TabsTrigger>
          <TabsTrigger data-testid="inactive-tab">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    expect(screen.getByTestId("active-tab")).toHaveClass("bg-background");
    expect(screen.getByTestId("inactive-tab")).not.toHaveClass("bg-background");
  });

  it("handles click events on triggers", () => {
    const handleClick = vi.fn();
    render(<TabsTrigger onClick={handleClick}>Click Me</TabsTrigger>);

    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
