import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Shield, Award } from "lucide-react";
interface TrustSectionProps {
  onStartReading: () => void;
}
export const TrustSection = ({
  onStartReading
}: TrustSectionProps) => {
  const testimonials = [{
    name: "Sarah M.",
    rating: 5,
    text: "Zodiya revealed insights about myself I never knew existed. The accuracy is mind-blowing!"
  }, {
    name: "Michael R.",
    rating: 5,
    text: "The relationship compatibility reading saved my marriage. We finally understand each other."
  }, {
    name: "Luna K.",
    rating: 5,
    text: "Daily guidance that actually makes sense. It's like having a cosmic counselor in my pocket."
  }];
  return <section className="py-20 px-4" style={{
    backgroundColor: '#0d0520'
  }}>
      <div className="max-w-6xl mx-auto">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Badge className="bg-gold/20 text-gold border-gold/30 px-4 py-2 text-base">
            <Users className="w-4 h-4 mr-2" />
            150,000+ Happy Users
          </Badge>
          <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 text-base">
            <Shield className="w-4 h-4 mr-2" />
            Secure & Private
          </Badge>
          <Badge className="bg-cosmic/20 text-cosmic border-cosmic/30 px-4 py-2 text-base bg-[#00060a]">
            <Award className="w-4 h-4 mr-2" />
            #1 Astrology App
          </Badge>
        </div>

        {/* Main Rating */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-gold text-gold" />)}
            <span className="text-3xl font-bold text-gold ml-4">4.9</span>
          </div>
          <p className="text-xl text-muted-foreground">
            Based on 50,000+ verified reviews
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => <div key={index} className="card-cosmic p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
              </div>
              <p className="text-foreground/80 mb-4 italic">
                "{testimonial.text}"
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                - {testimonial.name}
              </p>
            </div>)}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-serif-elegant text-cosmic mb-4">
            Join Thousands Who've Discovered Their Cosmic Truth
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Cancel anytime • Secure checkout • Instant access
          </p>
          <Button onClick={onStartReading} className="btn-cosmic text-xl px-12 py-6 animate-pulse-glow">
            ✨ Start My Reading Now
          </Button>
        </div>
      </div>
    </section>;
};