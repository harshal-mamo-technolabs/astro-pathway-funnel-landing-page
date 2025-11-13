import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Star, Zap, ChevronDown, ChevronUp } from "lucide-react";

export interface Plan {
  id: string;
  name: string;
  label: string;
  price: string;
  duration: string;
  originalPrice?: string;
  discount?: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  tagline: string;
}

interface PlanSelectionProps {
  onSelectPlan: (plan: Plan) => void;
}

export const PlanSelection = ({ onSelectPlan }: PlanSelectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set(["premium"]));

  const plans: Plan[] = [
    {
      id: "starter",
      name: "STARTER",
      label: "TRY IT",
      price: "€2.99",
      duration: "3-day trial",
      tagline: "3-day trial",
      features: [
        "Natal Chart Report",
        "Synastry chart",
        "Transit chart", 
        "Solar return chart",
        "Numerology insight",
        "Daily Tarot"
      ],
      badge: "Then €79.96 every month, auto-renewal unless you cancel before the trial expires."
    },
    {
      id: "premium", 
      name: "PREMIUM",
      label: "HOT OFFER",
      price: "€14.99 / week",
      duration: "Billed €119.92 every 2 months, auto-renewal",
      tagline: "2 months",
      discount: "-10%",
      features: [
        "All included starter +",
        "Synastry report",
        "Daily transit report",
        "Moon phase report",
        "Numerology report"
      ],
      popular: true
    },
    {
      id: "gold",
      name: "GOLD", 
      label: "BEST VALUE",
      price: "€13.99 / week",
      duration: "Billed 167.88€ every 3 month, auto-renewal",
      tagline: "Save 20%",
      discount: "-20%",
      features: [
        "All Premium features +",
        "Yearly horoscope report",
        "Yearly synastry report",
        "Yearly moon phase report",
        "Yearly numerology report"
      ]
    }
  ];

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan.id);
    onSelectPlan(plan);
  };

  const togglePlanExpansion = (planId: string) => {
    const newExpanded = new Set(expandedPlans);
    if (newExpanded.has(planId)) {
      newExpanded.delete(planId);
    } else {
      newExpanded.add(planId);
    }
    setExpandedPlans(newExpanded);
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "starter": return Sparkles;
      case "premium": return Zap;
      case "gold": return Crown;
      default: return Star;
    }
  };

  const getPlanButtonClass = (planId: string) => {
    switch (planId) {
      case "starter": return "bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white";
      case "premium": return "bg-gradient-to-r from-accent to-pink-400 hover:from-pink-400 hover:to-accent text-white font-bold";
      case "gold": return "bg-gradient-to-r from-gold to-yellow-300 hover:from-yellow-300 hover:to-gold text-gold-foreground shadow-lg shadow-gold/30";
      default: return "bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white";
    }
  };

  return (
    <section className="min-h-screen bg-plan-bg px-4 pt-8 pb-20">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif-elegant text-5xl md:text-6xl text-plan-card-foreground mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-plan-card-foreground/80 font-sans">
            Get full access to all reports and readings
          </p>
        </div>

        {/* Desktop Horizontal Comparison Table */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => {
              const IconComponent = getPlanIcon(plan.id);
              const isSelected = selectedPlan === plan.id;
              const isPremium = plan.popular;
              
              return (
                <div 
                  key={plan.id}
                  className={`relative ${isPremium ? 'md:scale-[1.02] md:-mt-2' : ''}`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-accent to-pink-400 text-white px-3 py-1.5 text-xs font-semibold">
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <div 
                    className={`bg-plan-card rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'border-primary shadow-lg shadow-primary/30' 
                        : 'border-plan-card-foreground/20 hover:border-primary/50'
                    } ${isPremium ? 'border-accent shadow-lg shadow-accent/20' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {/* Plan header */}
                    <div className="text-center mb-5">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                        plan.id === "starter" ? "bg-gradient-to-r from-primary to-primary-glow" :
                        plan.id === "premium" ? "bg-gradient-to-r from-accent to-pink-400" :
                        "bg-gradient-to-r from-gold to-yellow-300"
                      }`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      
                      <Badge variant="outline" className="mb-3 border-plan-card-foreground/30 text-plan-card-foreground text-xs">
                        {plan.label}
                      </Badge>
                      
                      <h3 className="font-serif-elegant text-2xl text-plan-card-foreground mb-1.5">
                        {plan.name}
                      </h3>
                      
                      <div className="text-sm text-plan-card-foreground/70 mb-3 font-sans">
                        {plan.tagline}
                      </div>
                      
                      {/* Pricing */}
                      <div className="mb-4">
                        {plan.originalPrice && (
                          <div className="text-xs text-plan-card-foreground/50 line-through mb-1">
                            {plan.originalPrice}
                          </div>
                        )}
                        <div className="text-3xl font-bold text-plan-card-foreground mb-1.5">
                          {plan.price}
                        </div>
                        <div className="text-xs text-plan-card-foreground/70 font-sans">
                          {plan.duration}
                        </div>
                        {plan.discount && (
                          <Badge className="bg-green-500 text-white mt-2 text-xs">
                            {plan.discount} discount
                          </Badge>
                        )}
                        {plan.badge && (
                          <div className="text-xs text-plan-card-foreground/60 mt-1.5 font-sans">
                            {plan.badge}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5 mb-5">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2.5">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-xs text-plan-card-foreground font-sans">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Select button */}
                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-2.5 rounded-xl font-semibold text-base transition-all duration-300 ${getPlanButtonClass(plan.id)}`}
                    >
                      Select {plan.name}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Stacked Cards with Expand/Collapse */}
        <div className="md:hidden space-y-4 mb-12">
          {plans.map((plan) => {
            const IconComponent = getPlanIcon(plan.id);
            const isSelected = selectedPlan === plan.id;
            const isExpanded = expandedPlans.has(plan.id);
            const isPremium = plan.popular;
            
            return (
              <div 
                key={plan.id}
                className="relative"
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-accent to-pink-400 text-white px-2.5 py-1 text-xs">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div 
                  className={`bg-plan-card rounded-2xl border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary shadow-lg shadow-primary/30' 
                      : 'border-plan-card-foreground/20'
                  } ${isPremium ? 'border-accent shadow-lg shadow-accent/20' : ''}`}
                >
                  {/* Plan header - always visible */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      togglePlanExpansion(plan.id);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          plan.id === "starter" ? "bg-gradient-to-r from-primary to-primary-glow" :
                          plan.id === "premium" ? "bg-gradient-to-r from-accent to-pink-400" :
                          "bg-gradient-to-r from-gold to-yellow-300"
                        }`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-serif-elegant text-lg text-plan-card-foreground">
                              {plan.name}
                            </h3>
                            <Badge variant="outline" className="border-plan-card-foreground/30 text-plan-card-foreground text-xs">
                              {plan.label}
                            </Badge>
                          </div>
                          <div className="text-xl font-bold text-plan-card-foreground">
                            {plan.price}
                            <span className="text-xs text-plan-card-foreground/70 ml-2 font-sans">
                              {plan.tagline}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!isExpanded && (
                          <span className="text-xs text-plan-card-foreground/60 font-sans">Show details</span>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-plan-card-foreground/70" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-plan-card-foreground/70" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable content */}
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="border-t border-plan-card-foreground/20 pt-3">
                        {/* Features */}
                        <div className="space-y-2.5 mb-4">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2.5">
                              <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span className="text-xs text-plan-card-foreground font-sans">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Additional info */}
                        <div className="mb-4">
                          <div className="text-xs text-plan-card-foreground/70 font-sans mb-1.5">
                            {plan.duration}
                          </div>
                          {plan.discount && (
                            <Badge className="bg-green-500 text-white mr-2 text-xs">
                              {plan.discount} discount
                            </Badge>
                          )}
                          {plan.badge && (
                            <div className="text-xs text-plan-card-foreground/60 mt-1.5 font-sans">
                              {plan.badge}
                            </div>
                          )}
                        </div>

                        {/* Select button */}
                        <Button
                          onClick={() => handleSelectPlan(plan)}
                          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${getPlanButtonClass(plan.id)}`}
                        >
                          Select {plan.name}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Information Boxes */}
        <div className="text-center space-y-6 mt-12">
          <div className="bg-plan-card/50 rounded-2xl p-6 border border-plan-card-foreground/10">
            <h3 className="font-serif-elegant text-xl text-plan-card-foreground mb-3">
              Subscriptions renew automatically until canceled.
            </h3>
            <p className="text-sm text-plan-card-foreground/70 font-sans">
              You can cancel anytime from your account settings or by contacting our support team at support@zodiya.net
            </p>
          </div>
        </div>

        {/* Summary and Trust Indicators */}
        <div className="text-center space-y-6 mt-6">
          <div className="bg-plan-card/50 rounded-2xl p-6 border border-plan-card-foreground/10">
            <h3 className="font-serif-elegant text-xl text-plan-card-foreground mb-3">
              All plans include full access to your personalized birth chart, daily tarot, and cosmic reports
            </h3>
            <div className="flex items-center justify-center space-x-8 text-sm text-plan-card-foreground/70 font-sans">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Join 150,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-gold" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};