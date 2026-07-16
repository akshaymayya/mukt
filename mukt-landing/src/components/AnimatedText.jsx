'use client';
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export function WordsPullUp({ text, className = "", showAsterisk = false }) {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
          <motion.span
            className="inline-block relative"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.08,
            }}
          >
            {word}
            {showAsterisk && i === words.length - 1 && word.includes('a') && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export function WordsPullUpMultiStyle({ segments, className = "" }) {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-50px" });

  // Flatten segments into an array of words, keeping the className from the segment
  const allWords = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({ word, className: segment.className }))
  );

  return (
    <div ref={container} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.25em] mb-[0.2em]">
          <motion.span
            className={`inline-block ${item.className || ""}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.08,
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export function AnimatedLetter({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export function ScrollRevealText({ text, className = "" }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p ref={container} className={className}>
      {chars.map((char, i) => {
        const charProgress = i / totalChars;
        const start = Math.max(0, charProgress - 0.1);
        const end = Math.min(1, charProgress + 0.05);
        return (
          <AnimatedLetter key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </AnimatedLetter>
        );
      })}
    </p>
  );
}
