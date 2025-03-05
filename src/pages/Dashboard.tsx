import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, 
  DollarSign, 
  Target, 
  Trophy, 
  ChevronLeft,
  ChevronRight,
  Menu,
  Info,
  Settings,
  LayoutDashboard,
  Sun,
  Moon
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

// Theme toggle component
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" /> : <Moon className="h-5 w-5 text-gray-800" />}
    </button>
  );
};

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('painel');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };
  
  // Set initial theme based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

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
    <div className={`flex h-screen overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="py-6 px-4 h-full flex flex-col">
          <div className="mb-8 flex items-center justify-between">
            <h2 className={`text-xl font-bold transition-opacity duration-300 dark:text-white ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Dashboard</h2>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveMenu('informacoes')}
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${activeMenu === 'informacoes' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Info className="h-5 w-5 mr-3 text-black dark:text-white" />
                  <span className={`transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Informações</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveMenu('controle')}
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${activeMenu === 'controle' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Settings className="h-5 w-5 mr-3 text-black dark:text-white" />
                  <span className={`transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Controle</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveMenu('painel')}
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${activeMenu === 'painel' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3 text-black dark:text-white" />
                  <span className={`transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Painel</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="mr-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5 text-black dark:text-white" /> : <Menu className="h-5 w-5 text-black dark:text-white" />}
            </button>
            <h1 className="text-xl font-semibold dark:text-white">
              {activeMenu === 'informacoes' ? 'Informações' : 
               activeMenu === 'controle' ? 'Controle' : 'Painel'}
            </h1>
          </div>
          
          {/* Theme toggle button */}
          <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
        </header>
        
        {/* Page content based on active menu */}
        <main className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-900">
          {activeMenu === 'painel' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total Customers */}
                <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
                        <Users className="h-5 w-5 text-black dark:text-white" />
                      </div>
                      <span className="text-green-500 font-medium">+12%</span>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Total Customers</h3>
                    <p className="text-3xl font-bold dark:text-white">1,234</p>
                  </CardContent>
                </Card>
                
                {/* Revenue */}
                <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
                        <DollarSign className="h-5 w-5 text-black dark:text-white" />
                      </div>
                      <span className="text-green-500 font-medium">+8%</span>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Revenue</h3>
                    <p className="text-3xl font-bold dark:text-white">$50,234</p>
                  </CardContent>
                </Card>
                
                {/* Active Deals */}
                <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
                        <Target className="h-5 w-5 text-black dark:text-white" />
                      </div>
                      <span className="text-red-500 font-medium">-5%</span>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Active Deals</h3>
                    <p className="text-3xl font-bold dark:text-white">45</p>
                  </CardContent>
                </Card>
                
                {/* Win Rate */}
                <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700">
                        <Trophy className="h-5 w-5 text-black dark:text-white" />
                      </div>
                      <span className="text-green-500 font-medium">+3%</span>
                    </div>
                    <h3 className="text-gray-600 dark:text-gray-300 font-medium mb-1">Win Rate</h3>
                    <p className="text-3xl font-bold dark:text-white">68%</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Overview */}
                <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm h-80 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-4 dark:text-white">Sales Overview</h3>
                    <ResponsiveContainer width="100%" height="85%">
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkTheme ? "#374151" : "#E5E7EB"} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
                        <YAxis dataKey="value" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
                        <Tooltip contentStyle={isDarkTheme ? { backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' } : {}} />
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
                <Card className="border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm h-80 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-4 dark:text-white">Quarterly Performance</h3>
                    <ResponsiveContainer width="100%" height="85%">
                      <BarChart data={quarterlyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkTheme ? "#374151" : "#E5E7EB"} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
                        <YAxis dataKey="revenue" tickLine={false} axisLine={false} stroke={isDarkTheme ? "#9CA3AF" : "#6B7280"} />
                        <Tooltip contentStyle={isDarkTheme ? { backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' } : {}} />
                        <Legend wrapperStyle={isDarkTheme ? { color: '#F9FAFB' } : {}} />
                        <Bar dataKey="deals" fill="#1F2937" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="revenue" fill={isDarkTheme ? "#6B7280" : "#94A3B8"} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          
          {activeMenu === 'informacoes' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Informações</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Esta seção exibirá informações gerais do sistema.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="dark:bg-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2 dark:text-white">Documentação</h3>
                    <p className="text-gray-600 dark:text-gray-300">Acesse a documentação completa do sistema.</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2 dark:text-white">Suporte</h3>
                    <p className="text-gray-600 dark:text-gray-300">Entre em contato com nossa equipe de suporte.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeMenu === 'controle' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Controle</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Configure e controle as operações do sistema.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="dark:bg-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2 dark:text-white">Configurações</h3>
                    <p className="text-gray-600 dark:text-gray-300">Ajuste as configurações principais do sistema.</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2 dark:text-white">Usuários</h3>
                    <p className="text-gray-600 dark:text-gray-300">Gerencie permissões e acesso de usuários.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
