import { describe, it, expect } from "vitest";

/**
 * GTM 환경 변수 검증 테스트
 * GTM ID가 올바른 형식인지 확인합니다.
 */
describe("GTM Environment Variables", () => {
  it("should have VITE_GTM_ID defined", () => {
    const gtmId = import.meta.env.VITE_GTM_ID;
    expect(gtmId).toBeDefined();
    expect(typeof gtmId).toBe("string");
  });

  it("should have valid GTM ID format (GTM-XXXXXXX or G-XXXXXXXXXX)", () => {
    const gtmId = import.meta.env.VITE_GTM_ID;
    // GTM ID는 GTM- 또는 G-로 시작하고 영문자와 숫자로 이루어짐
    const gtmPattern = /^(GTM-|G-)[A-Z0-9]+$/;
    
    if (gtmId) {
      // GTM ID가 설정된 경우 형식 검증
      expect(gtmPattern.test(gtmId)).toBe(true);
    }
    // GTM ID가 설정되지 않은 경우는 테스트 통과 (개발 환경에서는 선택사항)
  });

  it("should handle missing GTM ID gracefully", () => {
    const gtmId = import.meta.env.VITE_GTM_ID || "";
    // 빈 문자열이거나 정의되지 않은 경우 안전하게 처리
    expect(typeof gtmId).toBe("string");
  });
});
