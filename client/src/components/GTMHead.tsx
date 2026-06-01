/**
 * Google Tag Manager - Head 스니펫
 * 
 * 이 컴포넌트는 HTML head 태그에 삽입되어야 하는 GTM 코드를 제공합니다.
 * 일반적으로 index.html의 <head> 섹션에 직접 삽입됩니다.
 * 
 * 사용법:
 * 1. client/index.html의 <head> 섹션에 다음 코드를 추가하세요:
 * 
 * <!-- Google Tag Manager -->
 * <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
 * new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
 * j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
 * 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
 * })(window,document,'script','dataLayer','GTM-W2S7VCKH');</script>
 * <!-- End Google Tag Manager -->
 * 
 * 또는 아래 코드를 복사하여 사용하세요.
 */

/**
 * GTM Head 스니펫 코드 (문자열)
 * 이 코드를 client/index.html의 <head> 섹션에 붙여넣으세요.
 */
export const GTM_HEAD_SNIPPET = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W2S7VCKH');</script>
<!-- End Google Tag Manager -->`;

/**
 * GTM Body 스니펫 코드 (문자열)
 * 이 코드를 client/index.html의 <body> 섹션 시작 부분에 붙여넣으세요.
 */
export const GTM_BODY_SNIPPET = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W2S7VCKH"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

/**
 * GTM Head 스니펫 컴포넌트
 * 
 * 주의: 이 컴포넌트는 실제 GTM 코드를 렌더링하지 않습니다.
 * 대신 client/index.html에 직접 GTM 스니펫을 삽입해야 합니다.
 * 
 * 이 컴포넌트는 문서화 및 참고용입니다.
 */
export function GTMHead() {
  return (
    <>
      {/* 
        GTM Head 스니펫은 client/index.html의 <head> 섹션에 직접 삽입되어야 합니다.
        React 컴포넌트에서 렌더링할 수 없습니다.
        
        아래 코드를 client/index.html의 <head> 섹션에 추가하세요:
        
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W2S7VCKH');</script>
        <!-- End Google Tag Manager -->
      */}
    </>
  );
}

export default GTMHead;
