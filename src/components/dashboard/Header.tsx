
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
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-2 px-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-3 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <ChevronLeft className="h-5 w-5 text-black dark:text-white" /> : <Menu className="h-5 w-5 text-black dark:text-white" />}
        </button>
        <h1 className="text-lg font-medium dark:text-white">
          {activeMenu === 'informacoes' ? 'Informações' : 
           activeMenu === 'controle' ? 'Controle' : 'Painel'}
        </h1>
      </div>
      
      {/* Theme toggle button */}
      <button 
        onClick={toggleTheme}
        className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={isDarkTheme ? "Mudar para tema claro" : "Mudar para tema escuro"}
      >
        {isDarkTheme ? <Sun className="h-5 w-5 text-gray-200" /> : <Moon className="h-5 w-5 text-gray-700" />}
      </button>
    </header>
  );
};

export default Header;
