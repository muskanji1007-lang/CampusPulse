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
    <aside className="w-full lg:w-64 shrink-0 flex flex-col justify-between p-4 bg-[#101613] border border-white/[0.08] rounded-2xl lg:min-h-[calc(100vh-6rem)]">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA9A1] px-3 mb-2 flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#9CA9A1]" />
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
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1D3028] text-[#E8EDE9] border border-[#10B981]/25 font-semibold'
                      : 'text-[#9CA9A1] hover:text-[#E8EDE9] hover:bg-[#151C19]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#10B981]' : 'text-[#9CA9A1]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Scoring Weights Bento Card */}
        <div className="p-3.5 rounded-xl bg-[#151C19] border border-white/[0.08] text-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#E8EDE9] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>Scoring Weights</span>
          </div>
          <p className="text-[#9CA9A1] text-[11px] leading-relaxed">
            Evaluation metrics: DSA (30%), CGPA (25%), Projects (20%), Core CS (15%), Internships (10%).
          </p>
        </div>
      </div>

      {/* Bottom Readiness Summary Card */}
      <div className="pt-4 border-t border-white/[0.08] mt-6 lg:mt-0">
        <div className="p-3.5 rounded-xl bg-[#151C19] border border-white/[0.08] flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#9CA9A1] uppercase tracking-wider font-semibold">Live Readiness</div>
            <div className="text-lg font-bold text-[#E8EDE9] flex items-center space-x-1.5 font-heading">
              <span>{readinessScore}%</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[#1D3028] text-[#6EE7B7] border border-[#10B981]/20">
              Synced
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
