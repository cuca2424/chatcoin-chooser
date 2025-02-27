
import React from 'react';
import { Badge } from "@/components/ui/badge";
import PricingCard from '@/components/PricingCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const pricingPlans = [
    {
      title: "Básico",
      price: "R$199,99",
      messageLimit: "1.000",
      features: [
        "Respostas com IA",
        "Análise básica de conversas",
        "Suporte por e-mail",
        "1 projeto",
        "Personalização básica"
      ],
      isPopular: false
    },
    {
      title: "Profissional",
      price: "R$299,00",
      messageLimit: "3.000",
      features: [
        "Todos os recursos Básicos",
        "Análise avançada de conversas",
        "Suporte prioritário",
        "3 projetos",
        "Integrações personalizadas",
        "Colaboração em equipe"
      ],
      isPopular: false
    },
    {
      title: "Premium",
      price: "R$399,99",
      messageLimit: "10.000",
      features: [
        "Todos os recursos Profissionais",
        "Segurança de nível empresarial",
        "Suporte dedicado",
        "Projetos ilimitados",
        "Personalização avançada",
        "Acesso à API",
        "Solução white-label"
      ],
      isPopular: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in [animation-delay:200ms] text-balance max-w-[800px]">
                Escolha o plano ideal para seu chatbot de atendimento
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mb-12 animate-fade-in [animation-delay:300ms] text-balance">
                Automatize seu atendimento ao cliente com nossa solução inteligente de chatbot. Pague apenas pelo que você precisa.
              </p>
              
              {/* Floating element */}
              <div className="absolute top-40 right-20 -z-10 hidden lg:block">
                <div className="w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse-subtle" />
              </div>
              
              {/* Floating element */}
              <div className="absolute bottom-40 left-20 -z-10 hidden lg:block">
                <div className="w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-subtle [animation-delay:2s]" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={plan.title} 
                  className={cn(
                    "animate-fade-in",
                    index === 0 && "[animation-delay:400ms]",
                    index === 1 && "[animation-delay:500ms]",
                    index === 2 && "[animation-delay:600ms]"
                  )}
                >
                  <PricingCard
                    title={plan.title}
                    price={plan.price}
                    messageLimit={plan.messageLimit}
                    features={plan.features}
                    isPopular={plan.isPopular}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
                Todos os planos incluem acesso à nossa plataforma principal. Precisa de uma solução personalizada? 
                Entre em contato conosco para mais informações.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12 text-center">
              Perguntas Frequentes
            </h2>
            
            <div className="grid gap-8">
              {[
                {
                  question: "Como funcionam os limites de mensagens?",
                  answer: "Os limites de mensagens referem-se ao número total de mensagens que seu chatbot pode processar a cada mês. Se você exceder seu limite, pode comprar mensagens adicionais ou fazer upgrade para um plano superior."
                },
                {
                  question: "Posso mudar de plano a qualquer momento?",
                  answer: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações em sua assinatura serão aplicadas imediatamente, com quaisquer diferenças de preço proporcionais."
                },
                {
                  question: "O que acontece se eu exceder meu limite de mensagens?",
                  answer: "Se você atingir seu limite mensal de mensagens, receberá uma notificação. Você pode então optar por fazer upgrade do seu plano ou comprar mensagens adicionais para continuar o serviço sem interrupções."
                },
                {
                  question: "Vocês oferecem um período de teste gratuito?",
                  answer: "Sim, oferecemos um período de teste gratuito de 14 dias em todos os planos, permitindo que você explore os recursos e funcionalidades antes de se comprometer com uma assinatura."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl border border-border/40 bg-card"
                >
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="rounded-2xl bg-card p-8 md:p-12 border border-border/40 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgTCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50 z-0" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="md:max-w-xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                      Pronto para transformar sua experiência de atendimento ao cliente?
                    </h2>
                    <p className="text-muted-foreground mb-6 md:mb-0">
                      Comece hoje e veja a diferença que nossa plataforma inteligente de chatbot pode fazer para o seu negócio.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/comecar" 
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                      <Button>Começar Agora</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
