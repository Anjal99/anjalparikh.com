import { describe, expect, it } from "vitest";
import {
  formatDuration,
  getAdjacentEntries,
  getEntry,
  getSeries,
  learningSeries,
} from "./journal";

describe("learning series catalog", () => {
  it("organizes the catalog into Claude BootCamp and Hermes 101", () => {
    expect(learningSeries.map((series) => series.slug)).toEqual([
      "claude-bootcamp",
      "hermes-101",
    ]);
    expect(getSeries("claude-bootcamp")?.entries).toHaveLength(3);
    expect(getSeries("hermes-101")?.entries).toHaveLength(8);
  });

  it("keeps every lesson associated with exactly one series", () => {
    const entries = learningSeries.flatMap((series) => series.entries);
    expect(entries).toHaveLength(11);
    expect(new Set(entries.map((entry) => entry.slug)).size).toBe(11);
    expect(
      entries.every((entry) =>
        learningSeries.some((series) => series.slug === entry.seriesSlug),
      ),
    ).toBe(true);
  });

  it("uses self-hosted sources for the Hermes event lessons", () => {
    const hermes = getSeries("hermes-101");
    expect(hermes?.entries.every((entry) => entry.provider === "self-hosted")).toBe(
      true,
    );
    expect(
      hermes?.entries.every((entry) =>
        entry.videoSrc?.startsWith("/learning/hermes-101/"),
      ),
    ).toBe(true);
  });

  it("finds lessons by slug without changing existing Claude slugs", () => {
    expect(getEntry("ai-operating-system")?.seriesSlug).toBe("claude-bootcamp");
    expect(getEntry("claude-bootcamp-mcp-servers")?.seriesSlug).toBe(
      "claude-bootcamp",
    );
    expect(getEntry("missing")).toBeUndefined();
  });

  it("stops previous and next navigation at the series boundaries", () => {
    const first = getAdjacentEntries("three-pillars-of-hermes");
    const last = getAdjacentEntries("expert-knowledge-to-campaign");

    expect(first.previous).toBeUndefined();
    expect(first.next?.slug).toBe("orchestration-and-subagents");
    expect(last.previous?.slug).toBe("delegating-real-work");
    expect(last.next).toBeUndefined();
  });

  it("formats short and long runtimes consistently", () => {
    expect(formatDuration(39)).toBe("0:39");
    expect(formatDuration(1051)).toBe("17:31");
  });
});
