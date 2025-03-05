
import React from 'react';
import StatsCards from './StatsCards';
import DashboardCharts from './DashboardCharts';

interface PanelProps {
  isDarkTheme: boolean;
}

const Panel = ({ isDarkTheme }: PanelProps) => {
  return (
    <>
      <StatsCards />
      <DashboardCharts isDarkTheme={isDarkTheme} />
    </>
  );
};

export default Panel;
