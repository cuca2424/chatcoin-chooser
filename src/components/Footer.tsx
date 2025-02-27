
import React from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-border/30">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-1 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">C</span>
              </div>
              <span className="font-medium text-lg">ChatBot</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Soluções inteligentes de chatbot para automatizar o atendimento ao cliente.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
            {[
              {
                title: 'Produto',
                links: ['Recursos', 'Preços', 'API', 'Integrações', 'Documentação']
              },
              {
                title: 'Empresa',
                links: ['Sobre', 'Blog', 'Carreiras', 'Imprensa', 'Contato']
              },
              {
                title: 'Recursos',
                links: ['Comunidade', 'Central de Ajuda', 'Parceiros', 'Status', 'Política de Privacidade']
              }
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-medium mb-3">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ChatBot. Todos os direitos reservados.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Twitter', 'LinkedIn', 'Facebook', 'GitHub'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
