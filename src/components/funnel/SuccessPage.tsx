import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star, Download, Calendar, Mail } from "lucide-react";

interface SuccessPageProps {
  token?: string | null;
}

export const SuccessPage = ({ token }: SuccessPageProps) => {
  const handleAccessDashboard = () => {
    const portal = (import.meta as any).env?.VITE_ZODIYA_PORTAL as string | undefined;
    const t = token || sessionStorage.getItem("auth_token");
    if (!portal || !t) return;
    const url = `${portal.replace(/\/$/, "")}/home?token=${encodeURIComponent(t)}`;
    window.location.href = url;
  };
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 mb-4 animate-pulse-glow">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-cosmic mb-4">
            Welcome to Your Cosmic Journey! ✨
          </h1>
          <p className="text-xl text-muted-foreground">
            Your payment was successful and your personalized reading is ready
          </p>
        </div>

        {/* Success Card */}
        <Card className="card-cosmic mb-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Your Cosmic Blueprint is Ready!
            </h3>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-primary" />
                <span className="text-foreground">Your complete birth chart has been generated</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-foreground">Daily horoscope updates will begin tomorrow</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-foreground">Check your email for your detailed reports</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-foreground mb-2">What happens next?</h4>
              <ol className="text-sm text-muted-foreground space-y-1 text-left">
                <li>1. Check your email for your complete birth chart report</li>
                <li>2. Access your dashboard to explore all features</li>
                <li>3. Set up notifications for daily cosmic insights</li>
                <li>4. Join our community of cosmic explorers</li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button className="btn-cosmic w-full" onClick={handleAccessDashboard}>
            Access My Dashboard
          </Button>
          
          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
            Download Mobile App
          </Button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Questions? Our cosmic support team is here to help
          </p>
          <Button variant="link" className="text-primary">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};