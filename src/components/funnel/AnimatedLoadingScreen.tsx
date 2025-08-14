import { useEffect } from "react";
import { Stars, Sparkles } from "lucide-react";

interface AnimatedLoadingScreenProps {
  onComplete: () => void;
}

export const AnimatedLoadingScreen = ({ onComplete }: AnimatedLoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{ backgroundColor: '#1B0D2C' }}>
      <div className="text-center space-y-8">
        {/* Animated constellation */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 animate-spin">
            <Stars className="w-32 h-32 text-primary opacity-80" />
          </div>
          <div className="absolute inset-0 animate-pulse">
            <Sparkles className="w-32 h-32 text-gold" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-cosmic">
            Calculating your cosmic blueprint…
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Using your birth data and star alignments to prepare your personalized reading…
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </section>
  );
};