import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Info, BarChart3, Settings } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("informacoes");
  const { toast } = useToast();
  const navigate = useNavigate();

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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navegação no topo com melhor contraste visual */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full flex flex-col h-full"
      >
        <TabsList className="grid w-full grid-cols-3 rounded-none bg-slate-200 p-0 h-14">
          <TabsTrigger 
            value="informacoes" 
            className="flex items-center gap-2 py-4 h-full data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            <Info className="h-5 w-5 text-purple-600" />
            <span>Informações</span>
          </TabsTrigger>
          <TabsTrigger 
            value="controle" 
            className="flex items-center gap-2 py-4 h-full data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            <Settings className="h-5 w-5 text-purple-600" />
            <span>Controle</span>
          </TabsTrigger>
          <TabsTrigger 
            value="painel" 
            className="flex items-center gap-2 py-4 h-full data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <span>Painel</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-grow overflow-auto p-6 bg-gray-50">
          {/* Informações Tab Content */}
          <TabsContent value="informacoes" className="h-full">
            <Card className="h-full shadow-md">
              <CardContent className="p-6">
                
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Controle Tab Content */}
          <TabsContent value="controle" className="h-full">
            <Card className="h-full shadow-md">
              <CardContent className="p-6">
                
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Painel Tab Content */}
          <TabsContent value="painel" className="h-full">
            <Card className="h-full shadow-md">
              <CardContent className="p-6">
                
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
