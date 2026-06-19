import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from '../components/AnimatedText';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';

export default function HeroSection({ onScroll }) {
  return (
    <section id="platform" className="h-screen p-4 md:p-6 w-full relative">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        
        {/* Background Video */}
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlays */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 md:px-0">
          <nav className="bg-black/90 backdrop-blur-md rounded-b-2xl md:rounded-b-3xl px-6 py-3 md:px-10 flex items-center justify-between shadow-2xl mx-auto w-fit md:w-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mr-6 md:mr-14">
              <img src="/logo.png?v=3" alt="Mozara" className="h-8 md:h-10 w-auto object-contain" />
            </div>

            <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
              {['Platform', 'Solutions', 'Early Access', 'Contact'].map((item) => {
                const targetId = item.toLowerCase().replace(' ', '-');
                return (
                  <a 
                    key={item} 
                    href={`#${targetId}`}
                    onClick={(e) => onScroll(e, targetId)}
                    className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors hidden md:block cursor-pointer"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(e) => e.target.style.color = '#E1E0CC'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(225, 224, 204, 0.8)'}
                  >
                    {item}
                  </a>
                );
              })}

              {/* Authentication Actions */}
              <AuthActions />
              
            </div>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-12 z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-6 md:gap-0">
            
            {/* Left: Giant Heading */}
            <div className="md:col-span-8 flex justify-start">
              <WordsPullUp 
                text="Mozara" 
                showAsterisk={true}
                className="text-[17vw] sm:text-[18vw] md:text-[20vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
                style={{ color: '#E1E0CC' }}
              />
            </div>

            {/* Right: Description & CTA */}
            <div className="md:col-span-4 flex flex-col items-start md:items-end justify-end pb-2 md:pb-6 pr-0 md:pr-8">
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] mb-6 md:text-right max-w-sm"
              >
                <strong className="text-primary block mb-2 font-medium">Financial Infrastructure Built for Pure Growth.</strong>
                Connect your bank, define your rules, and let our engine automate vendor payments, compliance, and cash flow visibility for complex projects.
              </motion.p>

              <motion.a 
                href="/flow"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center justify-between md:justify-start bg-primary rounded-full pl-6 pr-2 py-2 gap-4 hover:gap-3 transition-all duration-300 ease-out w-full sm:w-auto mt-2 md:mt-0"
              >
                <span className="text-black font-medium text-sm sm:text-base whitespace-nowrap">Go to Dashboard</span>
                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 shrink-0">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
              </motion.a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function AuthActions() {
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  if (loading) return <div className="w-16 h-8 rounded-full bg-white/10 animate-pulse"></div>;

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link to="/flow" className="text-[10px] sm:text-xs md:text-sm font-medium text-black bg-primary px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-white transition-colors">
          Dashboard
        </Link>
        <button onClick={signOut} className="text-[10px] sm:text-xs md:text-sm text-gray-400 hover:text-white transition-colors">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link to="/auth" className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm font-medium text-black bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-gray-200 transition-colors">
      Sign In
    </Link>
  );
}
