import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Lock, Star, Zap, Shield } from "lucide-react";
import type { Plan } from "./PlanSelection";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";

interface CheckoutPageProps {
  selectedPlan: Plan;
  onPaymentSuccess: () => void;
}

const lookupKeyByPlanId: Record<string, string> = {
  starter: "zodiya_trial",
  premium: "zodiya_premium",
  gold: "zodiya_gold",
};

const InnerPaymentForm = ({ clientSecret, onPaymentSuccess }: { clientSecret: string; onPaymentSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConfirm = async () => {
    if (!stripe || !elements) return;
    setIsPaying(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });
    setIsPaying(false);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message || "Payment failed");
      return;
    }
    setSuccessMsg("Payment successful! Preparing your report...");
    toast({ title: "Payment successful 🎉", description: "Preparing your report..." });
    setTimeout(() => {
      onPaymentSuccess();
    }, 800);
  };

  return (
    <>
      <div className="space-y-4 mb-6">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>
      {successMsg && (
        <div className="mb-3 text-sm text-green-500">{successMsg}</div>
      )}
      <Button onClick={handleConfirm} className="w-full btn-cosmic text-lg py-4 mb-4" disabled={!stripe || isPaying}>
        <Lock className="w-5 h-5 mr-2" />
        {isPaying ? "Processing..." : "Complete Payment"}
      </Button>
    </>
  );
};

export const CheckoutPage = ({ selectedPlan, onPaymentSuccess }: CheckoutPageProps) => {
  const stripeKey = (import.meta as any).env?.VITE_STRIPE_KEY as string | undefined;
  const stripePromise = useMemo(() => (stripeKey ? loadStripe(stripeKey) : null), [stripeKey]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = (import.meta as any).env?.VITE_BASE_URL as string | undefined;
    if (!baseUrl || !selectedPlan?.id) return;
    const lookup_key = lookupKeyByPlanId[selectedPlan.id] || "zodiya_premium";
    const email = sessionStorage.getItem("last_onboarding_email") || "";
    const name = sessionStorage.getItem("last_onboarding_name") || "";
    const utmSource = sessionStorage.getItem("utm_source") || "";
    const utmCampaign = sessionStorage.getItem("utm_campaign") || "";

    setIsCreating(true);
    setErrorMsg(null);
    fetch(`${baseUrl}/stripe/create-checkout-session-public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lookup_key, email, name, utmSource, utmCampaign }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.client_secret) setClientSecret(data.client_secret);
        else setErrorMsg(data?.message || "Failed to initialize payment");
      })
      .catch(() => setErrorMsg("Network error"))
      .finally(() => setIsCreating(false));
  }, [selectedPlan?.id]);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{ backgroundColor: '#15092d' }}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="card-cosmic">
            <h3 className="text-2xl font-bold text-cosmic mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-foreground">{selectedPlan.name} Plan</h4>
                  <p className="text-sm text-muted-foreground">{selectedPlan.duration}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-cosmic">{selectedPlan.price}</div>
                  {selectedPlan.discount && (
                    <Badge className="bg-green-500 text-white text-xs">{selectedPlan.discount}</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">What's included:</h4>
              <div className="space-y-2">
                {selectedPlan.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {selectedPlan.features.length > 4 && (
                  <div className="text-sm text-muted-foreground">
                    +{selectedPlan.features.length - 4} more features
                  </div>
                )}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="border-t border-border pt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span className="text-foreground">🔒 Secure payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4 text-gold" />
                  <span className="text-foreground">⭐ 4.9/5 rated by 150,000+ users</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-foreground">Cancel anytime</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Form */}
          <Card className="card-cosmic">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-cosmic">Secure Checkout</h3>
            </div>

            {errorMsg && (
              <div className="text-sm text-red-500 mb-3">{errorMsg}</div>
            )}
            {isCreating && (
              <div className="text-sm text-muted-foreground mb-3">Initializing payment…</div>
            )}
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <InnerPaymentForm clientSecret={clientSecret} onPaymentSuccess={onPaymentSuccess} />
              </Elements>
            )}

            {/* Payment methods */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Secured by Stripe</p>
              <div className="flex justify-center space-x-2 opacity-60">
                <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">VISA</div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center font-bold">MC</div>
                <div className="w-8 h-5 bg-blue-700 rounded text-xs text-white flex items-center justify-center font-bold">AMEX</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom guarantee */}
        <div className="text-center mt-8">
          <Card className="card-cosmic max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <h4 className="font-semibold text-foreground">30-Day Money Back Guarantee</h4>
                <p className="text-sm text-muted-foreground">Not satisfied? Get a full refund within 30 days.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};