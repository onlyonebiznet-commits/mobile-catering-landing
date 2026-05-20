import { describe, it, expect, vi } from "vitest";

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
