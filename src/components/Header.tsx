
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-border/30 bg-glass">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <Link to="/" className="flex items-center space-x-1">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">C</span>
            </div>
            <span className="font-medium text-lg">ChatBot</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['Início', 'Preços', 'Sobre'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className={cn(
                "text-sm font-medium text-muted-foreground relative",
                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px]",
                "after:origin-left after:scale-x-0 after:bg-primary/70",
                "after:transition-transform after:duration-300 hover:after:scale-x-100"
              )}
            >
              {item}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/entrar" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Entrar
          </Link>
          <Link 
            to="/comecar" 
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors",
              "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            )}
          >
            Começar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
