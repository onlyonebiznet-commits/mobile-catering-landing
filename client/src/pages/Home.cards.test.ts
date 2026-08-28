import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8"
);

describe("FO card surface consistency", () => {
  it("uses white surfaces for meal and cafe cards on desktop and mobile", () => {
    expect(home).not.toContain('className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).not.toContain('className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).toContain('className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
    expect(home).toContain('className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"');
  });

  it("uses a white image surface for mobile meal and cafe cards", () => {
    expect(home).not.toContain("group bg-gray-100 flex items-center justify-center");
    expect(home).toContain("group bg-white flex items-center justify-center");
  });

  it("uses a scrollbar-free peek carousel for meals and cafes on mobile", () => {
    expect(home).toContain("snap-x snap-mandatory scroll-px-2 hide-scrollbar");
    expect(home).toContain("w-[calc(100vw-64px)] max-w-[320px] snap-center");
    expect(home.match(/hide-scrollbar/g)?.length).toBe(2);
  });
});

export {};
