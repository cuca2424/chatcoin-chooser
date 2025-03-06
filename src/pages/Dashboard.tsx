
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import Panel from '@/components/dashboard/Dashboard/Panel';
import Information from '@/components/dashboard/Information/Information';
import Control from '@/components/dashboard/Control/Control';

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

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
      {/* Sidebar with compact design */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        {/* Header with minimal height */}
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
          activeMenu={activeMenu}
        />
        
        {/* Page content with full height and no scroll */}
        <main className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
          {activeMenu === 'painel' && <Panel isDarkTheme={isDarkTheme} />}
          {activeMenu === 'informacoes' && <Information />}
          {activeMenu === 'controle' && <Control />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
