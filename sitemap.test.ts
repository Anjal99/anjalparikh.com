// @vitest-environment node

import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { learningSeries } from "./src/lib/journal";

const sitemapPath = new URL("./public/sitemap.xml", import.meta.url);

describe("learning sitemap", () => {
  it("includes every series and lesson route exactly once", async () => {
    const sitemap = await readFile(sitemapPath, "utf8");
    const expectedPaths = learningSeries.flatMap((series) => [
      `/learning/${series.slug}`,
      ...series.entries.map((entry) => `/journal/${entry.slug}`),
    ]);

    for (const path of expectedPaths) {
      const url = `https://anjalparikh.com${path}`;
      expect(sitemap.split(url)).toHaveLength(2);
    }
  });
});
