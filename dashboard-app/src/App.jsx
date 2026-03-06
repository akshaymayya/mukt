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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLoanWarning, setShowLoanWarning] = useState(false);

  // Triggering behavior simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoanWarning(true);
    }, 15000); // Show warning after 15 seconds to simulate detecting risky behavior
    return () => clearTimeout(timer);
  }, []);

  const totalDebt = debtData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalMinPayment = debtData.reduce((acc, curr) => acc + curr.minPayment, 0);
  const avgInterest = (debtData.reduce((acc, curr) => acc + (curr.rate * curr.amount), 0) / totalDebt).toFixed(1);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="flex items-center gap-2 mb-8" style={{ padding: '0 16px' }}>
          <img src={logo} alt="Mukt Logo" style={{ width: '120px', height: 'auto', maxHeight: '48px', objectFit: 'contain' }} />
        </div>

        <nav className="flex-col gap-2 flex-grow">
          <NavItem icon={Home} label="Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={Map} label="Debt Map" active={activeTab === 'debt-map'} onClick={() => setActiveTab('debt-map')} />
          <NavItem icon={Target} label="Strategy Engine" active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} />
          <NavItem icon={PiggyBank} label="Found Money" active={activeTab === 'found-money'} onClick={() => setActiveTab('found-money')} />
        </nav>

        <div className="mt-auto glass-panel p-4" style={{ padding: '16px' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-accent-blue/20 flex items-center justify-center">
              <span className="font-bold text-accent-blue">RV</span>
            </div>
            <div>
              <p className="font-medium text-sm">Ravi Kumar</p>
              <p className="text-xs text-muted">Free Plan</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted hover:text-white w-full mt-4 transition-fast">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Ravi</h2>
            <p className="text-muted">Here is your financial truth for today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="glass-panel p-2 rounded-full relative hover:scale-105 transition-fast">
              <Bell size={20} className="text-text-secondary" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-accent-danger rounded-full"></span>
            </button>
            <button className="btn btn-primary">Add Transaction</button>
          </div>
        </header>

        {/* Dynamic Content */}
        {activeTab === 'dashboard' && (
          <Dashboard
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
    </div>
  );
}

// Components
function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}

function Dashboard({ totalDebt, totalMinPayment, avgInterest, setActiveTab }) {
  return (
    <div className="animate-fade-in delay-100">
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="glass-panel stat-card glow-on-hover transition-normal">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted uppercase tracking-wider">True Total Debt</p>
            <BadgeIndianRupee size={20} className="text-accent-primary" />
          </div>
          <p className="stat-value text-gradient">₹{totalDebt.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 text-sm mt-2">
            <ArrowUpRight size={16} className="text-accent-danger" />
            <span className="text-accent-danger font-medium">+₹4,250</span>
            <span className="text-muted">interest added this month</span>
          </div>
        </div>

        <div className="glass-panel stat-card glow-on-hover transition-normal">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted uppercase tracking-wider">Avg Interest Burning</p>
            <TrendingUp size={20} className="text-accent-danger" />
          </div>
          <p className="stat-value">{avgInterest}%</p>
          <div className="flex items-center gap-1 text-sm mt-2">
            <span className="text-muted">Market avg is 14%. You are paying</span>
            <span className="text-accent-danger font-medium">highly!</span>
          </div>
        </div>

        <div className="glass-panel stat-card glow-on-hover transition-normal">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted uppercase tracking-wider">Monthly Outflow</p>
            <CreditCard size={20} className="text-accent-blue" />
          </div>
          <p className="stat-value">₹{totalMinPayment.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 text-sm mt-2">
            <span className="text-muted">Minimums only.</span>
            <span className="text-accent-primary font-medium hover:underline cursor-pointer" onClick={() => setActiveTab('strategy')}>Optimize this</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Debt-Free Countdown */}
        <div className="col-span-2 glass-panel">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Journey to Zero</h3>
            <div className="badge badge-success">On Track</div>
          </div>

          <div className="flex items-center gap-8 mb-6 bg-black/20 p-6 rounded-lg border border-white/5">
            <div>
              <p className="text-muted text-sm mb-1">Debt-Free Date</p>
              <p className="text-3xl font-bold font-['Outfit'] text-gradient">Oct 2025</p>
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div>
              <p className="text-muted text-sm mb-1">Time Remaining</p>
              <p className="text-xl font-medium">1 yr 7 mos</p>
            </div>
          </div>

          <div className="chart-container" style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCurr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(26, 29, 36, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="current" name="Minimums Only" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCurr)" />
                <Area type="monotone" dataKey="optimized" name="Mukt Optimized" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorOpt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Center */}
        <div className="glass-panel flex flex-col gap-4">
          <h3 className="text-lg font-bold mb-2">Action Center</h3>

          <div className="p-4 rounded-lg bg-accent-primary/10 border border-accent-primary/20 relative overflow-hidden group hover:bg-accent-primary/15 transition-fast cursor-pointer">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-fast group-hover:scale-110">
              <PiggyBank size={64} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-success">Found Money!</span>
              </div>
              <h4 className="font-bold text-lg mb-1">₹850 located</h4>
              <p className="text-sm text-text-secondary mb-4">You spent less on swiggy this week. Redirect it to KreditBee.</p>
              <button className="btn btn-primary btn-sm py-2 px-4 text-xs w-full" onClick={() => setActiveTab('found-money')}>Review & Move</button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-fast cursor-pointer flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-accent-warning/20 flex items-center justify-center text-accent-warning">
              <Target size={20} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Review Strategy</h4>
              <p className="text-xs text-muted">SBI Card rate changed</p>
            </div>
            <ChevronRight size={16} className="ml-auto text-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DebtMap({ debtData, totalDebt }) {
  return (
    <div className="animate-fade-in delay-100 flex gap-8">
      <div className="flex-1 glass-panel">
        <h3 className="text-xl font-bold mb-1 text-gradient">The True Picture</h3>
        <p className="text-muted mb-6">Here is exactly what you owe and what it costs you.</p>

        <div className="flex flex-col gap-2 mb-8">
          {debtData.map((debt, index) => {
            const Icon = debt.icon;
            return (
              <div key={debt.id} className="loan-item glass-panel" style={{ padding: '16px', boxShadow: 'none' }}>
                <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${debt.color}20`, color: debt.color }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{debt.name}</h4>
                  <p className="text-sm text-muted">Min: ₹{debt.minPayment}/mo</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{debt.amount.toLocaleString()}</p>
                  <p className="text-sm font-medium" style={{ color: debt.rate > 30 ? '#ef4444' : debt.rate > 15 ? '#f59e0b' : '#10b981' }}>
                    {debt.rate}% APR
                  </p>
                </div>
                <button className="btn btn-secondary !p-2 !rounded-lg"><ChevronRight size={20} /></button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-[400px] flex flex-col gap-6">
        <div className="glass-panel">
          <h3 className="font-bold mb-4">Debt Composition</h3>
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={debtData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {debtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(26, 29, 36, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-bold">₹{(totalDebt / 1000).toFixed(0)}k</span>
              <span className="text-xs text-muted">Total</span>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {debtData.map(d => (
              <div key={d.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                  <span className="text-text-secondary">{d.name}</span>
                </div>
                <span className="font-medium">{Math.round((d.amount / totalDebt) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel text-center p-6">
          <ShieldAlert size={32} className="text-accent-warning mx-auto mb-3" />
          <h4 className="font-bold mb-2">Did you know?</h4>
          <p className="text-sm text-text-secondary mb-4">If you only pay minimums, your ₹45,000 SBI card will take 7 years to pay off and cost you ₹32,000 in interest.</p>
          <button className="btn btn-primary w-full shadow-glow">Fix This Now</button>
        </div>
      </div>
    </div>
  );
}

function StrategyEngine() {
  const [strategy, setStrategy] = useState('avalanche');

  return (
    <div className="animate-fade-in delay-100 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Escape Plan</h2>
        <p className="text-muted text-lg">Mathematics vs Psychology. Pick what works for you.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Avalanche */}
        <div
          className={`glass-panel cursor-pointer transition-all ${strategy === 'avalanche' ? 'border-accent-primary ring-1 ring-accent-primary transform scale-[1.02]' : 'hover:border-white/20'}`}
          onClick={() => setStrategy('avalanche')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <TrendingDown size={24} />
            </div>
            {strategy === 'avalanche' && <CheckCircle2 className="text-accent-primary" size={24} />}
          </div>
          <h3 className="text-xl font-bold mb-2">Avalanche Method</h3>
          <p className="text-sm text-muted mb-6">Target highest interest rate first. Mathematically optimal.</p>

          <div className="bg-black/20 rounded-lg p-4 space-y-3 border border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Total Interest Paid</span>
              <span className="font-bold text-accent-primary">₹42,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Time to Freedom</span>
              <span className="font-bold">19 Months</span>
            </div>
          </div>
        </div>

        {/* Snowball */}
        <div
          className={`glass-panel cursor-pointer transition-all ${strategy === 'snowball' ? 'border-accent-primary ring-1 ring-accent-primary transform scale-[1.02]' : 'hover:border-white/20'}`}
          onClick={() => setStrategy('snowball')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center">
              <Target size={24} />
            </div>
            {strategy === 'snowball' && <CheckCircle2 className="text-accent-primary" size={24} />}
          </div>
          <h3 className="text-xl font-bold mb-2">Snowball Method</h3>
          <p className="text-sm text-muted mb-6">Target smallest balance first. Builds psychological momentum.</p>

          <div className="bg-black/20 rounded-lg p-4 space-y-3 border border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Total Interest Paid</span>
              <span className="font-bold text-accent-danger">₹51,200</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Time to Freedom</span>
              <span className="font-bold">22 Months</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 text-center bg-gradient-to-br from-bg-glass to-accent-primary/5">
        <h3 className="text-xl font-bold mb-4">Your personalized attack plan</h3>
        <p className="text-muted mb-6">Based on the <strong>{strategy === 'avalanche' ? 'Avalanche' : 'Snowball'}</strong> strategy, here is exactly what you need to do this month:</p>

        <div className="bg-black/40 rounded-xl p-6 inline-block text-left border border-white/10 mx-auto min-w-[300px]">
          <ol className="space-y-4 relative">
            <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/10 z-0"></div>
            <li className="flex items-center gap-4 relative z-10">
              <div className="h-7 w-7 rounded-full bg-accent-primary text-black flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <p className="font-medium text-white">Pay min to HDFC</p>
                <p className="text-accent-primary font-bold text-sm">₹4,500</p>
              </div>
            </li>
            <li className="flex items-center gap-4 relative z-10">
              <div className="h-7 w-7 rounded-full bg-accent-primary text-black flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <p className="font-medium text-white">Pay min to {strategy === 'avalanche' ? 'KreditBee' : 'SBI Card'}</p>
                <p className="text-accent-primary font-bold text-sm">{strategy === 'avalanche' ? '₹3,000' : '₹2,250'}</p>
              </div>
            </li>
            <li className="flex items-center gap-4 relative z-10">
              <div className="h-7 w-7 rounded-full bg-accent-blue text-white flex items-center justify-center font-bold text-sm ring-4 ring-bg-secondary"><ArrowDownRight size={14} /></div>
              <div>
                <p className="font-medium text-white text-lg">Blast {strategy === 'avalanche' ? 'SBI Card' : 'KreditBee'}</p>
                <p className="text-accent-blue font-bold text-sm">All remaining cash (₹{strategy === 'avalanche' ? '2,250' : '3,000'} + ₹850 extra)</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-8">
          <button className="btn btn-primary text-lg px-8 py-3">Commit to this Plan</button>
        </div>
      </div>
    </div>
  );
}

function FoundMoney() {
  return (
    <div className="animate-fade-in delay-100 max-w-4xl mx-auto">
      <div className="glass-panel border-accent-primary/30 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <PiggyBank size={120} />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <div className="badge badge-success mb-4">AI Scan Complete</div>
          <h2 className="text-3xl font-bold mb-2">We found <span className="text-accent-primary">₹1,450</span> for you.</h2>
          <p className="text-text-secondary max-w-md mx-auto mb-6">We securely analyzed your UPI transactions over the last 30 days. Here is money you didn't know you had.</p>

          <button className="btn btn-primary shadow-glow px-8 py-3 text-lg">
            Apply ₹1,450 to Debt Now
          </button>
        </div>
      </div>

      <h3 className="font-bold text-xl mb-4">Where did this come from?</h3>

      <div className="space-y-4">
        <div className="glass-panel flex items-center justify-between !p-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[#E50914]/10 text-[#E50914] flex items-center justify-center">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Forgotten Subscription</h4>
              <p className="text-sm text-muted">Netflix Standard - Not used in 45 days</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-bold text-xl text-accent-primary">+₹499</span>
            <button className="btn btn-secondary !py-2 !px-4 text-xs">Cancel This</button>
          </div>
        </div>

        <div className="glass-panel flex items-center justify-between !p-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <TrendingDown size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Under-budget on Food Delivery</h4>
              <p className="text-sm text-muted">Swiggy/Zomato drop compared to 3-month avg</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-bold text-xl text-accent-primary">+₹951</span>
            <button className="btn btn-secondary !py-2 !px-4 text-xs opacity-50 cursor-default">Auto-Detected</button>
          </div>
        </div>
      </div>

    </div>
  )
}

function LoanTrapWarning({ onClose }) {
  return (
    <div className="overlay">
      <div className="modal animate-fade-in text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-accent-danger"></div>

        <div className="mx-auto w-16 h-16 rounded-full bg-accent-danger/20 flex flex-col items-center justify-center text-accent-danger mb-6 shrink-0 shadow-lg ring-8 ring-accent-danger/5">
          <ShieldAlert size={32} />
        </div>

        <h2 className="text-2xl font-bold mb-2">Wait, Ravi. Stop.</h2>
        <p className="text-text-secondary mb-6 leading-relaxed text-sm">
          We noticed you're looking at taking a new <strong>₹15,000</strong> loan from <i>MoneyTap</i>. Before you click accept, let us show you the real cost.
        </p>

        <div className="bg-black/30 rounded-lg p-5 mb-6 text-left border border-white/5 shadow-inner">
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-muted">On Screen it says</span>
            <span className="font-medium line-through opacity-70">3% interest</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted text-sm text-accent-danger font-medium">True Cost (APR)</span>
            <span className="font-bold text-xl text-accent-danger text-gradient danger">36% + Fees</span>
          </div>
          <div className="h-px w-full bg-white/10 my-3"></div>
          <div className="flex justify-between items-center">
            <span className="text-muted text-sm">If you borrow ₹15,000 you repay</span>
            <span className="font-bold text-lg">₹19,250</span>
          </div>
        </div>

        <p className="text-accent-warning font-medium text-sm mb-8">
          This will add another ₹1,400 to your monthly minimum payments, breaking your optimized strategy.
        </p>

        <div className="flex flex-col gap-3">
          <button className="btn btn-danger py-4" onClick={onClose}>
            Don't take the loan. Stick to the plan.
          </button>
          <button className="text-muted text-sm hover:text-white transition-fast py-2" onClick={onClose}>
            I have no choice, I need it for rent
          </button>
        </div>
      </div>
    </div>
  )
}
