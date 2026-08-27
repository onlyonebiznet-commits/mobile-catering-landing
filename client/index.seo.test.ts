import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("landing page SEO metadata", () => {
  it("defines Korean page metadata and crawl directives", () => {
    expect(indexHtml).toContain('<html lang="ko">');
    expect(indexHtml).toContain('name="description"');
    expect(indexHtml).toContain('name="robots" content="index, follow"');
    expect(indexHtml).toContain('rel="canonical"');
  });

  it("uses an existing storage image for social previews", () => {
    expect(indexHtml).toContain('property="og:image"');
    expect(indexHtml).toContain("/manus-storage/hero-office-meal_08208dd3.png");
    expect(indexHtml).toContain('name="twitter:image"');
  });

  it("includes structured data for the meal service", () => {
    expect(indexHtml).toContain('type="application/ld+json"');
    expect(indexHtml).toContain('"@type": "Service"');
    expect(indexHtml).toContain('"serviceType": ["이동급식", "사내카페", "케이터링", "스낵 큐레이션"]');
  });
});
