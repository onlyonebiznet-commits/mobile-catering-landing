# 배포 후 검증 테스트 체크리스트

배포 후 실제 동작을 검증하기 위한 구체적인 테스트 절차입니다. 각 항목별로 정확한 URL, 데이터, 검증 방법을 제시합니다.

---

## 📋 테스트 환경 정보

| 항목 | 값 |
|------|-----|
| **배포 도메인** | `https://cjfreshwayfreshmealon.manus.space` 또는 `https://mobilecater-bnzd6xno.manus.space` |
| **관리자 로그인 URL** | `https://[도메인]/admin/login` |
| **관리자 대시보드 URL** | `https://[도메인]/admin/dashboard` |
| **관리자 비밀번호** | 환경변수 `ADMIN_PASSWORD` (배포 시 설정됨) |
| **데이터베이스** | MySQL/TiDB (Management UI의 Database 탭에서 확인 가능) |

---

## ✅ 테스트 1: 상담 신청 제출

### 1.1 상담 신청 폼 제출

**URL:** `https://[도메인]/`

**테스트 절차:**

1. 랜딩페이지 접속
2. 페이지 상단의 "문의하기" 버튼 또는 "지금 상담받기" 버튼 클릭
3. 상담 신청 모달 팝업 확인
4. 다음 데이터를 입력:
   ```
   회사명: 테스트회사A
   담당자명: 홍길동
   연락처: 010-1234-5678
   이메일: test@example.com
   관심 서비스: 프레시밀온 (또는 다른 옵션)
   지역: 서울 (또는 다른 옵션)
   예상 인원: 50명
   추가 요청사항: 테스트 상담입니다
   개인정보 수집 동의: 체크
   ```

5. "상담 신청" 버튼 클릭

**예상 결과:**
- ✅ 성공 토스트 메시지: "상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다."
- ✅ 모달 자동 종료
- ✅ `/thank-you` 페이지로 자동 리다이렉트 (500ms 후)
- ✅ 브라우저 개발자 도구 → Network 탭에서 `POST /api/consultation-request` 요청 확인
  - Status: **201** 또는 **200**
  - Response body: `{ "success": true, "message": "상담 신청이 완료되었습니다", "event": "consultation_submit" }`

**실패 시 확인 사항:**
- 필수 필드 누락 시 → 각 필드별 경고 토스트 표시 확인
- 개인정보 동의 미체크 시 → "개인정보 수집에 동의해주세요" 메시지 확인

---

## ✅ 테스트 2: consultation_requests 데이터베이스 저장 확인

### 2.1 데이터베이스 직접 조회

**방법 1: Management UI 데이터베이스 탭 사용**

1. Manus 프로젝트 Management UI 접속
2. 좌측 메뉴 → "Database" 탭 클릭
3. 테이블 목록에서 `consultation_requests` 선택
4. 테스트 1에서 제출한 데이터 확인:
   - `company_name`: "테스트회사A"
   - `manager_name`: "홍길동"
   - `phone`: "010-1234-5678"
   - `email`: "test@example.com"
   - `inquiry_type`: "프레시밀온"
   - `employee_count`: "50"
   - `message`: "테스트 상담입니다"
   - `status`: "new"
   - `created_at`: 현재 시간

**방법 2: 관리자 대시보드에서 확인 (테스트 6 이후)**

1. 관리자 대시보드 접속 (`/admin/dashboard`)
2. "상담" 탭 확인
3. 가장 최근 항목에 위의 데이터가 표시되는지 확인

**예상 결과:**
- ✅ 입력한 모든 데이터가 정확히 저장됨
- ✅ `status` 필드: "new"
- ✅ `created_at`: 제출 시간과 일치

---

## ✅ 테스트 3: 자료 신청 제출

### 3.1 자료 신청 폼 제출

**URL:** `https://[도메인]/`

**테스트 절차:**

1. 랜딩페이지 접속
2. 페이지 상단의 "자료 다운로드" 버튼 또는 하단의 "자료 다운로드" 버튼 클릭
3. 자료 신청 모달 팝업 확인
4. 다음 데이터를 입력:
   ```
   회사명: 테스트회사B
   담당자명: 김영희
   연락처: 010-9876-5432
   이메일: material@example.com
   개인정보 수집 동의: 체크
   ```

5. "자료 신청" 버튼 클릭

**예상 결과:**
- ✅ 성공 토스트 메시지: "자료 신청이 완료되었습니다. 이메일로 자료를 보내드리겠습니다."
- ✅ 모달 자동 종료
- ✅ `/thank-you` 페이지로 자동 리다이렉트 (500ms 후)
- ✅ 브라우저 개발자 도구 → Network 탭에서 `POST /api/material-request` 요청 확인
  - Status: **201** 또는 **200**
  - Response body: `{ "success": true, "message": "자료 신청이 완료되었습니다", "event": "material_request_submit" }`

---

## ✅ 테스트 4: material_requests 데이터베이스 저장 확인

### 4.1 데이터베이스 직접 조회

**방법 1: Management UI 데이터베이스 탭 사용**

1. Manus 프로젝트 Management UI 접속
2. 좌측 메뉴 → "Database" 탭 클릭
3. 테이블 목록에서 `material_requests` 선택
4. 테스트 3에서 제출한 데이터 확인:
   - `company_name`: "테스트회사B"
   - `manager_name`: "김영희"
   - `phone`: "010-9876-5432"
   - `email`: "material@example.com"
   - `status`: "new"
   - `created_at`: 현재 시간

**예상 결과:**
- ✅ 입력한 모든 데이터가 정확히 저장됨
- ✅ `status` 필드: "new"
- ✅ `created_at`: 제출 시간과 일치

---

## ✅ 테스트 5: 관리자 로그인 확인

### 5.1 관리자 로그인 페이지 접속

**URL:** `https://[도메인]/admin/login`

**테스트 절차:**

1. 위 URL 접속
2. "관리자 대시보드" 제목과 "관리자 비밀번호를 입력해주세요" 텍스트 확인
3. 비밀번호 입력 필드 확인
4. 환경변수 `ADMIN_PASSWORD`에 설정된 비밀번호 입력
5. "로그인" 버튼 클릭

**예상 결과:**
- ✅ 로그인 성공 후 `/admin/dashboard`로 자동 리다이렉트
- ✅ 브라우저 개발자 도구 → Network 탭에서 `POST /api/admin/login` 요청 확인
  - Status: **200**
  - Response body: `{ "success": true, "token": "..." }`
- ✅ `localStorage`에 `adminToken` 저장 확인 (개발자 도구 → Application → Local Storage)

### 5.2 잘못된 비밀번호 입력 테스트

**테스트 절차:**

1. 관리자 로그인 페이지 접속 (`/admin/login`)
2. 잘못된 비밀번호 입력 (예: "wrongpassword")
3. "로그인" 버튼 클릭

**예상 결과:**
- ✅ 에러 메시지: "비밀번호가 올바르지 않습니다"
- ✅ 로그인 페이지 유지 (리다이렉트 안 됨)
- ✅ 브라우저 개발자 도구 → Network 탭에서 `POST /api/admin/login` 요청 확인
  - Status: **401**
  - Response body: `{ "error": "비밀번호가 올바르지 않습니다" }`

---

## ✅ 테스트 6: 관리자 대시보드 조회 확인

### 6.1 대시보드 페이지 접속

**URL:** `https://[도메인]/admin/dashboard`

**테스트 절차:**

1. 위 URL 직접 접속 (로그인되지 않은 상태)
   - 예상: `/admin/login`으로 자동 리다이렉트

2. 테스트 5에서 로그인 후 대시보드 접속
3. 다음 요소 확인:
   - 상단 헤더: "관리자 대시보드" 제목
   - 로그아웃 버튼 (우측 상단)
   - 검색 입력 필드
   - 상태 필터 드롭다운
   - "상담" 탭과 "자료" 탭

**예상 결과:**
- ✅ 대시보드 페이지 정상 로드
- ✅ 로그인되지 않은 상태에서 접속 시 로그인 페이지로 리다이렉트
- ✅ 브라우저 개발자 도구 → Network 탭에서 다음 요청 확인:
  - `GET /api/admin/consultations` (Status: **200**)
  - `GET /api/admin/materials` (Status: **200**)
  - `GET /api/admin/stats` (Status: **200**)
  - 모든 요청에 `Authorization: Bearer [token]` 헤더 포함

---

## ✅ 테스트 7: KPI 통계 확인

### 7.1 KPI 카드 표시 확인

**URL:** `https://[도메인]/admin/dashboard`

**테스트 절차:**

1. 관리자 대시보드 접속 (로그인 필수)
2. 상단의 4개 KPI 카드 확인:
   - "오늘 상담": 오늘 제출된 상담 신청 수
   - "이번 달 상담": 이번 달 제출된 상담 신청 수
   - "오늘 자료": 오늘 제출된 자료 신청 수
   - "이번 달 자료": 이번 달 제출된 자료 신청 수

3. 테스트 1, 3에서 제출한 항목이 카운트되는지 확인:
   - 테스트 1 상담 신청 → "오늘 상담", "이번 달 상담" 증가
   - 테스트 3 자료 신청 → "오늘 자료", "이번 달 자료" 증가

**예상 결과:**
- ✅ 4개 KPI 카드 모두 표시됨
- ✅ 각 카드에 숫자 표시 (최소 1 이상)
- ✅ 브라우저 개발자 도구 → Network 탭에서 `GET /api/admin/stats` 요청 확인
  - Status: **200**
  - Response body 예시:
    ```json
    {
      "consultationToday": 1,
      "consultationMonth": 1,
      "materialToday": 1,
      "materialMonth": 1
    }
    ```

---

## ✅ 테스트 8: CSV 다운로드 확인

### 8.1 상담 신청 CSV 다운로드

**URL:** `https://[도메인]/admin/dashboard`

**테스트 절차:**

1. 관리자 대시보드 접속 (로그인 필수)
2. "상담" 탭 확인
3. 테이블 우측 상단의 "CSV 다운로드" 버튼 클릭
4. 파일 다운로드 확인

**예상 결과:**
- ✅ 파일명: `consultation_YYYY-MM-DD.csv` (예: `consultation_2026-06-02.csv`)
- ✅ 파일 내용 확인:
  - 헤더: `ID,회사명,담당자,연락처,이메일,문의유형,직원수,메시지,상태,생성일`
  - 첫 번째 행: 테스트 1에서 제출한 데이터
    ```
    1,테스트회사A,홍길동,010-1234-5678,test@example.com,프레시밀온,50,테스트 상담입니다,new,2026-06-02 HH:MM:SS
    ```
- ✅ 브라우저 개발자 도구 → Network 탭에서 `GET /api/admin/export?type=consultation` 요청 확인
  - Status: **200**
  - Content-Type: `text/csv; charset=utf-8`
  - Authorization 헤더 포함

### 8.2 자료 신청 CSV 다운로드

**URL:** `https://[도메인]/admin/dashboard`

**테스트 절차:**

1. 관리자 대시보드 접속 (로그인 필수)
2. "자료" 탭 클릭
3. 테이블 우측 상단의 "CSV 다운로드" 버튼 클릭
4. 파일 다운로드 확인

**예상 결과:**
- ✅ 파일명: `material_YYYY-MM-DD.csv` (예: `material_2026-06-02.csv`)
- ✅ 파일 내용 확인:
  - 헤더: `ID,회사명,담당자,연락처,이메일,다운로드파일,상태,생성일`
  - 첫 번째 행: 테스트 3에서 제출한 데이터
    ```
    1,테스트회사B,김영희,010-9876-5432,material@example.com,,new,2026-06-02 HH:MM:SS
    ```

---

## ✅ 테스트 9: consultation_submit 이벤트 확인

### 9.1 Google Analytics 이벤트 추적

**테스트 절차:**

1. 배포된 사이트 접속
2. 브라우저 개발자 도구 → Console 탭 열기
3. 상담 신청 폼 제출 (테스트 1 반복)
4. 브라우저 개발자 도구 → Network 탭에서 다음 요청 확인:
   - `POST /api/consultation-request` (상담 신청 API)
   - Google Analytics 요청 (도메인: `www.google-analytics.com` 또는 `analytics.google.com`)

**예상 결과:**
- ✅ 상담 신청 성공 후 Google Analytics 이벤트 전송 확인
- ✅ 이벤트 데이터 포함:
  - Event name: `consultation_submit` 또는 `consultation_request`
  - 파라미터: `company_name`, `contact_person`, `service_type`, `region`, `estimated_meals`, `form_type`
- ✅ 또는 Google Analytics 4 대시보드에서 확인:
  1. GA4 대시보드 접속
  2. 좌측 메뉴 → "Events" 클릭
  3. `consultation_submit` 이벤트 확인

**참고:** GTM (Google Tag Manager)이 설정되어 있으면 GTM 미리보기 모드에서도 확인 가능

---

## ✅ 테스트 10: material_request_submit 이벤트 확인

### 10.1 Google Analytics 이벤트 추적

**테스트 절차:**

1. 배포된 사이트 접속
2. 브라우저 개발자 도구 → Console 탭 열기
3. 자료 신청 폼 제출 (테스트 3 반복)
4. 브라우저 개발자 도구 → Network 탭에서 다음 요청 확인:
   - `POST /api/material-request` (자료 신청 API)
   - Google Analytics 요청

**예상 결과:**
- ✅ 자료 신청 성공 후 Google Analytics 이벤트 전송 확인
- ✅ 이벤트 데이터 포함:
  - Event name: `material_request_submit` 또는 `material_request`
  - 파라미터: `company_name`, `contact_person`, `form_type`
- ✅ Google Analytics 4 대시보드에서 확인:
  1. GA4 대시보드 접속
  2. 좌측 메뉴 → "Events" 클릭
  3. `material_request_submit` 이벤트 확인

---

## 🔍 추가 검증 사항

### A. 서버 로그 확인

배포 후 서버 로그에서 다음 메시지 확인:

**상담 신청 성공 로그:**
```
[consultation-request] START
[consultation-request] Received: { companyName: '테스트회사A', managerName: '홍길동', phone: '010-1234-5678', ... }
[consultation-request] DB connection OK
✓ consultation_requests saved: { companyName: '테스트회사A', managerName: '홍길동', phone: '010-1234-5678' }
[consultation-request] END
```

**자료 신청 성공 로그:**
```
[material-request] START
[material-request] Received: { companyName: '테스트회사B', managerName: '김영희', phone: '010-9876-5432', ... }
[material-request] DB connection OK
✓ material_requests saved: { companyName: '테스트회사B', managerName: '김영희', phone: '010-9876-5432' }
[material-request] END
```

**관리자 대시보드 조회 로그:**
```
[/api/admin/consultations] START
[/api/admin/consultations] Token verified
[/api/admin/consultations] DB connection OK
[/api/admin/consultations] Query result: 1 rows
[/api/admin/consultations] END
```

### B. 데이터베이스 연결 확인

Management UI → Database 탭에서:
- ✅ 데이터베이스 연결 상태: "Connected"
- ✅ `consultation_requests` 테이블 존재
- ✅ `material_requests` 테이블 존재
- ✅ 각 테이블에 테스트 데이터 저장됨

### C. 환경변수 확인

Management UI → Settings → Secrets에서:
- ✅ `ADMIN_PASSWORD` 설정됨
- ✅ `DATABASE_URL` 설정됨
- ✅ `VITE_GTM_ID` 또는 `VITE_ANALYTICS_WEBSITE_ID` 설정됨 (분석 추적용)

---

## 📊 테스트 결과 기록

| 테스트 항목 | 상태 | 비고 |
|-----------|------|------|
| 1. 상담 신청 제출 | ☐ 완료 | |
| 2. consultation_requests 저장 | ☐ 완료 | |
| 3. 자료 신청 제출 | ☐ 완료 | |
| 4. material_requests 저장 | ☐ 완료 | |
| 5. 관리자 로그인 | ☐ 완료 | |
| 6. 관리자 대시보드 조회 | ☐ 완료 | |
| 7. KPI 통계 확인 | ☐ 완료 | |
| 8. CSV 다운로드 | ☐ 완료 | |
| 9. consultation_submit 이벤트 | ☐ 완료 | |
| 10. material_request_submit 이벤트 | ☐ 완료 | |

---

## 🚨 문제 발생 시 대응

### 상담/자료 신청 실패

**증상:** API 요청이 실패하거나 데이터베이스에 저장되지 않음

**확인 사항:**
1. 브라우저 개발자 도구 → Network 탭에서 요청 상태 코드 확인
2. 서버 로그에서 에러 메시지 확인
3. Management UI → Database에서 테이블 존재 확인
4. 환경변수 `DATABASE_URL` 확인

### 관리자 로그인 실패

**증상:** 비밀번호 입력 후 로그인 실패

**확인 사항:**
1. 환경변수 `ADMIN_PASSWORD` 값 확인
2. 브라우저 개발자 도구 → Network 탭에서 `POST /api/admin/login` 응답 확인
3. 서버 로그에서 인증 관련 에러 확인

### 대시보드 데이터 미표시

**증상:** 대시보드 접속은 되지만 데이터가 표시되지 않음

**확인 사항:**
1. 로그인 토큰이 `localStorage`에 저장되었는지 확인
2. 브라우저 개발자 도구 → Network 탭에서 `/api/admin/consultations`, `/api/admin/materials`, `/api/admin/stats` 요청 상태 확인
3. 각 요청의 `Authorization` 헤더 포함 여부 확인
4. 서버 로그에서 토큰 검증 관련 에러 확인

### CSV 다운로드 실패

**증상:** CSV 다운로드 버튼 클릭 시 아무 일도 일어나지 않음

**확인 사항:**
1. 브라우저 개발자 도구 → Network 탭에서 `GET /api/admin/export?type=...` 요청 확인
2. 응답 상태 코드 확인 (200 또는 401)
3. 브라우저 다운로드 폴더에서 파일 확인
4. 브라우저 콘솔에서 에러 메시지 확인

---

## 📝 테스트 완료 체크리스트

배포 후 모든 테스트를 완료하면 다음을 확인하세요:

- ☐ 10개 테스트 항목 모두 완료
- ☐ 데이터베이스에 테스트 데이터 저장 확인
- ☐ 관리자 대시보드에서 데이터 조회 확인
- ☐ CSV 다운로드 파일 생성 확인
- ☐ Google Analytics 이벤트 전송 확인
- ☐ 서버 로그에서 에러 없음 확인
- ☐ 모든 환경변수 설정 확인

**모든 테스트 완료 시 배포 성공!** 🎉
