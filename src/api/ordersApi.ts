
import { useToast } from '@/components/ui/use-toast';

// Order interface
export interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'new' | 'preparing' | 'delivering' | 'completed';
  createdAt: string;
}

// Example API to create and manage orders
export const ordersApi = {
  // Fetch all orders
  getOrders: async (): Promise<Order[]> => {
    // In a real app, this would fetch from a real API
    // For demo purposes, we're retrieving from localStorage
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  },
  
  // Create a new order
  createOrder: async (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>): Promise<Order> => {
    // Create a new order object
    const newOrder: Order = {
      id: Date.now().toString(),
      ...orderData,
      status: 'new', // All new orders start with 'new' status
      createdAt: new Date().toISOString()
    };
    
    // Get existing orders
    const existingOrders = await ordersApi.getOrders();
    
    // Add new order to the beginning
    const updatedOrders = [newOrder, ...existingOrders];
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return newOrder;
  },
  
  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order | null> => {
    // Get existing orders
    const existingOrders = await ordersApi.getOrders();
    
    // Find order index
    const orderIndex = existingOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      return null;
    }
    
    // Update order status
    existingOrders[orderIndex].status = status;
    
    // Save updated orders
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    return existingOrders[orderIndex];
  },
  
  // Delete an order
  deleteOrder: async (orderId: string): Promise<boolean> => {
    // Get existing orders
    const existingOrders = await ordersApi.getOrders();
    
    // Filter out the order to delete
    const updatedOrders = existingOrders.filter(order => order.id !== orderId);
    
    // Save updated orders
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return true;
  }
};

// Custom hook for managing orders
export const useOrders = () => {
  const { toast } = useToast();
  
  const createOrder = async (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    try {
      const newOrder = await ordersApi.createOrder(orderData);
      toast({
        title: "Pedido criado",
        description: `Pedido para ${orderData.customerName} foi criado com sucesso.`,
      });
      return newOrder;
    } catch (error) {
      toast({
        title: "Erro ao criar pedido",
        description: "Não foi possível criar o pedido. Tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const updatedOrder = await ordersApi.updateOrderStatus(orderId, status);
      if (!updatedOrder) {
        throw new Error('Order not found');
      }
      toast({
        title: "Status atualizado",
        description: `Pedido #${orderId.substring(0, 8)} foi movido para ${status}.`,
      });
      return updatedOrder;
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o status do pedido.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const deleteOrder = async (orderId: string) => {
    try {
      await ordersApi.deleteOrder(orderId);
      toast({
        title: "Pedido removido",
        description: `Pedido #${orderId.substring(0, 8)} foi removido com sucesso.`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Erro ao remover pedido",
        description: "Não foi possível remover o pedido.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return {
    createOrder,
    updateOrderStatus,
    deleteOrder,
  };
};
