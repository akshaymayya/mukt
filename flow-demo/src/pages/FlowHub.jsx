import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRightLeft, Network, Bell, LayoutDashboard, FileText, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FlowHub() {
  const activities = [
    { id: 1, type: 'inbound', text: 'Payment of ₹45,000 received from Lodha Group', time: '10 mins ago' },
    { id: 2, type: 'action', text: 'Milestone "Foundation Complete" requires your approval', time: '1 hour ago' },
    { id: 3, type: 'system', text: 'TDS Certificate Q3 generated for UltraTech Cement', time: '3 hours ago' },
    { id: 4, type: 'alert', text: 'Action Required: Vendor KYC failed for New Supplier', time: '1 day ago' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-bg overflow-hidden relative">
      <div className="absolute inset-0 bg-noise z-0"></div>
      
      {/* Sidebar - Minimal Nav */}
      <aside className="w-full md:w-[260px] h-[60px] md:h-auto shrink-0 bg-surface/50 backdrop-blur-xl border-b md:border-b-0 md:border-r border-stroke flex flex-row md:flex-col justify-between md:justify-start z-10 relative overflow-x-auto md:overflow-visible">
        <div className="p-4 md:p-6 flex items-center gap-2 md:border-b border-stroke shrink-0">
          <img src="/floww-logo.png" alt="Floww" className="w-8 h-8 object-contain shrink-0" />
          <span className="font-bold text-xl text-text-primary tracking-tight hidden md:block">Floww</span>
        </div>
        
        <div className="p-2 md:p-4 flex-1 flex md:block overflow-x-auto">
          <nav className="flex flex-row md:flex-col gap-1 items-center md:items-stretch whitespace-nowrap md:whitespace-normal">
            <NavItem icon={LayoutDashboard} label="Universal Hub" active />
            <NavItem icon={FileText} label="Reports" />
          </nav>
        </div>

        <div className="mt-auto p-2 md:p-4 md:border-t border-stroke shrink-0 flex items-center">
          <NavItem icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Hub Area */}
      <main className="flex-1 overflow-y-auto z-10 relative">
        <header className="h-[64px] border-b border-stroke bg-surface/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
          <h2 className="text-text-primary font-semibold text-sm md:text-base truncate mr-4">Workspace Select</h2>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-muted cursor-pointer hover:text-text-primary p-2 rounded-md hover:bg-bg transition-colors max-w-[150px] md:max-w-none truncate">
              <Building2 size={16} className="shrink-0" />
              <span className="truncate">Skyline Developers (India)</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-bg border border-stroke flex items-center justify-center font-medium text-text-primary">
              A
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Left Column: Workspaces */}
          <div className="flex-1">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-text-primary">What do you need to do today?</h1>
              <p className="text-muted text-base md:text-lg">Select your active workspace context.</p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Tile 1: Orchestrator */}
              <Link to="/orchestrator" className="block">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="flow-card p-6 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                    <ArrowRight className="text-primary" />
                  </div>
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4">
                    <Building2 className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Manage Outbound Payments</h3>
                  <p className="text-muted">Configure projects, map vendors, and orchestrate automated milestone payouts.</p>
                </motion.div>
              </Link>

              {/* Tile 2: Receivables */}
              <Link to="/receivables" className="block">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="flow-card p-6 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                    <ArrowRight className="text-[#00d924]" />
                  </div>
                  <div className="w-12 h-12 bg-[#00d924]/10 border border-[#00d924]/20 rounded-xl flex items-center justify-center mb-4">
                    <ArrowRightLeft className="text-[#00d924]" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Track Inbound Receivables</h3>
                  <p className="text-muted">View pending payments, track milestones you're assigned to, and see incoming cash flow.</p>
                </motion.div>
              </Link>

              {/* Tile 3: Network */}
              <Link to="/network" className="block">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="flow-card p-6 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                    <ArrowRight className="text-text-primary" />
                  </div>
                  <div className="w-12 h-12 bg-surface border border-stroke rounded-xl flex items-center justify-center mb-4">
                    <Network className="text-text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Network & Discovery</h3>
                  <p className="text-muted">Connect with verified KYC-approved vendors, suppliers, and clients within the Flow ecosystem.</p>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Right Column: Global Activity */}
          <div className="w-full lg:w-[350px] shrink-0">
            <div className="flow-card p-4 md:p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
                  <Bell size={20} className="text-muted" /> Global Pulse
                </h3>
                <span className="text-xs font-semibold bg-bg border border-stroke px-2 py-1 rounded text-muted">Live</span>
              </div>

              <div className="flex flex-col gap-5">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="shrink-0 mt-1">
                      {activity.type === 'inbound' && <div className="w-2 h-2 rounded-full bg-[#00d924] shadow-[0_0_8px_#00d924]"></div>}
                      {activity.type === 'action' && <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#89AACC]"></div>}
                      {activity.type === 'system' && <div className="w-2 h-2 rounded-full bg-[#ffb800]"></div>}
                      {activity.type === 'alert' && <div className="w-2 h-2 rounded-full bg-[#e25950]"></div>}
                    </div>
                    <div>
                      <p className={`text-sm ${activity.type === 'action' ? 'font-semibold text-text-primary' : 'text-muted'}`}>
                        {activity.text}
                      </p>
                      <p className="text-xs text-muted/70 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 text-sm font-medium text-primary hover:text-text-primary hover:bg-bg rounded transition-colors">
                View All Activity
              </button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active }) {
  return (
    <div className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 mx-1 md:mx-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${active ? 'bg-bg text-primary border border-stroke' : 'text-muted hover:bg-bg hover:text-text-primary border border-transparent'}`}>
      <Icon size={18} className="shrink-0" />
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}
