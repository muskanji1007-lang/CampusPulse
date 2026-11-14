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
    <aside className="w-full lg:w-64 shrink-0 flex flex-col justify-between p-4 bg-white border border-slate-200 rounded-2xl lg:min-h-[calc(100vh-6rem)] shadow-xs">
      <div className="space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#0284C7]" />
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
                      ? 'bg-sky-50 text-[#0284C7] border border-sky-200 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0284C7]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Scoring Weights Bento Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
            <span>Scoring Weights</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Evaluation metrics: DSA (30%), CGPA (25%), Projects (20%), Core CS (15%), Internships (10%).
          </p>
        </div>
      </div>

      {/* Bottom Readiness Summary Card */}
      <div className="pt-4 border-t border-slate-200 mt-6 lg:mt-0">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Live Readiness</div>
            <div className="text-lg font-bold text-slate-900 flex items-center space-x-1.5 font-heading">
              <span>{readinessScore}%</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#0284C7]" />
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-sky-100 text-[#0284C7] border border-sky-200">
              Synced
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
