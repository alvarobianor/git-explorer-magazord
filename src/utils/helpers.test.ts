import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  formatRelativeTime,
  formatCompactNumber,
  formatBytes,
  getLanguageColor,
  truncateText,
  isValidGitHubUsername,
  parseRepoFullName,
  debounce,
} from "./helpers";

describe("helpers", () => {
  describe("formatRelativeTime", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      const date = new Date("2024-01-01T12:00:00Z");
      vi.setSystemTime(date);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("formats 2 days ago", () => {
      const pastDate = new Date("2023-12-30T12:00:00Z").toISOString();
      expect(formatRelativeTime(pastDate)).toBe("2 days ago");
    });

    it("formats 1 hour ago", () => {
      const pastDate = new Date("2024-01-01T11:00:00Z").toISOString();
      expect(formatRelativeTime(pastDate)).toBe("1 hour ago");
    });

    it("formats just now", () => {
      const nowDate = new Date("2024-01-01T11:59:59Z").toISOString();
      expect(formatRelativeTime(nowDate)).toBe("just now");
    });
  });

  describe("formatCompactNumber", () => {
    it("formats thousands", () => {
      expect(formatCompactNumber(1200)).toBe("1.2k");
    });

    it("formats millions", () => {
      expect(formatCompactNumber(2500000)).toBe("2.5M");
    });

    it("formats small numbers", () => {
      expect(formatCompactNumber(500)).toBe("500");
    });
  });

  describe("formatBytes", () => {
    it("formats bytes", () => {
      expect(formatBytes(512)).toBe("512 Bytes");
    });

    it("formats KB", () => {
      expect(formatBytes(1024)).toBe("1 KB");
    });

    it("formats MB", () => {
      expect(formatBytes(1048576)).toBe("1 MB");
    });
  });

  describe("getLanguageColor", () => {
    it("returns correct color for JavaScript", () => {
      expect(getLanguageColor("JavaScript")).toBe("#f1e05a");
    });

    it("returns default color for unknown language", () => {
      expect(getLanguageColor("Unknown")).toBe("#8b949e");
    });
  });

  describe("truncateText", () => {
    it("truncates long text", () => {
      expect(truncateText("Hello World", 5)).toBe("Hello...");
    });

    it("does not truncate short text", () => {
      expect(truncateText("Hello", 10)).toBe("Hello");
    });
  });

  describe("isValidGitHubUsername", () => {
    it("validates correct usernames", () => {
      expect(isValidGitHubUsername("octocat")).toBe(true);
      expect(isValidGitHubUsername("my-repo-123")).toBe(true);
    });

    it("rejects invalid usernames", () => {
      expect(isValidGitHubUsername("-invalid")).toBe(false);
      expect(isValidGitHubUsername("invalid-")).toBe(false);
      expect(
        isValidGitHubUsername(
          "very-long-username-that-exceeds-thirty-nine-characters-limit",
        ),
      ).toBe(false);
    });
  });

  describe("parseRepoFullName", () => {
    it("parses full name correctly", () => {
      expect(parseRepoFullName("facebook/react")).toEqual({
        owner: "facebook",
        repo: "react",
      });
    });
  });

  describe("debounce", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("debounces calls", () => {
      const callback = vi.fn();
      const debounced = debounce(callback, 100);

      debounced();
      debounced();
      debounced();

      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
