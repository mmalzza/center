import dashboardData from '@/data/dashboard.json';

import { TopSummaryBarData } from '@/types/dashboard';

import { KpiCard } from '../KpiCard/KpiCard';

import styles from './DashboardGrid.module.css';

export function DashboardGrid() {
  const topSummary = dashboardData.topSummary as TopSummaryBarData;

  return (
    <div className={styles.dashboardGrid}>
      <section className={styles.kpiSection}>
        {topSummary.metrics.map((metric) => (
          <KpiCard
            key={metric.id}
            metric={metric}
          />
        ))}
      </section>
    </div>
  );
}