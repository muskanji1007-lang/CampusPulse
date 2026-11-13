import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Building2, 
  Compass, 
  TrendingUp,
  Sparkles,
  Bot
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, readinessScore = 0 }) {
  const navItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Skills Evaluator', icon: UserCheck },
    { id: 'matrix', label: 'Company Tier Eligibility', icon: Building2 },
    { id: 'roadmap', label: 'Actionable Prep Roadmap', icon: Compass },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col justify-between p-4 bg-ai-900/90 border-r border-ai-800/80 rounded-2xl lg:min-h-[calc(100vh-6rem)]">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-brand-300/70 px-3 mb-2 flex items-center space-x-1.5">
            <Bot className="w-3.5 h-3.5 text-brand-400" />
            <span>AI Analytics Navigation</span>
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-glow-purple/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-ai-850/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Placement Benchmark Info Box with AI Purple Glow */}
        <div className="p-3.5 rounded-xl bg-ai-950/80 border border-brand-500/20 text-xs space-y-2 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-brand-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-2 text-brand-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Diagnostic Model</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Dynamic inference: DSA (30%), CGPA (25%), Projects (20%), Core CS (15%), Internships (10%).
          </p>
        </div>
      </div>

      {/* Bottom Readiness Summary Card */}
      <div className="pt-4 border-t border-ai-800/80 mt-6 lg:mt-0">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-ai-850 via-ai-900 to-ai-950 border border-brand-500/30 flex items-center justify-between shadow-glow-purple/10">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Live Readiness</div>
            <div className="text-lg font-bold text-white flex items-center space-x-1.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-fuchsia-400">
                {readinessScore}%
              </span>
              <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/35">
              Live Synced
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
