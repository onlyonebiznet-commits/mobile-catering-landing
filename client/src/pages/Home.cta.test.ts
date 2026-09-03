import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const heroCta = home.match(/<div className="flex flex-wrap justify-start gap-3 animate-in[\s\S]*?<\/div>/)?.[0] ?? "";
const finalCta = home.match(/\/\* Final CTA Section \*\/[\s\S]*?<\/section>/)?.[0] ?? "";

describe("banner CTA button consistency", () => {
  it("leaves only consultation actions in both the hero and final CTA banners", () => {
    expect(home.match(/data-event="consultation_click"/g)).toHaveLength(3);
    expect(home.match(/data-event="material_download_click"/g)).toBeNull();
    expect(heroCta).toContain("지금 상담받기");
    expect(heroCta).not.toContain("자료 다운받기");
    expect(heroCta).toContain('data-event="consultation_click"');
    expect(finalCta).toContain("지금 상담받기");
    expect(finalCta).not.toContain("자료 다운받기");
  });

  it("keeps the same consultation modal connection for both banner buttons", () => {
    expect(heroCta.match(/<Button/g)).toHaveLength(1);
    expect(finalCta.match(/<Button/g)).toHaveLength(1);
    expect(heroCta).toContain("setConsultationOpen(true)");
    expect(finalCta).toContain("setConsultationOpen(true)");
  });

  it("keeps the final green-banner consultation CTA in inverse treatment", () => {
    expect(finalCta).toContain('variant="on-brand-inverse"');
    expect(finalCta).toContain('size="large"');
    expect(finalCta).toContain('data-event="consultation_click"');
    expect(home).toContain("hero-title-animate text-left");
    expect(home).toContain("hero-title-animate mb-8 text-left");
  });
});

export {};

