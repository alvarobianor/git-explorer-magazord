import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "./SearchForm";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";

vi.mock("@/store/useAppStore", () => ({
  useAppStore: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("SearchForm", () => {
  const mockSetCurrentUser = vi.fn();
  const mockResetFilters = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppStore as any).mockReturnValue({
      setCurrentUser: mockSetCurrentUser,
      resetFilters: mockResetFilters,
    });
    (useNavigate as any).mockReturnValue(mockNavigate);
  });

  it("renders correctly", () => {
    const { container } = render(<SearchForm />);
    expect(
      screen.getByPlaceholderText(/Enter GitHub username/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Explore Profile/ }),
    ).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("updates input value on change", () => {
    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/Enter GitHub username/);
    fireEvent.change(input, { target: { value: "google" } });
    expect(input).toHaveValue("google");
  });

  it("submits form and navigates when input is valid", () => {
    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/Enter GitHub username/);
    const button = screen.getByRole("button", { name: /Explore Profile/ });

    fireEvent.change(input, { target: { value: "google" } });
    fireEvent.click(button);

    expect(mockSetCurrentUser).toHaveBeenCalledWith("google");
    expect(mockResetFilters).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/google");
  });

  it("does not submit when input is empty", () => {
    render(<SearchForm />);
    const button = screen.getByRole("button", { name: /Explore Profile/ });

    fireEvent.click(button);

    expect(mockSetCurrentUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
