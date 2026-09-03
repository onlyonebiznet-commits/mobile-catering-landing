import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const navigationFiles = [
  "client/src/components/SectionNavigation.tsx",
  "client/src/components/PCNavigation.tsx",
  "client/src/components/StickyTabNavigation.tsx",
];

describe("navigation menu configuration", () => {
  it("does not expose the process menu in PC or mobile navigation", () => {
    for (const file of navigationFiles) {
      const source = readFileSync(resolve(process.cwd(), file), "utf8");
      expect(source).not.toContain("id: 'process'");
      expect(source).not.toContain('id: "process"');
      expect(source).not.toContain("프로세스");
    }
  });

  it("uses the shared system icon treatment in the navigation components", () => {
    for (const file of navigationFiles) {
      const source = readFileSync(resolve(process.cwd(), file), "utf8");
      expect(source).toContain("strokeWidth={1.5}");
      expect(source).toContain("system-icon");
    }
  });

  it("uses a three-column grid for the mobile navigation", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/SectionNavigation.tsx"),
      "utf8"
    );
    expect(source).toMatch(/className="grid grid-cols-3 gap-3 md:grid-cols-6/);
    expect(source).not.toContain('grid grid-cols-4');
  });

  it("exposes exactly six colored service destinations with responsive layouts", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/SectionNavigation.tsx"),
      "utf8"
    );
    const labels = ["서비스 소개", "구내식당", "수제간편식", "스낵픽", "사내카페", "고객후기"];

    expect(source.match(/\{ id: '/g)?.length).toBe(6);
    labels.forEach((label) => expect(source).toContain(`label: '${label}'`));
    expect(source).toContain("md:grid-cols-6");
    expect(source).toContain("iconTone");
    expect(source).toContain("aria-current");
  });

  it("keeps the process content section available as a page destination", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/pages/Home.tsx"),
      "utf8"
    );
    expect(source).toContain('id="process"');
  });
});

export {};
