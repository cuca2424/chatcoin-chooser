
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
    // Importante: Definir os dados de transferência com o ID do pedido
    e.dataTransfer.setData('orderId', orderId);
    setDraggedOrderId(orderId);
    
    // Garantir feedback visual adequado
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.add('opacity-50');
    }
    
    console.log(`Started dragging order: ${orderId}`);
  };
  
  // Handle drop on kanban column
  const handleDrop = async (e: React.DragEvent, status: Order['status']) => {
    e.preventDefault();
    
    // Obter o ID do pedido dos dados de transferência
    const orderId = e.dataTransfer.getData('orderId');
    
    if (!orderId) {
      console.error('No order ID in drop event');
      return;
    }
    
    // Buscar o pedido arrastado pelo ID
    const draggedOrder = orders.find(order => order.id === orderId);
    
    if (!draggedOrder) {
      console.error(`Order with ID ${orderId} not found`);
      return;
    }
    
    // Verificar se o status já corresponde
    if (draggedOrder.status === status) {
      console.log(`Order ${orderId} is already in ${status} status`);
      return;
    }
    
    try {
      // Atualizar o status do pedido através da API
      await updateOrderStatus(orderId, status);
      
      // Atualizar o estado local
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
      // Toast já é mostrado no hook useOrders
    } finally {
      setDraggedOrderId(null);
    }
  };
  
  // Permitir soltar
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Handle drag end
  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedOrderId(null);
    
    // Remover feedback visual
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.classList.remove('opacity-50');
    }
  };
  
  // Delete order handler
  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      // Atualizar o estado local após exclusão bem-sucedida
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
      // Toast já é mostrado no hook useOrders
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
