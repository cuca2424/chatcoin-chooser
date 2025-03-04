
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern navigation with rounded corners and subtle shadows */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full flex flex-col h-full"
      >
        <div className="px-3 pt-3 sm:px-4 lg:px-5">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-white/80 backdrop-blur-sm p-1 h-14 shadow-md border border-gray-100">
            <TabsTrigger 
              value="informacoes" 
              className="flex items-center gap-2 py-3 h-full rounded-lg transition-all duration-200 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              <Info className="h-5 w-5 text-black" />
              <span className="font-medium">Informações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="controle" 
              className="flex items-center gap-2 py-3 h-full rounded-lg transition-all duration-200 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              <Settings className="h-5 w-5 text-black" />
              <span className="font-medium">Controle</span>
            </TabsTrigger>
            <TabsTrigger 
              value="painel" 
              className="flex items-center gap-2 py-3 h-full rounded-lg transition-all duration-200 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
            >
              <BarChart3 className="h-5 w-5 text-black" />
              <span className="font-medium">Painel</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-grow overflow-auto p-3 sm:p-4 lg:p-5">
          {/* Informações Tab Content */}
          <TabsContent value="informacoes" className="h-full space-y-3 animate-fade-in">
            <Card className="h-full overflow-hidden border border-gray-100 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-4">
                
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Controle Tab Content */}
          <TabsContent value="controle" className="h-full space-y-3 animate-fade-in">
            <Card className="h-full overflow-hidden border border-gray-100 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-4">
                
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Painel Tab Content */}
          <TabsContent value="painel" className="h-full space-y-3 animate-fade-in">
            <Card className="h-full overflow-hidden border border-gray-100 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-4">
                
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
