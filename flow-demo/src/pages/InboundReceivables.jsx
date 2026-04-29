import React from 'react';
import { ArrowLeft, ArrowDownToLine, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InboundReceivables() {
  const receivables = [
    { id: 1, client: 'Lodha Group', project: 'Skyline Residency Phase 2', milestone: 'Foundation Complete', amount: 250000, status: 'Processing', date: 'Expected Tomorrow' },
    { id: 2, client: 'Prestige Estates', project: 'Prestige Tech Park', milestone: 'HVAC Installation', amount: 180000, status: 'Pending Approval', date: 'In 5 Days' },
    { id: 3, client: 'Brigade Group', project: 'Brigade Gateway', milestone: 'Electrical Setup', amount: 45000, status: 'Settled', date: 'Received Yesterday' },
    { id: 4, client: 'Puravankara', project: 'Purva Windermere', milestone: 'Material Delivery', amount: 320000, status: 'Action Required', date: 'Overdue by 2 Days' },
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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-text-primary">Inbound Receivables</h1>
            <p className="text-muted text-base md:text-lg">Track all incoming payments linked to your completed milestones.</p>
          </div>
          <button className="flow-btn flow-btn-secondary w-full sm:w-auto">
            <ArrowDownToLine size={16} /> Export CSV
          </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="flow-card p-5 md:p-6 border-l-4 border-l-[#ffb800]">
            <p className="text-xs md:text-sm font-semibold text-muted uppercase tracking-wider mb-2">Total Pending</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">₹5,00,000</h2>
            <p className="text-xs md:text-sm text-muted mt-2">Expected within 7 days</p>
          </div>
          <div className="flow-card p-5 md:p-6 border-l-4 border-l-[#89AACC]">
            <p className="text-xs md:text-sm font-semibold text-muted uppercase tracking-wider mb-2">Processing Now</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">₹2,50,000</h2>
            <p className="text-xs md:text-sm text-muted mt-2">Hitting your bank shortly</p>
          </div>
          <div className="flow-card p-5 md:p-6 border-l-4 border-l-[#00d924] sm:col-span-2 lg:col-span-1">
            <p className="text-xs md:text-sm font-semibold text-muted uppercase tracking-wider mb-2">Settled This Month</p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">₹45,000</h2>
            <p className="text-xs md:text-sm text-[#00d924] font-medium mt-2">+12% vs last month</p>
          </div>
        </div>

        {/* Ledger */}
        <div className="flow-card overflow-hidden">
          <div className="p-4 md:p-6 border-b border-stroke bg-surface">
            <h3 className="font-bold text-lg text-text-primary">Payment Ledger</h3>
          </div>
          <div className="overflow-x-auto bg-surface/50 backdrop-blur-sm pb-2">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-bg text-muted text-xs uppercase tracking-wider font-semibold border-b border-stroke">
                  <th className="p-4 pl-4 md:pl-6">Client / Project</th>
                  <th className="p-4">Linked Milestone</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-4 md:pr-6 text-right">Expected Date</th>
                </tr>
              </thead>
              <tbody>
                {receivables.map((item) => (
                  <tr key={item.id} className="border-b border-stroke hover:bg-bg/50 transition-colors">
                    <td className="p-4 pl-4 md:pl-6">
                      <p className="font-bold text-text-primary">{item.client}</p>
                      <p className="text-xs text-muted mt-1">{item.project}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-muted">{item.milestone}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-text-primary">₹{item.amount.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="p-4 pr-4 md:pr-6 text-right text-sm font-medium text-muted">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let colorClass = '';
  let Icon = Clock;

  if (status === 'Processing') {
    colorClass = 'flow-badge-blue';
  } else if (status === 'Pending Approval') {
    colorClass = 'flow-badge-orange';
  } else if (status === 'Settled') {
    colorClass = 'flow-badge-green';
    Icon = CheckCircle2;
  } else if (status === 'Action Required') {
    colorClass = 'bg-[#e25950]/10 text-[#e25950]';
    Icon = AlertCircle;
  }

  return (
    <span className={`flow-badge ${colorClass} inline-flex gap-1.5 px-2.5 py-1`}>
      <Icon size={14} /> {status}
    </span>
  );
}
