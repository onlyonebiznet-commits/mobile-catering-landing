/**
 * GTM 로드 상태 디버깅 유틸리티
 * 
 * 이 유틸리티는 GTM이 실제로 로드되었는지 확인하는 데 사용됩니다.
 */

export const debugGTM = (): void => {
  if (typeof window === "undefined") return;

  // GTM 컨테이너 ID
  const GTM_ID = "GTM-W2S7VCKH";

  // 1. window.dataLayer 확인
  console.log("[GTM Debug] window.dataLayer:", (window as any).dataLayer);

  // 2. window.google_tag_manager 확인
  const gtmContainer = (window as any).google_tag_manager?.[GTM_ID];
  console.log(`[GTM Debug] window.google_tag_manager["${GTM_ID}"]`, gtmContainer);

  // 3. GTM 스크립트 로드 확인
  const gtmScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');
  console.log("[GTM Debug] GTM scripts loaded:", gtmScripts.length);
  gtmScripts.forEach((script, index) => {
    console.log(`  Script ${index + 1}:`, {
      src: script.getAttribute("src"),
      async: script.hasAttribute("async"),
    });
  });

  // 4. dataLayer 배열 확인
  if ((window as any).dataLayer) {
    console.log("[GTM Debug] dataLayer events:", (window as any).dataLayer.length);
    console.log("[GTM Debug] dataLayer content:", (window as any).dataLayer);
  }

  // 5. GTM 초기화 여부 확인
  const isGTMInitialized = !!(window as any).dataLayer && (window as any).dataLayer.length > 0;
  console.log("[GTM Debug] GTM Initialized:", isGTMInitialized);

  // 6. 전체 상태 요약
  console.log("[GTM Debug] ===== GTM Status Summary =====");
  console.log(`  Container ID: ${GTM_ID}`);
  console.log(`  dataLayer exists: ${!!(window as any).dataLayer}`);
  console.log(`  google_tag_manager exists: ${!!(window as any).google_tag_manager}`);
  console.log(`  GTM container loaded: ${!!gtmContainer}`);
  console.log(`  GTM scripts loaded: ${gtmScripts.length > 0}`);
  console.log(`  dataLayer events: ${(window as any).dataLayer?.length || 0}`);
  console.log("[GTM Debug] ===================================");

  // 7. GTM Preview Mode 연결 확인
  if ((window as any).google_tag_manager?.[GTM_ID]?.event) {
    console.log("[GTM Debug] ✓ GTM Preview Mode 연결 가능");
  } else {
    console.warn("[GTM Debug] ⚠ GTM Preview Mode 연결 불가능 - GTM 컨테이너가 완전히 로드되지 않았을 수 있습니다");
  }
};

// 페이지 로드 후 일정 시간 후에 디버깅 정보 출력
export const debugGTMOnLoad = (): void => {
  if (typeof window === "undefined") return;

  // 초기 로드 시
  console.log("[GTM Debug] Initial check on page load");
  debugGTM();

  // 1초 후 재확인
  setTimeout(() => {
    console.log("[GTM Debug] Check after 1 second");
    debugGTM();
  }, 1000);

  // 3초 후 재확인
  setTimeout(() => {
    console.log("[GTM Debug] Check after 3 seconds");
    debugGTM();
  }, 3000);
};
