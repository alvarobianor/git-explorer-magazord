import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";
import { Input } from "./input";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Select } from "./select";
import { cn } from "@/lib/utils";

describe("UI Components", () => {
  describe("Button", () => {
    it("renders correctly", () => {
      const { container } = render(<Button>Click me</Button>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    it("applies variant and size classes", () => {
      const { container } = render(
        <Button variant="destructive" size="sm">
          Delete
        </Button>,
      );
      expect(container.firstChild).toHaveClass("bg-destructive");
      expect(container.firstChild).toHaveClass("h-9");
    });

    it("can be disabled", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("calls onClick when clicked", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByText("Click me"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Input", () => {
    it("renders correctly", () => {
      const { container } = render(<Input placeholder="Search..." />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot();
    });

    it("can be disabled", () => {
      render(<Input disabled placeholder="Disabled" />);
      expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
    });
  });

  describe("Avatar", () => {
    it("renders with image", () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="https://github.com/octocat.png" alt="Octocat" />
          <AvatarFallback>OC</AvatarFallback>
        </Avatar>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("renders fallback when image is missing", () => {
      render(
        <Avatar>
          <AvatarFallback>OC</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByText("OC")).toBeInTheDocument();
    });
  });

  describe("Select", () => {
    it("renders correctly", () => {
      const { container } = render(
        <Select>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>,
      );
      expect(screen.getByText("Option 1")).toBeInTheDocument();
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
