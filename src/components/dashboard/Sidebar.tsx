
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
      sidebarOpen ? 'w-48' : 'w-0 md:w-12'
    )}>
      <div className="py-3 px-2 h-full flex flex-col">
        <div className="mb-4 flex items-center justify-center">
          <h2 className={cn(
            "text-sm font-medium transition-opacity duration-300 text-gray-700 dark:text-gray-200",
            sidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'
          )}>Dashboard</h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveMenu('informacoes')}
                className={cn(
                  "flex items-center w-full py-1.5 px-2 rounded-md transition-colors text-sm",
                  activeMenu === 'informacoes' 
                    ? 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                )}
              >
                <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className={cn(
                  "ml-2 transition-opacity duration-300 text-sm",
                  sidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'
                )}>Informações</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu('controle')}
                className={cn(
                  "flex items-center w-full py-1.5 px-2 rounded-md transition-colors text-sm",
                  activeMenu === 'controle' 
                    ? 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                )}
              >
                <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className={cn(
                  "ml-2 transition-opacity duration-300 text-sm",
                  sidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:hidden'
                )}>Controle</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveMenu('painel')}
                className={cn(
                  "flex items-center w-full py-1.5 px-2 rounded-md transition-colors text-sm",
                  activeMenu === 'painel' 
                    ? 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                )}
              >
                <LayoutDashboard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className={cn(
                  "ml-2 transition-opacity duration-300 text-sm",
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
