
import React from 'react';
import { ChevronLeft, Menu, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  activeMenu: string;
}

const Header = ({ sidebarOpen, toggleSidebar, isDarkTheme, toggleTheme, activeMenu }: HeaderProps) => {
  return (
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
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDarkTheme ? <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" /> : <Moon className="h-5 w-5 text-gray-800" />}
      </button>
    </header>
  );
};

export default Header;
