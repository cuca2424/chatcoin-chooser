
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, 
  DollarSign, 
  Target, 
  Trophy, 
  ChevronLeft 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const quarterlyData = [
  { name: 'Q1', deals: 40, revenue: 140 },
  { name: 'Q2', deals: 35, revenue: 130 },
  { name: 'Q3', deals: 55, revenue: 190 },
  { name: 'Q4', deals: 50, revenue: 170 },
];

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Authentication check temporarily disabled for preview purposes
  // Will be re-enabled later
  /*
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Acesso negado",
        description: "Você precisa estar logado para acessar esta página.",
        variant: "destructive",
      });
      navigate('/entrar');
    }
  }, [navigate, toast]);
  */

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-2 mb-1">
          <ChevronLeft className="h-4 w-4 text-gray-500" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <p className="text-gray-600 mb-4">Welcome back! Here's your overview.</p>
      </div>
      
      {/* Main content */}
      <div className="flex-grow overflow-auto p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Customers */}
          <Card className="border border-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <Users className="h-5 w-5 text-gray-700" />
                </div>
                <span className="text-green-500 font-medium">+12%</span>
              </div>
              <h3 className="text-gray-600 font-medium mb-1">Total Customers</h3>
              <p className="text-3xl font-bold">1,234</p>
            </CardContent>
          </Card>
          
          {/* Revenue */}
          <Card className="border border-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <DollarSign className="h-5 w-5 text-gray-700" />
                </div>
                <span className="text-green-500 font-medium">+8%</span>
              </div>
              <h3 className="text-gray-600 font-medium mb-1">Revenue</h3>
              <p className="text-3xl font-bold">$50,234</p>
            </CardContent>
          </Card>
          
          {/* Active Deals */}
          <Card className="border border-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <Target className="h-5 w-5 text-gray-700" />
                </div>
                <span className="text-red-500 font-medium">-5%</span>
              </div>
              <h3 className="text-gray-600 font-medium mb-1">Active Deals</h3>
              <p className="text-3xl font-bold">45</p>
            </CardContent>
          </Card>
          
          {/* Win Rate */}
          <Card className="border border-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <Trophy className="h-5 w-5 text-gray-700" />
                </div>
                <span className="text-green-500 font-medium">+3%</span>
              </div>
              <h3 className="text-gray-600 font-medium mb-1">Win Rate</h3>
              <p className="text-3xl font-bold">68%</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Overview */}
          <Card className="border border-gray-100 rounded-lg shadow-sm h-80">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Quarterly Performance */}
          <Card className="border border-gray-100 rounded-lg shadow-sm h-80">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Quarterly Performance</h3>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deals" fill="#1F2937" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
