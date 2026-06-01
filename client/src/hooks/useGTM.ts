/**
 * useGTM Hook
 * 
 * React 컴포넌트에서 GTM 이벤트 추적을 쉽게 하기 위한 커스텀 훅입니다.
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  isGTMEnabled,
  initializeDataLayer,
  trackGTMPageView,
  trackGTMEvent,
  trackGTMFormSubmit,
  trackGTMClick,
  trackGTMScrollDepth,
  setGTMUserData,
} from "@/utils/gtm";
import { debugGTMOnLoad } from "@/utils/gtm-debug";

/**
 * GTM 초기화 및 페이지 뷰 추적 훅
 * 
 * 앱 최상위 컴포넌트에서 한 번 호출하면 됩니다.
 * 
 * @example
 * function App() {
 *   useGTM();
 *   return <Router />;
 * }
 */
export function useGTM() {
  const [location] = useLocation();

  useEffect(() => {
    // GTM 초기화
    if (isGTMEnabled()) {
      initializeDataLayer();
      console.log("[GTM] GTM initialized");
      
      // GTM 로드 상태 디버깅
      debugGTMOnLoad();
    }
  }, []);

  useEffect(() => {
    // 페이지 변경 시 페이지 뷰 추적
    if (isGTMEnabled()) {
      trackGTMPageView(document.title, location);
    }
  }, [location]);
}

/**
 * GTM 스크롤 깊이 추적 훅
 * 
 * 페이지 스크롤 깊이를 추적합니다.
 * 25%, 50%, 75%, 100% 지점에서 이벤트를 발생시킵니다.
 * 
 * @example
 * function Page() {
 *   useGTMScrollTracking();
 *   return <div>...</div>;
 * }
 */
export function useGTMScrollTracking() {
  useEffect(() => {
    if (!isGTMEnabled()) return;

    const trackedScrollDepths = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;

      // 25%, 50%, 75%, 100% 지점에서 추적
      const depthThresholds = [25, 50, 75, 100];
      depthThresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !trackedScrollDepths.has(threshold)) {
          trackedScrollDepths.add(threshold);
          trackGTMScrollDepth(threshold);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

/**
 * GTM 이벤트 추적 훅 반환 객체
 */
export interface GTMTrackingMethods {
  trackEvent: typeof trackGTMEvent;
  trackFormSubmit: typeof trackGTMFormSubmit;
  trackClick: typeof trackGTMClick;
  setUserData: typeof setGTMUserData;
}

/**
 * GTM 추적 메서드 반환 훅
 * 
 * @returns GTM 추적 메서드 객체
 * 
 * @example
 * function MyComponent() {
 *   const { trackEvent, trackFormSubmit } = useGTMTracking();
 *   
 *   const handleSubmit = () => {
 *     trackFormSubmit("consultation_form", { region: "Seoul" });
 *   };
 *   
 *   return <button onClick={handleSubmit}>제출</button>;
 * }
 */
export function useGTMTracking(): GTMTrackingMethods {
  return {
    trackEvent: trackGTMEvent,
    trackFormSubmit: trackGTMFormSubmit,
    trackClick: trackGTMClick,
    setUserData: setGTMUserData,
  };
}
