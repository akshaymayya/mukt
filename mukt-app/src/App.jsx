import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ShieldAlert, PiggyBank, Target, ChevronRight, Download, Link, Compass, CheckCircle2 } from 'lucide-react';

export default function App() {
  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-gradient-glow"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold font-['Outfit'] text-xl tracking-tight text-accent-dark">
            <Compass size={24} className="text-accent-primary" />
            Mukt<span className="text-accent-primary">.</span>
          </div>
          <div className="nav-links hidden md:flex">
            <a href="#problem" className="nav-link">The Problem</a>
            <a href="#solution" className="nav-link">Our Solution</a>
            <a href="#features" className="nav-link">Features</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="nav-link font-semibold">Sign In</a>
          <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            Get Early Access
          </button>
        </div>
      </nav>

      <main>
        <HeroSection />
        <HighlightTextSection />
        <StickyFeatureSection />
        <SolutionSection />
      </main>

      <footer style={{ padding: '80px 24px', textAlign: 'center', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <h2 className="text-3xl font-bold mb-6 text-accent-dark">Stop paying for what you don't owe.</h2>
        <button className="btn btn-primary" style={{ transform: 'scale(1.1)' }}>Join the waitlist today <ArrowRight size={20} /></button>
        <p className="mt-8 text-sm text-text-secondary">© 2026 Mukt Financial Solutions. Not a lender. Your data is encrypted and secure.</p>
      </footer>
    </>
  );
}

// ------------------------------------------------------------------
// HERO SECTION
// ------------------------------------------------------------------
function HeroSection() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityImage = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <section className="hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,208,148,0.1)', color: 'var(--accent-dark)', fontWeight: '600', padding: '6px 16px', borderRadius: '999px', fontSize: '0.85rem', marginBottom: '24px' }}>
          <ShieldAlert size={16} /> Breaking the cycle of Predatory Lending
        </div>

        <h1>
          Escape The Debt Trap.<br />
          Save <span className="highlight">Thousands</span> Every Month.
        </h1>

        <p style={{ margin: '0 auto 40px auto' }}>
          Track smarter, prioritize better, and escape high-interest loans with Mukt’s personalized debt-exit strategies. We never lend money. We just help you keep yours.
        </p>

        <div className="flex justify-center gap-4">
          <button className="btn btn-primary">
            Get the App <Download size={20} />
          </button>
          <button className="btn btn-outline">
            See how it works
          </button>
        </div>
      </motion.div>

      <motion.div
        className="mockup-container"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        style={{ y: yImage, opacity: opacityImage }}
      >
        <div style={{ padding: '32px 24px' }}>
          <div className="flex items-center justify-between">
            <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'rgba(0,208,148,0.2)' }}></div>
            <div style={{ width: '80px', height: '24px', borderRadius: '12px', background: '#f1f5f9' }}></div>
          </div>
          <div className="ui-balance text-accent-dark mt-8 mb-2">₹1,95,000</div>
          <div className="text-text-secondary text-sm font-medium">True Total Debt Remaining</div>

          <div className="ui-chart mb-8"></div>

          <div className="ui-card">
            <div className="flex items-center gap-3">
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2' }}></div>
              <div>
                <div className="font-bold text-sm">Credit Card</div>
                <div className="text-xs text-text-secondary">36% APR</div>
              </div>
            </div>
            <div className="font-bold">₹45,000</div>
          </div>
          <div className="ui-card">
            <div className="flex items-center gap-3">
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7' }}></div>
              <div>
                <div className="font-bold text-sm">App Loan</div>
                <div className="text-xs text-text-secondary">42% APR</div>
              </div>
            </div>
            <div className="font-bold">₹30,000</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ------------------------------------------------------------------
// HIGHLIGHT TEXT SECTION
// ------------------------------------------------------------------
function HighlightTextSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 70%", "end 70%"]
  });

  const text = "Mukt securely unites your accounts to reveal the true cost of your debt, and actively builds a mathematical plan to break you free from predatory loans.";
  const words = text.split(" ");

  return (
    <section id="problem" className="highlight-section" ref={container}>
      <div className="highlight-text-container">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);

          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} word={word} index={i} />
          );
        })}
      </div>
    </section>
  );
}

function Word({ word, progress, range, index }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const isHighlight = ['Mukt', 'true', 'cost', 'free', 'predatory'].includes(word.replace(',', '').replace('.', ''));

  return (
    <span style={{ position: 'relative', display: 'inline-block', margin: '0 8px' }}>
      <span style={{ opacity: 0.15, position: 'absolute' }}>{word}</span>
      <motion.span style={{ opacity, color: isHighlight ? 'var(--accent-primary)' : 'var(--accent-dark)' }}>
        {word}
      </motion.span>
    </span>
  );
}

// ------------------------------------------------------------------
// STICKY SCROLL SECTION
// ------------------------------------------------------------------
function StickyFeatureSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Animations for left popup 1 (Found Money)
  const left1Y = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.8], [100, 0, 0, -100]);
  const left1Op = useTransform(scrollYProgress, [0.1, 0.2, 0.6, 0.7], [0, 1, 1, 0]);

  // Animations for right popup 1 (Loan Trap)
  const right1Y = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [100, 0, 0, -100]);
  const right1Op = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);

  // Animations for left popup 2 (Strategy)
  const left2Y = useTransform(scrollYProgress, [0.4, 0.6, 0.9, 1.0], [100, 0, 0, -100]);
  const left2Op = useTransform(scrollYProgress, [0.4, 0.5, 0.9, 1.0], [0, 1, 1, 0]);

  // Phone Mockup inner scale
  const scalePhone = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={targetRef} className="sticky-section" id="features">
      <div className="sticky-container">

        {/* The Central Phone */}
        <motion.div className="center-mockup" style={{ scale: scalePhone }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl">Journey</h3>
            <div className="text-xs font-bold text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-full">On Track</div>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <p className="text-sm text-text-secondary mb-1">Debt-Free Date</p>
            <h2 className="text-4xl text-accent-dark">Oct 2025</h2>
            <div className="flex items-center gap-2 mt-4 text-sm font-medium">
              <CheckCircle2 size={16} className="text-accent-primary" /> Adjusted Avalanche Method
            </div>
          </div>

          <p className="font-bold mb-4">Your Next Moves</p>
          <div className="ui-card cursor-pointer" style={{ border: '1px solid var(--accent-primary)', background: 'rgba(0,208,148,0.05)' }}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-primary text-white font-bold text-sm">1</div>
              <div>
                <div className="font-bold text-sm">Pay HDFC Minimum</div>
                <div className="text-xs text-text-secondary">Due tomorrow</div>
              </div>
            </div>
            <div className="font-bold">₹4,500</div>
          </div>
          <div className="ui-card">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-sm">2</div>
              <div>
                <div className="font-bold text-sm">Blast SBI Card</div>
                <div className="text-xs text-text-secondary">With remaining cash</div>
              </div>
            </div>
            <div className="font-bold">₹3,100</div>
          </div>

        </motion.div>

        {/* Floating Notif 1 - Left */}
        <motion.div
          className="floating-notif"
          style={{ left: '15%', top: '30%', y: left1Y, opacity: left1Op }}
        >
          <div className="notif-icon bg-green-100 text-green-600">
            <PiggyBank size={20} />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">Found Money!</div>
            <div className="text-xs text-slate-500">Redirect ₹850 less spent on Swiggy to your SBI Card debt.</div>
          </div>
        </motion.div>

        {/* Floating Notif 2 - Right */}
        <motion.div
          className="floating-notif"
          style={{ right: '15%', top: '45%', y: right1Y, opacity: right1Op }}
        >
          <div className="notif-icon bg-red-100 text-red-600 border border-red-200">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">Wait. Don't do this.</div>
            <div className="text-xs text-slate-500">That 15k loan actually costs 36% APR. It will delay your freedom by 4 months.</div>
          </div>
        </motion.div>

        {/* Floating Notif 3 - Left */}
        <motion.div
          className="floating-notif"
          style={{ left: '20%', top: '60%', y: left2Y, opacity: left2Op }}
        >
          <div className="notif-icon bg-blue-100 text-blue-600">
            <Target size={20} />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900">Strategy Executed</div>
            <div className="text-xs text-slate-500">We paid off your KreditBee balance! Momentum is building.</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// SOLUTION SECTION
// ------------------------------------------------------------------
function SolutionSection() {
  return (
    <section id="solution" className="parallax-section">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-accent-dark mb-4">A complete OS for escaping debt.</h2>
        <p className="text-lg text-text-secondary">Built for the middle-income reality, not the surplus-wealth fantasy.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-1">

        <motion.div
          whileHover={{ y: -8 }}
          className="p-card flex flex-col justify-between"
          style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))' }}
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center text-accent-dark mb-6">
              <Link size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">The Debt Map</h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              Connect your bank statements safely. We aggregate every hidden loan, every credit card, every BNPL slice, and show you exactly what it's costing you across institutions.
            </p>
          </div>
          <button className="flex items-center gap-2 text-accent-dark font-bold hover:text-accent-primary transition-colors">
            Learn more <ChevronRight size={16} />
          </button>
        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          className="p-card flex flex-col justify-between"
          style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))' }}
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Strategy Engine</h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              Avalanche or Snowball? We run the math to find your optimal payoff route. We give you a realistic "Debt-Free Date" and a personalized 1-2-3 step plan every single month.
            </p>
          </div>
          <button className="flex items-center gap-2 text-accent-dark font-bold hover:text-blue-600 transition-colors">
            Learn more <ChevronRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
