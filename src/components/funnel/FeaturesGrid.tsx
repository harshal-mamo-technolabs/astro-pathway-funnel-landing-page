import { Button } from "@/components/ui/button";
import { Heart, Zap, Compass, Gem, Users, Calendar } from "lucide-react";

interface FeaturesGridProps {
  onStartReading: () => void;
}

export const FeaturesGrid = ({ onStartReading }: FeaturesGridProps) => {
  const features = [
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Personalized Birth Chart",
      description: "Complete natal chart analysis with planetary positions and aspects"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Love & Compatibility",
      description: "Synastry readings to understand relationship dynamics and connections"
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Daily Tarot Guidance",
      description: "Personalized tarot readings aligned with your astrological profile"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Transit Predictions",
      description: "Future insights based on planetary movements and their effects"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Life Path Analysis",
      description: "Deep insights into your purpose, career, and spiritual journey"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family & Friends Charts",
      description: "Compare charts with loved ones to understand relationships better"
    }
  ];

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#15092d' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif-elegant text-gold mb-6">
            What's Inside Zodiya
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unlock the full power of astrology with our comprehensive suite of tools and insights
          </p>
          <Button 
            onClick={onStartReading}
            className="btn-cosmic text-lg px-8 py-3"
          >
            ✨ Discover Your Cosmic Story
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-cosmic p-6 hover:scale-105 transition-transform duration-300">
              <div className="text-accent mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-cosmic mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={onStartReading}
            className="btn-gold text-lg px-10 py-4"
          >
            Start My Cosmic Journey
          </Button>
        </div>
      </div>
    </section>
  );
};