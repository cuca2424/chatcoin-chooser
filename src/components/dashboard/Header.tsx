
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
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-2 px-3 flex items-center justify-between shadow-none">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-3 p-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <Menu className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
        </button>
        <h1 className="text-base font-medium text-gray-700 dark:text-gray-200">
          {activeMenu === 'informacoes' ? 'Informações' : 
           activeMenu === 'controle' ? 'Controle' : 'Painel'}
        </h1>
      </div>
      
      {/* Theme toggle button */}
      <button 
        onClick={toggleTheme}
        className="p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label={isDarkTheme ? "Mudar para tema claro" : "Mudar para tema escuro"}
      >
        {isDarkTheme ? <Sun className="h-4 w-4 text-gray-400" /> : <Moon className="h-4 w-4 text-gray-500" />}
      </button>
    </header>
  );
};

export default Header;
