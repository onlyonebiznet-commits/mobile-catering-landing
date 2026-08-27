import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("Freshmeal-on color guide tokens", () => {
  it("defines the primary green scale", () => {
    expect(css).toContain("--brand-900: #003326");
    expect(css).toContain("--brand-800: #005B45");
    expect(css).toContain("--brand-700: #007651");
    expect(css).toContain("--brand-600: #008F69");
    expect(css).toContain("--brand-50: #D7F9EF");
  });

  it("defines semantic status colors from the guide", () => {
    expect(css).toContain("--status-error: #EF151E");
    expect(css).toContain("--status-warning: #FF9700");
    expect(css).toContain("--status-info: #006ECD");
    expect(css).toContain("--status-success: #22AC38");
  });

  it("maps primary and secondary button states to GREEN700 and GREEN600", () => {
    expect(css).toContain("--primary: var(--brand-700)");
    expect(css).toContain("--primary-hover: var(--brand-600)");
    expect(css).toContain("--secondary-hover: var(--brand-600)");
  });

  it("registers CJ ONLYONE and the Noto Sans KR typography system", () => {
    expect(css).toContain('font-family: "CJ ONLYONE"');
    expect(css).toContain("CJ_ONLYONE_700_f1fa4aab.ttf");
    expect(css).toContain('--font-title: "CJ ONLYONE", "Noto Sans KR", sans-serif;');
    expect(css).toContain('--font-body: "Noto Sans KR", sans-serif;');
    expect(css).toContain(".type-title-1");
    expect(css).toContain(".type-headline-1");
    expect(css).toContain(".type-body-1");
  });

  it("maps surfaces, borders, and typography colors to the grayscale scale", () => {
    expect(css).toContain("--background: #FFFFFF");
    expect(css).toContain("--foreground: var(--gray-800)");
    expect(css).toContain("--border: var(--gray-200)");
    expect(css).toContain("--muted-foreground: var(--gray-600)");
  });
});

export {};
