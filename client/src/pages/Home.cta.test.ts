import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const heroCta = home.match(/<div className="flex flex-wrap justify-start md:justify-center gap-3 animate-in[\s\S]*?<\/div>/)?.[0] ?? "";
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

  it("uses the requested three-line snackpick headline hierarchy", () => {
    expect(home).toContain("const isSnackHero = currentHeroIndex % 3 === 1;");
    expect(home).toContain("title: '어디든지 찾아가는\\n사내복지'");
    expect(home).toContain("title: '직원 취향 저격하는\\n맞춤 큐레이션'");
    expect(home).toContain("title: '기업 문화를 만드는\\n사내카페'");
    expect(home).toContain("highlight: '간식복지\\n스낵픽'");
    expect(home.match(/whiteSpace: 'pre-line'/g)).toHaveLength(2);
    expect(home.match(/fontSize: '30px'/g)).toHaveLength(2);
    expect(home.match(/fontSize: '60px'/g)).toHaveLength(2);
    expect(home).toContain("whiteSpace: isSnackHero ? 'normal' : 'pre-line'");
  });

  it("keeps the final green-banner consultation CTA in inverse treatment", () => {
    expect(finalCta).toContain('variant="on-brand-inverse"');
    expect(finalCta).toContain('size="large"');
    expect(finalCta).toContain('data-event="consultation_click"');
    expect(home).toContain("hero-title-animate text-left");
    expect(home).toContain("hero-title-animate mb-8 text-left");
    expect(home).toContain("flex flex-wrap justify-start md:justify-center gap-3 animate-in fade-in slide-in-from-left-4 delay-500");
  });
});

export {};

