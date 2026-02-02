import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  UserProfile,
  UserProfileAvatar,
  UserProfileHeader,
  UserProfileInfo,
  UserProfileInfoItem,
} from "./user-profile";

describe("UserProfile", () => {
  it("renders root container correctly", () => {
    const { container } = render(<UserProfile>Content</UserProfile>);
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders header with name and bio", () => {
    const { container } = render(
      <UserProfileHeader
        name="The Octocat"
        bio="GitHub mascot"
        role="Mascot"
      />,
    );
    expect(screen.getByText("The Octocat")).toBeInTheDocument();
    expect(screen.getByText("GitHub mascot")).toBeInTheDocument();
    expect(screen.getByText("Mascot")).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders info items correctly", () => {
    render(
      <UserProfileInfo
        location="San Francisco"
        company="GitHub"
        website="https://github.com"
        instagram="octocat"
      />,
    );
    expect(screen.getByText("San Francisco")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("github.com")).toBeInTheDocument();
    expect(screen.getByText("octocat")).toBeInTheDocument();
  });

  it("renders avatar component", () => {
    const { container } = render(
      <UserProfileAvatar
        src="https://github.com/octocat.png"
        alt="Octocat"
        fallback="OC"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("transforms website URL correctly in info item", () => {
    render(
      <UserProfileInfoItem icon={<span>Icon</span>} href="http://example.com">
        example.com
      </UserProfileInfoItem>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "http://example.com");
  });
});
