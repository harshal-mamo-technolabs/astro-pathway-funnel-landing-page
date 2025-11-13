import { Link } from "react-router-dom";
import { Mail, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-plan-bg px-4 py-8 md:py-20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-plan-card rounded-2xl p-6 md:p-8 border border-plan-card-foreground/10">
          <h1 className="text-3xl md:text-4xl font-serif-elegant text-plan-card-foreground mb-4 md:mb-6">
            Contact Zodiya Support
          </h1>
          
          <div className="prose prose-invert max-w-none text-plan-card-foreground/80 font-sans space-y-6 text-sm md:text-base">
            <p className="mb-6">
              We're here to help you.
            </p>

            <div className="mb-6">
              <p>
                If you have any questions about your Zodiya account, subscription, or billing, our support team is happy to assist you.
              </p>
              <p className="mt-3">
                Please use the chat widget below to contact us directly, or reach out through one of the following options.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-4">Contact Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-plan-card-foreground mb-1">Email:</p>
                    <a href="mailto:support@zodiya.net" className="text-primary hover:underline">
                      support@zodiya.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-plan-card-foreground mb-1">Response time:</p>
                    <p className="text-plan-card-foreground/80">
                      within 24–48 hours on business days (Monday–Friday, 09:00–17:00 CET)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-plan-card-foreground/20">
            <Link 
              to="/" 
              className="text-primary hover:underline font-sans"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

