import { useEffect, useState } from "react";
import { HeroSection } from "./HeroSection";
import { BirthChartInfo } from "./BirthChartInfo";
import { FeaturesGrid } from "./FeaturesGrid";
import { TrustSection } from "./TrustSection";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { OnboardingForm } from "./OnboardingForm";
import { AnimatedLoadingScreen } from "./AnimatedLoadingScreen";
import { PlanSelection, type Plan } from "./PlanSelection";
import { CheckoutPage } from "./CheckoutPage";
import { SuccessPage } from "./SuccessPage";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

type FunnelStep = "hero" | "onboarding" | "loading" | "plans" | "checkout" | "success";

interface OnboardingData {
  firstName: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
  birthPlaceId?: string;
  lat?: number | null;
  lon?: number | null;
  tzone?: number | null;
  gender: "male" | "female" | "";
  noTimeKnown: boolean;
  lifeArea: string;
  hasHadReading: string;
  email: string;
}

export const ZodiyaFunnel = () => {
  const [currentStep, setCurrentStep] = useState<FunnelStep>("hero");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { toast } = useToast();
  const [utmParams, setUtmParams] = useState<{ utm_source: string; utm_campaign: string }>({ utm_source: "", utm_campaign: "" });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const rawSource = searchParams.get("utm_source");
    const rawCampaign = searchParams.get("utm_campaign");

    const storedSource = sessionStorage.getItem("utm_source") || "";
    const storedCampaign = sessionStorage.getItem("utm_campaign") || "";

    const utm_source = (rawSource ?? storedSource ?? "") || "";
    const utm_campaign = (rawCampaign ?? storedCampaign ?? "") || "";

    setUtmParams({ utm_source, utm_campaign });
    sessionStorage.setItem("utm_source", utm_source);
    sessionStorage.setItem("utm_campaign", utm_campaign);
  }, []);

  const handleStartReading = () => {
    setCurrentStep("onboarding");
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnboardingComplete = async (data: OnboardingData) => {
    // Log all collected data so far, including UTM parameters
    // This runs when user clicks "Generate My Report"
    // eslint-disable-next-line no-console
    console.log({ ...data, utm_source: utmParams.utm_source, utm_campaign: utmParams.utm_campaign });
    // Fire signup request
    const baseUrl = (import.meta as any).env?.VITE_BASE_URL as string | undefined;
    if (baseUrl) {
      try {
        const [year, month, day] = (data.birthDate || "").split("-").map((v) => parseInt(v, 10));
        const hasProvidedTime = Boolean(!data.noTimeKnown && data.birthTime && data.birthTime.includes(":"));
        const [parsedHour, parsedMin] = hasProvidedTime ? data.birthTime.split(":").map((v) => parseInt(v, 10)) : [0, 0];
        const safeHour = Number.isFinite(parsedHour) ? parsedHour : 0;
        const safeMin = Number.isFinite(parsedMin) ? parsedMin : 0;
        const pass = Math.random().toString(36).slice(2, 12);
        const payload = {
          name: data.firstName,
          email: data.email,
          gender: data.gender || "unknown",
          day: Number.isFinite(day) ? day : undefined,
          month: Number.isFinite(month) ? month : undefined,
          year: Number.isFinite(year) ? year : undefined,
          hour: safeHour,
          min: safeMin,
          lat: typeof data.lat === "number" ? data.lat : undefined,
          lon: typeof data.lon === "number" ? data.lon : undefined,
          tzone: typeof data.tzone === "number" ? data.tzone : undefined,
          city: data.birthCity || undefined,
          password: pass,
          utmSource: utmParams.utm_source || "",
          utmCampaign: utmParams.utm_campaign || "",
        } as Record<string, any>;

        const resp = await fetch(`${baseUrl}/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((r) => r.json()).catch(() => null);

        if (resp?.msg === "User updated and logged in successfully" && resp?.success === true && !resp?.token) {
          toast({
            title: "Account already exists",
            description: "Please log in to your dashboard to continue.",
          });
          return; // Do not proceed to next steps
        }

        const token = resp?.token as string | undefined;
        if (token) {
          sessionStorage.setItem("auth_token", token);
        }
      } catch {
        // ignore
      }
    }
    setOnboardingData(data);
    setCurrentStep("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadingComplete = () => {
    setCurrentStep("plans");
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    if (onboardingData) {
      toast({
        title: "Great work! 🌟",
        description: `Welcome ${onboardingData.firstName}! Let's find the perfect plan for your cosmic journey.`,
      });
    }
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentStep("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Persist minimal data for checkout API
    if (onboardingData) {
      sessionStorage.setItem("last_onboarding_email", onboardingData.email);
      sessionStorage.setItem("last_onboarding_name", onboardingData.firstName);
    }

    toast({
      title: "Plan Selected! ✨",
      description: `You've chosen the ${plan.name} plan. Complete your payment to unlock your cosmic blueprint.`,
    });
  };

  const handleProcessPayment = () => {
    // In a real app, this would integrate with Stripe
    // For demo purposes, we'll simulate a successful payment
    setTimeout(() => {
      setCurrentStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      toast({
        title: "Payment Successful! 🎉",
        description: "Welcome to Zodiya! Your cosmic journey begins now.",
      });
    }, 1500);
    
    toast({
      title: "Processing Payment...",
      description: "Please wait while we securely process your payment.",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "hero":
        return (
          <>
            <HeroSection onStartReading={handleStartReading} />
            <BirthChartInfo />
            <FeaturesGrid onStartReading={handleStartReading} />
            <TrustSection onStartReading={handleStartReading} />
          </>
        );
      
      case "onboarding":
        return <OnboardingForm onComplete={handleOnboardingComplete} />;
      
      case "loading":
        return <AnimatedLoadingScreen onComplete={handleLoadingComplete} />;
      
      case "plans":
        return <PlanSelection onSelectPlan={handlePlanSelect} />;
      
      case "checkout":
        if (!selectedPlan) return null;
        return (
          <CheckoutPage 
            selectedPlan={selectedPlan}
            onPaymentSuccess={() => {
              setCurrentStep("success");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        );
      
      case "success":
        return <SuccessPage token={sessionStorage.getItem("auth_token")} />;
      
      default:
        return (
          <>
            <HeroSection onStartReading={handleStartReading} />
            <BirthChartInfo />
            <FeaturesGrid onStartReading={handleStartReading} />
            <TrustSection onStartReading={handleStartReading} />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
      
      {/* Sticky Mobile CTA for hero section */}
      {currentStep === "hero" && (
        <StickyMobileCTA onStartReading={handleStartReading} />
      )}
      
      {/* Mobile sticky CTA - show during onboarding and plan selection */}
      {(currentStep === "onboarding" || currentStep === "plans") && (
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 md:hidden z-50">
          <div className="text-center">
            {currentStep === "plans" && selectedPlan && (
              <div className="text-sm text-muted-foreground mb-2">
                {selectedPlan.name} • {selectedPlan.price}
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              Join 150,000+ users • Secure • Cancel anytime
            </div>
          </div>
        </div>
      )}
    </div>
  );
};