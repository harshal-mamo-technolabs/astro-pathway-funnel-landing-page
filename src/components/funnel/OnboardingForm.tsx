import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ChevronRight, Calendar, Clock, MapPin, Heart, Briefcase, Sparkles, Globe, Mail } from "lucide-react";

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

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingForm = ({ onComplete }: OnboardingFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    firstName: "",
    birthDate: "",
    birthTime: "",
    birthCity: "",
    birthPlaceId: "",
    lat: null,
    lon: null,
    tzone: -8,
    gender: "",
    noTimeKnown: false,
    lifeArea: "",
    hasHadReading: "",
    email: ""
  });
  const cityInputRef = useRef<HTMLInputElement | null>(null);
  const [citySuggestions, setCitySuggestions] = useState<Array<{ description: string; place_id: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<number | undefined>(undefined);

  const totalSteps = 7;

  const getTodayStr = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const minDob = "1940-01-01";
  const maxDob = getTodayStr();
  const isDobInRange = (dateStr: string) => !!dateStr && dateStr >= minDob && dateStr <= maxDob;

  const updateFormData = (field: keyof OnboardingData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return Boolean(formData.firstName) && isDobInRange(formData.birthDate);
      case 2: return formData.noTimeKnown || formData.birthTime;
      case 3: return formData.birthCity;
      case 4: return formData.lifeArea;
      case 5: return formData.gender === "male" || formData.gender === "female";
      case 6: return formData.hasHadReading;
      case 7: return formData.email && formData.email.includes('@');
      default: return false;
    }
  };

  const lifeAreas = [
    { id: "love", label: "Love & Relationships", icon: Heart, color: "text-accent" },
    { id: "career", label: "Career & Purpose", icon: Briefcase, color: "text-primary" },
    { id: "self", label: "Self-Discovery", icon: Sparkles, color: "text-gold" },
    { id: "everything", label: "Everything", icon: Globe, color: "text-primary-glow" }
  ];

  useEffect(() => {
    if (currentStep !== 3) return;
    const baseUrl = (import.meta as any).env?.VITE_BASE_URL as string | undefined;
    if (!baseUrl) return;

    window.clearTimeout(debounceRef.current);
    if (!formData.birthCity || formData.birthCity.trim().length < 2) {
      setCitySuggestions([]);
      return;
    }

    setIsSearching(true);
    debounceRef.current = window.setTimeout(() => {
      fetch(`${baseUrl}/google/places-autocomplete-public?input=${encodeURIComponent(formData.birthCity.trim())}`)
        .then((r) => r.json())
        .then((data) => {
          const predictions = (data?.predictions as Array<any>) || [];
          const suggestions = predictions.map((p) => ({ description: p.description as string, place_id: p.place_id as string }));
          setCitySuggestions(suggestions);
          setShowSuggestions(true);
        })
        .catch(() => {
          setCitySuggestions([]);
        })
        .finally(() => setIsSearching(false));
    }, 250);

    return () => {
      window.clearTimeout(debounceRef.current);
    };
  }, [formData.birthCity, currentStep]);

  const sanitizeCityName = (raw: string) => (raw || "").split(",")[0].trim();

  const extractCityFromComponents = (components: any[], fallbackName?: string) => {
    const find = (type: string) => components.find((c: any) => c.types?.includes(type));
    const candidate = (
      find("locality")?.long_name ||
      find("postal_town")?.long_name ||
      find("administrative_area_level_3")?.long_name ||
      find("administrative_area_level_2")?.long_name ||
      find("sublocality")?.long_name ||
      fallbackName ||
      ""
    );
    return sanitizeCityName(candidate);
  };

  const handleSuggestionClick = (s: { description: string; place_id: string }) => {
    const baseUrl = (import.meta as any).env?.VITE_BASE_URL as string | undefined;
    setShowSuggestions(false);
    // Optimistic fill with sanitized city until details resolve
    setFormData((prev) => ({ ...prev, birthCity: sanitizeCityName(s.description), birthPlaceId: s.place_id }));
    if (!baseUrl || !s.place_id) return;

    fetch(`${baseUrl}/google/geocode-public?place_id=${encodeURIComponent(s.place_id)}`)
      .then((r) => r.json())
      .then((data) => {
        const result = data?.result;
        const components = result?.address_components || [];
        const city = extractCityFromComponents(components, result?.name || s.description);
        const geometry = result?.geometry?.location;
        const lat = typeof geometry?.lat === "function" ? geometry.lat() : geometry?.lat;
        const lng = typeof geometry?.lng === "function" ? geometry.lng() : geometry?.lng;
        const utcOffsetMin = result?.utc_offset_minutes ?? result?.utc_offset;
        const tzone = typeof utcOffsetMin === "number" ? utcOffsetMin / 60 : null;
        if (city) {
          setFormData((prev) => ({ ...prev, birthCity: city, birthPlaceId: s.place_id, lat: typeof lat === "number" ? lat : prev.lat, lon: typeof lng === "number" ? lng : prev.lon, tzone: typeof tzone === "number" ? tzone : prev.tzone }));
        }
      })
      .catch(() => {
        // keep optimistic description
      });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{ backgroundColor: '#1B0D2C' }}>
      <div className="w-full max-w-lg mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-primary">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="card-cosmic">
          {/* Step 1: Name & Birth Date */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-cosmic">Let's start with the basics</h2>
                <p className="text-muted-foreground">Your cosmic journey begins here</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="birthDate" className="text-foreground">Date of Birth</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    min={minDob}
                    max={maxDob}
                    value={formData.birthDate}
                    onChange={(e) => updateFormData("birthDate", e.target.value)}
                    className="mt-1"
                  />
                  {!isDobInRange(formData.birthDate) && formData.birthDate && (
                    <div className="text-xs text-red-500 mt-1">Date must be between 1940-01-01 and today.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Birth Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Clock className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-cosmic">Time of birth</h2>
                <p className="text-muted-foreground">This helps create your precise chart</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="birthTime" className="text-foreground">Time of Birth</Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => updateFormData("birthTime", e.target.value)}
                    disabled={formData.noTimeKnown}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noTime"
                    checked={formData.noTimeKnown}
                    onCheckedChange={(checked) => {
                      const isChecked = Boolean(checked);
                      updateFormData("noTimeKnown", isChecked);
                      if (isChecked) {
                        updateFormData("birthTime", "");
                      }
                    }}
                  />
                  <Label htmlFor="noTime" className="text-sm text-muted-foreground">
                    I don't know my exact birth time
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Birth Location */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-cosmic">Where were you born?</h2>
                <p className="text-muted-foreground">Your birthplace anchors your cosmic map</p>
              </div>
              
              <div>
                <Label htmlFor="birthCity" className="text-foreground">City of Birth</Label>
                <div className="relative">
                  <Input
                    id="birthCity"
                    ref={cityInputRef}
                    value={formData.birthCity}
                  onChange={(e) => updateFormData("birthCity", sanitizeCityName(e.target.value))}
                    onFocus={() => citySuggestions.length && setShowSuggestions(true)}
                    placeholder="e.g., New York, London, Tokyo"
                    className="mt-1"
                    autoComplete="off"
                  />
                  {showSuggestions && citySuggestions.length > 0 && (
                    <div className="absolute z-20 mt-1 w-full rounded-md border border-border bg-background shadow-lg max-h-64 overflow-auto">
                      {citySuggestions.map((s) => (
                        <button
                          type="button"
                          key={s.place_id}
                          onClick={() => handleSuggestionClick(s)}
                          className="w-full text-left px-3 py-2 hover:bg-muted"
                        >
                          {s.description}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {isSearching && <div className="text-xs text-muted-foreground mt-1">Searching…</div>}
              </div>
            </div>
          )}

          {/* Step 4: Life Interest */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-cosmic">What calls to you?</h2>
                <p className="text-muted-foreground">What area of your life are you most curious about right now?</p>
              </div>
              
              <div className="space-y-3">
                {lifeAreas.map((area) => {
                  const Icon = area.icon;
                  return (
                    <button
                      key={area.id}
                      onClick={() => updateFormData("lifeArea", area.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left flex items-center space-x-3 ${
                        formData.lifeArea === area.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${area.color}`} />
                      <span className="font-medium">{area.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Gender */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Globe className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-cosmic">What is your gender?</h2>
                <p className="text-muted-foreground">Please select one</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{ id: "male", label: "Male" }, { id: "female", label: "Female" }].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => updateFormData("gender", g.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                      formData.gender === g.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Previous Reading */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Globe className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-cosmic">One last question</h2>
                <p className="text-muted-foreground">Have you ever had a birth chart reading before?</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { id: "yes", label: "Yes, I have" },
                  { id: "no", label: "No, this is my first time" }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateFormData("hasHadReading", option.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      formData.hasHadReading === option.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Email Capture */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-primary mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-cosmic">Almost done! Where should we send your full chart?</h2>
                <p className="text-muted-foreground">Get full access to all reports and readings. We'll send your personalized chart report.</p>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-800 hover:from-purple-600 hover:to-purple-900 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {currentStep === totalSteps ? "Generate My Report" : "Continue"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};