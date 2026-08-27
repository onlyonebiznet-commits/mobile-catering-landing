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

  it("keeps the process content section available as a page destination", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/pages/Home.tsx"),
      "utf8"
    );
    expect(source).toContain('id="process"');
  });
});

export {};
