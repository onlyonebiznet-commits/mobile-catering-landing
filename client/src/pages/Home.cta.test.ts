import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const bannerCtas = [...home.matchAll(/<Button[\s\S]*?size="large"[\s\S]*?data-event="(?:consultation_click|material_download_click)"[\s\S]*?<\/Button>/g)].map(
  ([match]) => match,
);

describe("banner CTA button consistency", () => {
  it("uses the same large On-brand design for both actions in both banners", () => {
    expect(bannerCtas).toHaveLength(4);

    bannerCtas.forEach((cta) => {
      expect(cta).toContain('variant="on-brand"');
      expect(cta).toContain('size="large"');
    });
  });
});

export {};
