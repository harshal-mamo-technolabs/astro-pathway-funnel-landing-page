import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-plan-bg px-4 py-8 md:py-20">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-plan-card rounded-2xl p-6 md:p-8 border border-plan-card-foreground/10">
          <h1 className="text-3xl md:text-4xl font-serif-elegant text-plan-card-foreground mb-4 md:mb-6">
            ZODIYA PRIVACY POLICY
          </h1>
          <p className="text-xs md:text-sm text-plan-card-foreground/70 font-sans mb-6 md:mb-8">
            Effective Date: [1.7.2025]
          </p>
          
          <div className="prose prose-invert max-w-none text-plan-card-foreground/80 font-sans space-y-6 text-sm md:text-base">
            <p className="mb-6">
              At Zodiya, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information in compliance with the General Data Protection Regulation (GDPR) and other applicable laws.
            </p>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">1. INTRODUCTION</h2>
              <p>
                This Privacy Policy applies to all users of the Zodiya platform, including visitors, registered users, and subscribers. By using our services, you agree to the terms outlined in this policy.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">2. DATA WE COLLECT</h2>
              <p className="mb-3">We collect the following types of personal data:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li><strong>Personal Information:</strong> Name, birth date, birth place, and email address.</li>
                <li><strong>Account Information:</strong> Profile preferences, subscription status.</li>
                <li><strong>Usage Data:</strong> Information on how you interact with our website and services.</li>
                <li><strong>Payment Information:</strong> If you subscribe to a paid plan, we process payments via third-party gateways (Stripe, PayPal), but we do not store credit card details.</li>
                <li><strong>Cookies & Tracking Data:</strong> Data collected through cookies and similar tracking technologies for analytics and marketing.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">3. PURPOSE OF DATA COLLECTION</h2>
              <p className="mb-3">We use your personal data for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li><strong>Service Delivery:</strong> To provide astrology reports, compatibility analysis, and numerology readings.</li>
                <li><strong>Account Management:</strong> To create and maintain your user profile.</li>
                <li><strong>Customer Support:</strong> To respond to inquiries and provide assistance.</li>
                <li><strong>Marketing & Communication:</strong> To send newsletters, promotional offers, and updates (with user consent).</li>
                <li><strong>Analytics & Improvement:</strong> To analyze service usage and enhance user experience.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">4. LEGAL BASIS FOR PROCESSING DATA</h2>
              <p className="mb-3">We process personal data based on:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li><strong>User Consent:</strong> When you provide information voluntarily.</li>
                <li><strong>Contractual Necessity:</strong> To deliver the services you subscribe to.</li>
                <li><strong>Legal Obligation:</strong> To comply with laws and regulations.</li>
                <li><strong>Legitimate Interests:</strong> To improve our services while respecting user rights.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">5. DATA STORAGE & SECURITY</h2>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li>We implement strong security measures to protect your data against unauthorized access, disclosure, and loss.</li>
                <li>Data is stored on secure servers within the European Economic Area (EEA), and we comply with GDPR data protection standards.</li>
                <li>We retain personal data only as long as necessary for service provision and legal compliance.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">6. THIRD-PARTY DATA SHARING</h2>
              <p className="mb-3">We do not sell or rent personal data. However, we may share data with:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li><strong>Payment Processors</strong> (Stripe, PayPal) for secure transactions.</li>
                <li><strong>Email Marketing Platforms</strong> (Mailchimp, ActiveCampaign) for communications.</li>
                <li><strong>Analytics Services</strong> (Google Analytics, Mixpanel) to track user behavior.</li>
                <li><strong>Legal Authorities</strong> if required for compliance with regulations or legal obligations.</li>
              </ul>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">7. YOUR RIGHTS UNDER GDPR</h2>
              <p className="mb-3">Users in the European Union (EU) have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 md:ml-4">
                <li><strong>Right to Access:</strong> Request a copy of your personal data.</li>
                <li><strong>Right to Rectification:</strong> Request corrections to inaccurate data.</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data.</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how your data is used.</li>
                <li><strong>Right to Data Portability:</strong> Transfer your data to another provider.</li>
                <li><strong>Right to Object:</strong> Object to data processing for marketing purposes.</li>
                <li><strong>Right to Withdraw Consent:</strong> Opt out of data collection at any time.</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at <a href="mailto:support@zodiya.net" className="text-primary hover:underline">support@zodiya.net</a>.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">8. COOKIES & TRACKING TECHNOLOGIES</h2>
              <p>
                We use cookies and tracking tools to enhance user experience and measure engagement. Users can manage cookie preferences via browser settings.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">9. CHILDREN'S PRIVACY</h2>
              <p>
                Zodiya does not knowingly collect data from children under 18 years old. If we become aware of such data collection, we will delete it immediately.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">10. CHANGES TO THIS POLICY</h2>
              <p>
                We may update this Privacy Policy periodically. Users will be notified of significant changes via email or on our website.
              </p>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6">
              <h2 className="text-xl md:text-2xl font-serif-elegant text-plan-card-foreground mb-3 md:mb-4">11. CONTACT INFORMATION</h2>
              <p className="mb-2">For any privacy-related inquiries, you can contact us at:</p>
              <div className="ml-2 md:ml-4 space-y-1">
                <p className="font-semibold">Zodiya Data Protection Officer</p>
                <p>Email: <a href="mailto:support@zodiya.net" className="text-primary hover:underline">support@zodiya.net</a></p>
                <p>Website: <a href="https://www.zodiya.net" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.zodiya.net</a></p>
              </div>
            </div>

            <div className="border-t border-plan-card-foreground/20 pt-6 mt-8">
              <p className="font-semibold">
                By using Zodiya, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
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
    </div>
  );
};

export default PrivacyPolicy;

