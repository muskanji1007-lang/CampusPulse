import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import Card3D from './Card3D';

export default function ReadinessScoreCard({ assessment }) {
  const { score = 0, label = '', tierRank = '', breakdown = {} } = assessment || {};

  // Circular gauge circumference math
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card3D depth={5} className="h-full">
      <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-[#1D3028] border border-white/[0.08] text-[#10B981]">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#E8EDE9]">Placement Readiness Index</h3>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
              score >= 85
                ? 'bg-[#10B981]/10 text-[#6EE7B7] border-[#10B981]/30'
                : score >= 70
                ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                : 'bg-[#101613] text-[#9CA9A1] border-white/[0.08]'
            }`}>
              {tierRank}
            </span>
          </div>

          {/* Prominent Circular Gauge Display */}
          <div className="flex flex-col sm:flex-row items-center justify-around py-5 gap-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                {/* Background circle track */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  strokeWidth="9"
                  stroke="#101613"
                  fill="transparent"
                />
                {/* Dynamic progress circle in Emerald */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="#10B981"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold font-heading text-[#E8EDE9] tracking-tight">
                  {score}%
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#9CA9A1] tracking-wider mt-0.5">Likelihood</span>
              </div>
            </div>

            {/* Assessment Verdict */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="text-lg font-bold font-heading text-[#E8EDE9]">
                {label}
              </div>
              <p className="text-xs text-[#9CA9A1] max-w-[220px] leading-relaxed">
                Derived from real-time evaluation of DSA mastery, project complexity, and core subjects.
              </p>
              <div className="text-[11px] text-[#10B981] flex items-center justify-center sm:justify-start space-x-1.5 pt-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Deterministic Calculation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Component Breakdown Bento Grid */}
        <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA9A1] flex items-center justify-between">
            <span>Component Weights</span>
            <span className="text-[#9CA9A1] font-mono text-[10px]">100 pts Max</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-[#101613] border border-white/[0.08] hover:border-white/[0.14] transition">
              <div className="text-[10px] text-[#9CA9A1]">DSA (30)</div>
              <div className="font-mono text-xs font-bold text-[#10B981] mt-0.5">{breakdown.dsa ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#101613] border border-white/[0.08] hover:border-white/[0.14] transition">
              <div className="text-[10px] text-[#9CA9A1]">CGPA (25)</div>
              <div className="font-mono text-xs font-bold text-[#E8EDE9] mt-0.5">{breakdown.cgpa ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#101613] border border-white/[0.08] hover:border-white/[0.14] transition">
              <div className="text-[10px] text-[#9CA9A1]">Projects (20)</div>
              <div className="font-mono text-xs font-bold text-[#E8EDE9] mt-0.5">{breakdown.projects ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#101613] border border-white/[0.08] hover:border-white/[0.14] transition">
              <div className="text-[10px] text-[#9CA9A1]">Core CS (15)</div>
              <div className="font-mono text-xs font-bold text-[#E8EDE9] mt-0.5">{breakdown.coreCs ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#101613] border border-white/[0.08] col-span-2 sm:col-span-1 hover:border-white/[0.14] transition">
              <div className="text-[10px] text-[#9CA9A1]">Exp (10)</div>
              <div className="font-mono text-xs font-bold text-[#10B981] mt-0.5">{breakdown.practical ?? 0} pts</div>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  );
}
