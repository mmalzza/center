# CLAUDE.md

## 절대 규칙
- 기존 UI/동작을 임의로 변경하지 않는다.
- 불필요한 라이브러리·리팩터링을 추가하지 않는다.
- `any` 사용을 최소화한다.

## 구조
- Next.js Pages Router + TypeScript + React
- Dashboard: Tailwind + Recharts
- 데이터 흐름: Mock → API → SWR → Context → Widget

## 데이터
- Mock은 `src/lib/dashboardMock/`에서 생성한다.
- `/api/dashboard`에서 기간·집계 기준을 처리한다.
- `dashboard.json`은 정적 설정으로 사용한다.
- TopSummary는 항상 현재 월 기준이다.

## 코딩
- 기존 컴포넌트·유틸·타입을 우선 재사용한다.
- 필터·집계 로직은 위젯 내부에 작성하지 않는다.
- 새 코드는 기존 폴더 구조와 네이밍을 따른다.

## 검증
`npm run lint`, `npx tsc --noEmit`, `npm run build`
