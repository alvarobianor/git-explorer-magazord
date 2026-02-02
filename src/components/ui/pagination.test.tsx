import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

describe("Pagination", () => {
  it("renders snapshot correctly", () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders pagination links", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onClick when pagination link is clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink onClick={handleClick}>2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    await user.click(screen.getByText("2"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies active class to active page", () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const activeLink = container.querySelector('[aria-current="page"]');
    expect(activeLink).toBeInTheDocument();
  });
});
