
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
    // Set the order ID in the drag data transfer
    e.dataTransfer.setData('orderId', order.id);
    // Call the parent's onDragStart handler
    onDragStart(e, order.id);
    
    console.log(`Order card drag started: ${order.id}`);
  };

  return (
    <Card 
      className="cursor-move bg-white dark:bg-gray-800 shadow-none hover:shadow-sm transition-all mb-2 border-[0.5px]"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      data-order-id={order.id}
    >
      <CardContent className="p-2.5">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-sm">{order.customerName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {order.items.map((item, idx) => (
                <span key={`${order.id}-item-${idx}`} className="block">• {item}</span>
              ))}
            </p>
            <p className="mt-1.5 font-semibold text-sm">{formatCurrency(order.total)}</p>
          </div>
          <button 
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
