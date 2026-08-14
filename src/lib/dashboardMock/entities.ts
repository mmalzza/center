// 대시보드 Mock 생성에 사용하는 고정 roster.
// dashboard.json 샘플 데이터의 인물/카테고리를 그대로 재사용해
// 실제 chartData의 category/expertName 값과 항상 일치하도록 유지한다.

export interface ExpertEntity {
  id: string;
  expertName: string;
  category: string;
  // 일별 랜덤 오더건수 범위에 곱해지는 고정 가중치 (전문가별 업무량 편차 표현용)
  weight: number;
}

export const EXPERTS: ExpertEntity[] = [
  { id: 'expert_1', expertName: '김민재', category: '심리 상담', weight: 1.0 },
  { id: 'expert_2', expertName: '이소영', category: '심리 치료(아동)', weight: 0.88 },
  { id: 'expert_3', expertName: '박동현', category: '임상 평가', weight: 0.75 },
  { id: 'expert_4', expertName: '최수지', category: '심리 검사', weight: 0.62 },
  { id: 'expert_5', expertName: '정도현', category: '심리 상담', weight: 0.5 },
];

export interface EmployeeEntity {
  id: string;
  employeeName: string;
  // 일별 랜덤 응대건수 범위에 곱해지는 고정 가중치
  weight: number;
}

export const EMPLOYEES: EmployeeEntity[] = [
  { id: 'emp_1', employeeName: '이지연', weight: 1.0 },
  { id: 'emp_2', employeeName: '최원우', weight: 0.9 },
  { id: 'emp_3', employeeName: '정다은', weight: 0.8 },
  { id: 'emp_4', employeeName: '김민수', weight: 0.7 },
  { id: 'emp_5', employeeName: '박소연', weight: 0.6 },
];
