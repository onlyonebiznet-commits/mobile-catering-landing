/**
 * Google Tag Manager - Body 스니펫
 * 
 * 이 컴포넌트는 HTML body 태그 시작 부분에 삽입되어야 하는 GTM noscript 코드를 제공합니다.
 * JavaScript가 비활성화된 경우에도 GTM이 작동하도록 합니다.
 */

import { useEffect } from "react";
import { initializeDataLayer } from "@/utils/gtm";

/**
 * GTM Body 컴포넌트
 * 
 * 이 컴포넌트는 다음 역할을 합니다:
 * 1. dataLayer 배열 초기화
 * 2. GTM 초기화 확인
 * 
 * 주의: noscript 태그는 React에서 렌더링할 수 없으므로,
 * client/index.html의 <body> 시작 부분에 직접 삽입해야 합니다.
 */
export function GTMBody() {
  useEffect(() => {
    // dataLayer 초기화
    initializeDataLayer();
    
    console.log("[GTM] GTM Body component mounted and dataLayer initialized");
  }, []);

  return (
    <>
      {/* 
        GTM Body noscript 스니펫은 client/index.html의 <body> 시작 부분에 직접 삽입되어야 합니다.
        React 컴포넌트에서 noscript 태그를 렌더링할 수 없습니다.
        
        아래 코드를 client/index.html의 <body> 시작 부분에 추가하세요 (가능한 한 빨리):
        
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W2S7VCKH"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
      */}
    </>
  );
}

export default GTMBody;
