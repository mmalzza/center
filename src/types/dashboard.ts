// 1. 대시보드 공통 타입 (재사용 영역)

// 차트 및 지표 단위 공통화 
export type MetricUnit = '건' | '명' | '회' | '원' | '만원' | '%';

// 증감 추이 방향
export type TrendDirection = 'UP' | 'DOWN' | 'NONE';

// 증감 추이 공통 정보 (방향 + 수치 + 단위)
export interface TrendInfo {
  direction: TrendDirection;
  value: number;
  unit?: MetricUnit;   
}

// 범례 공통화
export interface SeriesConfig {
  id: string;
  label: string;
  colorCode: string;
}

// 위젯의 공통 Header 속성
export interface BaseWidget {
  title: string;
  startDate: string;
  endDate: string;
  infoTooltipText: string;
  widgetType:
    | 'DONUT'
    | 'LINE'
    | 'BAR'
    | 'RANKING'
    | 'LIST_BAR'
    | 'PROGRESS_KPI'
    | 'LINE_WITH_SUMMARY';
}

// 2. 대시보드 상단 영역

export interface DashboardHeaderInfo {
  pageTitle: string;
}

export interface DashboardNoticeInfo {
  title: string;
  messages: string[];
}

// 상단 조회 및 집계 필터 영역 
export interface FilterPresetOption {
  id: string;
  label: string;
}

export interface AggregationOption {
  id: string;   
  label: string;
}

export interface DashboardFilterConfig {
  dateSelectionType: string;        
  selectedPreset: string;          
  presetOptions: FilterPresetOption[];
  selectedAggregationUnit: string; 
  aggregationOptions: AggregationOption[];
  startDate: string;           
  endDate: string;               
}

// 상단 요약 KPI 카드 개별 지표
export interface TopKpiCardItem {
  id: string;
  label: string;
  value: number;
  unit: MetricUnit;
  accumulatedValue?: number;
  comparisonLabel: string;
  trend: TrendInfo;
}

export interface TopSummaryBarData {
  targetMonth: string;
  metrics: TopKpiCardItem[];
}

// 3. 차트 위젯별 상세 타입

// 3-1. 도넛 차트 위젯 (회기 재구매율)
export interface TooltipDetail {
  label: string;
  count: number;
  unit: MetricUnit;
}

export interface DonutChartSegment {
  id: string;
  label: string;
  percentage: number;
  userCount: number;
  colorCode: string;
  tooltipDetails?: TooltipDetail[];
}

export interface KpiSummary {
  label: string;
  rate: number;
  comparisonLabel: string;
  trend: TrendInfo;
}

export interface RepurchaseSegmentData {
  summary: KpiSummary;
  chartData: DonutChartSegment[];
}

export interface RepurchaseWidgetData extends BaseWidget {
  widgetType: 'DONUT';
  summary: KpiSummary; // 전체
  chartData: DonutChartSegment[]; // 전체
  segments?: {
    B2B: RepurchaseSegmentData;
    B2C: RepurchaseSegmentData;
  };
}

// 3-2. 라인 차트 위젯 (예약 증감율)
export interface ReferenceLineConfig {
  label: string;
  value: number;
  unit: MetricUnit;
}

export interface LineChartDataPoint {
  period: string;
  values: Record<string, number>;
}

export interface ReservationRateWidgetData extends BaseWidget {
  widgetType: 'LINE';
  unit: MetricUnit;
  referenceLine?: ReferenceLineConfig;
  seriesConfigs: SeriesConfig[];
  chartData: LineChartDataPoint[];
}

// 3-3. 막대 차트 위젯 (월별 매출 현황)
export interface BarChartDataPoint {
  period: string;
  values: Record<string, number>;
}

export interface MonthlySalesWidgetData extends BaseWidget {
  widgetType: 'BAR';
  unit: MetricUnit;
  seriesConfigs: SeriesConfig[];
  chartData: BarChartDataPoint[];
}

// 3-4. 랭킹 리스트 위젯 (전문가 오더건수)
export interface CategoryFilterOption {
  id: string;
  label: string;
}

export interface ExpertRankingItem {
  rank: number;
  expertName: string;
  category: string;
  orderCount: number;
  sharePercentage: number;
  trend: TrendInfo;
}

export interface ExpertOrdersWidgetData extends BaseWidget {
  widgetType: 'RANKING';
  hasNameMaskingToggle: boolean;
  categories: CategoryFilterOption[];
  seriesConfigs: SeriesConfig[];
  chartData: ExpertRankingItem[];
}

// 3-5. 수평 바 리스트 위젯 (직원별 문의 응대 현황)
export interface EmployeeResponseItem {
  id: string;
  employeeName: string;
  isOff: boolean;
  responseCount: number;
  trend: TrendInfo;
}

export interface EmployeeResponseWidgetData extends BaseWidget {
  widgetType: 'LIST_BAR';
  hasOffEmployeeToggle: boolean;
  averageCount: number;
  unit: MetricUnit;
  seriesConfigs: SeriesConfig[];
  chartData: EmployeeResponseItem[];
}

// 3-6. 단일 KPI 프로그레스 위젯 (오프라인 데스크 예약 전환율)
export interface ProgressMetricItem {
  label: string;
  value: number;
  unit: MetricUnit;
}

export interface ConversionProgressWidgetData extends BaseWidget {
  widgetType: 'PROGRESS_KPI';
  conversionRate: number;
  comparisonLabel: string;
  trend: TrendInfo;
  numerator: ProgressMetricItem;
  denominator: ProgressMetricItem;
  colorCode: string;
}

// 3-7. 요약 카드가 포함된 라인 차트 위젯 (전문가 연계율)
export interface ConnectionTooltipDetails {
  inboundCount: number;
  acceptedCount: number;
  connectionRate: number;
}

export interface ConnectionChartDataPoint {
  period: string;
  rate: number;
  tooltipDetails?: ConnectionTooltipDetails;
}

export interface SummaryCardItem {
  label: string;
  value: number;
  unit: MetricUnit;
}

export interface ExpertConnectionWidgetData extends BaseWidget {
  widgetType: 'LINE_WITH_SUMMARY';
  unit: MetricUnit;
  colorCode: string;
  chartData: ConnectionChartDataPoint[];
  bottomSummary: SummaryCardItem[];
}


// 4. 대시보드 전체 API 응답 모델 (마스터)

export interface DashboardResponse {
  header: DashboardHeaderInfo;
  notice: DashboardNoticeInfo;
  filter: DashboardFilterConfig;
  topSummary: TopSummaryBarData;
  repurchaseRate: RepurchaseWidgetData;
  reservationRate: ReservationRateWidgetData;
  monthlySales: MonthlySalesWidgetData;
  expertOrders: ExpertOrdersWidgetData;
  employeeResponses: EmployeeResponseWidgetData;
  offlineDeskConversion: ConversionProgressWidgetData;
  expertConnection: ExpertConnectionWidgetData;
}