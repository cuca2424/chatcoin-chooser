
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Order } from '@/api/ordersApi';
import OrderCard from './OrderCard';

interface KanbanColumnProps {
  title: string;
  icon: LucideIcon;
  bgColor: string;
  darkBgColor: string;
  headerBgColor: string;
  darkHeaderBgColor: string;
  headerTextColor: string;
  darkHeaderTextColor: string;
  status: Order['status'];
  orders: Order[];
  emptyMessage: string;
  onDrop: (e: React.DragEvent, status: Order['status']) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, orderId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
}

const KanbanColumn = ({
  title,
  icon: Icon,
  bgColor,
  darkBgColor,
  headerBgColor,
  darkHeaderBgColor,
  headerTextColor,
  darkHeaderTextColor,
  status,
  orders,
  emptyMessage,
  onDrop,
  onDragOver,
  onDragStart,
  onDragEnd,
  onDelete,
  formatCurrency
}: KanbanColumnProps) => {
  const handleDrop = (e: React.DragEvent) => {
    onDrop(e, status);
  };

  return (
    <div 
      className="flex flex-col h-full border-r border-gray-100 dark:border-gray-700 last:border-r-0"
      onDrop={handleDrop} 
      onDragOver={onDragOver}
      data-column-status={status}
    >
      <div className={`${headerBgColor} dark:${darkHeaderBgColor} p-2 flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-700`}>
        <Icon className={`h-4 w-4 ${headerTextColor} dark:${darkHeaderTextColor}`} />
        <h3 className={`text-sm font-medium ${headerTextColor} dark:${darkHeaderTextColor}`}>{title}</h3>
      </div>
      <div className={`${bgColor} dark:${darkBgColor} flex-1 p-1.5 overflow-y-auto space-y-1.5`}>
        {orders.length > 0 ? (
          orders.map(order => (
            <OrderCard 
              key={order.id}
              order={order}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDelete={onDelete}
              formatCurrency={formatCurrency}
            />
          ))
        ) : (
          <div className="text-center py-3 text-xs text-gray-400 dark:text-gray-500">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
