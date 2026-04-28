import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-[#E1E0CC] font-sans selection:bg-primary/20">
      
      {/* Simple Header */}
      <nav className="bg-[#101010] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="font-bold text-lg md:text-xl tracking-tight text-[#E1E0CC]">
          Mozara.io
        </Link>
        <Link to="/" className="text-primary text-sm hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto py-16 px-6 md:px-0">
        <h1 className="text-4xl md:text-5xl font-medium mb-4">Terms and Conditions</h1>
        <p className="text-gray-500 text-sm mb-12"><strong>Mozara</strong> | Last Updated: April 28, 2026</p>

        <div className="space-y-12 text-gray-400 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using the Mozara website ("Site"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use this Site. These terms apply to all visitors, leads, and users who access the Site.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">2. About Mozara</h2>
            <p>Mozara is a financial flow infrastructure platform designed for project-based businesses in India. Our Site is currently in a lead generation and early access phase. By submitting your details, you are expressing interest in our platform and consenting to be contacted by our team.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">3. Use of the Website</h2>
            <p className="mb-4">You agree to use this Site only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide false or misleading information in any form submission</li>
              <li>Attempt to gain unauthorised access to any part of our systems</li>
              <li>Use the Site in any way that disrupts, damages, or impairs its functionality</li>
              <li>Copy, reproduce, or redistribute any content from this Site without written permission from Mozara</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">4. Lead Form Submissions</h2>
            <p className="mb-4">When you submit your details through our contact or interest form:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You confirm that the information provided is accurate and complete</li>
              <li>You consent to Mozara contacting you via email or phone regarding our platform</li>
              <li>You acknowledge this does not constitute a binding contract or guarantee of service</li>
              <li>You may opt out of communications at any time by emailing us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">5. No Financial Advice</h2>
            <p>Nothing on this Site constitutes financial, legal, investment, or regulatory advice. Mozara is a technology infrastructure company. Any information provided on the Site is for general informational purposes only.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">6. Intellectual Property</h2>
            <p>All content on this Site — including the Mozara name, logo, text, design, and concept — is the intellectual property of Mozara and is protected under applicable Indian and international laws. Unauthorised use, reproduction, or distribution is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">7. Disclaimer of Warranties</h2>
            <p className="mb-4">This Site is provided on an "as is" and "as available" basis. Mozara makes no warranties, express or implied, regarding:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The accuracy or completeness of content on the Site</li>
              <li>Uninterrupted or error-free access to the Site</li>
              <li>The results of submitting an interest or inquiry form</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Mozara shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use this Site, even if we have been advised of the possibility of such damages.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">9. Third-Party Links</h2>
            <p>Our Site may contain links to third-party websites. These are provided for convenience only. Mozara does not endorse and is not responsible for the content, privacy practices, or accuracy of any third-party sites.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">10. Privacy</h2>
            <p>Your use of this Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review it carefully.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">11. Modifications</h2>
            <p>Mozara reserves the right to update or modify these Terms at any time without prior notice. The "Last Updated" date will reflect changes. Continued use of the Site after modifications constitutes your acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">12. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Karnataka, India.</p>
          </section>

          <section>
            <h2 className="text-[#E1E0CC] text-2xl font-medium mb-4 border-b border-white/10 pb-2">13. Contact Us</h2>
            <p className="mb-2">For any questions regarding these Terms and Conditions, please contact:</p>
            <p><strong>Mozara</strong><br/>Email: <a href="mailto:legal@mozara.in" className="text-primary hover:underline">legal@mozara.in</a><br/>Location: India</p>
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
