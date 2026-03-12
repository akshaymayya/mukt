import React, { useState, useEffect } from 'react';
import {
  TrendingDown,
  Map,
  Target,
  BadgeIndianRupee,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  CheckCircle2,
  Bell,
  Home,
  LogOut,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Building
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import logo from './assets/logo.png';
import './dashboard.css'; // We will create this

// --- MOCK DATA ---
const debtData = [
  { id: 1, name: 'HDFC Personal Loan', amount: 120000, rate: 22, minPayment: 4500, type: 'loan', icon: Building, color: '#3b82f6' },
  { id: 2, name: 'SBI Credit Card', amount: 45000, rate: 42, minPayment: 2250, type: 'card', icon: CreditCard, color: '#ef4444' },
  { id: 3, name: 'KreditBee App', amount: 30000, rate: 36, minPayment: 3000, type: 'app', icon: BadgeIndianRupee, color: '#f59e0b' }
];

const projectionData = [
  { month: 'Jan', current: 195000, optimized: 195000 },
  { month: 'Apr', current: 182000, optimized: 170000 },
  { month: 'Jul', current: 169000, optimized: 145000 },
  { month: 'Oct', current: 156000, optimized: 120000 },
  { month: 'Jan 25', current: 143000, optimized: 95000 },
  { month: 'Apr 25', current: 130000, optimized: 70000 },
  { month: 'Jul 25', current: 117000, optimized: 40000 },
  { month: 'Oct 25', current: 104000, optimized: 0 },
];

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'];

export default function DashboardApp({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLoanWarning, setShowLoanWarning] = useState(false);
  
  // Custom logic for the 60 click pop-up
  const [clickCount, setClickCount] = useState(0);
  const [showGoodTimes, setShowGoodTimes] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoanWarning(true);
    }, 15000); 
    return () => clearTimeout(timer);
  }, []);

  const handleGlobalClick = (e) => {
    // Only count if it's a button or an element inside a button, or a clickable div (nav item, card, etc)
    const isClickable = e.target.closest('button') || e.target.closest('.nav-item') || e.target.closest('.cursor-pointer') || e.target.closest('a');
    if (isClickable) {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount === 60) {
          setShowGoodTimes(true);
        }
        return newCount;
      });
    }
  };

  const totalDebt = debtData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalMinPayment = debtData.reduce((acc, curr) => acc + curr.minPayment, 0);
  const avgInterest = (debtData.reduce((acc, curr) => acc + (curr.rate * curr.amount), 0) / totalDebt).toFixed(1);

  return (
    <div className="flex dashboard-wrapper text-white min-h-screen bg-bg-primary font-sans" onClick={handleGlobalClick}>
      
      {/* Sidebar */}
      <aside className="sidebar flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-bg-secondary border-r border-border-light z-20 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8 p-6 pb-0">
          <img src={logo} alt="Mukt Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </div>

        <nav className="flex-col gap-2 flex-grow px-4">
          <NavItem icon={Home} label="Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={Map} label="Debt Map" active={activeTab === 'debt-map'} onClick={() => setActiveTab('debt-map')} />
          <NavItem icon={Target} label="Strategy Engine" active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} />
          <NavItem icon={PiggyBank} label="Found Money" active={activeTab === 'found-money'} onClick={() => setActiveTab('found-money')} />
        </nav>

        <div className="mt-auto m-4 glass-panel p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-accent-blue/20 flex items-center justify-center">
              <span className="font-bold text-accent-blue">RV</span>
            </div>
            <div>
              <p className="font-medium text-sm">Ravi Kumar</p>
              <p className="text-xs text-muted">Free Plan</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted hover:text-white w-full mt-4 transition-fast" onClick={onBack}>
            <LogOut size={16} /> Back to Home
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content flex-grow ml-64 p-8 min-h-screen relative">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in relative z-10">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Ravi</h2>
            <p className="text-muted">Here is your financial truth for today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="glass-panel p-2 rounded-full relative hover:scale-105 transition-fast">
              <Bell size={20} className="text-muted" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-[#ef4444] rounded-full"></span>
            </button>
            <button className="btn btn-primary bg-accent-primary text-black font-bold py-2 px-4 rounded-lg hover:shadow-glow transition-fast">Add Transaction</button>
          </div>
        </header>

        {/* Dynamic Content */}
        {activeTab === 'dashboard' && (
          <DashboardContent
            totalDebt={totalDebt}
            totalMinPayment={totalMinPayment}
            avgInterest={avgInterest}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'debt-map' && <DebtMap debtData={debtData} totalDebt={totalDebt} />}
        {activeTab === 'strategy' && <StrategyEngine />}
        {activeTab === 'found-money' && <FoundMoney />}

      </main>

      {/* Loan Trap Warning Modal */}
      {showLoanWarning && (
        <LoanTrapWarning onClose={() => setShowLoanWarning(false)} />
      )}
      
      {/* 60 Clicks Good Times Modal */}
      {showGoodTimes && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center px-4">
          <div className="bg-[#1a1d24] border border-accent-primary/50 text-center rounded-2xl p-8 max-w-md w-full animate-fade-in relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-primary to-accent-blue"></div>
            
            <div className="mx-auto w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary mb-6 shadow-glow">
              <TrendingUp size={32} />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 font-['Outfit']">Hold on tight!</h2>
            <p className="text-text-secondary mb-8 text-lg">
              The good times are coming soon... Our team is building the full platform.
            </p>
            
            <button 
              className="bg-white text-black font-bold py-3 px-8 rounded-xl w-full hover:bg-gray-200 transition-colors"
              onClick={() => setShowGoodTimes(false)}
            >
              Continue Exploring Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Components
function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <div 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-accent-primary/10 text-accent-primary font-medium' : 'text-muted hover:text-white hover:bg-white/5'}`} 
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}

function DashboardContent({ totalDebt, totalMinPayment, avgInterest, setActiveTab }) {
  return (
    <div className="animate-fade-in delay-100 relative z-10 w-full max-w-6xl mx-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all bg-[#1a1d24]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted uppercase tracking-wider">True Total Debt</p>
            <BadgeIndianRupee size={20} className="text-accent-primary" />
          </div>
          <p className="text-3xl font-bold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">₹{totalDebt.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 text-sm mt-3">
            <ArrowUpRight size={16} className="text-[#ef4444]" />
            <span className="text-[#ef4444] font-medium">+₹4,250</span>
            <span className="text-muted">interest added this month</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all bg-[#1a1d24]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted uppercase tracking-wider">Avg Interest Burning</p>
            <TrendingUp size={20} className="text-[#ef4444]" />
          </div>
          <p className="text-3xl font-bold font-['Outfit'] text-white">{avgInterest}%</p>
          <div className="flex items-center gap-1 text-sm mt-3">
            <span className="text-muted">Market avg is 14%. You are paying</span>
            <span className="text-[#ef4444] font-medium">highly!</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all bg-[#1a1d24]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted uppercase tracking-wider">Monthly Outflow</p>
            <CreditCard size={20} className="text-[#3b82f6]" />
          </div>
          <p className="text-3xl font-bold font-['Outfit'] text-white">₹{totalMinPayment.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 text-sm mt-3">
            <span className="text-muted">Minimums only.</span>
            <span className="text-accent-primary font-medium hover:underline cursor-pointer" onClick={() => setActiveTab('strategy')}>Optimize this</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Debt-Free Countdown */}
        <div className="col-span-2 glass-panel p-6 rounded-2xl border border-white/5 bg-[#1a1d24]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Journey to Zero</h3>
            <div className="bg-[#10b981]/20 text-[#10b981] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">On Track</div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8 bg-black/30 p-6 rounded-xl border border-white/5">
            <div>
              <p className="text-muted text-sm mb-1">Debt-Free Date</p>
              <p className="text-3xl font-bold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-blue">Oct 2025</p>
            </div>
            <div className="hidden sm:block h-12 w-px bg-white/10"></div>
            <div>
              <p className="text-muted text-sm mb-1">Time Remaining</p>
              <p className="text-xl font-medium text-white">1 yr 7 mos</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d094" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00d094" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCurr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} dx={-10} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(26, 29, 36, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '14px', padding: '4px 0' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
                />
                <Area type="monotone" dataKey="current" name="Minimums Only" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCurr)" />
                <Area type="monotone" dataKey="optimized" name="Mukt Optimized" stroke="#00d094" strokeWidth={3} fillOpacity={1} fill="url(#colorOpt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Center */}
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#1a1d24]/80 backdrop-blur-xl flex-grow">
            <h3 className="text-lg font-bold mb-4 text-white">Action Center</h3>

            <div className="p-5 rounded-xl bg-[#00d094]/10 border border-[#00d094]/20 relative overflow-hidden group hover:bg-[#00d094]/15 transition-all cursor-pointer mb-4">
              <div className="absolute -top-4 -right-4 p-2 opacity-10 group-hover:opacity-20 transition-all transform group-hover:scale-110 duration-500">
                <PiggyBank size={100} className="text-[#00d094]" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#10b981]/20 text-[#10b981] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">Found Money!</span>
                </div>
                <h4 className="font-bold text-xl mb-2 text-white">₹850 located</h4>
                <p className="text-sm text-gray-300 mb-5 leading-relaxed">You spent less on swiggy this week. Redirect it to KreditBee.</p>
                <button className="bg-[#00d094] text-black font-bold py-2.5 px-4 rounded-lg w-full hover:bg-[#00eaa6] transition-colors" onClick={() => setActiveTab('found-money')}>Review & Move</button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#f59e0b]">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-medium text-sm text-white">Review Strategy</h4>
                <p className="text-xs text-muted">SBI Card rate changed</p>
              </div>
              <ChevronRight size={16} className="ml-auto text-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Keeping other visual components simple for the demo integration
function DebtMap({ debtData, totalDebt }) {
  return (
    <div className="animate-fade-in delay-100 flex gap-8 w-full max-w-6xl mx-auto">
      <div className="flex-1 glass-panel p-8 rounded-2xl border border-white/5 bg-[#1a1d24]/80">
        <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-blue">The True Picture</h3>
        <p className="text-muted mb-8">Here is exactly what you owe and what it costs you.</p>

        <div className="flex flex-col gap-4 mb-8">
          {debtData.map((debt, index) => {
            const Icon = debt.icon;
            return (
              <div key={debt.id} className="flex items-center gap-6 p-5 rounded-xl border border-white/5 bg-black/20 hover:bg-black/40 transition-colors cursor-pointer group">
                <div className="h-14 w-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${debt.color}20`, color: debt.color }}>
                  <Icon size={28} />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg text-white mb-1">{debt.name}</h4>
                  <p className="text-sm text-muted">Min: ₹{debt.minPayment}/mo</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white mb-1">₹{debt.amount.toLocaleString()}</p>
                  <p className="text-sm font-medium" style={{ color: debt.rate > 30 ? '#ef4444' : debt.rate > 15 ? '#f59e0b' : '#10b981' }}>
                    {debt.rate}% APR
                  </p>
                </div>
                <div className="w-8 flex justify-end opacity-50 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-[450px] flex flex-col gap-6">
        <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#1a1d24]/80">
          <h3 className="font-bold mb-6 text-xl text-white">Debt Composition</h3>
          <div className="h-[250px] relative mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={debtData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="amount"
                  stroke="none"
                >
                  {debtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(26, 29, 36, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-white">₹{(totalDebt / 1000).toFixed(0)}k</span>
              <span className="text-sm text-muted mt-1">Total</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {debtData.map(d => (
              <div key={d.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-gray-300 font-medium">{d.name}</span>
                </div>
                <span className="font-bold text-white">{Math.round((d.amount / totalDebt) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel text-center p-8 rounded-2xl border border-white/5 bg-[#1a1d24]/80">
          <ShieldAlert size={40} className="text-[#f59e0b] mx-auto mb-4" />
          <h4 className="font-bold text-xl mb-3 text-white">Did you know?</h4>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">If you only pay minimums, your ₹45,000 SBI card will take 7 years to pay off and cost you ₹32,000 in interest.</p>
          <button className="bg-white text-black font-bold py-3 px-6 rounded-lg w-full hover:bg-gray-200 transition-colors">Fix This Now</button>
        </div>
      </div>
    </div>
  );
}

function StrategyEngine() {
  const [strategy, setStrategy] = useState('avalanche');

  return (
    <div className="animate-fade-in delay-100 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3 text-white">Choose Your Escape Plan</h2>
        <p className="text-muted text-lg">Mathematics vs Psychology. Pick what works for you.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        {/* Avalanche */}
        <div
          className={`glass-panel cursor-pointer transition-all duration-300 rounded-2xl p-8 bg-[#1a1d24]/80 ${strategy === 'avalanche' ? 'border-[#3b82f6] ring-2 ring-[#3b82f6]/50 transform scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border border-white/5 hover:border-white/20'}`}
          onClick={() => setStrategy('avalanche')}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="h-14 w-14 rounded-full bg-[#3b82f6]/20 text-[#3b82f6] flex items-center justify-center">
              <TrendingDown size={28} />
            </div>
            {strategy === 'avalanche' && <CheckCircle2 className="text-[#3b82f6]" size={28} />}
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">Avalanche Method</h3>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">Target highest interest rate first. Mathematically optimal to save the most money.</p>

          <div className="bg-black/30 rounded-xl p-5 space-y-4 border border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Total Interest Paid</span>
              <span className="font-bold text-[#00d094] text-lg">₹42,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Time to Freedom</span>
              <span className="font-bold text-white text-lg">19 Months</span>
            </div>
          </div>
        </div>

        {/* Snowball */}
        <div
          className={`glass-panel cursor-pointer transition-all duration-300 rounded-2xl p-8 bg-[#1a1d24]/80 ${strategy === 'snowball' ? 'border-[#8b5cf6] ring-2 ring-[#8b5cf6]/50 transform scale-[1.02] shadow-[0_0_30px_rgba(139,92,246,0.15)]' : 'border border-white/5 hover:border-white/20'}`}
          onClick={() => setStrategy('snowball')}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="h-14 w-14 rounded-full bg-white/10 text-white flex items-center justify-center">
              <Target size={28} />
            </div>
            {strategy === 'snowball' && <CheckCircle2 className="text-[#8b5cf6]" size={28} />}
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">Snowball Method</h3>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">Target smallest balance first. Builds psychological momentum with quick wins.</p>

          <div className="bg-black/30 rounded-xl p-5 space-y-4 border border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Total Interest Paid</span>
              <span className="font-bold text-[#ef4444] text-lg">₹51,200</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Time to Freedom</span>
              <span className="font-bold text-white text-lg">22 Months</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-10 text-center rounded-2xl relative overflow-hidden bg-[#1a1d24]/80 border border-white/5 min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#3b82f6]/5 pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4 text-white">Your personalized attack plan</h3>
          <p className="text-gray-400 mb-8 text-lg">Based on the <strong>{strategy === 'avalanche' ? 'Avalanche' : 'Snowball'}</strong> strategy, here is exactly what you need to do this month:</p>

          <div className="bg-black/50 rounded-2xl p-8 inline-block text-left border border-white/10 mx-auto min-w-[500px]">
            <ol className="space-y-6 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10 z-0"></div>
              <li className="flex items-center gap-6 relative z-10">
                <div className="h-9 w-9 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold text-base shadow-lg shadow-[#3b82f6]/20">1</div>
                <div>
                  <p className="font-medium text-white text-lg">Pay min to HDFC</p>
                  <p className="text-[#3b82f6] font-bold">₹4,500</p>
                </div>
              </li>
              <li className="flex items-center gap-6 relative z-10">
                <div className="h-9 w-9 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold text-base shadow-lg shadow-[#3b82f6]/20">2</div>
                <div>
                  <p className="font-medium text-white text-lg">Pay min to {strategy === 'avalanche' ? 'KreditBee' : 'SBI Card'}</p>
                  <p className="text-[#3b82f6] font-bold">{strategy === 'avalanche' ? '₹3,000' : '₹2,250'}</p>
                </div>
              </li>
              <li className="flex items-center gap-6 relative z-10 mt-8 pt-6 border-t border-white/10">
                <div className="h-10 w-10 rounded-full bg-[#00d094] text-black flex items-center justify-center font-bold text-lg ring-4 ring-[#1a1d24] shadow-[0_0_15px_rgba(0,208,148,0.4)] z-10 -ml-0.5"><ArrowDownRight size={20} /></div>
                <div>
                  <p className="font-bold text-white text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#00d094] to-[#00eaa6]">Blast {strategy === 'avalanche' ? 'SBI Card' : 'KreditBee'}</p>
                  <p className="text-gray-300 font-medium text-base mt-2 bg-black/30 py-1.5 px-3 rounded-lg inline-block">All remaining cash (₹{strategy === 'avalanche' ? '2,250' : '3,000'} + ₹850 extra)</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-10">
            <button className="bg-[#3b82f6] text-white font-bold py-4 px-10 rounded-xl text-lg hover:bg-[#2563eb] transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">Commit to this Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoundMoney() {
  return (
    <div className="animate-fade-in delay-100 max-w-4xl mx-auto w-full">
      <div className="glass-panel border-[#00d094]/30 mb-10 overflow-hidden relative rounded-2xl bg-gradient-to-br from-[#1a1d24] to-[#00d094]/5">
        <div className="absolute -top-10 -right-10 p-8 opacity-5">
          <PiggyBank size={300} />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <div className="bg-[#10b981]/20 text-[#10b981] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">AI Scan Complete</div>
          <h2 className="text-4xl font-bold mb-4 text-white">We found <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d094] to-[#00eaa6]">₹1,450</span> for you.</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">We securely analyzed your UPI transactions over the last 30 days. Here is money you didn't know you had.</p>

          <button className="bg-[#00d094] text-black font-bold py-4 px-10 rounded-xl text-lg hover:bg-[#00eaa6] transition-colors shadow-[0_0_20px_rgba(0,208,148,0.3)] hover:shadow-[0_0_30px_rgba(0,208,148,0.5)] transform hover:-translate-y-1">
            Apply ₹1,450 to Debt Now
          </button>
        </div>
      </div>

      <h3 className="font-bold text-2xl mb-6 text-white px-2">Where did this come from?</h3>

      <div className="space-y-4">
        <div className="glass-panel flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-[#1a1d24]/80 hover:bg-[#1f232b] transition-colors">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center shrink-0">
              <CreditCard size={32} />
            </div>
            <div>
              <h4 className="font-bold text-xl text-white mb-1">Forgotten Subscription</h4>
              <p className="text-gray-400 text-base">Netflix Standard - Not used in 45 days</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="font-bold text-2xl text-[#00d094]">+₹499</span>
            <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-5 rounded-lg text-sm transition-colors border border-white/10">Cancel This</button>
          </div>
        </div>

        <div className="glass-panel flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-[#1a1d24]/80 hover:bg-[#1f232b] transition-colors">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <TrendingDown size={32} />
            </div>
            <div>
              <h4 className="font-bold text-xl text-white mb-1">Under-budget on Food Delivery</h4>
              <p className="text-gray-400 text-base">Swiggy/Zomato drop compared to 3-month avg</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="font-bold text-2xl text-[#00d094]">+₹951</span>
            <button className="bg-white/5 text-gray-500 font-medium py-2 px-5 rounded-lg text-sm border border-transparent cursor-default">Auto-Detected</button>
          </div>
        </div>
      </div>

    </div>
  )
}

function LoanTrapWarning({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="bg-[#1a1d24] border border-[#ef4444]/30 animate-fade-in text-center relative overflow-hidden rounded-2xl max-w-lg w-full p-8 shadow-2xl my-auto">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ef4444] to-[#f97316]"></div>

        <div className="mx-auto w-20 h-20 rounded-full bg-[#ef4444]/10 flex flex-col items-center justify-center text-[#ef4444] mb-8 shrink-0 shadow-[0_0_30px_rgba(239,68,68,0.15)] ring-4 ring-[#ef4444]/10">
          <ShieldAlert size={40} />
        </div>

        <h2 className="text-3xl font-bold mb-3 text-white">Wait, Ravi. Stop.</h2>
        <p className="text-gray-300 mb-8 leading-relaxed text-base px-2">
          We noticed you're looking at taking a new <strong>₹15,000</strong> loan from <i>MoneyTap</i>. Before you click accept, let us show you the real cost.
        </p>

        <div className="bg-black/40 rounded-xl p-6 mb-8 text-left border border-white/5 shadow-inner">
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-400 font-medium">On Screen it says</span>
            <span className="font-medium line-through opacity-70 text-gray-500">3% interest</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-[#ef4444] font-bold tracking-wide uppercase">True Cost (APR)</span>
            <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] to-[#f97316]">36% + Fees</span>
          </div>
          <div className="h-px w-full bg-white/10 my-4"></div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium">If you borrow ₹15,000 you repay</span>
            <span className="font-bold text-xl text-white">₹19,250</span>
          </div>
        </div>

        <p className="text-[#f59e0b] font-medium text-base mb-8 px-4 bg-[#f59e0b]/10 py-3 rounded-lg border border-[#f59e0b]/20">
          This will add another ₹1,400 to your monthly minimum payments, breaking your optimized strategy.
        </p>

        <div className="flex flex-col gap-4">
          <button className="bg-[#ef4444] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#dc2626] transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)] w-full" onClick={onClose}>
            Don't take the loan. Stick to the plan.
          </button>
          <button className="text-gray-400 font-medium hover:text-white transition-colors py-2 text-sm" onClick={onClose}>
            I have no choice, I need it for rent
          </button>
        </div>
      </div>
    </div>
  )
}
