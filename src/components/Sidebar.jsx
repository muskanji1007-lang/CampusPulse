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
    <aside className="w-full lg:w-64 shrink-0 flex flex-col justify-between p-4 bg-[#0D1527] border border-[#38BDF8]/15 rounded-2xl lg:min-h-[calc(100vh-6rem)] shadow-lg">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] px-3 mb-2 flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" />
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
                      ? 'bg-[#1B2A4A] text-[#F1F5F9] border border-[#06B6D4]/40 font-semibold shadow-sm'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#131C31]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#06B6D4]' : 'text-[#94A3B8]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Scoring Weights Bento Card */}
        <div className="p-3.5 rounded-xl bg-[#131C31] border border-[#38BDF8]/15 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#F1F5F9] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></span>
            <span>Scoring Weights</span>
          </div>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Evaluation metrics: DSA (30%), CGPA (25%), Projects (20%), Core CS (15%), Internships (10%).
          </p>
        </div>
      </div>

      {/* Bottom Readiness Summary Card */}
      <div className="pt-4 border-t border-[#38BDF8]/15 mt-6 lg:mt-0">
        <div className="p-3.5 rounded-xl bg-[#131C31] border border-[#38BDF8]/20 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Live Readiness</div>
            <div className="text-lg font-bold text-[#F1F5F9] flex items-center space-x-1.5 font-heading">
              <span>{readinessScore}%</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#06B6D4]" />
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[#1B2A4A] text-[#38BDF8] border border-[#06B6D4]/30">
              Synced
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
