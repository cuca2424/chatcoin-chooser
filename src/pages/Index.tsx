
import React from 'react';
import { Badge } from "@/components/ui/badge";
import PricingCard from '@/components/PricingCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  const pricingPlans = [
    {
      title: "Basic",
      price: "$199.99",
      messageLimit: "1,000",
      features: [
        "AI-powered responses",
        "Basic analytics",
        "Email support",
        "1 project",
        "Custom branding"
      ],
      isPopular: false
    },
    {
      title: "Pro",
      price: "$299.00",
      messageLimit: "3,000",
      features: [
        "All Basic features",
        "Advanced analytics",
        "Priority support",
        "3 projects",
        "Custom integrations",
        "Team collaboration"
      ],
      isPopular: false
    },
    {
      title: "Premium",
      price: "$399.99",
      messageLimit: "10,000",
      features: [
        "All Pro features",
        "Enterprise-grade security",
        "Dedicated support",
        "Unlimited projects",
        "Advanced customization",
        "API access",
        "White-label solution"
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
                Choose the right plan for your chatbot needs
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mb-12 animate-fade-in [animation-delay:300ms] text-balance">
                Scale your conversational AI with flexible pricing options designed for businesses of all sizes. Pay only for what you need.
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
                All plans include access to our core platform. Need a custom solution? 
                Contact our sales team for a tailored enterprise plan.
              </p>
              
              <a 
                href="#" 
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Contact Sales →
              </a>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid gap-8">
              {[
                {
                  question: "How do message limits work?",
                  answer: "Message limits refer to the total number of messages your chatbot can process each month. If you exceed your limit, you can purchase additional messages or upgrade to a higher plan."
                },
                {
                  question: "Can I switch plans at any time?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be applied immediately, with any price differences prorated."
                },
                {
                  question: "What happens if I exceed my message limit?",
                  answer: "If you reach your monthly message limit, you'll receive a notification. You can then choose to upgrade your plan or purchase additional messages to continue uninterrupted service."
                },
                {
                  question: "Do you offer a free trial?",
                  answer: "Yes, we offer a 14-day free trial on all plans, allowing you to explore the features and functionality before committing to a subscription."
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
                      Ready to transform your customer experience?
                    </h2>
                    <p className="text-muted-foreground mb-6 md:mb-0">
                      Get started today and see the difference our intelligent chatbot platform can make for your business.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="#" 
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                      Get Started
                    </a>
                    <a 
                      href="#" 
                      className="inline-flex h-10 items-center justify-center rounded-md border border-border px-8 text-sm font-medium shadow-sm transition-colors hover:bg-secondary/50"
                    >
                      Contact Sales
                    </a>
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
