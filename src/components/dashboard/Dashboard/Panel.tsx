
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Truck, ChefHat, Package, Check } from 'lucide-react';
import { ordersApi, Order, useOrders } from '@/api/ordersApi';

interface PanelProps {
  isDarkTheme: boolean;
}

const Panel = ({ isDarkTheme }: PanelProps) => {
  const { toast } = useToast();
  const { updateOrderStatus, deleteOrder } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
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
    e.dataTransfer.setData('orderId', orderId);
  };
  
  // Handle drop on kanban column
  const handleDrop = async (e: React.DragEvent, status: Order['status']) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('orderId');
    
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
    } catch (error) {
      console.error('Error updating order status:', error);
      // Toast is already shown in the useOrders hook
    }
  };
  
  // Allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Get status translation
  const getStatusTranslation = (status: Order['status']): string => {
    const translations = {
      new: 'Novos Pedidos',
      preparing: 'Pedidos sendo feitos',
      delivering: 'Pedidos sendo entregues',
      completed: 'Pedidos finalizados'
    };
    return translations[status];
  };
  
  // Get status icon
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'preparing':
        return <ChefHat className="h-5 w-5 text-yellow-500" />;
      case 'delivering':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
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

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Kanban de Pedidos</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse-subtle">Carregando pedidos...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 h-[calc(100vh-12rem)] overflow-hidden">
          {/* New Orders */}
          <div 
            className="flex flex-col h-full"
            onDrop={e => handleDrop(e, 'new')} 
            onDragOver={handleDragOver}
          >
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-t-md flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-500 dark:text-blue-300" />
              <h3 className="font-medium text-blue-700 dark:text-blue-300">Novos Pedidos</h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-800/30 flex-1 p-2 rounded-b-md overflow-y-auto space-y-2">
              {filterOrdersByStatus('new').map(order => (
                <Card 
                  key={order.id}
                  className="cursor-move bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={e => handleDragStart(e, order.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="block">• {item}</span>
                          ))}
                        </p>
                        <p className="mt-2 font-semibold">{formatCurrency(order.total)}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filterOrdersByStatus('new').length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                  Sem pedidos novos
                </div>
              )}
            </div>
          </div>
          
          {/* Preparing Orders */}
          <div 
            className="flex flex-col h-full"
            onDrop={e => handleDrop(e, 'preparing')} 
            onDragOver={handleDragOver}
          >
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-t-md flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-yellow-500 dark:text-yellow-300" />
              <h3 className="font-medium text-yellow-700 dark:text-yellow-300">Pedidos sendo feitos</h3>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-800/30 flex-1 p-2 rounded-b-md overflow-y-auto space-y-2">
              {filterOrdersByStatus('preparing').map(order => (
                <Card 
                  key={order.id}
                  className="cursor-move bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={e => handleDragStart(e, order.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="block">• {item}</span>
                          ))}
                        </p>
                        <p className="mt-2 font-semibold">{formatCurrency(order.total)}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filterOrdersByStatus('preparing').length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                  Sem pedidos em preparo
                </div>
              )}
            </div>
          </div>
          
          {/* Delivering Orders */}
          <div 
            className="flex flex-col h-full"
            onDrop={e => handleDrop(e, 'delivering')} 
            onDragOver={handleDragOver}
          >
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-t-md flex items-center space-x-2">
              <Truck className="h-5 w-5 text-orange-500 dark:text-orange-300" />
              <h3 className="font-medium text-orange-700 dark:text-orange-300">Pedidos sendo entregues</h3>
            </div>
            <div className="bg-orange-50 dark:bg-orange-800/30 flex-1 p-2 rounded-b-md overflow-y-auto space-y-2">
              {filterOrdersByStatus('delivering').map(order => (
                <Card 
                  key={order.id}
                  className="cursor-move bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={e => handleDragStart(e, order.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="block">• {item}</span>
                          ))}
                        </p>
                        <p className="mt-2 font-semibold">{formatCurrency(order.total)}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filterOrdersByStatus('delivering').length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                  Sem pedidos em entrega
                </div>
              )}
            </div>
          </div>
          
          {/* Completed Orders */}
          <div 
            className="flex flex-col h-full"
            onDrop={e => handleDrop(e, 'completed')} 
            onDragOver={handleDragOver}
          >
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-t-md flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500 dark:text-green-300" />
              <h3 className="font-medium text-green-700 dark:text-green-300">Pedidos finalizados</h3>
            </div>
            <div className="bg-green-50 dark:bg-green-800/30 flex-1 p-2 rounded-b-md overflow-y-auto space-y-2">
              {filterOrdersByStatus('completed').map(order => (
                <Card 
                  key={order.id}
                  className="cursor-move bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={e => handleDragStart(e, order.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="block">• {item}</span>
                          ))}
                        </p>
                        <p className="mt-2 font-semibold">{formatCurrency(order.total)}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filterOrdersByStatus('completed').length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                  Sem pedidos finalizados
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Endpoint para Enviar Pedidos</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Para enviar um novo pedido, faça uma requisição POST para:
        </p>
        <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto dark:text-white">
          POST /api/orders
        </code>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-1">
          Exemplo de corpo da requisição:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-x-auto dark:text-white">
{`{
  "customerName": "Nome do Cliente",
  "items": ["Item 1", "Item 2"],
  "total": 50.00
}`}
        </pre>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Todos os novos pedidos serão adicionados automaticamente à coluna "Novos Pedidos".
        </p>
      </div>
    </div>
  );
};

export default Panel;
