import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders correctly", () => {
    const { container } = render(<RepositoryFilters {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search Here")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls setSearchQuery on input change after 2 seconds", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search Here");

    fireEvent.change(input, { target: { value: "react" } });

    // Should NOT have been called yet
    expect(defaultProps.setSearchQuery).not.toHaveBeenCalled();

    // Advance timers by 2 seconds
    vi.advanceTimersByTime(2000);

    expect(defaultProps.setSearchQuery).toHaveBeenCalledWith("react");
  });

  it("calls setFilterType on select change immediately", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const selects = screen.getAllByRole("combobox");
    const typeSelect = selects[0];
    fireEvent.change(typeSelect, { target: { value: "public" } });
    expect(defaultProps.setFilterType).toHaveBeenCalledWith("public");
  });

  it("calls setLanguageFilter on language select change immediately", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const selects = screen.getAllByRole("combobox");
    const langSelect = selects[1];
    fireEvent.change(langSelect, { target: { value: "JavaScript" } });
    expect(defaultProps.setLanguageFilter).toHaveBeenCalledWith("JavaScript");
  });
});
