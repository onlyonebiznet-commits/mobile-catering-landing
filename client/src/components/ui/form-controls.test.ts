import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const input = readFileSync(resolve(process.cwd(), "client/src/components/ui/input.tsx"), "utf8");
const textarea = readFileSync(resolve(process.cwd(), "client/src/components/ui/textarea.tsx"), "utf8");
const select = readFileSync(resolve(process.cwd(), "client/src/components/ui/select.tsx"), "utf8");
const checkbox = readFileSync(resolve(process.cwd(), "client/src/components/ui/checkbox.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("Text input guide controls", () => {
  it("uses a 1px stroke input surface without decorative shadow or fill", () => {
    expect(input).toContain("form-field-control");
    expect(styles).toContain("height: 3rem");
    expect(styles).toContain("border: 1px solid var(--gray-200)");
    expect(styles).toContain("border-radius: 10px");
    expect(styles).toContain("background: transparent");
    expect(styles).toContain("box-shadow: none");
    expect(styles).toContain("padding: 0.75rem 1rem");
    expect(input).toContain("focus-visible:border-primary");
    expect(input).not.toContain("focus-visible:ring-[3px]");
    expect(input).toContain("aria-invalid:border-status-error");
  });

  it("uses the guide textarea dimensions and error state", () => {
    expect(textarea).toContain("form-field-control--textarea");
    expect(styles).toContain("min-height: 7.5rem");
    expect(styles).toContain("resize: vertical");
    expect(textarea).toContain("aria-invalid:border-status-error");
    expect(textarea).not.toContain("field-sizing-content");
    expect(textarea).not.toContain("focus-visible:ring-[3px]");
  });

  it("uses the guide select trigger dimensions and error state", () => {
    expect(select).toContain("form-field-control");
    expect(select).toContain("data-[size=sm]:h-10");
    expect(styles).toContain("height: 3rem");
    expect(select).toContain("data-[validation-state=success]");
    expect(select).toContain("aria-invalid:border-status-error");
    expect(select).not.toContain("focus-visible:ring-[3px]");
  });

  it("uses the checkbox guide control, indicator, and state tokens", () => {
    expect(checkbox).toContain("form-checkbox-control");
    expect(checkbox).toContain("form-checkbox-indicator");
    expect(styles).toContain(".form-checkbox-control[data-state=\"checked\"]");
    expect(styles).toContain(".form-checkbox-control:focus-visible");
    expect(styles).toContain(".form-checkbox-control:disabled");
    expect(styles).toContain("width: 1.25rem");
    expect(styles).toContain("width: 1rem");
  });
});

export {};
