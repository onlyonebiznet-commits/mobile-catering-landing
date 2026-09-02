import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("FO footer privacy policy link", () => {
  const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("keeps the privacy policy action bold while preserving hover treatment", () => {
    const privacyAction = homeSource.match(
      /<button\s+onClick=\{\(\) => setShowPrivacyModal\(true\)\}\s+className=\"([^\"]+)\"[\s\S]*?>\s*개인정보 처리방침/
    );

    expect(privacyAction?.[1]).toContain("font-bold");
    expect(privacyAction?.[1]).toContain("hover:text-white");
  });
});

