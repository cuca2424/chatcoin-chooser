
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Order } from '@/api/ordersApi';

interface OrderCardProps {
  order: Order;
  onDragStart: (e: React.DragEvent, orderId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
}

const OrderCard = ({ order, onDragStart, onDragEnd, onDelete, formatCurrency }: OrderCardProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag start when deleting
    onDelete(order.id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(e, order.id);
  };

  return (
    <Card 
      className="cursor-move bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow mb-2"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      data-order-id={order.id}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {order.items.map((item, idx) => (
                <span key={`${order.id}-item-${idx}`} className="block">• {item}</span>
              ))}
            </p>
            <p className="mt-2 font-semibold">{formatCurrency(order.total)}</p>
          </div>
          <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
