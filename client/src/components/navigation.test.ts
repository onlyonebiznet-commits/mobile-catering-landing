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
    expect(source).toContain('className="grid grid-cols-3 gap-3 w-full"');
    expect(source).not.toContain('className="grid grid-cols-4 gap-3 w-full"');
  });

  it("keeps mobile service tiles square while preserving the desktop layout", () => {
    const source = readFileSync(
      resolve(process.cwd(), "client/src/components/SectionNavigation.tsx"),
      "utf8"
    );
    expect(source).toContain("md:hidden w-full bg-white flex items-center justify-center min-h-[300px]");
    expect(source).toContain("flex aspect-square w-full flex-col");
    expect(source).toContain("hidden md:block w-full bg-white");
    expect(source).toContain("grid grid-cols-6 gap-6 w-full");
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
