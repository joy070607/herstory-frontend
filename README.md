# herstory-frontend

herstory의 공항 여정(출국 전 준비 → 공항 내 서비스 → 귀국 후)을 안내하는 Next.js 웹 애플리케이션입니다.

## 기술 스택

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query) — 서버 상태 관리
- [Zustand](https://github.com/pmndrs/zustand) — 클라이언트 상태 관리
- [axios](https://axios-http.com/)
- [jsQR](https://github.com/cozmo/jsQR) — 보딩패스 QR 스캔

## 시작하기

### 요구 사항

- Node.js 20 이상

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 만들고 API 서버 주소를 설정합니다.

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

### 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

### 스크립트

| 명령어          | 설명                        |
| --------------- | --------------------------- |
| `npm run dev`   | 개발 서버 실행               |
| `npm run build` | 프로덕션 빌드                |
| `npm run start` | 빌드된 앱 실행               |
| `npm run lint`  | ESLint 검사                  |

## 프로젝트 구조

```
app/                  라우트 정의 (App Router). 각 page.tsx는 features/의 화면 컴포넌트를 렌더링만 함
  (preflight)/         출국 전: 홈, 보딩패스, 마이페이지, 스타일, 팝업 등
  (airport)/           공항 내: 셀프 체크인, VIP 피팅, 패스트 체크아웃, 공항 지도
  (postflight)/        귀국 후: 가죽 케어, 매장 지도, 마일리지
  (auth)/               로그인, 회원가입, 비밀번호 찾기
  staff/                직원용 태블릿 화면 (승객이 아닌 별도 진입점)

features/              도메인별 화면(pages)과 도메인 전용 컴포넌트
  preflight/  airport/  postflight/  auth/  staff/

components/            여러 도메인에서 공용으로 쓰는 컴포넌트 (layout, icons, ui, scan, signature)
hooks/                  공용 React Query 훅
store/                  Zustand 전역 상태
utils/                  포맷팅 등 순수 유틸 함수
types/                  API 응답/도메인 타입
constants/              라우트 상수(routes.ts) 등 앱 전역 상수
api/                    API 클라이언트
```

라우트 경로는 하드코딩하지 않고 `constants/routes.ts`의 `ROUTES` 객체를 통해 참조합니다.
