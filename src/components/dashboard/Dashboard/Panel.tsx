
import React from 'react';
import StatsCards from './StatsCards';
import DashboardCharts from './DashboardCharts';

interface PanelProps {
  isDarkTheme: boolean;
}

const Panel = ({ isDarkTheme }: PanelProps) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <StatsCards />
      <DashboardCharts isDarkTheme={isDarkTheme} />
    </div>
  );
};

export default Panel;
