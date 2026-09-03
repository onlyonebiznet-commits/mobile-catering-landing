import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const finalCta = home.match(/\/\* Final CTA Section \*\/[\s\S]*?<\/section>/)?.[0] ?? "";

describe("banner CTA button consistency", () => {
  it("keeps both hero actions while leaving only consultation in the final CTA", () => {
    expect(home.match(/data-event="consultation_click"/g)).toHaveLength(3);
    expect(home.match(/data-event="material_download_click"/g)).toHaveLength(1);
    expect(finalCta).toContain("지금 상담받기");
    expect(finalCta).toContain('variant="on-brand-inverse"');
    expect(finalCta).not.toContain("자료 다운받기");
    expect(finalCta).not.toContain('data-event="material_download_click"');
  });

  it("uses the inverse treatment only for the final green-banner consultation CTA", () => {
    expect(finalCta.match(/<Button/g)).toHaveLength(1);
    expect(finalCta).toContain('data-event="consultation_click"');
    expect(finalCta).toContain('size="large"');
  });
});

export {};

