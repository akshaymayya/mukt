import React, { useState } from 'react';
import { Plus, Trash2, ShieldCheck, ArrowRight, Building2, User, Landmark, Briefcase, FileCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProjectOrchestrator() {
  const [step, setStep] = useState(1);
  const [isAutomating, setIsAutomating] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [projectDetails, setProjectDetails] = useState({ name: '', client: '', budget: '' });
  const [vendors, setVendors] = useState([
    { id: '1', name: 'UltraTech Cement', role: 'Material Supplier', tdsRate: 2, bankDetails: 'HDFC •••• 4521' }
  ]);
  const [milestones, setMilestones] = useState([
    { id: '1', name: 'Foundation Completion', vendorId: '1', amount: '', status: 'Pending' }
  ]);

  const addVendor = () => {
    setVendors([...vendors, { id: Date.now().toString(), name: '', role: '', tdsRate: 0, bankDetails: '' }]);
  };

  const removeVendor = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  const updateVendor = (id, field, value) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now().toString(), name: '', vendorId: '', amount: '', status: 'Pending' }]);
  };

  const removeMilestone = (id) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const updateMilestone = (id, field, value) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleAutomate = () => {
    setIsAutomating(true);
    setTimeout(() => {
      setIsAutomating(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="bg-bg min-h-screen p-8 relative">
        <div className="absolute inset-0 bg-noise z-0"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flow-card p-12 flex flex-col items-center justify-center text-center mt-10 max-w-2xl mx-auto z-10 relative"
        >
          <div className="w-20 h-20 bg-[#00d924]/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,217,36,0.3)]">
            <CheckCircle2 size={40} className="text-[#00d924]" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Project Locked & Automated</h2>
          <p className="text-muted mb-8 text-lg">
            "{projectDetails.name || 'Your Project'}" has been securely written to the Flow infrastructure. 
            Bank instructions are primed and TDS deductions are configured.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="flow-btn flow-btn-secondary">Return to Hub</Link>
            <button className="flow-btn flow-btn-primary" onClick={() => setSuccess(false)}>Configure New Project</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen pb-20 relative">
      <div className="absolute inset-0 bg-noise z-0"></div>
      <header className="h-[64px] border-b border-stroke bg-surface/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between mb-8 sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-2 text-muted hover:text-text-primary font-medium transition-colors">
          <ArrowLeft size={18} />
          <span>Back to Hub</span>
        </Link>
        <div className="flex items-center gap-2">
          <img src="/floww-logo.png" alt="Floww" className="w-6 h-6 object-contain shrink-0" />
          <span className="font-bold text-lg text-text-primary tracking-tight hidden sm:block">Floww</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-text-primary">Project Payment Orchestrator</h1>
          <p className="text-muted text-base md:text-lg">Configure milestones, map vendors, and set up automated payouts with built-in compliance.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left Column: Forms */}
          <div className="flex-1 flex flex-col gap-6 md:gap-8">
            
            {/* Step 1: Project Details */}
            <section className="flow-card p-4 md:p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full accent-gradient"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-bg text-primary font-bold flex items-center justify-center border border-stroke shadow-[0_0_10px_rgba(137,170,204,0.2)]">1</div>
                <h2 className="text-xl font-bold text-text-primary">Project Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flow-input-group md:col-span-2">
                  <label className="flow-label">Project Name</label>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input 
                      type="text" 
                      className="flow-input w-full pl-10 bg-surface/50 backdrop-blur-sm" 
                      placeholder="e.g. Skyline Residency Phase 2" 
                      value={projectDetails.name}
                      onChange={(e) => setProjectDetails({...projectDetails, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flow-input-group">
                  <label className="flow-label">Total Allocated Budget (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-medium">₹</span>
                    <input 
                      type="number" 
                      className="flow-input w-full pl-8 bg-surface/50 backdrop-blur-sm" 
                      placeholder="5000000" 
                      value={projectDetails.budget}
                      onChange={(e) => setProjectDetails({...projectDetails, budget: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flow-input-group">
                  <label className="flow-label">Client Name</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input 
                      type="text" 
                      className="flow-input w-full pl-10 bg-surface/50 backdrop-blur-sm" 
                      placeholder="e.g. Lodha Group" 
                      value={projectDetails.client}
                      onChange={(e) => setProjectDetails({...projectDetails, client: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Vendor Mapping */}
            <section className="flow-card p-4 md:p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full accent-gradient"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-bg text-primary font-bold flex items-center justify-center border border-stroke shadow-[0_0_10px_rgba(137,170,204,0.2)]">2</div>
                  <h2 className="text-xl font-bold text-text-primary">Vendor & Supplier Mapping</h2>
                </div>
                <button className="flow-btn flow-btn-secondary !text-xs !py-1 w-full sm:w-auto" onClick={addVendor}>
                  <Plus size={14} /> Add Vendor
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {vendors.map((vendor) => (
                    <motion.div 
                      key={vendor.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 border border-stroke rounded-lg bg-surface/50 backdrop-blur-sm relative group/vendor"
                    >
                      {vendors.length > 1 && (
                        <button 
                          className="absolute right-3 top-3 text-muted hover:text-[#e25950] opacity-100 md:opacity-0 group-hover/vendor:opacity-100 transition-opacity"
                          onClick={() => removeVendor(vendor.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="flow-input-group sm:col-span-5 !mb-0">
                          <label className="flow-label text-xs">Vendor Entity Name</label>
                          <input type="text" className="flow-input !py-1.5 !text-sm" value={vendor.name} onChange={(e) => updateVendor(vendor.id, 'name', e.target.value)} placeholder="ABC Corp" />
                        </div>
                        <div className="flow-input-group sm:col-span-4 !mb-0">
                          <label className="flow-label text-xs">Role / Service</label>
                          <input type="text" className="flow-input !py-1.5 !text-sm" value={vendor.role} onChange={(e) => updateVendor(vendor.id, 'role', e.target.value)} placeholder="HVAC Contractor" />
                        </div>
                        <div className="flow-input-group sm:col-span-3 !mb-0">
                          <label className="flow-label text-xs">TDS Rate (%)</label>
                          <input type="number" className="flow-input !py-1.5 !text-sm" value={vendor.tdsRate} onChange={(e) => updateVendor(vendor.id, 'tdsRate', e.target.value)} placeholder="2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs bg-bg/50 border border-stroke p-2 rounded text-primary">
                <ShieldCheck size={14} className="shrink-0" />
                <span>Vendors undergo automatic KYC & GSTIN validation upon save.</span>
              </div>
            </section>

            {/* Step 3: Milestone Engine */}
            <section className="flow-card p-4 md:p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full accent-gradient"></div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-bg text-primary font-bold flex items-center justify-center border border-stroke shadow-[0_0_10px_rgba(137,170,204,0.2)]">3</div>
                  <h2 className="text-xl font-bold text-text-primary">Milestone Payment Rules</h2>
                </div>
                <button className="flow-btn flow-btn-secondary !text-xs !py-1 w-full sm:w-auto" onClick={addMilestone}>
                  <Plus size={14} /> Add Milestone
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {milestones.map((milestone, index) => (
                    <motion.div 
                      key={milestone.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-4 md:p-5 border border-stroke rounded-lg relative group/milestone bg-surface/50 backdrop-blur-sm"
                    >
                      {milestones.length > 1 && (
                        <button 
                          className="absolute right-3 top-3 text-muted hover:text-[#e25950] opacity-100 md:opacity-0 group-hover/milestone:opacity-100 transition-opacity"
                          onClick={() => removeMilestone(milestone.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      
                      <div className="flex gap-3 md:gap-4 items-start">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bg flex flex-col items-center justify-center shrink-0 border border-stroke mt-1 md:mt-0">
                          <span className="text-[10px] text-muted font-semibold uppercase leading-none">M</span>
                          <span className="font-bold text-text-primary leading-none mt-0.5">{index + 1}</span>
                        </div>
                        
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flow-input-group md:col-span-2 !mb-0">
                            <label className="flow-label text-xs">Milestone Trigger Condition</label>
                            <input type="text" className="flow-input !py-1.5 !text-sm font-medium" value={milestone.name} onChange={(e) => updateMilestone(milestone.id, 'name', e.target.value)} placeholder="e.g. 50% Plastering Completed" />
                          </div>
                          
                          <div className="flow-input-group !mb-0">
                            <label className="flow-label text-xs">Pay To (Vendor)</label>
                            <select 
                              className="flow-input !py-1.5 !text-sm" 
                              value={milestone.vendorId} 
                              onChange={(e) => updateMilestone(milestone.id, 'vendorId', e.target.value)}
                            >
                              <option value="">Select Vendor...</option>
                              {vendors.filter(v => v.name).map(v => (
                                <option key={v.id} value={v.id}>{v.name}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="flow-input-group !mb-0">
                            <label className="flow-label text-xs">Payment Amount (₹)</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">₹</span>
                              <input 
                                type="number" 
                                className="flow-input w-full pl-7 !py-1.5 !text-sm" 
                                value={milestone.amount} 
                                onChange={(e) => updateMilestone(milestone.id, 'amount', e.target.value)}
                                placeholder="250000" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </div>

          {/* Right Column: Summary & Actions */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="sticky top-24">
              <div className="flow-card p-6 mb-4">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-text-primary">
                  <FileCheck size={20} className="text-primary" /> Project Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-stroke pb-2">
                    <span className="text-muted text-sm">Total Budget</span>
                    <span className="font-bold text-lg text-text-primary">
                      ₹{projectDetails.budget ? parseInt(projectDetails.budget).toLocaleString() : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stroke pb-2">
                    <span className="text-muted text-sm">Milestones Allocated</span>
                    <span className="font-bold text-text-primary">
                      ₹{milestones.reduce((acc, curr) => acc + (parseInt(curr.amount) || 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-muted text-sm">Vendors Mapped</span>
                    <span className="font-bold text-text-primary">{vendors.filter(v => v.name).length}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-bg rounded-lg border border-stroke">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Automation Preview</h4>
                  {milestones.slice(0,2).map((m, i) => {
                    const vendor = vendors.find(v => v.id === m.vendorId);
                    if (!m.name || !m.amount || !vendor) return null;
                    
                    const amount = parseInt(m.amount);
                    const tds = (amount * (vendor.tdsRate || 0)) / 100;
                    const net = amount - tds;

                    return (
                      <div key={i} className="mb-3 last:mb-0">
                        <p className="text-[13px] font-medium text-text-primary truncate">When: {m.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <ArrowRight size={12} className="text-primary" />
                          <span className="text-xs text-muted">Auto-pay <strong>₹{net.toLocaleString()}</strong> to {vendor.name}</span>
                        </div>
                        {tds > 0 && (
                          <div className="flex items-center gap-2 mt-0.5 ml-5">
                            <span className="text-[10px] text-[#e25950] font-medium">Hold ₹{tds.toLocaleString()} for TDS (Sec 194C)</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <button 
                className="flow-btn flow-btn-primary w-full py-4 text-base relative overflow-hidden group"
                disabled={isAutomating}
                onClick={handleAutomate}
              >
                {isAutomating ? (
                  <span className="flex items-center gap-2 text-bg">
                    <svg className="animate-spin h-5 w-5 text-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Establishing Bank Link...
                  </span>
                ) : (
                  <>
                    <Landmark size={20} className="relative z-10" />
                    <span className="relative z-10 font-semibold">Lock & Automate Payments</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted mt-3">
                Requires Project Manager & Finance Head dual-approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
