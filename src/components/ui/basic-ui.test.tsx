import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";
import { Input } from "./input";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Select } from "./select";
import { cn } from "@/lib/utils";

describe("UI Components", () => {
  describe("Button", () => {
    it("renders correctly with different variants", () => {
      const { rerender, container } = render(<Button>Default</Button>);
      expect(screen.getByText("Default")).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();

      rerender(<Button variant="destructive">Destructive</Button>);
      expect(screen.getByText("Destructive")).toHaveClass("bg-destructive");
    });
  });

  describe("Input", () => {
    it("renders correctly", () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });
  });

  describe("Avatar", () => {
    it("renders image and fallback correctly", () => {
      const { rerender } = render(
        <Avatar>
          <AvatarImage src="https://github.com/octocat.png" />
          <AvatarFallback>OC</AvatarFallback>
        </Avatar>,
      );
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", "https://github.com/octocat.png");

      rerender(
        <Avatar>
          <AvatarFallback>OC</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByText("OC")).toBeInTheDocument();
    });
  });

  describe("Select", () => {
    it("renders and selects options correctly", () => {
      const onChange = vi.fn();
      const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ];

      const { container } = render(
        <Select options={options} value="1" onChange={onChange} />,
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();

      const trigger = screen.getByRole("combobox");
      fireEvent.click(trigger);

      expect(screen.getByText("Option 2")).toBeInTheDocument();

      const option2 = screen.getByText("Option 2");
      fireEvent.click(option2);

      expect(onChange).toHaveBeenCalledWith("2");
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe("cn utility", () => {
    it("merges class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
      expect(cn("class1", false && "class2")).toBe("class1");
      expect(cn("px-2 py-2", "p-4")).toBe("p-4"); // twMerge behavior
    });
  });
});
