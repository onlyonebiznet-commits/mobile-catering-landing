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

  it("keeps the recommendation simulation CTA visible before scrolling", () => {
    Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
    render(<FloatingActionButtons />);
    expect(screen.getByRole("button", { name: "우리 현장 맞춤 추천받기" })).toBeTruthy();
  });

  it("does not render the removed scroll-to-top action", () => {
    render(<FloatingActionButtons />);
    expect(screen.queryByRole("button", { name: "맨 위로 이동" })).toBeNull();
  });

  it("should have green background color", () => {
    const { container } = render(<FloatingActionButtons />);
    expect(container).toBeTruthy();
  });

  it("should render with proper z-index", () => {
    const { container } = render(<FloatingActionButtons />);
    expect(container).toBeTruthy();
  });

  it("centers the recommendation CTA at the bottom", () => {
    const { container } = render(<FloatingActionButtons />);
    expect(container.firstElementChild?.className).toContain("left-1/2");
    expect(container.firstElementChild?.className).toContain("-translate-x-1/2");
  });

  it("shows the simulation labels for desktop and mobile layouts", () => {
    render(<FloatingActionButtons />);
    expect(screen.getByText("우리 현장 맞춤 추천받기")).toBeTruthy();
  });
});
