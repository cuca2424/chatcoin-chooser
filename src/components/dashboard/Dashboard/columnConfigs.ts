
import { Truck, ChefHat, Package, Check } from 'lucide-react';
import { Order } from '@/api/ordersApi';

export const columnConfigs = [
  {
    title: "Novos Pedidos",
    icon: Package,
    bgColor: "bg-blue-50",
    darkBgColor: "bg-blue-800/30",
    headerBgColor: "bg-blue-100",
    darkHeaderBgColor: "bg-blue-900",
    headerTextColor: "text-blue-700",
    darkHeaderTextColor: "text-blue-300",
    status: "new" as Order['status'],
    emptyMessage: "Sem pedidos novos"
  },
  {
    title: "Pedidos sendo feitos",
    icon: ChefHat,
    bgColor: "bg-yellow-50",
    darkBgColor: "bg-yellow-800/30",
    headerBgColor: "bg-yellow-100",
    darkHeaderBgColor: "bg-yellow-900",
    headerTextColor: "text-yellow-700",
    darkHeaderTextColor: "text-yellow-300",
    status: "preparing" as Order['status'],
    emptyMessage: "Sem pedidos em preparo"
  },
  {
    title: "Pedidos sendo entregues",
    icon: Truck,
    bgColor: "bg-orange-50",
    darkBgColor: "bg-orange-800/30",
    headerBgColor: "bg-orange-100",
    darkHeaderBgColor: "bg-orange-900",
    headerTextColor: "text-orange-700",
    darkHeaderTextColor: "text-orange-300",
    status: "delivering" as Order['status'],
    emptyMessage: "Sem pedidos em entrega"
  },
  {
    title: "Pedidos finalizados",
    icon: Check,
    bgColor: "bg-green-50",
    darkBgColor: "bg-green-800/30",
    headerBgColor: "bg-green-100",
    darkHeaderBgColor: "bg-green-900",
    headerTextColor: "text-green-700",
    darkHeaderTextColor: "text-green-300",
    status: "completed" as Order['status'],
    emptyMessage: "Sem pedidos finalizados"
  }
];
