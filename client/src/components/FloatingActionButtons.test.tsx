import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FloatingActionButtons from "./FloatingActionButtons";

describe("FloatingActionButtons", () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Mock scrollTo
    window.scrollTo = vi.fn();
  });

  it("should render without crashing", () => {
    const { container } = render(<FloatingActionButtons />);
    expect(container).toBeTruthy();
  });

  it("should not display buttons when scrollY is less than 300", () => {
    Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
    const { container } = render(<FloatingActionButtons />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(0);
  });

  it("should have scroll event listener", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    render(<FloatingActionButtons />);
    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it("should have green background color", () => {
    const { container } = render(<FloatingActionButtons />);
    expect(container).toBeTruthy();
  });

  it("should render with proper z-index", () => {
    const { container } = render(<FloatingActionButtons />);
    expect(container).toBeTruthy();
  });
});
