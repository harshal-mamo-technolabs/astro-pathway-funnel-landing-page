import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-plan-bg px-4 py-8 md:py-20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-plan-card rounded-2xl p-6 md:p-8 border border-plan-card-foreground/10">
          <h1 className="text-3xl md:text-4xl font-serif-elegant text-plan-card-foreground mb-4 md:mb-6">
            ZODIYA TERMS AND CONDITIONS
          </h1>
          <p className="text-xs md:text-sm text-plan-card-foreground/70 font-sans mb-6 md:mb-8">
            Effective Date: [1.7.2025]
          </p>
          
          <div className="prose prose-invert max-w-none text-plan-card-foreground/80 font-sans space-y-6 text-sm md:text-base">
            <p className="mb-6">
              Welcome to Zodiya! These Terms and Conditions govern your access and use of our astrology services, reports, and related content. By using Zodiya, you agree to these terms. If you do not agree, please do not use our services.
            </p>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">1. INTRODUCTION</h2>
              <p>
                These Terms and Conditions ("Terms") constitute a legal agreement between you ("User") and Zodiya ("Company," "we," "us," or "our"). They outline the rules and obligations for using our astrology reports, features, and subscriptions.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">2. ELIGIBILITY</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>You must be at least 18 years old to use Zodiya.</li>
                <li>By registering, you confirm that all information provided is accurate.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">3. ACCOUNT REGISTRATION</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>Users must provide their name, birth date, birth place, and email to access reports.</li>
                <li>You agree to keep your account details confidential and notify us immediately of unauthorized use.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">4. SERVICES PROVIDED</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>Zodiya provides astrology reports, birth charts, numerology insights, and compatibility analysis.</li>
                <li>Some services are free, while others require a paid subscription.</li>
                <li>The content is for entertainment and informational purposes only.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">5. SUBSCRIPTIONS, PAYMENTS & CANCELLATIONS</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>Users can subscribe to paid plans (1-month or 3-month premium access) with automatic renewals unless canceled.</li>
                <li>Payments are processed via Stripe, PayPal, and other payment gateways.</li>
                <li>Users may cancel their subscription at any time, but refunds are subject to our refund policy.</li>
                <li>Any failed payments may result in restricted access to premium features.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">6. USER RESPONSIBILITIES</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>You agree not to misuse the platform, distribute false information, or violate intellectual property rights.</li>
                <li>You must not share or resell purchased astrology reports.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">7. PRIVACY & DATA PROTECTION (GDPR COMPLIANCE)</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>We collect and process personal data according to our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.</li>
                <li>Users have the right to request, modify, or delete their personal data under GDPR (General Data Protection Regulation) regulations.</li>
                <li>Data is securely stored and not shared with third parties without user consent.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">8. INTELLECTUAL PROPERTY RIGHTS</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>All content, including astrology reports, designs, and trademarks, belongs to Zodiya.</li>
                <li>Users may not copy, reproduce, or distribute Zodiya content without permission.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">9. LIMITATION OF LIABILITY</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>Zodiya does not guarantee the accuracy of astrology reports or their impact on users' lives.</li>
                <li>We are not liable for decisions made based on our content.</li>
                <li>Users agree that astrology readings are for entertainment purposes only.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">10. RIGHT TO MODIFY TERMS</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>Zodiya reserves the right to update these Terms at any time.</li>
                <li>Users will be notified of significant changes, and continued use implies acceptance.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">11. COMPLIANCE WITH EUROPEAN UNION LAWS</h2>
              <p>
                This agreement complies with EU regulations, including GDPR, the Consumer Rights Directive (2011/83/EU), and the Unfair Commercial Practices Directive (2005/29/EC).
              </p>
              <p className="mt-2">
                Users within the EU have additional protections regarding digital content and refunds.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">12. DISPUTE RESOLUTION & GOVERNING LAW</h2>
              <p>
                These Terms are governed by the laws of the European Union and [Your Country's Jurisdiction].
              </p>
              <p className="mt-2">
                Disputes will be resolved through arbitration or an EU dispute resolution body before legal proceedings.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">13. CONTACT INFORMATION</h2>
              <p className="mb-2">For questions regarding these Terms, you may contact us at:</p>
              <div className="ml-2 md:ml-4 space-y-1">
                <p className="font-semibold">Zodiya Customer Support</p>
                <p>Email: <a href="mailto:support@zodiya.net" className="text-primary hover:underline">support@zodiya.net</a></p>
                <p>Website: <a href="https://www.zodiya.net" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.zodiya.net</a></p>
              </div>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6 mt-8">
              <p className="font-semibold">
                By using Zodiya, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
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

export default TermsOfUse;

