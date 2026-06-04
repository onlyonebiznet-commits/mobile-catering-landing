# 프레시밀온 랜딩페이지 TODO

## 구현 완료 항목
- [x] 기본 랜딩페이지 구조 (Hero, Statistics, Services, Diet, Reviews, Story, FAQ, Footer)
- [x] 헤더 및 네비게이션 메뉴
- [x] 플로팅 상담 신청 버튼 (모바일 및 데스크톱)
- [x] 고객 후기 섹션 (자동 슬라이드, 터치 스와이프)
- [x] 식단 섹션 (슬라이드 기능)
- [x] 롤링 배너 Hero 섹션 (자동 회전, 왼쪽 정렬)
- [x] Hero 배너 우측 하단 네비게이션 (좌우 화살표)
- [x] 화려한 배너 전환 효과 (회전+스케일+슬라이드)
- [x] 프레시밀온 텍스트 흰색 변경 및 행간 조절
- [x] 모달 및 폼 (상담 신청, 자료 다운로드)
- [x] 반응형 디자인 (모바일/태블릿/데스크톱)
- [x] 색상 및 브랜딩 (그린 #005B44, 오렌지 #ED6325)
- [x] 헤더 및 배너 좌측 정렬 통일 (container mx-auto px-4)
- [x] 스크롤 시 헤더 텍스트 색상 그린으로 변경
- [x] Scroll Reveal Animation 적용 (Fade In + Up 효과, 1.1초, 30px 이동)
- [x] 모든 섹션 순차 등장 효과 (Stagger 0.15초 간격)
- [x] Count Up Animation 적용 (성과 지표 숫자)
- [x] 서비스 추천 챗봇 (4단계 플로우 단순화)
- [x] 상담신청 폼 필수 항목 (이메일, 희망 지역, 예상 식수)
- [x] 관심 서비스 항목 업데이트
- [x] 오른쪽 하단 Floating Action Buttons (Top, 맞춤 상담) - 맞춤 추천 및 말풀선 제거
- [x] 푸터 네이버 블로그 로고 적용
- [x] 우츧0 하단 플로팅 버튼 UI 개선 (Telegram 스타일, Hover 시 좌츧0 확장)
- [x] 플로팅 버튼 모바일/터치 상태 인터랙션 추가
- [x] 플로팅 버튼 확장 텍스트 작성
- [x] 플로팅 버튼 터치 스와이프 인터랙션 추가 (touch 스크린 지원)
- [x] 고객사 로고 섹션 2줄 무한 스크롤 구현
- [x] 고객사 로고 배경 없는 PNG로 규격 통일 (200x80px)
- [x] 고객사 로고 시차 애니메이션 적용 (Row1: 좌→우, Row2: 우→좌, 30초 offset)
- [x] 고객사 로고 배경 완전 제거 (흰색/회색 배경 제거, 투명 PNG 변환)
- [x] 고객사 로고 크기 통일 (높이 60px, 너비 auto, object-fit contain)
- [x] 고객사 로고 URL 업데이트 (배경 제거 버전으로 재업로드)
- [x] 추가 로고 16개 동일 방식 처리 및 업로드 (아시아나항공, INSPIRE, SAMSUNG, TBT, SK 바이오닉스, LG Display, Kakao, STECO, Severance, Coupang, 시대언재, Hyundai, CGV, KAL, 바노바기클리닉, MUSINSA)
- [x] 모바일 로고 크기 축소 (sm: 140x60px, max-height 40px, max-width 120px)
- [x] 모바일 로고 갭 감소 (2rem → 1rem)

## 단계별 개선 로드맨

### 단계 1: 기본 기능 추가 (향후 개선)
- [ ] 추가 배너 이미지 (현재 모두 동일 이미지 사용)
- [x] PC 버전 좌우 여백 증가 (1440px: 80px, 1600px: 96px)

### 단계 2: 성능 최적화 (향후 개선)
- [ ] 이미지 lazy loading 적용
- [ ] 번들 최적화

### 단계 3: SEO 및 분석 (향후 개선)
- [ ] SEO 최적화 (메타 태그, 구조화 데이터)
- [ ] 분석 도구 통합 (Google Analytics)

### 완료
- [x] Scroll Reveal Animation 적용 (Fade In + Up 효과, 0.6~1초, 20~30px 이동)

## 로고 자동 처리 시스템 (완료)

- [x] 로고 처리 API 엔드포인트 구현 (POST /api/logos/process)
- [x] 배경 제거 로직 (Python PIL 기반 흰색/회색 배경 자동 감지 및 제거)
- [x] 흰색 로고 감지 및 보존 처리 (RGB > 240 기준)
- [x] 이미지 정규화 (동일 높이 60px 정렬, 비율 유지)
- [x] 배치 처리 기능 (여러 로고 동시 업로드)

## 향후 개선 사항

- [ ] 로고 업로드 UI 컴포넌트 (대시보드에서 로고 관리)
- [ ] 처리 결과 미리보기 (대시보드에서 배경 제거 결과 확인)


## Google Tag Manager (GTM) 통합

- [x] GTM ID 환경 변수 설정 (VITE_GTM_ID: GTM-W2S7VCKH)
- [x] GTM Head 스니펫 client/index.html에 삽입
- [x] GTM Body noscript 스니펫 client/index.html에 삽입
- [x] GTM 유틸리티 함수 구현 (client/src/utils/gtm.ts)
  - isGTMEnabled(): GTM 활성화 여부 확인
  - initializeDataLayer(): dataLayer 초기화
  - trackGTMEvent(): 일반 이벤트 추적
  - trackGTMPageView(): 페이지 뷰 추적
  - trackGTMFormSubmit(): 양식 제출 추적
  - trackGTMClick(): 클릭 이벤트 추적
  - trackGTMScrollDepth(): 스크롤 깊이 추적
  - setGTMUserData(): 사용자 정보 설정
- [x] GTM Head 컴포넌트 (client/src/components/GTMHead.tsx)
- [x] GTM Body 컴포넌트 (client/src/components/GTMBody.tsx)
- [x] useGTM 훅 구현 (client/src/hooks/useGTM.ts)
  - useGTM(): GTM 초기화 및 페이지 뷰 추적
  - useGTMScrollTracking(): 스크롤 깊이 추적
  - useGTMTracking(): GTM 추적 메서드 반환
- [x] App.tsx에 GTM 초기화 훅 추가
- [x] ConsultationModal에 GTM 이벤트 추적 추가 (상담 신청 폼)
- [x] MaterialRequestModal에 GTM 이벤트 추적 추가 (자료 요청 폼)
- [x] GTM 환경 변수 검증 테스트 (client/src/utils/gtm.test.ts)
- [x] 모든 테스트 통과 (34/34 ✓)

## 향후 GTM 연동 예정 사항

- [ ] GA4 (Google Analytics 4) GTM 태그 설정
- [ ] Meta Pixel 이벤트 추적 설정
- [ ] Microsoft Clarity 세션 분석 설정
- [ ] 추가 이벤트 추적 (버튼 클릭, 스크롤 깊이, 동영상 재생 등)
- [ ] 전환 목표 설정 (상담 신청, 자료 다운로드)
- [ ] 사용자 정보 동기화 (회사명, 지역, 예상 식수 등)


## 타이포그래피(Typography) 최적화

- [x] 성과 수치 섹션 폰트 크기 조정
  - 숫자: text-4xl → text-3xl (36px → 28px) / PC: text-5xl → text-4xl (48px → 36px)
  - 단위: 숫자와 함께 한 줄에 정렬 (whitespace-nowrap 적용)
  - 설명: text-gray-600 → text-sm md:text-base (약 12% 축소)
  - 줄바꿈 방지: "300,000명", "730점" 등이 한 줄에 유지
- [x] Hero 섹션 헤드라인 폰트 크기 확대
  - 메인 제목: 32px → 36px (약 12% 확대)
  - 강조 텍스트: 30px → 34px (약 13% 확대)
  - 모바일에서도 자연스러운 크기 유지
- [x] 모든 테스트 통과 (34/34 ✓)
- [x] 빌드 에러 없음


## GA4 이벤트 추적 구현

- [x] GA4 이벤트 추적 유틸리티 구현 (trackGA4Event 함수)
- [x] 상담 신청 버튼 클릭 이벤트 (consultation_click)
- [x] 상담 신청 폼 노출 이벤트 (consultation_form_view)
- [x] 상담 신청 완료 이벤트 (consultation_submit) - 성공 시에만
- [x] 자료 요청 버튼 클릭 이벤트 (material_request_click)
- [x] 자료 요청 완료 이벤트 (material_request_submit) - 성공 시에만
- [x] 버튼 data-event 속성 추가
- [x] 이벤트 추적 테스트 및 검증
- [ ] GTM Preview에서 이벤트 확인
- [ ] 이벤트 추적 테스트 및 검증
- [ ] GTM Preview에서 이벤트 확인


## 데이터베이스 및 API 구현

- [x] web-static을 web-db-user로 업그레이드
- [x] consultation_requests 테이블 생성 (companyName, managerName, phone, email, employeeCount, inquiryType, message, createdAt)
- [x] material_requests 테이블 생성 (companyName, managerName, phone, email, downloadFile, createdAt)
- [x] /api/consultation-request 엔드포인트 구현 (POST, 201 응답)
- [x] /api/material-request 엔드포인트 구현 (POST, 201 응답)
- [x] 상담 신청 성공 시 consultation_submit 이벤트 발생
- [x] 자료 신청 성공 시 material_request_submit 이벤트 발생
- [x] 프론트엔드 폼 필드명 업데이트 (manager → managerName, inquiries → message 등)
- [x] 데이터베이스 스키마 업데이트 (status 커라른 추가)
- [x] 관리자 인증 API (/api/admin/login, /api/admin/verify)
- [ ] 이메일 알림 서비스 구현 (상담/자료 신청 시) (Phase 5)
- [x] 관리자 대시보드 조회 API (/api/admin/consultations, /api/admin/materials)
- [x] 관리자 대시보드 아래 KPI API (/api/admin/stats)
- [x] 관리자 대시보드 CSV 내보내기 API (/api/admin/export)
- [x] 관리자 대시보드 상태 업데이트 API (/api/admin/update-status)
- [x] 관리자 대시보드 프론트엔드 로그인 페이지 (/admin/login)
- [x] 관리자 대시보드 프론트엔드 데이터 조회 테이블 (/admin/dashboard)
- [x] 관리자 대시보드 필터 및 정렬 기능 (검색, 상태 필터)
- [x] 관리자 대시보드 CSV 내보내기 기능
- [x] 관리자 대시보드 KPI 통계 (오늘, 이번 달)
- [x] 관리자 대시보드 라우팅 추가
- [x] 관리자 대시보드 테이블에 문의 유형(상담) 및 신청 자료(자료 신청) 커라른 추가
- [x] 관리자 대시보드 상태 필터 UI 및 API 연동 구현
- [ ] 관리자 대시보드 기간 필터(시작일/종료일) 구현 (추후 추가 예정) (Phase 5)
- [x] 관리자 대시보드 최신순 정렬 보장 및 정렬 기준 검증


## CRM 대시보드 개선 (Phase 2, 3, 4 완료)

- [x] DB 스키마 수정: status, deleted_at 컬럼 추가
- [x] API 수정: soft delete 필터링 적용
- [x] Admin 컴포넌트: 테이블 UI 구현 (카드형 → 테이블형)
- [x] 검색 기능: 회사명, 담당자, 연락처, 이메일
- [x] 필터 기능: 진행 현황별 필터 (전체, 진행중, 타겟처, 가망처, 수주완료, DROP)
- [x] 정렬 기능: 접수일 정렬 (최신순/오래된순)
- [x] 진행 현황 드롭다운: 5가지 상태 (진행중, 타겟처, 가망처, 수주완료, DROP)
- [x] 상태 색상 배지: 파랑, 주황, 초록, 보라, 빨강
- [x] 삭제 기능: 단단 삭제 + 확인 모달
- [x] CSV 다운로드 기능
- [x] 모바일 대응: 가로 스크롤
- [x] 상담신청/자료요청 공통 적용
- [x] 최종 검증 및 배포

## 관리자 대시보드 필터 개선 (Phase 5 완료)

- [x] 희망 서비스 필터 드롭다운 추가 (consultations, materials)
- [x] 필터 옵션: 전체 서비스, 구내식당, 케이터링, 간식/스낵, 카페, 조식
- [x] serviceType 필터링 로직 구현
- [x] 검색 + 희망 서비스 + 진행 현황 필터 동시 적용
- [x] CSV 다운로드 필터링된 데이터만 적용
- [x] 반응형 레이아웃 (grid-cols-1 md:grid-cols-3)
- [x] 상담 신청/자료 요청 탭 동일 적용


## 스낵픽 섹션 UI 개선 (Phase 6 완료)

- [x] 스낵픽 섹션 데이터 구조 재설계 (카테고리별 상품 배열)
- [x] 기존 "건강하고 트렌디한 수제 간편식" 섹션 제거
- [x] 카테고리 선택형 갤러리 UI 구현 (8개 카테고리)
- [x] 2×2 이미지 그리드 구현
- [x] 카테고리 활성화 스타일 (CJ 그린 컬러)
- [x] 반응형 레이아웃 (PC/모바일)
- [x] 모바일 카테고리 가로 스크롤
- [x] 빌드, 테스트 및 배포
