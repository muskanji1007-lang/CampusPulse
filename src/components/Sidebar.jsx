import React from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Building2, 
  Compass, 
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, readinessScore = 0 }) {
  const navItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Skills Evaluator', icon: UserCheck },
    { id: 'matrix', label: 'Company Tier Eligibility', icon: Building2 },
    { id: 'roadmap', label: 'Actionable Prep Roadmap', icon: Compass },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 flex flex-col justify-between p-4 bg-dark-900/70 border border-white/[0.08] rounded-2xl lg:min-h-[calc(100vh-6rem)] backdrop-blur-xl">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-2 flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-zinc-400" />
            <span>Platform Navigation</span>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.08] text-white border border-white/15 shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Placement Benchmark Info Box with Magic UI Pro Minimalism */}
        <div className="p-3.5 rounded-xl bg-dark-950/80 border border-white/[0.07] text-xs space-y-2">
          <div className="flex items-center space-x-2 text-zinc-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Scoring Weights</span>
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Evaluation metrics: DSA (30%), CGPA (25%), Projects (20%), Core CS (15%), Internships (10%).
          </p>
        </div>
      </div>

      {/* Bottom Readiness Summary Card */}
      <div className="pt-4 border-t border-white/[0.08] mt-6 lg:mt-0">
        <div className="p-3.5 rounded-xl bg-dark-950/90 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Live Readiness</div>
            <div className="text-lg font-bold text-white flex items-center space-x-1.5">
              <span>{readinessScore}%</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Synced
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
