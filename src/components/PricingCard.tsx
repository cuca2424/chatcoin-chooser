
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
  title: string;
  price: string;
  messageLimit: string;
  features: string[];
  isPopular?: boolean;
  className?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  messageLimit,
  features,
  isPopular = false,
  className,
}) => {
  return (
    <div 
      className={cn(
        "group perspective relative h-full",
        className
      )}
    >
      <div 
        className={cn(
          "relative h-full rounded-2xl p-6 md:p-8 flex flex-col justify-between",
          "bg-card border border-border/40 card-shadow",
          "transition-all duration-500 ease-out",
          "group-hover:card-shadow-hover group-hover:border-primary/20 group-hover:-translate-y-2",
          isPopular && "before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-b before:from-primary/20 before:to-primary/5 before:-z-10",
        )}
      >
        {isPopular && (
          <Badge 
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground font-medium"
          >
            Most Popular
          </Badge>
        )}
        
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-1">{title}</h3>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl md:text-4xl font-bold tracking-tight">{price}</span>
            <span className="ml-1 text-muted-foreground">/month</span>
          </div>
          
          <div className="mb-6 p-3 rounded-lg bg-secondary/50">
            <p className="text-sm font-medium text-center">
              {messageLimit} messages per month
            </p>
          </div>
          
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg 
                  className="h-5 w-5 text-primary flex-shrink-0 mr-2" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          className={cn(
            "w-full transition-all duration-300",
            isPopular 
              ? "bg-primary hover:bg-primary/90" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          Get Started
        </Button>
      </div>
      
      {/* Subtle animated gradient background */}
      <div 
        className={cn(
          "absolute inset-0 -z-20 rounded-2xl opacity-0 blur-xl",
          "bg-gradient-to-b from-primary/20 via-primary/5 to-transparent",
          "transition-opacity duration-500",
          "group-hover:opacity-100"
        )}
        aria-hidden="true"
      />
    </div>
  );
};

export default PricingCard;
