import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import cosmicBackground from "@/assets/cosmic-background.jpg";
interface HeroSectionProps {
  onStartReading: () => void;
}
export const HeroSection = ({
  onStartReading
}: HeroSectionProps) => {
  return <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{
    backgroundImage: `linear-gradient(rgba(36, 0, 70, 0.8), rgba(36, 0, 70, 0.9)), url(${cosmicBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }}>
      {/* Floating cosmic elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-gold rounded-full animate-star-twinkle"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-primary-glow rounded-full animate-star-twinkle" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-accent rounded-full animate-star-twinkle" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-gold rounded-full animate-star-twinkle" style={{
        animationDelay: '3s'
      }}></div>
      </div>

      <div className="text-center max-w-4xl mx-auto z-10 animate-float">
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-cosmic">Discover Your</span>
          <br />
          <span className="text-gold">Cosmic Blueprint</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed md:text-4xl">
          Get your personalized birth chart and unlock the secrets of your stars
        </p>

        {/* CTA Button */}
        <Button onClick={onStartReading} className="btn-cosmic text-xl px-12 py-6 mb-12 animate-pulse-glow">
          ✨ Start My Reading
        </Button>

        {/* Testimonial */}
        <div className="card-cosmic max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
          </div>
          <p className="text-foreground/80 italic">
            "Zodiya revealed insights about myself I never knew existed. The accuracy is mind-blowing!"
          </p>
          <p className="text-sm text-muted-foreground mt-2">- Sarah M., verified user</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};