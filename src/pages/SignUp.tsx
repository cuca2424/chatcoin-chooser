
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract plan from URL query parameters on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const planFromUrl = queryParams.get('plano');
    
    if (planFromUrl) {
      setSelectedPlan(planFromUrl);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um plano.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      // Simulating account creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado para o login.",
      });
      
      setTimeout(() => {
        navigate('/entrar');
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-card border border-border/40 p-8 rounded-xl shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2">Crie sua conta</h1>
              <p className="text-muted-foreground">
                Comece a usar nosso chatbot inteligente hoje mesmo
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="selectedPlan" className="text-sm font-medium">
                  Plano selecionado
                </Label>
                <Select
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Básico">Básico</SelectItem>
                    <SelectItem value="Profissional">Profissional</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Já possui uma conta?{" "}
                <Link 
                  to="/entrar" 
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
