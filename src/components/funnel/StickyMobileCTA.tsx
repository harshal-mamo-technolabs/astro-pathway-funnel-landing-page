import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface StickyMobileCTAProps {
  onStartReading: () => void;
}

export const StickyMobileCTA = ({ onStartReading }: StickyMobileCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-background/95 backdrop-blur-sm border-t border-border p-4">
        <Button 
          onClick={onStartReading}
          className="w-full btn-cosmic text-lg py-4"
        >
          ✨ Start My Reading
        </Button>
      </div>
    </div>
  );
};