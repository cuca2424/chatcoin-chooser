
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
  onDragEnd: () => void;
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
    e.preventDefault();
    onDrop(e, status);
  };

  return (
    <div 
      className="flex flex-col h-full"
      onDrop={handleDrop} 
      onDragOver={onDragOver}
      data-column-status={status} // Add a data attribute to identify the column
    >
      <div className={`${headerBgColor} dark:${darkHeaderBgColor} p-3 rounded-t-md flex items-center space-x-2`}>
        <Icon className={`h-5 w-5 ${headerTextColor} dark:${darkHeaderTextColor}`} />
        <h3 className={`font-medium ${headerTextColor} dark:${darkHeaderTextColor}`}>{title}</h3>
      </div>
      <div className={`${bgColor} dark:${darkBgColor} flex-1 p-2 rounded-b-md overflow-y-auto space-y-2`}>
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
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
