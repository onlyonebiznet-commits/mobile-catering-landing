import { describe, expect, it } from "vitest";
import { buttonVariants } from "./button";

describe("button color guide variants", () => {
  it("provides a soft click feedback animation with reduced-motion fallback", () => {
    const classes = buttonVariants({ variant: "primary" });

    expect(classes).toContain("transition-all");
    expect(classes).toContain("duration-150");
    expect(classes).toContain("ease-out");
    expect(classes).toContain("active:scale-[0.97]");
    expect(classes).toContain("motion-reduce:active:scale-100");
  });
  it("uses GREEN700 as the primary base and GREEN600 as hover token", () => {
    const classes = buttonVariants({ variant: "default" });

    expect(classes).toContain("bg-primary");
    expect(classes).toContain("hover:bg-primary-hover");
  });

  it("exposes the explicit primary variant with disabled styling", () => {
    const classes = buttonVariants({ variant: "primary" });

    expect(classes).toContain("bg-primary");
    expect(classes).toContain("border border-transparent");
    expect(classes).toContain("disabled:bg-gray-300");
    expect(classes).toContain("disabled:text-white");
  });

  it("provides the guide size scale and icon button sizes", () => {
    expect(buttonVariants({ size: "xlarge" })).toContain("h-14");
    expect(buttonVariants({ size: "large" })).toContain("h-12");
    expect(buttonVariants({ size: "medium" })).toContain("h-10");
    expect(buttonVariants({ size: "small" })).toContain("h-9");
    expect(buttonVariants({ size: "icon" })).toContain("size-9");
  });

  it("provides a transparent white-border variant for banner secondary CTAs", () => {
    const classes = buttonVariants({ variant: "on-brand-outline", size: "large" });

    expect(classes).toContain("border border-white");
    expect(classes).toContain("bg-transparent");
    expect(classes).toContain("text-white");
    expect(classes).toContain("hover:bg-white");
    expect(classes).toContain("hover:text-primary");
    expect(classes).toContain("h-12");
  });

  it("uses GREEN700 as the base and a white hover state for on-brand banner buttons", () => {
    const classes = buttonVariants({ variant: "on-brand", size: "large" });

    expect(classes).toContain("bg-primary");
    expect(classes).toContain("text-primary-foreground");
    expect(classes).toContain("border border-primary");
    expect(classes).toContain("hover:bg-white");
    expect(classes).toContain("hover:border-primary");
    expect(classes).toContain("hover:text-primary");
    expect(classes).toContain("h-12");
  });

  it("provides a white inverse treatment for consultation buttons on green banners", () => {
    const classes = buttonVariants({ variant: "on-brand-inverse", size: "large" });

    expect(classes).toContain("border border-white");
    expect(classes).toContain("bg-white");
    expect(classes).toContain("text-primary");
    expect(classes).toContain("hover:bg-primary-hover");
    expect(classes).toContain("hover:text-white");
    expect(classes).toContain("disabled:bg-gray-300");
    expect(classes).toContain("h-12");
  });

  it("uses the same GREEN600 hover token for secondary buttons", () => {
    const classes = buttonVariants({ variant: "secondary" });

    expect(classes).toContain("border-primary");
    expect(classes).toContain("text-primary");
    expect(classes).toContain("hover:bg-secondary-hover");
    expect(classes).toContain("hover:border-secondary-hover");
  });
});
