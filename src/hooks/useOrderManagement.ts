
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ordersApi, Order, useOrders } from '@/api/ordersApi';
import { createSampleOrders } from '@/utils/sampleOrdersGenerator';

export const useOrderManagement = () => {
  const { toast } = useToast();
  const { updateOrderStatus, deleteOrder } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedOrderId, setDraggedOrderId] = useState<string | null>(null);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      const fetchedOrders = await ordersApi.getOrders();
      
      // If no orders in localStorage, add some sample orders for demo
      if (fetchedOrders.length === 0) {
        await createSampleOrders();
        const updatedOrders = await ordersApi.getOrders();
        setOrders(updatedOrders);
      } else {
        setOrders(fetchedOrders);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Erro ao carregar pedidos",
        description: "Não foi possível buscar os pedidos. Tente novamente mais tarde.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  // Handle order drag start
  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    // Set data transfer to include ONLY the order ID
    e.dataTransfer.setData('orderId', orderId);
    setDraggedOrderId(orderId);
    
    // Ensure proper visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('opacity-50');
    }
    
    console.log(`Started dragging order: ${orderId}`);
  };
  
  // Handle drop on kanban column
  const handleDrop = async (e: React.DragEvent, status: Order['status']) => {
    e.preventDefault();
    
    // Get the order ID from the data transfer
    const orderId = e.dataTransfer.getData('orderId');
    
    if (!orderId) {
      console.error('No order ID in drop event');
      return;
    }
    
    // Get the dragged order by ID
    const draggedOrder = orders.find(order => order.id === orderId);
    
    if (!draggedOrder) {
      console.error(`Order with ID ${orderId} not found`);
      return;
    }
    
    // Check if status already matches
    if (draggedOrder.status === status) {
      console.log(`Order ${orderId} is already in ${status} status`);
      return;
    }
    
    try {
      // Update order status through API
      await updateOrderStatus(orderId, status);
      
      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );
      
      console.log(`Order ${orderId} moved to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      // Toast is already shown in the useOrders hook
    } finally {
      setDraggedOrderId(null);
    }
  };
  
  // Allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Handle drag end
  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedOrderId(null);
    
    // Remove visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('opacity-50');
    }
  };
  
  // Delete order handler
  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      // Update local state after successful deletion
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
      // Toast is already shown in the useOrders hook
    }
  };
  
  // Filter orders by status
  const filterOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return {
    orders,
    loading,
    draggedOrderId,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleDragEnd,
    handleDeleteOrder,
    filterOrdersByStatus,
    formatCurrency
  };
};
