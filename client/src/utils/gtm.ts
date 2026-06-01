/**
 * Google Tag Manager (GTM) 통합 유틸리티
 * 
 * 이 모듈은 GTM 초기화, 이벤트 추적, 사용자 정보 설정 등을 관리합니다.
 * GA4, Meta Pixel, Microsoft Clarity 등을 GTM을 통해 관리할 수 있습니다.
 */

/**
 * GTM 컨테이너 ID 가져오기
 */
export const getGTMId = (): string | undefined => {
  return import.meta.env.VITE_GTM_ID;
};

/**
 * GTM 초기화 여부 확인
 */
export const isGTMEnabled = (): boolean => {
  const gtmId = getGTMId();
  return !!gtmId && gtmId.length > 0;
};

/**
 * dataLayer 전역 객체 초기화
 * GTM이 작동하기 위해 필요한 dataLayer 배열을 초기화합니다.
 */
export const initializeDataLayer = (): void => {
  if (typeof window !== "undefined") {
    // dataLayer 배열이 없으면 생성
    if (!window.dataLayer) {
      (window as any).dataLayer = [];
    }
  }
};

/**
 * GTM 이벤트 추적
 * 
 * @param eventName - 이벤트 이름 (예: "form_submit", "page_view")
 * @param eventData - 이벤트 데이터 객체
 * 
 * @example
 * trackGTMEvent("consultation_request", {
 *   company_name: "ABC Corp",
 *   region: "Seoul",
 *   meal_count: 100
 * });
 */
export const trackGTMEvent = (
  eventName: string,
  eventData?: Record<string, any>
): void => {
  if (!isGTMEnabled()) {
    console.warn("[GTM] GTM is not enabled. Event not tracked:", eventName);
    return;
  }

  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventData,
    });
    console.log("[GTM] Event tracked:", eventName, eventData);
  }
};

/**
 * GTM 사용자 정보 설정
 * 
 * @param userId - 사용자 ID
 * @param userData - 사용자 데이터 객체
 * 
 * @example
 * setGTMUserData("user123", {
 *   email: "user@example.com",
 *   company: "ABC Corp",
 *   region: "Seoul"
 * });
 */
export const setGTMUserData = (
  userId: string,
  userData?: Record<string, any>
): void => {
  if (!isGTMEnabled()) {
    console.warn("[GTM] GTM is not enabled. User data not set.");
    return;
  }

  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      userId,
      userProperties: userData,
    });
    console.log("[GTM] User data set:", userId, userData);
  }
};

/**
 * GTM 페이지 뷰 추적
 * 
 * @param pageTitle - 페이지 제목
 * @param pageUrl - 페이지 URL
 * 
 * @example
 * trackGTMPageView("프레시밀온 - 홈페이지", "/");
 */
export const trackGTMPageView = (
  pageTitle?: string,
  pageUrl?: string
): void => {
  if (!isGTMEnabled()) {
    console.warn("[GTM] GTM is not enabled. Page view not tracked.");
    return;
  }

  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "page_view",
      page_title: pageTitle || document.title,
      page_url: pageUrl || window.location.href,
      timestamp: new Date().toISOString(),
    });
    console.log("[GTM] Page view tracked:", pageTitle || document.title);
  }
};

/**
 * GTM 양식 제출 추적
 * 
 * @param formName - 양식 이름
 * @param formData - 양식 데이터 (민감한 정보는 제외)
 * 
 * @example
 * trackGTMFormSubmit("consultation_form", {
 *   form_type: "consultation",
 *   region: "Seoul",
 *   meal_count: 100
 * });
 */
export const trackGTMFormSubmit = (
  formName: string,
  formData?: Record<string, any>
): void => {
  if (!isGTMEnabled()) {
    console.warn("[GTM] GTM is not enabled. Form submission not tracked.");
    return;
  }

  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "form_submit",
      form_name: formName,
      form_data: formData,
      timestamp: new Date().toISOString(),
    });
    console.log("[GTM] Form submission tracked:", formName);
  }
};

/**
 * GTM 클릭 이벤트 추적
 * 
 * @param elementName - 요소 이름
 * @param elementType - 요소 타입 (예: "button", "link")
 * @param additionalData - 추가 데이터
 * 
 * @example
 * trackGTMClick("consultation_button", "button", {
 *   section: "hero",
 *   position: "top"
 * });
 */
export const trackGTMClick = (
  elementName: string,
  elementType?: string,
  additionalData?: Record<string, any>
): void => {
  if (!isGTMEnabled()) {
    console.warn("[GTM] GTM is not enabled. Click event not tracked.");
    return;
  }

  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "click",
      element_name: elementName,
      element_type: elementType || "element",
      ...additionalData,
      timestamp: new Date().toISOString(),
    });
    console.log("[GTM] Click event tracked:", elementName);
  }
};

/**
 * GTM 스크롤 깊이 추적
 * 
 * @param scrollPercentage - 스크롤 백분율 (0-100)
 */
export const trackGTMScrollDepth = (scrollPercentage: number): void => {
  if (!isGTMEnabled()) {
    return;
  }

  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "scroll_depth",
      scroll_percentage: Math.round(scrollPercentage),
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * 전역 타입 확장 (dataLayer 지원)
 */
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}
