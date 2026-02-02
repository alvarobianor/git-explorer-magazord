import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RepositoryFilters } from "./RepositoryFilters";

describe("RepositoryFilters", () => {
  const defaultProps = {
    searchQuery: "",
    setSearchQuery: vi.fn(),
    filterType: "all" as const,
    setFilterType: vi.fn(),
    languageFilter: null,
    setLanguageFilter: vi.fn(),
  };

  it("renders correctly", () => {
    const { container } = render(<RepositoryFilters {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search Here")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Type")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Language")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls setSearchQuery on input change", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search Here");
    fireEvent.change(input, { target: { value: "react" } });
    expect(defaultProps.setSearchQuery).toHaveBeenCalledWith("react");
  });

  it("calls setFilterType on select change", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const selects = screen.getAllByRole("combobox");
    const typeSelect = selects[0];
    fireEvent.change(typeSelect, { target: { value: "public" } });
    expect(defaultProps.setFilterType).toHaveBeenCalledWith("public");
  });

  it("calls setLanguageFilter on language select change", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const selects = screen.getAllByRole("combobox");
    const langSelect = selects[1];
    fireEvent.change(langSelect, { target: { value: "JavaScript" } });
    expect(defaultProps.setLanguageFilter).toHaveBeenCalledWith("JavaScript");
  });
});
