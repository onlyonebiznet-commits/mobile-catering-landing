/**
 * 개인정보 마스킹 유틸리티 함수
 */

/**
 * 이름 마스킹 (예: 김철수 -> 김**)
 */
export const maskName = (name: string | null | undefined): string => {
  if (!name) return "-";
  if (name.length <= 1) return name;
  return name.charAt(0) + "*".repeat(name.length - 1);
};

/**
 * 연락처 마스킹 (예: 010-1234-5678 -> 010-****-5678)
 */
export const maskPhone = (phone: string | null | undefined): string => {
  if (!phone) return "-";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 8) return phone;
  
  // 010-1234-5678 형식
  if (phone.includes("-")) {
    const parts = phone.split("-");
    if (parts.length === 3) {
      return `${parts[0]}-****-${parts[2]}`;
    }
  }
  
  // 01012345678 형식
  return cleaned.substring(0, 3) + "****" + cleaned.substring(7);
};

/**
 * 이메일 마스킹 (예: test@company.com -> t***@company.com)
 */
export const maskEmail = (email: string | null | undefined): string => {
  if (!email) return "-";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email;
  
  const maskedLocal = localPart.charAt(0) + "*".repeat(Math.max(1, localPart.length - 2)) + (localPart.length > 1 ? localPart.charAt(localPart.length - 1) : "");
  return `${maskedLocal}@${domain}`;
};

/**
 * 회사명 마스킹 (예: CJ제일제당 -> CJ**** 또는 일부만 표시)
 */
export const maskCompanyName = (name: string | null | undefined): string => {
  if (!name) return "-";
  if (name.length <= 2) return name;
  return name.substring(0, 2) + "*".repeat(Math.max(1, name.length - 2));
};

/**
 * 주소 마스킹 (예: 서울시 강남구 테헤란로 123 -> 서울시 강남구 ***)
 */
export const maskAddress = (address: string | null | undefined): string => {
  if (!address) return "-";
  const parts = address.split(" ");
  if (parts.length <= 2) return address;
  
  // 첫 두 부분(시/도, 구/군)만 표시
  return parts.slice(0, 2).join(" ") + " ***";
};
