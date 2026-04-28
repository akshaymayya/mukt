import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from '../components/AnimatedText';

export default function FeaturesSection({ onScroll }) {
  return (
    <section id="solutions" className="min-h-screen bg-black py-24 px-4 md:px-6 relative overflow-hidden">
      
      {/* Noise Background */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col gap-2">
          <WordsPullUpMultiStyle 
            segments={[{ text: "Institutional-grade strategies for visionary leaders.", className: "text-[#E1E0CC]" }]}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-left !justify-start"
          />
          <WordsPullUpMultiStyle 
            segments={[{ text: "Built for pure growth. Powered by automation.", className: "text-gray-500" }]}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-left !justify-start"
          />
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          
          <FeatureCard index={0} delay={0.15} className="col-span-1 p-0 overflow-hidden relative group">
            <video 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-[#E1E0CC] font-medium">
              Your financial control room.
            </div>
          </FeatureCard>

          <FeatureCard index={1} delay={0.30}>
            <FeatureCardContent 
              number="01"
              title="Project Orchestrator."
              icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
              items={[
                "Map vendors dynamically",
                "Verify milestone completion",
                "Auto-release batch payments",
                "TDS & GST auto-calculated"
              ]}
              onAction={(e) => onScroll(e, 'early-access')}
            />
          </FeatureCard>

          <FeatureCard index={2} delay={0.45}>
             <FeatureCardContent 
              number="02"
              title="Live Visibility."
              icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
              items={[
                "Real-time cash positions",
                "Multi-project dashboard",
                "Automated supplier ledger"
              ]}
              onAction={(e) => onScroll(e, 'early-access')}
            />
          </FeatureCard>

          <FeatureCard index={3} delay={0.60}>
            <FeatureCardContent 
              number="03"
              title="Compliance Auto."
              icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
              items={[
                "Generate Form 26Q instantly",
                "Built-in multi-party approvals",
                "Full unalterable audit trail"
              ]}
              onAction={(e) => onScroll(e, 'early-access')}
            />
          </FeatureCard>

        </div>
      </div>
    </section>
  );
}

function FeatureCard({ children, className = "", delay = 0 }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-[#212121] rounded-2xl md:rounded-[2rem] p-6 flex flex-col h-[380px] lg:h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FeatureCardContent({ number, title, icon, items, onAction }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-12">
        <img src={icon} alt={title} className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover" />
        <span className="text-gray-500 text-sm font-medium">{number}</span>
      </div>
      
      <h3 className="text-[#E1E0CC] text-xl font-medium mb-6">{title}</h3>
      
      <ul className="space-y-3 flex-grow">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
            <span className="text-gray-400 text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <button onClick={onAction} className="flex items-center gap-2 text-primary text-sm font-medium mt-6 group w-fit hover:text-white transition-colors">
        Learn more
        <ArrowRight className="w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>
    </div>
  );
}
