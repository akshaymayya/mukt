import React from 'react';
import { WordsPullUpMultiStyle, ScrollRevealText } from '../components/AnimatedText';

export default function AboutSection() {
  return (
    <section id="about" className="bg-black py-16 md:py-32 px-4 md:px-6">
      <div className="bg-[#101010] rounded-[2rem] p-6 md:p-16 lg:p-24 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        
        <div className="text-primary/50 text-[10px] sm:text-xs tracking-wider uppercase mb-8 md:mb-12">
          Our Journey
        </div>

        <WordsPullUpMultiStyle 
          segments={[
            { text: "We are stepping into an upgraded field—building something deeply valuable", className: "font-normal" },
            { text: "for India's MSMEs", className: "font-serif italic" },
            { text: "up to large institutions.", className: "font-normal" }
          ]}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#E1E0CC]"
        />

        <div className="mt-10 md:mt-24 max-w-3xl mx-auto space-y-6 text-left">
          <ScrollRevealText 
            text="We started as freelancers, providing internet services and digital automation to MSMEs. We helped business owners navigate government forms, track applications, and optimize their tender processes on GeM."
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed"
          />
          <ScrollRevealText 
            text="Now, we are building a massive infrastructure for project-based companies. We are not the top builders yet, but we are learning, iterating, and dedicating ourselves to building something genuinely useful and valuable for society."
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed"
          />
        </div>

      </div>
    </section>
  );
}
