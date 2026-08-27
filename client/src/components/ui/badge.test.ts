import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const badge = readFileSync(
  resolve(process.cwd(), "client/src/components/ui/badge.tsx"),
  "utf8"
);
const home = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8"
);

describe("Badge guide primitives", () => {
  it("defines StatusBadge states and responsive sizes", () => {
    expect(badge).toContain("statusBadgeVariants");
    expect(badge).toContain("neutral:");
    expect(badge).toContain("positive:");
    expect(badge).toContain("caution:");
    expect(badge).toContain("warning:");
    expect(badge).toContain('large: "min-h-10 px-4 text-base leading-5"');
    expect(badge).toContain('medium: "min-h-8 px-3 text-sm leading-4"');
    expect(badge).toContain('small: "min-h-6 px-2 text-xs leading-4"');
  });

  it("defines filled and outlined PromoBadge color presets", () => {
    expect(badge).toContain("promoBadgeVariants");
    expect(badge).toContain("filled:");
    expect(badge).toContain("outlined:");
    expect(badge).toContain("green:");
    expect(badge).toContain("black:");
    expect(badge).toContain("red:");
    expect(badge).toContain("blue:");
    expect(badge).toContain("yellow:");
  });

  it("uses PromoBadge for all FO card tag groups", () => {
    expect(home).toContain('import { PromoBadge } from "@/components/ui/badge";');
    expect(home.match(/<PromoBadge/g)).toHaveLength(5);
    expect(home).toContain('color="yellow" appearance="outlined" size="small"');
    expect(home).not.toContain("bg-brand-700/10 text-brand-700 rounded-full");
  });
});

export {};
