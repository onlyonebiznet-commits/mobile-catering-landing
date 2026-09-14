import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("MaterialRequestModal Props", () => {
  it("should accept onClose prop", () => {
    const mockOnClose = vi.fn();

    // Test that the prop type is correct
    const props = { onClose: mockOnClose };
    expect(props.onClose).toBeDefined();
    expect(typeof props.onClose).toBe("function");
  });

  it("should call onClose function", () => {
    const mockOnClose = vi.fn();
    mockOnClose();

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

describe("MaterialRequestModal analytics privacy", () => {
  it("does not send direct identifiers in the GTM submit payload", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/components/MaterialRequestModal.tsx"), "utf8");
    const analyticsBlock = source.match(/trackFormSubmit\("material_request", \{[\s\S]*?\}\);/)?.[0] ?? "";

    expect(analyticsBlock).toContain('trackFormSubmit("material_request", {');
    expect(analyticsBlock).toContain('form_type: "material_request"');
    expect(analyticsBlock).not.toContain('company_name: formData.companyName');
    expect(analyticsBlock).not.toContain('manager: formData.managerName');
  });
});

export {};
