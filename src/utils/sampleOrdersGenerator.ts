
import { ordersApi, Order } from '@/api/ordersApi';

export const createSampleOrders = async () => {
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
};
