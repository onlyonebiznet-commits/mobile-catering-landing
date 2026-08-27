import { describe, expect, it } from "vitest";
import { buttonVariants } from "./button";

describe("button color guide variants", () => {
  it("uses GREEN700 as the primary base and GREEN600 as hover token", () => {
    const classes = buttonVariants({ variant: "default" });

    expect(classes).toContain("bg-primary");
    expect(classes).toContain("hover:bg-primary-hover");
  });

  it("uses the same GREEN600 hover token for secondary buttons", () => {
    const classes = buttonVariants({ variant: "secondary" });

    expect(classes).toContain("border-primary");
    expect(classes).toContain("text-primary");
    expect(classes).toContain("hover:bg-secondary-hover");
    expect(classes).toContain("hover:border-secondary-hover");
  });
});
