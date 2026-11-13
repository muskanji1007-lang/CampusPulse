import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Building2, 
  Compass, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, readinessScore = 0 }) {
  const navItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Skills Evaluator', icon: UserCheck },
    { id: 'matrix', label: 'Company Tier Eligibility', icon: Building2 },
    { id: 'roadmap', label: 'Actionable Prep Roadmap', icon: Compass },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col justify-between p-4 bg-navy-900/90 border-r border-navy-800/80 rounded-2xl lg:min-h-[calc(100vh-6rem)]">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Analytics & Auditing
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
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-glow-teal/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Placement Benchmark Info Box */}
        <div className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800/80 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-teal-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Benchmark Model</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Evaluation weights: DSA (30%), CGPA (25%), Projects (20%), Core CS (15%), Internships (10%).
          </p>
        </div>
      </div>

      {/* Bottom Readiness Summary Card */}
      <div className="pt-4 border-t border-navy-800/80 mt-6 lg:mt-0">
        <div className="p-3 rounded-xl bg-gradient-to-br from-navy-850 to-navy-950 border border-navy-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Live Readiness</div>
            <div className="text-lg font-bold text-white flex items-center space-x-1">
              <span>{readinessScore}%</span>
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 text-[10px] rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
              Synced
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
