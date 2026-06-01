# Google Tag Manager (GTM) 통합 가이드

## 개요

이 프로젝트는 **Google Tag Manager (GTM)**를 통해 분석 도구를 통합할 수 있도록 구성되었습니다. GTM을 사용하면 코드 수정 없이 Google Analytics 4 (GA4), Meta Pixel, Microsoft Clarity 등 다양한 분석 도구를 관리할 수 있습니다.

**GTM 컨테이너 ID**: `GTM-W2S7VCKH`

---

## 구현된 기능

### 1. GTM 스니펫 통합

#### Head 스니펫 (client/index.html)
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W2S7VCKH');</script>
<!-- End Google Tag Manager -->
```

#### Body 스니펫 (client/index.html)
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W2S7VCKH"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 2. GTM 유틸리티 함수 (client/src/utils/gtm.ts)

| 함수 | 설명 |
|------|------|
| `getGTMId()` | GTM 컨테이너 ID 반환 |
| `isGTMEnabled()` | GTM 활성화 여부 확인 |
| `initializeDataLayer()` | dataLayer 배열 초기화 |
| `trackGTMEvent(eventName, eventData)` | 일반 이벤트 추적 |
| `trackGTMPageView(pageTitle, pageUrl)` | 페이지 뷰 추적 |
| `trackGTMFormSubmit(formName, formData)` | 양식 제출 추적 |
| `trackGTMClick(elementName, elementType, additionalData)` | 클릭 이벤트 추적 |
| `trackGTMScrollDepth(scrollPercentage)` | 스크롤 깊이 추적 |
| `setGTMUserData(userId, userData)` | 사용자 정보 설정 |

### 3. React 훅 (client/src/hooks/useGTM.ts)

#### useGTM()
앱 최상위 컴포넌트에서 호출하여 GTM을 초기화하고 페이지 뷰를 자동으로 추적합니다.

```tsx
function App() {
  useGTM(); // GTM 초기화 및 페이지 뷰 추적
  return <Router />;
}
```

#### useGTMScrollTracking()
페이지 스크롤 깊이를 추적합니다 (25%, 50%, 75%, 100%).

```tsx
function Page() {
  useGTMScrollTracking();
  return <div>...</div>;
}
```

#### useGTMTracking()
GTM 추적 메서드를 반환합니다.

```tsx
function MyComponent() {
  const { trackEvent, trackFormSubmit, trackClick } = useGTMTracking();
  
  const handleSubmit = () => {
    trackFormSubmit("consultation_form", { region: "Seoul" });
  };
  
  return <button onClick={handleSubmit}>제출</button>;
}
```

### 4. 이미 구현된 이벤트 추적

#### 상담 신청 폼 (ConsultationModal)
```typescript
trackFormSubmit("consultation_request", {
  company_name: formData.companyName,
  contact_person: formData.contactPerson,
  service_type: formData.service,
  region: formData.region,
  estimated_meals: formData.estimatedMeals,
  form_type: "consultation",
});
```

#### 자료 요청 폼 (MaterialRequestModal)
```typescript
trackFormSubmit("material_request", {
  company_name: formData.companyName,
  manager: formData.manager,
  form_type: "material_request",
});
```

#### 페이지 뷰 추적
모든 페이지 이동 시 자동으로 추적됩니다.

#### 스크롤 깊이 추적
25%, 50%, 75%, 100% 지점에서 자동으로 추적됩니다.

---

## GTM에서 GA4 설정하기

### 1. GTM 컨테이너 열기
1. [Google Tag Manager](https://tagmanager.google.com/)에 접속
2. 계정 선택: **프레시밀온**
3. 컨테이너 선택: **GTM-W2S7VCKH**

### 2. GA4 태그 생성
1. **태그** 메뉴에서 **새로 만들기** 클릭
2. **태그 구성**에서 **Google Analytics: GA4 구성** 선택
3. **측정 ID** 입력 (GA4 속성의 측정 ID)
4. **트리거** 설정:
   - **All Pages** 선택 (모든 페이지에서 작동)
5. 태그 이름: `GA4 - Page View`
6. **저장** 클릭

### 3. GA4 이벤트 태그 생성
1. **태그** 메뉴에서 **새로 만들기** 클릭
2. **태그 구성**에서 **Google Analytics: GA4 이벤트** 선택
3. **측정 ID** 입력
4. **이벤트 이름** 입력: `consultation_request`
5. **트리거** 설정:
   - **Custom Event** 선택
   - 이벤트 이름: `consultation_request`
6. 태그 이름: `GA4 - Consultation Request`
7. **저장** 클릭

### 4. 변경사항 게시
1. **제출** 버튼 클릭
2. 버전 설명 입력: `GA4 통합`
3. **게시** 클릭

---

## GTM에서 Meta Pixel 설정하기

### 1. Meta Pixel 코드 준비
1. [Meta Business Suite](https://business.facebook.com/)에 접속
2. **이벤트 관리자** > **데이터 소스** 선택
3. **웹** 선택 후 **Pixel 설정**
4. **Pixel ID** 복사

### 2. GTM에서 Meta Pixel 태그 생성
1. **태그** 메뉴에서 **새로 만들기** 클릭
2. **태그 구성**에서 **Meta Pixel** 선택
3. **Pixel ID** 입력
4. **트리거** 설정:
   - **All Pages** 선택
5. 태그 이름: `Meta Pixel - Page View`
6. **저장** 클릭

### 3. Meta Pixel 이벤트 추적
1. **태그** 메뉴에서 **새로 만들기** 클릭
2. **태그 구성**에서 **Meta Pixel** 선택
3. **Pixel ID** 입력
4. **이벤트** 선택: `Lead` (상담 신청) 또는 `ViewContent` (자료 다운로드)
5. **트리거** 설정:
   - **Custom Event** 선택
   - 이벤트 이름: `consultation_request` 또는 `material_request`
6. 태그 이름: `Meta Pixel - Consultation Lead`
7. **저장** 클릭

---

## GTM에서 Microsoft Clarity 설정하기

### 1. Microsoft Clarity 프로젝트 ID 준비
1. [Microsoft Clarity](https://clarity.microsoft.com/)에 접속
2. 프로젝트 생성
3. **프로젝트 ID** 복사

### 2. GTM에서 Clarity 태그 생성
1. **태그** 메뉴에서 **새로 만들기** 클릭
2. **태그 구성**에서 **사용자 지정 HTML** 선택
3. 다음 코드 입력:
```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```
4. `YOUR_PROJECT_ID`를 실제 프로젝트 ID로 교체
5. **트리거** 설정:
   - **All Pages** 선택
6. 태그 이름: `Microsoft Clarity`
7. **저장** 클릭

---

## 커스텀 이벤트 추적 추가하기

### 예시: 버튼 클릭 추적

```tsx
import { useGTMTracking } from "@/hooks/useGTM";

function MyButton() {
  const { trackClick } = useGTMTracking();
  
  const handleClick = () => {
    trackClick("hero_cta_button", "button", {
      section: "hero",
      position: "top",
      text: "상담받기"
    });
    // 버튼 동작 수행
  };
  
  return <button onClick={handleClick}>상담받기</button>;
}
```

### 예시: 커스텀 이벤트 추적

```tsx
import { trackGTMEvent } from "@/utils/gtm";

function MyComponent() {
  const handleVideoPlay = () => {
    trackGTMEvent("video_play", {
      video_title: "프레시밀온 소개",
      video_duration: 120,
      section: "service"
    });
  };
  
  return <video onPlay={handleVideoPlay}>...</video>;
}
```

---

## 환경 변수

| 변수 | 값 | 설명 |
|------|-----|------|
| `VITE_GTM_ID` | `GTM-W2S7VCKH` | Google Tag Manager 컨테이너 ID |

---

## 테스트 방법

### 1. GTM 미리보기 모드
1. GTM 컨테이너에서 **미리보기** 버튼 클릭
2. 웹사이트 URL 입력: `https://mobilecater-bnzd6xno.manus.space`
3. **연결** 클릭
4. 웹사이트에서 이벤트 발생 (양식 제출, 클릭 등)
5. GTM 미리보기에서 이벤트 확인

### 2. 브라우저 콘솔 확인
개발자 도구의 콘솔에서 다음 명령어로 dataLayer 확인:
```javascript
console.log(window.dataLayer);
```

### 3. Google Analytics 실시간 보고서
1. GA4 속성 열기
2. **보고서** > **실시간** 선택
3. 웹사이트에서 이벤트 발생
4. 실시간 보고서에서 이벤트 확인

---

## 주요 파일

| 파일 | 설명 |
|------|------|
| `client/index.html` | GTM Head & Body 스니펫 |
| `client/src/utils/gtm.ts` | GTM 유틸리티 함수 |
| `client/src/hooks/useGTM.ts` | GTM React 훅 |
| `client/src/components/GTMHead.tsx` | GTM Head 컴포넌트 (참고용) |
| `client/src/components/GTMBody.tsx` | GTM Body 컴포넌트 (참고용) |
| `client/src/App.tsx` | GTM 초기화 |
| `client/src/components/ConsultationModal.tsx` | 상담 신청 이벤트 추적 |
| `client/src/components/MaterialRequestModal.tsx` | 자료 요청 이벤트 추적 |

---

## 문제 해결

### GTM이 로드되지 않음
1. **GTM 컨테이너 ID** 확인: `GTM-W2S7VCKH`
2. **네트워크 탭**에서 `gtm.js` 요청 확인
3. **콘솔**에서 에러 메시지 확인

### 이벤트가 추적되지 않음
1. **dataLayer** 확인: `console.log(window.dataLayer)`
2. **GTM 미리보기 모드** 활성화 후 테스트
3. **트리거** 설정 확인
4. **태그** 활성화 여부 확인

### GA4에서 이벤트가 보이지 않음
1. **측정 ID** 확인
2. **GA4 실시간 보고서** 확인 (데이터 처리 지연 가능)
3. **필터** 설정 확인 (필터로 인해 데이터가 제외될 수 있음)

---

## 추가 리소스

- [Google Tag Manager 문서](https://support.google.com/tagmanager/)
- [Google Analytics 4 설정](https://support.google.com/analytics/answer/10089681)
- [Meta Pixel 설정](https://developers.facebook.com/docs/meta-pixel)
- [Microsoft Clarity 설정](https://learn.microsoft.com/en-us/clarity/)

---

## 지원

GTM 통합 관련 문제가 발생하면 다음을 확인하세요:

1. **GTM 컨테이너 ID** 확인
2. **환경 변수** 설정 확인
3. **네트워크 연결** 확인
4. **브라우저 콘솔** 에러 메시지 확인
5. **GTM 미리보기 모드** 활용

---

**마지막 업데이트**: 2026-06-01
