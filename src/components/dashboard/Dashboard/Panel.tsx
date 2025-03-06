
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Truck, ChefHat, Package, Check } from 'lucide-react';
import { ordersApi, Order, useOrders } from '@/api/ordersApi';
import KanbanColumn from './KanbanColumn';

interface PanelProps {
  isDarkTheme: boolean;
}

const Panel = ({ isDarkTheme }: PanelProps) => {
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
        const sampleOrders: Omit<Order, 'id' | 'status' | 'createdAt'>[] = [
          {
            customerName: 'João Silva',
            items: ['Pizza Calabresa', 'Refrigerante 2L'],
            total: 45.9,
          },
          {
            customerName: 'Maria Oliveira',
            items: ['Hambúrguer Duplo', 'Batata Frita G'],
            total: 38.5,
          },
          {
            customerName: 'Pedro Santos',
            items: ['Pastel de Queijo x3', 'Caldo de Cana 500ml'],
            total: 25.0,
          },
          {
            customerName: 'Ana Costa',
            items: ['Marmitex Grande', 'Suco Natural 300ml'],
            total: 22.9,
          }
        ];
        
        // Create sample orders with different statuses
        const order1 = await ordersApi.createOrder(sampleOrders[0]);
        const order2 = await ordersApi.createOrder(sampleOrders[1]);
        await ordersApi.updateOrderStatus(order2.id, 'preparing');
        
        const order3 = await ordersApi.createOrder(sampleOrders[2]);
        await ordersApi.updateOrderStatus(order3.id, 'delivering');
        
        const order4 = await ordersApi.createOrder(sampleOrders[3]);
        await ordersApi.updateOrderStatus(order4.id, 'completed');
        
        // Refetch orders after adding samples
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
    setDraggedOrderId(orderId);
    e.dataTransfer.setData('orderId', orderId);
  };
  
  // Handle drop on kanban column
  const handleDrop = async (e: React.DragEvent, status: Order['status']) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('orderId');
    
    // Make sure the dragged order ID matches what we're tracking
    if (!orderId || orderId !== draggedOrderId) return;
    
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
  const handleDragEnd = () => {
    setDraggedOrderId(null);
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

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse-subtle">Carregando pedidos...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 h-full">
          {/* New Orders */}
          <KanbanColumn
            title="Novos Pedidos"
            icon={Package}
            bgColor="bg-blue-50"
            darkBgColor="bg-blue-800/30"
            headerBgColor="bg-blue-100"
            darkHeaderBgColor="bg-blue-900"
            headerTextColor="text-blue-700"
            darkHeaderTextColor="text-blue-300"
            status="new"
            orders={filterOrdersByStatus('new')}
            emptyMessage="Sem pedidos novos"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDelete={handleDeleteOrder}
            formatCurrency={formatCurrency}
          />
          
          {/* Preparing Orders */}
          <KanbanColumn
            title="Pedidos sendo feitos"
            icon={ChefHat}
            bgColor="bg-yellow-50"
            darkBgColor="bg-yellow-800/30"
            headerBgColor="bg-yellow-100"
            darkHeaderBgColor="bg-yellow-900"
            headerTextColor="text-yellow-700"
            darkHeaderTextColor="text-yellow-300"
            status="preparing"
            orders={filterOrdersByStatus('preparing')}
            emptyMessage="Sem pedidos em preparo"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDelete={handleDeleteOrder}
            formatCurrency={formatCurrency}
          />
          
          {/* Delivering Orders */}
          <KanbanColumn
            title="Pedidos sendo entregues"
            icon={Truck}
            bgColor="bg-orange-50"
            darkBgColor="bg-orange-800/30"
            headerBgColor="bg-orange-100"
            darkHeaderBgColor="bg-orange-900"
            headerTextColor="text-orange-700"
            darkHeaderTextColor="text-orange-300"
            status="delivering"
            orders={filterOrdersByStatus('delivering')}
            emptyMessage="Sem pedidos em entrega"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDelete={handleDeleteOrder}
            formatCurrency={formatCurrency}
          />
          
          {/* Completed Orders */}
          <KanbanColumn
            title="Pedidos finalizados"
            icon={Check}
            bgColor="bg-green-50"
            darkBgColor="bg-green-800/30"
            headerBgColor="bg-green-100"
            darkHeaderBgColor="bg-green-900"
            headerTextColor="text-green-700"
            darkHeaderTextColor="text-green-300"
            status="completed"
            orders={filterOrdersByStatus('completed')}
            emptyMessage="Sem pedidos finalizados"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDelete={handleDeleteOrder}
            formatCurrency={formatCurrency}
          />
        </div>
      )}
    </div>
  );
};

export default Panel;
