import { describe, expect, it } from "vitest";
import { isWithinDateRange, toLocalDateKey } from "./dateRange";

describe("date range helpers", () => {
  it("formats a valid date using the local calendar date", () => {
    expect(toLocalDateKey("2026-08-27T09:30:00+09:00")).toBe("2026-08-27");
  });

  it("treats start and end dates as inclusive", () => {
    expect(isWithinDateRange("2026-08-27T09:30:00+09:00", "2026-08-27", "2026-08-27")).toBe(true);
    expect(isWithinDateRange("2026-08-28T09:30:00+09:00", "2026-08-27", "2026-08-27")).toBe(false);
  });

  it("supports an open-ended range", () => {
    expect(isWithinDateRange("2026-08-27T09:30:00+09:00", "2026-08-01")).toBe(true);
    expect(isWithinDateRange("2026-08-27T09:30:00+09:00", undefined, "2026-08-01")).toBe(false);
  });

  it("rejects invalid dates and reversed ranges", () => {
    expect(toLocalDateKey("not-a-date")).toBe("");
    expect(isWithinDateRange("2026-08-27T09:30:00+09:00", "2026-08-28", "2026-08-27")).toBe(false);
  });
});
