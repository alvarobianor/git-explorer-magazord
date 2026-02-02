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

  it("calls setFilterType on select change", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const triggers = screen.getAllByRole("combobox");
    const typeTrigger = triggers[0];

    // Open dropdown
    fireEvent.click(typeTrigger);

    // Select 'Public'
    const publicOption = screen.getByText("Public");
    fireEvent.click(publicOption);

    expect(defaultProps.setFilterType).toHaveBeenCalledWith("public");
  });

  it("calls setLanguageFilter on language select change", () => {
    render(<RepositoryFilters {...defaultProps} />);
    const triggers = screen.getAllByRole("combobox");
    const langTrigger = triggers[1];

    // Open dropdown
    fireEvent.click(langTrigger);

    // Select 'JavaScript'
    const jsOption = screen.getByText("JavaScript");
    fireEvent.click(jsOption);

    expect(defaultProps.setLanguageFilter).toHaveBeenCalledWith("JavaScript");
  });
});
