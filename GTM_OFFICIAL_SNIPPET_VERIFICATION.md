# Google Tag Manager (GTM) 공식 스니펫 검증 가이드

## 현재 상태

✓ **GTM 공식 스니펫이 올바르게 배포되었습니다.**

### 1. Head 스니펫 (client/index.html, line 43-49)

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W2S7VCKH');</script>
<!-- End Google Tag Manager -->
```

**상태**: ✓ 배포됨 (dist/public/index.html line 43-48)

### 2. Body noscript 스니펫 (client/index.html, line 53-56)

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W2S7VCKH"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

**상태**: ✓ 배포됨 (dist/public/index.html line 117-119)

---

## GTM 로드 검증 방법

### 방법 1: 브라우저 콘솔에서 확인

배포된 사이트 (https://mobilecater-bnzd6xno.manus.space) 또는 (https://cjfreshwayfreshmealon.manus.space)에서:

1. **F12** 또는 **Ctrl+Shift+I** 를 눌러 개발자 도구 열기
2. **Console** 탭에서 다음 명령 실행:

```javascript
// 1. dataLayer 확인
window.dataLayer

// 2. GTM 컨테이너 확인
window.google_tag_manager["GTM-W2S7VCKH"]

// 3. GTM 초기화 확인
console.log("GTM initialized:", !!window.dataLayer && window.dataLayer.length > 0)
```

**예상 결과:**
- `window.dataLayer`: 배열 (최소 1개 이상의 gtm.start 이벤트 포함)
- `window.google_tag_manager["GTM-W2S7VCKH"]`: 객체 (undefined가 아님)
- 콘솔 로그: GTM initialized: true

### 방법 2: 페이지 소스에서 확인

1. 배포된 사이트 방문
2. **Ctrl+U** 를 눌러 페이지 소스 보기
3. **Ctrl+F** 로 "GTM-W2S7VCKH" 검색
4. 2개의 결과 확인:
   - Head 섹션의 script 태그
   - Body 섹션의 noscript iframe

### 방법 3: GTM Preview Mode 연결

1. [Google Tag Manager](https://tagmanager.google.com) 접속
2. GTM-W2S7VCKH 컨테이너 선택
3. **Preview** 버튼 클릭
4. 제공된 Preview URL 복사
5. 배포된 사이트에서 Preview URL 방문
6. Tag Assistant가 GTM 컨테이너 감지 확인

---

## 디버그 기능

### 자동 디버그 로그

페이지 로드 시 다음 정보가 콘솔에 자동 출력됩니다:

```
[GTM Debug] Initial check on page load
[GTM Debug] window.dataLayer: [...]
[GTM Debug] window.google_tag_manager["GTM-W2S7VCKH"]: {...}
[GTM Debug] GTM scripts loaded: 1
[GTM Debug] dataLayer events: 1
[GTM Debug] GTM Initialized: true
[GTM Debug] ===== GTM Status Summary =====
  Container ID: GTM-W2S7VCKH
  dataLayer exists: true
  google_tag_manager exists: true
  GTM container loaded: true
  GTM scripts loaded: true
  dataLayer events: 1
[GTM Debug] ===================================
```

### 수동 디버그

콘솔에서 다음 함수 실행:

```javascript
// GTM 디버그 함수 직접 호출
import { debugGTM } from '@/utils/gtm-debug';
debugGTM();
```

---

## GTM Preview Mode 연결 실패 시 해결 방법

### 1. 캐시 초기화

```bash
# 브라우저 캐시 초기화
# Chrome: Ctrl+Shift+Delete → "모든 시간" 선택 → 삭제

# 또는 개발자 도구에서
# Network 탭 → "Disable cache" 체크 → 페이지 새로고침
```

### 2. 배포 재확인

```bash
# 최신 빌드가 배포되었는지 확인
curl -s https://mobilecater-bnzd6xno.manus.space | grep -o "GTM-W2S7VCKH" | wc -l
# 결과: 2 (head와 body에 각각 1개씩)
```

### 3. GTM Preview Mode 다시 시작

1. GTM 대시보드에서 **Preview** 클릭
2. 이전 Preview 세션 종료
3. 새로운 Preview URL 생성
4. 배포된 사이트에서 새 Preview URL 방문

### 4. 브라우저 개발자 도구에서 확인

```javascript
// Network 탭에서 다음 요청 확인
// https://www.googletagmanager.com/gtm.js?id=GTM-W2S7VCKH

// 응답 상태: 200 OK
// Content-Type: application/javascript

// 또는 Console 탭에서
fetch('https://www.googletagmanager.com/gtm.js?id=GTM-W2S7VCKH')
  .then(r => r.text())
  .then(t => console.log(t.substring(0, 100)))
```

---

## 다음 단계

### 1. GA4 태그 설정

GTM 대시보드에서:
1. **태그** → **새로 만들기**
2. **태그 유형**: Google Analytics: GA4 구성
3. **측정 ID**: G-XXXXXXXXXX (GA4 속성에서 복사)
4. **트리거**: All Pages
5. **저장** → **제출**

### 2. Meta Pixel 설정

1. **태그** → **새로 만들기**
2. **태그 유형**: Meta Pixel
3. **Pixel ID**: 123456789 (Meta Business Suite에서 복사)
4. **트리거**: All Pages
5. **저장** → **제출**

### 3. Microsoft Clarity 설정

1. **태그** → **새로 만들기**
2. **태그 유형**: Microsoft Clarity
3. **Project ID**: 프로젝트 ID 입력
4. **트리거**: All Pages
5. **저장** → **제출**

---

## 지원되는 이벤트

현재 다음 이벤트가 자동으로 추적됩니다:

| 이벤트 | 설명 | 데이터 |
|--------|------|--------|
| page_view | 페이지 뷰 | page_path, page_title |
| scroll_depth | 스크롤 깊이 | scroll_percentage (25, 50, 75, 100) |
| form_submit | 양식 제출 | form_type, form_data |
| click | 클릭 이벤트 | element_text, element_id |

---

## 문제 해결

| 문제 | 해결 방법 |
|------|----------|
| GTM Preview 연결 불가 | 1. 캐시 초기화 2. 배포 재확인 3. Preview URL 재생성 |
| window.dataLayer 없음 | 1. 페이지 새로고침 2. 네트워크 연결 확인 3. 콘솔 에러 확인 |
| GTM 스크립트 로드 안 됨 | 1. 광고 차단기 비활성화 2. 네트워크 탭에서 gtm.js 요청 확인 |
| 이벤트 추적 안 됨 | 1. GTM 태그 설정 확인 2. 트리거 설정 확인 3. 미리보기 모드에서 테스트 |

---

## 참고 자료

- [Google Tag Manager 공식 문서](https://support.google.com/tagmanager)
- [GTM 설치 가이드](https://support.google.com/tagmanager/answer/6103696)
- [GA4 태그 설정](https://support.google.com/tagmanager/answer/9442095)
- [GTM Preview Mode](https://support.google.com/tagmanager/answer/6107056)
