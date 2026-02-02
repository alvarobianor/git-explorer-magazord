import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Layout,
  LayoutHeader,
  LayoutMain,
  LayoutSidebar,
  LayoutContent,
} from "./layout";
import { useNavigate } from "react-router-dom";
import React from "react";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Layout Components", () => {
  it("renders Layout root correctly", () => {
    const { container } = render(<Layout>Content</Layout>);
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders LayoutHeader with username and handles click", () => {
    const mockNavigate = vi.fn();
    (useNavigate as any).mockReturnValue(mockNavigate);

    render(<LayoutHeader username="facebook" />);
    expect(screen.getByText("facebook")).toBeInTheDocument();

    const logoSection = screen.getByText("GitHub").parentElement;
    fireEvent.click(logoSection!);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders LayoutSidebar and LayoutContent", () => {
    render(
      <Layout>
        <LayoutSidebar>Sidebar</LayoutSidebar>
        <LayoutContent>Main Content</LayoutContent>
      </Layout>,
    );
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  it("renders LayoutMain", () => {
    render(<LayoutMain>Main</LayoutMain>);
    expect(screen.getByText("Main")).toBeInTheDocument();
  });
});
