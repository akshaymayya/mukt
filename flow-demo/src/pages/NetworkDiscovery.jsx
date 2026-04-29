import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, ShieldCheck, MapPin, Star, BadgeCheck, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NetworkDiscovery() {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    { id: 1, name: 'UltraTech Cement', category: 'Raw Materials', location: 'Mumbai, MH', rating: 4.9, verified: true, gstin: true, activeProjects: 12, logo: '/logos/ultratech.png' },
    { id: 2, name: 'CoolAir HVAC Solutions', category: 'MEP Services', location: 'Bengaluru, KA', rating: 4.7, verified: true, gstin: true, activeProjects: 4, logo: '/logos/coolair.png' },
    { id: 3, name: 'FastTrack Logistics', category: 'Transportation', location: 'Delhi, DL', rating: 4.5, verified: true, gstin: false, activeProjects: 8, logo: '/logos/fasttrack.png' },
    { id: 4, name: 'BuildRight Contractors', category: 'Civil Engineering', location: 'Pune, MH', rating: 4.8, verified: true, gstin: true, activeProjects: 3, logo: '/logos/buildright.png' },
    { id: 5, name: 'SteelMax India', category: 'Raw Materials', location: 'Chennai, TN', rating: 4.6, verified: true, gstin: true, activeProjects: 15, logo: '/logos/steelmax.png' },
    { id: 6, name: 'Urban Landscapers', category: 'Landscaping', location: 'Hyderabad, TS', rating: 4.4, verified: false, gstin: false, activeProjects: 1, logo: '/logos/urban.png' },
  ];

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
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-text-primary">Network & Discovery</h1>
            <p className="text-muted text-base md:text-lg">Find, verify, and connect with trusted vendors across the Flow ecosystem.</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flow-card p-3 md:p-4 mb-6 md:mb-8 flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-3 bg-bg border border-stroke rounded-lg text-text-primary outline-none focus:border-primary transition-colors text-sm md:text-base"
              placeholder="Search by vendor name, service, or GSTIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flow-btn flow-btn-secondary w-full sm:w-auto px-6 py-3 sm:py-2">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {vendors.map(vendor => (
            <div key={vendor.id} className="flow-card p-5 md:p-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden border border-stroke bg-bg p-1">
                  <img src={vendor.logo} alt={`${vendor.name} logo`} className="w-full h-full object-contain filter invert opacity-80" />
                </div>
                {vendor.verified && (
                  <div className="flex gap-1">
                    <div className="bg-[#00d924]/10 text-[#00d924] p-1 md:p-1.5 rounded-full tooltip-trigger border border-[#00d924]/20 shadow-[0_0_8px_rgba(0,217,36,0.1)]" title="KYC Verified">
                      <ShieldCheck size={14} className="md:w-4 md:h-4" />
                    </div>
                    {vendor.gstin && (
                      <div className="bg-primary/10 text-primary p-1 md:p-1.5 rounded-full tooltip-trigger border border-primary/20 shadow-[0_0_8px_rgba(137,170,204,0.1)]" title="GSTIN Verified">
                        <BadgeCheck size={14} className="md:w-4 md:h-4" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <h3 className="font-bold text-base md:text-lg text-text-primary mb-1">{vendor.name}</h3>
              <p className="text-primary text-xs md:text-sm font-medium mb-4">{vendor.category}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted">
                  <MapPin size={14} className="text-muted/70 shrink-0" /> <span className="truncate">{vendor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted">
                  <Star size={14} className="text-[#ffb800] shrink-0" fill="#ffb800" /> 
                  <span className="font-medium text-text-primary">{vendor.rating}</span> 
                  <span className="text-muted/70 truncate">({vendor.activeProjects} projects)</span>
                </div>
              </div>

              <button className="flow-btn flow-btn-secondary w-full py-2.5 md:py-2 text-sm">
                <Plus size={16} /> Add to My Vendors
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
