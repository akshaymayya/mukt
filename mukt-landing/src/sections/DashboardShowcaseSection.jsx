import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Star, BadgeCheck } from 'lucide-react';

export default function DashboardShowcaseSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Parallax & Scales
  const bg1Scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);
  const bg2Scale = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.15]);
  const bg3Scale = useTransform(scrollYProgress, [0.6, 1], [1, 1.15]);

  // Background Opacity
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const bg2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const bg3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  // Card Y Translations
  const card1Y = useTransform(scrollYProgress, [0, 0.35], [100, -100]);
  const card2Y = useTransform(scrollYProgress, [0.3, 0.65], [100, -100]);
  const card3Y = useTransform(scrollYProgress, [0.6, 0.95], [100, -100]);

  // Card Opacities
  const card1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 0.95], [0, 1, 1, 0]);

  // Text Opacities & Transforms
  const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 0.95], [0, 1, 1, 0]);

  const text1Y = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], ['50%', '-50%', '-50%', '-150%']);
  const text2Y = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], ['50%', '-50%', '-50%', '-150%']);
  const text3Y = useTransform(scrollYProgress, [0.6, 0.7, 0.85, 0.95], ['50%', '-50%', '-50%', '-150%']);

  return (
    <section id="showcase">
      {/* Desktop Version */}
      <div ref={containerRef} className="hidden lg:block h-[400vh] bg-black relative">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          
          {/* Background Layers */}
          <motion.div style={{ opacity: bg1Opacity }} className="absolute right-0 top-0 w-3/5 h-full z-0 overflow-hidden">
            <motion.img style={{ scale: bg1Scale }} src="/showcase/anime1.jpg" className="w-full h-full object-cover origin-center" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </motion.div>

          <motion.div style={{ opacity: bg2Opacity }} className="absolute right-0 top-0 w-3/5 h-full z-0 overflow-hidden">
            <motion.img style={{ scale: bg2Scale }} src="/showcase/anime2.jpg" className="w-full h-full object-cover origin-center" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </motion.div>

          <motion.div style={{ opacity: bg3Opacity }} className="absolute right-0 top-0 w-3/5 h-full z-0 overflow-hidden">
            <motion.img style={{ scale: bg3Scale }} src="/showcase/anime3.jpg" className="w-full h-full object-cover origin-center" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </motion.div>

          {/* Top & Bottom Fades for Seamless Integration */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-0 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto w-full flex relative z-10 px-8">
            
            {/* Left: Narrative Text */}
            <div className="w-[45%] flex flex-col justify-center relative h-[60vh]">
              <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute top-1/2 w-full pr-12">
                <h2 className="text-[#E1E0CC] text-4xl font-medium mb-6">Built to Scale.</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  <strong className="text-white">Project Orchestrator:</strong> Map vendors dynamically, set milestone triggers, and automate your batch payments. We automatically calculate and hold TDS & GST so you don't have to.
                </p>
                <span className="text-primary font-medium flex items-center gap-2">
                  Outbound Cash Flow <ArrowRight size={16} />
                </span>
              </motion.div>

              <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute top-1/2 w-full pr-12">
                <h2 className="text-[#E1E0CC] text-4xl font-medium mb-6">Real Operational Intelligence.</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  <strong className="text-white">Live Visibility:</strong> Every vendor gets a unified view of incoming cash. Track pending approvals, processing payments, and settled amounts across all your clients instantly.
                </p>
                <span className="text-primary font-medium flex items-center gap-2">
                  Inbound Receivables <ArrowRight size={16} />
                </span>
              </motion.div>

              <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute top-1/2 w-full pr-12">
                <h2 className="text-[#E1E0CC] text-4xl font-medium mb-6">Expand Your Reach.</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  <strong className="text-white">The Verified Network:</strong> Connect with thousands of high-trust vendors across the Flow ecosystem. Look for the green shield to ensure KYC and GSTIN compliance before you even sign a contract.
                </p>
                <span className="text-primary font-medium flex items-center gap-2">
                  Vendor Discovery <ArrowRight size={16} />
                </span>
              </motion.div>
            </div>

            {/* Right: Floating UI Components */}
            <div className="w-[55%] relative flex justify-center items-center h-screen perspective-1000">
              
              {/* Card 1: Orchestrator UI */}
              <motion.div 
                style={{ y: card1Y, opacity: card1Opacity, rotateY: -15, rotateX: 5 }} 
                className="absolute w-[500px] z-10"
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, rotateY: 0, rotateX: 0 }}
                  className="flow-card p-6 bg-white/95 backdrop-blur-md border-[#e6ebf1] shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8792a2] mb-3">Automation Preview</h4>
                  <div className="mb-4">
                    <p className="text-[14px] font-medium text-[#0a2540]">When: Foundation Completion</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ArrowRight size={14} className="text-[#635bff]" />
                      <span className="text-sm text-[#425466]">Auto-pay <strong>₹2,45,000</strong> to UltraTech Cement</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 ml-5">
                      <span className="text-xs text-[#e25950] font-medium">Hold ₹5,000 for TDS (Sec 194C)</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#0a2540]">When: HVAC Installation</p>
                    <div className="flex items-center gap-2 mt-1">
                      <ArrowRight size={14} className="text-[#635bff]" />
                      <span className="text-sm text-[#425466]">Auto-pay <strong>₹1,76,400</strong> to CoolAir Solutions</span>
                    </div>
                  </div>
                  <button className="flow-btn flow-btn-primary w-full py-3 text-sm mt-6 group">
                    <span className="font-semibold group-hover:scale-105 transition-transform">Lock & Automate Payments</span>
                  </button>
                </motion.div>
              </motion.div>

              {/* Card 2: Ledger UI */}
              <motion.div 
                style={{ y: card2Y, opacity: card2Opacity, rotateY: -15, rotateX: 5 }} 
                className="absolute w-[550px] z-10"
              >
                 <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                    whileHover={{ scale: 1.05, rotateY: 0, rotateX: 0 }}
                    className="flow-card overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-white/95 backdrop-blur-md cursor-pointer"
                  >
                  <div className="p-4 border-b border-[#e6ebf1]">
                    <h3 className="font-bold text-[#0a2540]">Payment Ledger</h3>
                  </div>
                  <div className="p-0">
                    <div className="flex items-center justify-between p-4 border-b border-[#e6ebf1] bg-[#f6f9fc]/80 hover:bg-[#f6f9fc] transition-colors">
                      <div>
                        <p className="font-bold text-[#0a2540] text-sm">Lodha Group</p>
                        <p className="text-xs text-[#425466]">Foundation Complete</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#0a2540]">₹2,50,000</p>
                        <span className="flow-badge flow-badge-blue px-2 py-0.5 mt-1">Processing</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border-b border-[#e6ebf1] hover:bg-[#f6f9fc] transition-colors">
                      <div>
                        <p className="font-bold text-[#0a2540] text-sm">Prestige Estates</p>
                        <p className="text-xs text-[#425466]">HVAC Installation</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#0a2540]">₹1,80,000</p>
                        <span className="flow-badge flow-badge-orange px-2 py-0.5 mt-1">Pending</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-[#f6f9fc] transition-colors">
                      <div>
                        <p className="font-bold text-[#0a2540] text-sm">Brigade Group</p>
                        <p className="text-xs text-[#425466]">Electrical Setup</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#0a2540]">₹45,000</p>
                        <span className="flow-badge flow-badge-green px-2 py-0.5 mt-1">Settled</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Card 3: Network UI */}
              <motion.div 
                style={{ y: card3Y, opacity: card3Opacity, rotateY: -15, rotateX: 5 }} 
                className="absolute w-[400px] z-10"
              >
                <motion.div 
                  animate={{ y: [0, -12, 0] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.05, rotateY: 0, rotateX: 0 }}
                  className="flow-card p-6 bg-white/95 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl bg-blue-50 text-[#635bff]">
                      U
                    </div>
                    <div className="flex gap-1">
                      <div className="bg-[#00d924]/10 text-[#00a61b] p-1.5 rounded-full hover:scale-110 transition-transform">
                        <ShieldCheck size={16} />
                      </div>
                      <div className="bg-blue-50 text-[#635bff] p-1.5 rounded-full hover:scale-110 transition-transform">
                        <BadgeCheck size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-[#0a2540] mb-1">UltraTech Cement</h3>
                  <p className="text-[#635bff] text-sm font-medium mb-4">Raw Materials</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#425466]">
                      <MapPin size={14} className="text-[#8792a2]" /> Mumbai, MH
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#425466]">
                      <Star size={14} className="text-[#ffb800]" fill="#ffb800" /> 
                      <span className="font-medium text-[#0a2540]">4.9</span> 
                      <span className="text-[#8792a2]">(12 active projects)</span>
                    </div>
                  </div>

                  <button className="flow-btn flow-btn-secondary w-full border-[#635bff] text-[#635bff] hover:bg-[#635bff] hover:text-white transition-colors">
                    Add to My Vendors
                  </button>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Version */}
      <div className="block lg:hidden bg-black py-20 px-4 md:px-8 space-y-24">
        
        {/* Step 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 max-w-2xl mx-auto"
        >
          <div className="space-y-4">
            <h2 className="text-[#E1E0CC] text-3xl md:text-4xl font-medium">Built to Scale.</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              <strong className="text-white">Project Orchestrator:</strong> Map vendors dynamically, set milestone triggers, and automate your batch payments. We automatically calculate and hold TDS & GST so you don't have to.
            </p>
            <span className="text-primary font-medium flex items-center gap-2 text-sm">
              Outbound Cash Flow <ArrowRight size={14} />
            </span>
          </div>
          
          <div className="flex justify-center w-full mt-4">
            <div className="flow-card p-6 bg-white/95 backdrop-blur-md border-[#e6ebf1] shadow-[0_20px_40px_rgba(0,0,0,0.5)] w-full max-w-[500px]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8792a2] mb-3">Automation Preview</h4>
              <div className="mb-4">
                <p className="text-[14px] font-medium text-[#0a2540]">When: Foundation Completion</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <ArrowRight size={14} className="text-[#635bff] shrink-0" />
                  <span className="text-sm text-[#425466]">Auto-pay <strong>₹2,45,000</strong> to UltraTech Cement</span>
                </div>
                <div className="flex items-center gap-2 mt-1 ml-5">
                  <span className="text-xs text-[#e25950] font-medium">Hold ₹5,000 for TDS (Sec 194C)</span>
                </div>
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#0a2540]">When: HVAC Installation</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <ArrowRight size={14} className="text-[#635bff] shrink-0" />
                  <span className="text-sm text-[#425466]">Auto-pay <strong>₹1,76,400</strong> to CoolAir Solutions</span>
                </div>
              </div>
              <button className="flow-btn flow-btn-primary w-full py-3 text-sm mt-6">
                <span className="font-semibold">Lock & Automate Payments</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 max-w-2xl mx-auto"
        >
          <div className="space-y-4">
            <h2 className="text-[#E1E0CC] text-3xl md:text-4xl font-medium">Real Operational Intelligence.</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              <strong className="text-white">Live Visibility:</strong> Every vendor gets a unified view of incoming cash. Track pending approvals, processing payments, and settled amounts across all your clients instantly.
            </p>
            <span className="text-primary font-medium flex items-center gap-2 text-sm">
              Inbound Receivables <ArrowRight size={14} />
            </span>
          </div>

          <div className="flex justify-center w-full mt-4">
            <div className="flow-card overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-white/95 backdrop-blur-md w-full max-w-[500px]">
              <div className="p-4 border-b border-[#e6ebf1]">
                <h3 className="font-bold text-[#0a2540]">Payment Ledger</h3>
              </div>
              <div className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-[#e6ebf1] bg-[#f6f9fc]/80 hover:bg-[#f6f9fc] transition-colors">
                  <div>
                    <p className="font-bold text-[#0a2540] text-sm">Lodha Group</p>
                    <p className="text-xs text-[#425466]">Foundation Complete</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0a2540] text-sm">₹2,50,000</p>
                    <span className="flow-badge flow-badge-blue px-2 py-0.5 mt-1 inline-block">Processing</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border-b border-[#e6ebf1] hover:bg-[#f6f9fc] transition-colors">
                  <div>
                    <p className="font-bold text-[#0a2540] text-sm">Prestige Estates</p>
                    <p className="text-xs text-[#425466]">HVAC Installation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0a2540] text-sm">₹1,80,000</p>
                    <span className="flow-badge flow-badge-orange px-2 py-0.5 mt-1 inline-block">Pending</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-[#f6f9fc] transition-colors">
                  <div>
                    <p className="font-bold text-[#0a2540] text-sm">Brigade Group</p>
                    <p className="text-xs text-[#425466]">Electrical Setup</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0a2540] text-sm">₹45,000</p>
                    <span className="flow-badge flow-badge-green px-2 py-0.5 mt-1 inline-block">Settled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 max-w-2xl mx-auto"
        >
          <div className="space-y-4">
            <h2 className="text-[#E1E0CC] text-3xl md:text-4xl font-medium">Expand Your Reach.</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              <strong className="text-white">The Verified Network:</strong> Connect with thousands of high-trust vendors across the Flow ecosystem. Look for the green shield to ensure KYC and GSTIN compliance before you even sign a contract.
            </p>
            <span className="text-primary font-medium flex items-center gap-2 text-sm">
              Vendor Discovery <ArrowRight size={14} />
            </span>
          </div>

          <div className="flex justify-center w-full mt-4">
            <div className="flow-card p-6 bg-white/95 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] w-full max-w-[400px]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl bg-blue-50 text-[#635bff]">
                  U
                </div>
                <div className="flex gap-1">
                  <div className="bg-[#00d924]/10 text-[#00a61b] p-1.5 rounded-full">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="bg-blue-50 text-[#635bff] p-1.5 rounded-full">
                    <BadgeCheck size={16} />
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-[#0a2540] mb-1">UltraTech Cement</h3>
              <p className="text-[#635bff] text-sm font-medium mb-4">Raw Materials</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-[#425466]">
                  <MapPin size={14} className="text-[#8792a2]" /> Mumbai, MH
                </div>
                <div className="flex items-center gap-2 text-sm text-[#425466]">
                  <Star size={14} className="text-[#ffb800]" fill="#ffb800" /> 
                  <span className="font-medium text-[#0a2540]">4.9</span> 
                  <span className="text-[#8792a2]">(12 active projects)</span>
                </div>
              </div>

              <button className="flow-btn flow-btn-secondary w-full border-[#635bff] text-[#635bff]">
                Add to My Vendors
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
