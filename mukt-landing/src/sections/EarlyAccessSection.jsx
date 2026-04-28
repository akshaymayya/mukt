import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import DOMPurify from 'dompurify';
import { supabase } from '../lib/supabase';

export default function EarlyAccessSection() {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    city: '',
    message: '',
    _honey: '' // Honeypot field
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [error, setError] = useState('');

  // Restore from sessionStorage on load
  useEffect(() => {
    const saved = sessionStorage.getItem('mozara_waitlist_form');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleChange = (e) => {
    // Sanitize input instantly
    const cleanValue = DOMPurify.sanitize(e.target.value);
    const newFormData = { ...formData, [e.target.id]: cleanValue };
    setFormData(newFormData);
    // Cache to sessionStorage
    sessionStorage.setItem('mozara_waitlist_form', JSON.stringify(newFormData));
    setError(''); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData._honey) {
      setStatus('success'); // Fake success for bots
      return;
    }

    // Strict Validations
    if (!formData.name.trim() || formData.name.length > 100) {
      setError('Please enter a valid name (max 100 characters).');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || formData.email.length > 254) {
      setError('Please enter a valid work email address.');
      return;
    }

    if (formData.phone) {
      const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
      if (!phoneRegex.test(formData.phone)) {
        setError('Please enter a valid 10-digit Indian phone number.');
        return;
      }
    }

    setStatus('loading');
    
    // Submit to Supabase
    const { error: submitError } = await supabase
      .from('waitlist')
      .insert([
        {
          full_name: formData.name,
          business_name: formData.business || null,
          email: formData.email,
          phone: formData.phone || null,
          city: formData.city || null,
          message: formData.message || null
        }
      ]);

    if (submitError) {
      console.error('Supabase error:', submitError);
      // Check if it's a unique constraint error (e.g., email already registered)
      if (submitError.code === '23505') {
        setError('This email is already on the waitlist.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      setStatus('idle');
      return;
    }

    // Success
    setStatus('success');
    const emptyForm = { name: '', business: '', email: '', phone: '', city: '', message: '', _honey: '' };
    setFormData(emptyForm);
    sessionStorage.removeItem('mozara_waitlist_form');
  };

  return (
    <section id="early-access" className="bg-[#0a0a0a] py-24 md:py-32 px-4 md:px-6 border-y border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        
        <div className="w-full md:w-5/12 sticky top-32">
          <h2 className="text-4xl md:text-5xl font-normal text-[#E1E0CC] mb-6 tracking-tight leading-tight">
            Be the first to access <span className="font-serif italic text-primary">Mozara</span>.
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            We are currently building the full Mozara platform, including our dedicated mobile application for on-site project managers. 
          </p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            By joining our early access waitlist, you get a chance to shape the product with us and guarantee a spot when we open our doors.
          </p>
        </div>

        <div className="w-full md:w-7/12 bg-[#141414] p-6 md:p-10 rounded-2xl border border-white/5">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-medium text-[#E1E0CC] mb-2">You're on the list!</h3>
              <p className="text-gray-400 text-sm">We'll be in touch soon with updates on our launch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Honeypot Field */}
              <input type="text" id="_honey" value={formData._honey} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs tracking-widest text-gray-500 uppercase font-bold">Full Name *</label>
                  <input type="text" id="name" required maxLength="100" value={formData.name} onChange={handleChange} placeholder="John Doe" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="business" className="text-xs tracking-widest text-gray-500 uppercase font-bold">Business Name & Type</label>
                  <input type="text" id="business" maxLength="150" value={formData.business} onChange={handleChange} placeholder="ABC Constructions Pvt Ltd" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs tracking-widest text-gray-500 uppercase font-bold">Work Email *</label>
                  <input type="email" id="email" required maxLength="254" inputMode="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs tracking-widest text-gray-500 uppercase font-bold">Phone Number</label>
                  <input type="tel" id="phone" maxLength="15" inputMode="tel" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-xs tracking-widest text-gray-500 uppercase font-bold">City / State</label>
                <input type="text" id="city" maxLength="100" value={formData.city} onChange={handleChange} placeholder="Bangalore, Karnataka" className="bg-black border border-white/10 rounded-xl px-4 py-3 text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs tracking-widest text-gray-500 uppercase font-bold">Any Message or Inquiry? (Optional)</label>
                <textarea id="message" maxLength="1000" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us a bit about your project workflow needs..." className="bg-black border border-white/10 rounded-xl px-4 py-3 text-[#E1E0CC] placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
                <div className="text-right text-[10px] text-gray-600">{formData.message.length}/1000</div>
              </div>

              {/* Cloudflare Turnstile Placeholder */}
              <div className="border border-white/5 bg-black/50 p-4 rounded-xl flex items-center justify-center min-h-[65px]">
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-primary rounded-full animate-spin"></div>
                  Verifying you are human. This may take a few seconds.
                </div>
                {/* <div className="cf-turnstile" data-sitekey="YOUR_SITE_KEY"></div> */}
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="mt-2 bg-primary text-black font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    Secure Your Spot
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
