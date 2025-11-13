import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-plan-bg border-t border-plan-card-foreground/20 py-6 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-plan-card-foreground/70 font-sans">
          <Link 
            to="/terms-of-use" 
            className="hover:text-primary transition-colors"
          >
            Terms of Use
          </Link>
          <span className="hidden md:inline">•</span>
          <Link 
            to="/privacy-policy" 
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="hidden md:inline">•</span>
          <Link 
            to="/contact" 
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

