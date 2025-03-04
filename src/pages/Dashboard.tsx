
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Info, BarChart3, Settings, User, Activity, LayoutDashboard } from 'lucide-react';

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
            <User className="h-5 w-5 text-purple-600" />
            <span>Informações</span>
          </TabsTrigger>
          <TabsTrigger 
            value="controle" 
            className="flex items-center gap-2 py-4 h-full data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            <Activity className="h-5 w-5 text-purple-600" />
            <span>Controle</span>
          </TabsTrigger>
          <TabsTrigger 
            value="painel" 
            className="flex items-center gap-2 py-4 h-full data-[state=active]:bg-white data-[state=active]:shadow-none"
          >
            <LayoutDashboard className="h-5 w-5 text-purple-600" />
            <span>Painel</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-grow overflow-auto p-6 bg-gray-50">
          {/* Informações Tab Content */}
          <TabsContent value="informacoes" className="h-full">
            <Card className="h-full shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Informações da Conta</h2>
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Nome</p>
                    <p className="text-base font-medium">Usuário Exemplo</p>
                  </div>
                  
                  <div className="grid gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-base font-medium">usuario@exemplo.com</p>
                  </div>
                  
                  <div className="grid gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Plano Atual</p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Pro</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ativo</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Data de Adesão</p>
                    <p className="text-base font-medium">15/04/2023</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline">Atualizar Informações</Button>
                </div>

                <h2 className="text-xl font-semibold mb-4 mt-8">Uso do Serviço</h2>
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-muted-foreground">Chatbots Ativos</p>
                      <span className="text-base font-medium">2 de 5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid gap-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-muted-foreground">Mensagens</p>
                      <span className="text-base font-medium">1,243 de 5,000</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Controle Tab Content */}
          <TabsContent value="controle" className="h-full">
            <Card className="h-full shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Meus Chatbots</h2>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 transition-all hover:border-primary hover:shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Suporte ao Cliente</h3>
                        <p className="text-sm text-muted-foreground">Criado em 20/04/2023</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ativo</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button size="sm">Gerenciar</Button>
                      <Button size="sm" variant="outline">Pré-visualizar</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 transition-all hover:border-primary hover:shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">FAQ Vendas</h3>
                        <p className="text-sm text-muted-foreground">Criado em 15/05/2023</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ativo</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button size="sm">Gerenciar</Button>
                      <Button size="sm" variant="outline">Pré-visualizar</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Criar Novo Chatbot</Button>
                </div>

                <h2 className="text-xl font-semibold mb-4 mt-8">Configurações</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Notificações por Email</p>
                      <p className="text-sm text-muted-foreground">Receba relatórios semanais de desempenho</p>
                    </div>
                    <div className="h-6 w-12 bg-primary rounded-full relative cursor-pointer">
                      <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Tema Escuro</p>
                      <p className="text-sm text-muted-foreground">Altere a aparência da interface</p>
                    </div>
                    <div className="h-6 w-12 bg-muted rounded-full relative cursor-pointer">
                      <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <p className="font-medium">Idioma do Painel</p>
                      <p className="text-sm text-muted-foreground">Escolha o idioma da interface</p>
                    </div>
                    <Button variant="outline" size="sm">Português (BR)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Painel Tab Content */}
          <TabsContent value="painel" className="h-full">
            <Card className="h-full shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total de Mensagens</p>
                    <p className="text-3xl font-bold">1,243</p>
                    <p className="text-xs text-green-600">↑ 12% nesta semana</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Usuários Atendidos</p>
                    <p className="text-3xl font-bold">387</p>
                    <p className="text-xs text-green-600">↑ 8% nesta semana</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-sm text-muted-foreground">Taxa de Resolução</p>
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-xs text-green-600">↑ 3% nesta semana</p>
                  </div>
                </div>
                
                <div className="mt-8 border rounded-lg p-4 h-64 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Gráfico de atividade do chatbot será exibido aqui</p>
                </div>

                <h2 className="text-xl font-semibold mb-4 mt-8">Perguntas Frequentes</h2>
                
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">"Como posso cancelar minha assinatura?"</p>
                      <span className="text-sm text-muted-foreground">124 vezes</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">"Quais são os métodos de pagamento aceitos?"</p>
                      <span className="text-sm text-muted-foreground">98 vezes</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">"Como atualizo meu plano?"</p>
                      <span className="text-sm text-muted-foreground">87 vezes</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline">Ver Relatório Completo</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
