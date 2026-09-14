# Freshmeal-on 프로젝트 실행·검증 가이드

이 문서는 `mobile-catering-landing` 프로젝트를 로컬에서 실행하고, 테스트·타입 검사·프로덕션 빌드를 수행하는 절차를 정리합니다. 프로젝트는 React 19, Vite, Tailwind CSS 4, Express, tRPC, Drizzle ORM, MySQL/TiDB를 사용하는 풀스택 WebDev 프로젝트입니다. 실제 명령어와 스크립트는 [`package.json`](./package.json)을 기준으로 작성했습니다.

## 1. 사전 조건

Node.js 22 계열과 pnpm 10 계열을 사용합니다. 의존성은 저장소의 `pnpm-lock.yaml`에 고정되어 있으므로 처음 설치하거나 잠금 파일이 변경된 경우 다음 명령어를 실행합니다.

```bash
pnpm install --frozen-lockfile
```

`.env` 파일과 비밀값을 저장소에 커밋하지 않습니다. 운영 환경의 시스템 환경 변수는 WebDev Management UI의 Secrets에서 관리하며, 코드나 문서에는 실제 값을 기록하지 않습니다.

## 2. 주요 환경 변수

다음 표는 애플리케이션이 사용하는 대표적인 환경 변수의 용도입니다. 실제 값은 로컬·스테이징·운영 환경에서 별도로 주입해야 합니다.

| 변수 | 용도 | 노출 범위 |
|---|---|---|
| `DATABASE_URL` | MySQL/TiDB 데이터베이스 연결 | 서버 전용 |
| `JWT_SECRET` | 세션 쿠키 서명 | 서버 전용 |
| `VITE_APP_ID` | Manus OAuth 애플리케이션 식별자 | 프론트엔드 사용 가능 |
| `OAUTH_SERVER_URL` | OAuth 백엔드 주소 | 서버 전용 |
| `VITE_OAUTH_PORTAL_URL` | 로그인 포털 주소 | 프론트엔드 |
| `OWNER_OPEN_ID`, `OWNER_NAME` | 프로젝트 소유자 정보 | 서버 전용 |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | 내장 API·스토리지·알림 연동 | 서버 전용 |
| `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | 프론트엔드용 내장 API 접근 | 프론트엔드 사용 가능 |
| `VITE_GTM_ID` | Google Tag Manager 컨테이너 ID | 프론트엔드 |
| `POWER_AUTOMATE_WEBHOOK_URL` | 선택적 상담 Webhook 연동 주소 | 서버 전용, 설정 시 |

환경 변수의 전체 허용 목록과 서버 측 접근 방식은 `server/_core/env.ts` 및 풀스택 템플릿 가이드에 정의되어 있습니다. `VITE_` 접두사가 붙은 값은 브라우저 번들에 포함될 수 있으므로 비밀 토큰을 저장하지 않습니다.

## 3. 개발 서버 실행

개발 서버는 `package.json`의 `dev` 스크립트로 실행합니다. 이 스크립트는 Express 서버와 Vite 개발 서버를 동시에 실행하고 Vite를 호스트 네트워크에 바인딩합니다.

```bash
pnpm dev
```

실행 중에는 Vite 프론트엔드와 Express 백엔드 로그를 함께 확인합니다. 운영과 동일한 번들 실행을 확인하려면 개발 서버 대신 아래의 프로덕션 절차를 사용합니다.

## 4. 품질 검증 명령어

변경 사항을 저장하기 전에 다음 순서로 검증합니다.

```bash
# TypeScript 타입 검사
pnpm check

# Vitest 전체 회귀 테스트
pnpm test

# 프로덕션 서버·프론트엔드 번들 생성
pnpm build
```

`pnpm test`는 저장소의 Vitest 테스트를 한 번 실행하고 종료합니다. 테스트를 작성하면서 반복 확인할 때는 `pnpm test:watch`를 사용합니다. 코드 포맷 정리가 필요한 경우에만 `pnpm format`을 실행하고, 대규모 자동 포맷으로 사용자 변경을 덮어쓰지 않도록 diff를 검토합니다.

## 5. 프로덕션 번들 확인

`pnpm build`는 서버 코드를 `dist/index.js`로 번들링하고 Vite 프론트엔드를 `dist/public`에 생성합니다. 번들 생성이 성공한 뒤 다음 명령으로 프로덕션 서버를 실행할 수 있습니다.

```bash
pnpm start
```

프로덕션 서버는 플랫폼이 주입하는 포트 환경을 사용해야 하므로 애플리케이션 코드에서 고정 포트를 새로 추가하지 않습니다. WebDev 배포는 Management UI의 Publish 흐름을 사용하며, 배포 전에는 반드시 체크포인트를 저장합니다.

## 6. 데이터베이스·인증 주의사항

데이터베이스 스키마를 변경할 때는 `drizzle/schema.ts`를 먼저 수정하고, 마이그레이션을 생성한 뒤 SQL을 검토하고 적용합니다. 데이터 삭제나 파괴적인 SQL은 백업과 영향 범위를 확인하기 전에는 실행하지 않습니다. 인증은 Manus OAuth와 기존 세션 흐름을 사용하며, 클라이언트에서 쿠키를 직접 조작하지 않습니다.

상담 신청은 공개 상담 API를 통해 저장되고, 개인정보 동의는 필수 동의가 확인된 경우에만 제출됩니다. 운영 환경에서 실제 개인정보가 포함된 요청을 테스트하지 말고, 테스트 데이터가 필요한 경우 운영 데이터베이스와 분리된 환경을 사용합니다.

## 7. 정적 이미지·미디어 관리

대용량 이미지·비디오·오디오는 `client/public`이나 `client/src/assets`에 저장하지 않습니다. 원본은 `/home/ubuntu/webdev-static-assets/`에 보관하고, 배포가 필요한 파일은 WebDev용 업로드 절차를 통해 스토리지에 올린 뒤 반환된 `/manus-storage/...` 경로를 코드에서 사용합니다. 저장소에는 작은 설정 파일만 포함합니다.

## 8. 배포 전 체크리스트

배포 전에는 다음 사항을 확인합니다.

| 점검 항목 | 확인 기준 |
|---|---|
| 테스트 | `pnpm test` 전체 성공 |
| 타입 | `pnpm check` 성공 |
| 빌드 | `pnpm build` 성공 |
| PC 화면 | 1280px 기준 헤더·식단·상담폼 확인 |
| 모바일 화면 | 390px 기준 헤더·식단·상담폼 확인 |
| 동의 UI | 체크박스와 아코디언 상태가 분리되고, 화살표에만 열림·닫힘이 연결됨 |
| 개인정보 문구 | 상담폼과 우측 상담 위젯이 동일한 확정 문구를 사용함 |
| 비밀값 | 실제 토큰·Webhook URL이 코드와 문서에 노출되지 않음 |
| 체크포인트 | Publish 전에 최신 변경 상태 저장 |

운영 GTM·GA4 수신 여부, Power Automate 실제 플로우, 운영 데이터베이스 백업·복구, 관리자 권한 검토는 외부 운영 계정 또는 실제 운영 환경에서 별도로 확인해야 합니다.

## 참고 문서

- [package.json](./package.json) — 실행·테스트·빌드 스크립트
- [README.md](./README.md) — 저장소 기본 개발 규칙과 미디어 관리 규칙
- [verification-notes.md](./verification-notes.md) — 프로젝트 변경별 검증 기록
- [todo.md](./todo.md) — 기능 및 운영 점검 이력
