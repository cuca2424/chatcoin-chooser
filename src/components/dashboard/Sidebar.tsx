
import React from 'react';
import { Info, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sidebarOpen: boolean;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar = ({ sidebarOpen, activeMenu, setActiveMenu }: SidebarProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col z-10",
      sidebarOpen ? 'w-56' : 'w-0 md:w-14'
    )}>
      <div className="py-4 px-2 h-full flex flex-col">
        <div className="mb-6 flex items-center justify-center">
          <h2 className={cn(
            "text-lg font-bold transition-opacity duration-300 dark:text-white",
            sidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'
          )}>Dashboard</h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveMenu('informacoes')}
                className={cn(
                  "flex items-center w-full py-2 px-2.5 rounded-md transition-colors",
                  activeMenu === 'informacoes' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <Info className="h-5 w-5 text-black dark:text-white" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300",
                  sidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'
                )}>Informações</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu('controle')}
                className={cn(
                  "flex items-center w-full py-2 px-2.5 rounded-md transition-colors",
                  activeMenu === 'controle' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <Settings className="h-5 w-5 text-black dark:text-white" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300",
                  sidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'
                )}>Controle</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu('painel')}
                className={cn(
                  "flex items-center w-full py-2 px-2.5 rounded-md transition-colors",
                  activeMenu === 'painel' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <LayoutDashboard className="h-5 w-5 text-black dark:text-white" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300",
                  sidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'
                )}>Painel</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
