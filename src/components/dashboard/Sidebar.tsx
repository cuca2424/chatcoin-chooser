
import React from 'react';
import { Info, Settings, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar = ({ sidebarOpen, activeMenu, setActiveMenu }: SidebarProps) => {
  return (
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
  );
};

export default Sidebar;
