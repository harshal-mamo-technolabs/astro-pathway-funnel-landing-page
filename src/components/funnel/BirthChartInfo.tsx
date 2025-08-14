import { Sun, Moon, Star } from "lucide-react";

export const BirthChartInfo = () => {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#0d0520' }}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif-elegant text-cosmic mb-6">
          What is a Birth Chart?
        </h2>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
          Your birth chart is a cosmic snapshot of the sky at the exact moment you were born. 
          It reveals your personality, strengths, and life path through the positions of celestial bodies.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sun Sign */}
          <div className="card-cosmic p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Sun className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gold mb-4">Sun Sign</h3>
            <p className="text-foreground/80">
              Your core identity and life force. Represents your ego, vitality, and the essence of who you are.
            </p>
          </div>

          {/* Moon Sign */}
          <div className="card-cosmic p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <Moon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-cosmic mb-4">Moon Sign</h3>
            <p className="text-foreground/80">
              Your emotional nature and inner world. Governs your feelings, intuition, and subconscious mind.
            </p>
          </div>

          {/* Rising Sign */}
          <div className="card-cosmic p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-accent mb-4">Rising Sign</h3>
            <p className="text-foreground/80">
              Your outer personality and first impression. How others see you and how you approach the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};