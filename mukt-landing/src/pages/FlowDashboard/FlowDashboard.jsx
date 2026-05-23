import React, { useState } from 'react';
import { LayoutDashboard, Layers, Users, FileText, Settings, Bell, Search, Plus, Menu, X } from 'lucide-react';
import './flow-theme.css';
import ProjectOrchestrator from './ProjectOrchestrator';

export default function FlowDashboard() {
  const [activeTab, setActiveTab] = useState('orchestrator');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flow-theme flow-layout">
      {/* Sidebar Backdrop (Mobile only) */}
      {isMenuOpen && (
        <div 
          className="flow-sidebar-backdrop lg:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`flow-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="p-6 flex items-center justify-between border-b border-[#e6ebf1]">
          <div className="flex items-center gap-2">
            <img src="/floww-logo.png" alt="Floww" className="w-8 h-8 object-contain shrink-0" />
            <span className="font-bold text-xl text-[#0a2540] tracking-tight">Floww</span>
          </div>
          {/* Close button for mobile */}
          <button 
            className="lg:hidden p-2 text-[#425466] hover:text-[#0a2540] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-xs font-semibold text-[#8792a2] uppercase tracking-wider mb-2 ml-4">Core</p>
          <nav className="flex flex-col gap-1">
            <NavItem 
              icon={Layers} 
              label="Payment Orchestrator" 
              active={activeTab === 'orchestrator'} 
              onClick={() => {
                setActiveTab('orchestrator');
                setIsMenuOpen(false);
              }} 
            />
            <NavItem 
              icon={LayoutDashboard} 
              label="Cash Flow Visibility" 
              active={activeTab === 'cashflow'} 
              onClick={() => {
                setActiveTab('cashflow');
                setIsMenuOpen(false);
              }} 
            />
            <NavItem 
              icon={Users} 
              label="Vendor Ledger" 
              active={activeTab === 'vendors'} 
              onClick={() => {
                setActiveTab('vendors');
                setIsMenuOpen(false);
              }} 
            />
          </nav>

          <p className="text-xs font-semibold text-[#8792a2] uppercase tracking-wider mt-8 mb-2 ml-4">Compliance</p>
          <nav className="flex flex-col gap-1">
            <NavItem 
              icon={FileText} 
              label="TDS & GST Reports" 
              active={activeTab === 'compliance'} 
              onClick={() => {
                setActiveTab('compliance');
                setIsMenuOpen(false);
              }} 
            />
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-[#e6ebf1]">
          <NavItem icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flow-main">
        {/* Top Header */}
        <header className="flow-header border-b border-[#e6ebf1]">
          <div className="flex items-center gap-4">
            {/* Hamburger Trigger for Mobile */}
            <button 
              className="lg:hidden p-2 -ml-2 text-[#425466] hover:text-[#0a2540] transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-2 text-[#8792a2] md:gap-4">
              <Search size={20} className="shrink-0" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-[14px] text-[#0a2540] w-[120px] sm:w-[200px] md:w-[300px]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="relative p-2 text-[#425466] hover:text-[#0a2540] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e25950] rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#e6ebf1] flex items-center justify-center font-medium text-[#0a2540] ml-1 sm:ml-2">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flow-content">
          {activeTab === 'orchestrator' && <ProjectOrchestrator />}
          {activeTab === 'cashflow' && (
            <div className="flex items-center justify-center h-[60vh] text-[#8792a2] flex-col gap-4">
              <LayoutDashboard size={48} className="opacity-50" />
              <p>Cash Flow Visibility Engine requires active project data. Complete orchestration first.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <div className={`flow-nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
}
