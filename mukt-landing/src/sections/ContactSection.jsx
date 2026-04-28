import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactSection() {
  return (
    <footer id="contact" className="bg-black pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
        
        {/* Left Side: Let's Talk */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-normal text-[#E1E0CC] mb-6 tracking-tight">
            Let's build <span className="font-serif italic text-primary">together</span>.
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
            We love speaking with potential customers and learning about your exact project pain points. Reach out to us directly.
          </p>

          <div className="space-y-6">
            <a href="tel:+918073041343" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</div>
                <div className="text-[#E1E0CC] group-hover:text-white transition-colors">+91 8073041343</div>
              </div>
            </a>
            
            <a href="mailto:catifaalsystems@gmail.com" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</div>
                <div className="text-[#E1E0CC] group-hover:text-white transition-colors">catifaalsystems@gmail.com</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Catifaal Badge */}
        <div className="w-full md:w-1/2 flex flex-col md:items-end justify-center pt-8 md:pt-0">
          <div className="bg-[#101010] p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center max-w-xs">
            <img src="/catifaal-logo.png" alt="Catifaal Systems" className="w-24 h-auto mb-6 opacity-80" />
            <div className="text-gray-400 text-sm">
              An initiative by <strong className="text-primary font-medium">Catifaal Systems</strong>
            </div>
            <div className="text-gray-500 text-xs mt-2">
              A group of 4 passionate builders automating the future of Indian business.
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-500 text-xs">
          © {new Date().getFullYear()} Mozara by Catifaal Systems. All rights reserved.
        </div>
        <div className="flex gap-6 text-gray-500 text-xs">
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
