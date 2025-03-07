
import React from 'react';
import KanbanColumn from './KanbanColumn';
import { useOrderManagement } from '@/hooks/useOrderManagement';
import { columnConfigs } from './columnConfigs';

interface PanelProps {
  isDarkTheme: boolean;
}

const Panel = ({ isDarkTheme }: PanelProps) => {
  const {
    loading,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleDragEnd,
    handleDeleteOrder,
    filterOrdersByStatus,
    formatCurrency
  } = useOrderManagement();

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse-subtle">Carregando pedidos...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 h-full">
          {columnConfigs.map((config) => (
            <KanbanColumn
              key={config.status}
              {...config}
              orders={filterOrdersByStatus(config.status)}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDelete={handleDeleteOrder}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Panel;
