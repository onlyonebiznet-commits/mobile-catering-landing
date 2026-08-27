import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const input = readFileSync(resolve(process.cwd(), "client/src/components/ui/input.tsx"), "utf8");
const textarea = readFileSync(resolve(process.cwd(), "client/src/components/ui/textarea.tsx"), "utf8");
const select = readFileSync(resolve(process.cwd(), "client/src/components/ui/select.tsx"), "utf8");

describe("Text input guide controls", () => {
  it("uses the guide input dimensions, surface, and focus states", () => {
    expect(input).toContain("h-11");
    expect(input).toContain("rounded-lg");
    expect(input).toContain("bg-white");
    expect(input).toContain("px-4 py-2");
    expect(input).toContain("focus-visible:border-primary");
    expect(input).toContain("aria-invalid:border-status-error");
  });

  it("uses the guide textarea dimensions and error state", () => {
    expect(textarea).toContain("min-h-24");
    expect(textarea).toContain("rounded-lg");
    expect(textarea).toContain("bg-white");
    expect(textarea).toContain("px-4 py-3");
    expect(textarea).toContain("aria-invalid:border-status-error");
  });

  it("uses the guide select trigger dimensions and error state", () => {
    expect(select).toContain("w-full");
    expect(select).toContain("rounded-lg");
    expect(select).toContain("bg-white");
    expect(select).toContain("data-[size=default]:h-11");
    expect(select).toContain("aria-invalid:border-status-error");
  });
});

export {};
