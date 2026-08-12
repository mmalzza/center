import { TopKpiCardItem } from '@/types/dashboard';

import styles from './KpiCard.module.css';

interface KpiCardProps {
  metric: TopKpiCardItem;
}

export function KpiCard({ metric }: KpiCardProps) {
  const isUp = metric.trend.direction === 'UP';
  const isDown = metric.trend.direction === 'DOWN';

  const trendSymbol = isUp ? '▲' : isDown ? '▼' : '-';

  return (
    <div className={styles.card}>
      <div className={styles.label}>
        {metric.label}
      </div>

      <div className={styles.value}>
        {metric.value}
        <span className={styles.unit}>
          {metric.unit}
        </span>
      </div>

      <div className={styles.comparison}>
        <span className={styles.comparisonLabel}>
          {metric.comparisonLabel}
        </span>

        <span
          className={`${styles.trend} ${
            isUp
              ? styles.trendUp
              : isDown
                ? styles.trendDown
                : styles.trendNone
          }`}
        >
          {trendSymbol} {metric.trend.value}
          {metric.trend.unit}
        </span>
      </div>
    </div>
  );
}