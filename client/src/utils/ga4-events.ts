/**
 * GA4 이벤트 추적 유틸리티
 * 
 * Google Tag Manager를 통해 GA4로 이벤트를 전송합니다.
 * dataLayer.push()를 사용하여 GTM에 이벤트를 전달합니다.
 */

export interface GA4Event {
  event: string;
  [key: string]: any;
}

/**
 * GA4 이벤트를 dataLayer에 푸시합니다.
 * 
 * @param eventData 이벤트 데이터
 */
export const trackGA4Event = (eventData: GA4Event): void => {
  if (typeof window === "undefined") return;

  // dataLayer가 없으면 생성
  if (!(window as any).dataLayer) {
    (window as any).dataLayer = [];
  }

  // 이벤트 데이터에 기본 정보 추가
  const enrichedEvent: GA4Event = {
    ...eventData,
    page_location: window.location.href,
    page_title: document.title,
    timestamp: new Date().toISOString(),
  };

  console.log("[GA4] Event tracked:", enrichedEvent);
  (window as any).dataLayer.push(enrichedEvent);
};

/**
 * 상담 신청 버튼 클릭 이벤트
 */
export const trackConsultationClick = (): void => {
  trackGA4Event({
    event: "consultation_click",
    button_text: "상담 신청",
  });
};

/**
 * 상담 신청 폼 노출 이벤트
 */
export const trackConsultationFormView = (): void => {
  trackGA4Event({
    event: "consultation_form_view",
    form_name: "consultation_form",
  });
};

/**
 * 상담 신청 완료 이벤트
 * 
 * @param success 성공 여부
 */
export const trackConsultationSubmit = (success: boolean = true): void => {
  trackGA4Event({
    event: "consultation_submit",
    status: success ? "success" : "failure",
    form_name: "consultation_form",
  });
};

/**
 * 자료 요청 폼 노출 이벤트
 */
export const trackMaterialRequestFormView = (): void => {
  trackGA4Event({
    event: "material_request_view",
    form_name: "material_request_form",
  });
};

/**
 * 자료 요청 버튼 클릭 이벤트
 */
export const trackMaterialRequestClick = (): void => {
  trackGA4Event({
    event: "material_request_click",
    button_text: "자료 요청",
  });
};

/**
 * 자료 요청 완료 이벤트
 * 
 * @param success 성공 여부
 */
export const trackMaterialRequestSubmit = (success: boolean = true): void => {
  trackGA4Event({
    event: "material_request_submit",
    status: success ? "success" : "failure",
    form_name: "material_request_form",
  });
};

/**
 * 버튼 클릭 이벤트 추적 (data-event 속성 기반)
 * 
 * @param element 클릭된 요소
 */
export const trackButtonClick = (element: HTMLElement): void => {
  const eventName = element.getAttribute("data-event");
  if (!eventName) return;

  const buttonText = element.textContent?.trim() || "";

  trackGA4Event({
    event: eventName,
    button_text: buttonText,
    element_id: element.id || undefined,
    element_class: element.className || undefined,
  });
};

/**
 * 페이지 요소에 클릭 이벤트 리스너 추가
 * data-event 속성이 있는 모든 버튼에 자동으로 추적 기능 추가
 */
export const initializeButtonTracking = (): void => {
  if (typeof document === "undefined") return;

  // data-event 속성이 있는 모든 요소에 클릭 리스너 추가
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target && target.hasAttribute("data-event")) {
      trackButtonClick(target);
    }
  }, true);

  console.log("[GA4] Button tracking initialized");
};
