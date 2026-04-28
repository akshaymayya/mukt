import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-[#E1E0CC] font-sans selection:bg-primary/20">
      
      {/* Simple Header */}
      <nav className="bg-[#101010] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Mozara Logo" className="h-6 md:h-8 w-auto object-contain" />
        </Link>
        <Link to="/" className="text-primary text-sm hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto py-16 px-6 md:px-0">
        <h1 className="text-4xl md:text-5xl font-medium mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12"><strong>Mozara</strong> | Last Updated: April 28, 2026</p>

        <div className="space-y-12 text-gray-400 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">1. Introduction</h2>
            <p>Welcome to Mozara ("we", "our", "us"). We are committed to protecting the personal information you share with us when you visit our website and express interest in our financial flow infrastructure platform. This Privacy Policy explains what data we collect, how we use it, and your rights regarding it.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">2. Information We Collect</h2>
            <p className="mb-2"><strong className="text-[#E1E0CC]">Information you provide directly:</strong></p>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>Full name</li>
              <li>Business name and type</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>City / State</li>
              <li>Any message or inquiry you submit via our lead form</li>
            </ul>

            <p className="mb-2"><strong className="text-[#E1E0CC]">Information collected automatically:</strong></p>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referring URLs</li>
              <li>Device type (desktop/mobile)</li>
            </ul>
            <p>We collect this automatically via cookies and analytics tools.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information collected to:</p>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>Respond to your inquiry or demo request</li>
              <li>Contact you about Mozara's platform, updates, and early access</li>
              <li>Understand which types of businesses are interested in our platform</li>
              <li>Improve our website experience</li>
              <li>Send relevant communications (you may opt out at any time)</li>
            </ul>
            <p>We do <strong>not</strong> sell, rent, or trade your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">4. Cookies</h2>
            <p>Our website uses cookies to improve your browsing experience and collect anonymous analytics data. You may disable cookies in your browser settings; however, some parts of the website may not function as intended.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">5. Data Storage and Security</h2>
            <p className="mb-4">Your data is stored securely and accessed only by authorised Mozara team members. We implement reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse.</p>
            <p>We are not responsible for breaches resulting from circumstances beyond our reasonable control.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">6. Third-Party Services</h2>
            <p>We may use third-party tools such as Google Analytics, email platforms, or CRM software to process and store your data on our behalf. These providers are bound by their own privacy policies and are not permitted to use your data for their own purposes.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">7. Data Retention</h2>
            <p>We retain your information for as long as necessary to fulfil the purposes described in this policy or as required by applicable law. If you wish to have your data deleted, please contact us at the email below.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">8. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent to being contacted at any time</li>
            </ul>
            <p>To exercise any of these rights, email us at: <a href="mailto:privacy@mozara.in" className="text-primary hover:underline">privacy@mozara.in</a></p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">9. Children's Privacy</h2>
            <p>Our website is not directed at individuals under the age of 18. We do not knowingly collect personal information from minors.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page will reflect any changes. Continued use of the website after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">11. Contact Us</h2>
            <p className="mb-2">For any questions or concerns regarding this Privacy Policy, please contact:</p>
            <p><strong>Mozara</strong><br/>Email: <a href="mailto:privacy@mozara.in" className="text-primary hover:underline">privacy@mozara.in</a><br/>Location: India</p>
          </section>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} Mozara. All rights reserved.</p>
      </footer>
    </div>
  );
}
