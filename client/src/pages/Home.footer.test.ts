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

  it("opens the full word-document privacy policy in the existing modal pattern", () => {
    const policySource = readFileSync(
      resolve(process.cwd(), "client/src/components/PrivacyPolicyDetails.tsx"),
      "utf8"
    );

    expect(homeSource).toContain("PrivacyPolicyDetails");
    expect(homeSource).toContain('aria-labelledby="privacy-policy-title"');
    expect(homeSource).toContain("max-h-[min(86vh,900px)]");
    expect(policySource).toContain("CJ프레시웨이 ‘프레시밀온’ 서비스 개인정보처리방침");
    expect(policySource).toContain("14. 정책변경에 따른 공지 의무");
    expect(policySource).toContain("개인정보처리방침 제정일자: 2023-12-15");
    expect(policySource).toContain("개인정보 침해신고센터");
  });
});
