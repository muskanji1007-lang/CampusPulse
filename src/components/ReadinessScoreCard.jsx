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
              <div className="p-1.5 rounded-lg bg-[#1B2A4A] border border-[#38BDF8]/25 text-[#06B6D4]">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#F1F5F9]">Placement Readiness Index</h3>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
              score >= 85
                ? 'bg-[#06B6D4]/15 text-[#38BDF8] border-[#06B6D4]/35 shadow-sm'
                : score >= 70
                ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/35'
                : 'bg-[#1B2A4A] text-[#94A3B8] border-white/[0.08]'
            }`}>
              {tierRank}
            </span>
          </div>

          {/* Prominent Circular Gauge Display in Electric Cyan */}
          <div className="flex flex-col sm:flex-row items-center justify-around py-5 gap-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_4px_12px_rgba(6,182,212,0.2)]" viewBox="0 0 140 140">
                <defs>
                  <linearGradient id="oceanicCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                {/* Background circle track */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  strokeWidth="9"
                  stroke="#0D1527"
                  fill="transparent"
                />
                {/* Dynamic progress circle in Cyan Gradient */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="url(#oceanicCyanGradient)"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold font-heading text-[#F1F5F9] tracking-tight">
                  {score}%
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider mt-0.5">Likelihood</span>
              </div>
            </div>

            {/* Assessment Verdict */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="text-lg font-bold font-heading text-[#F1F5F9]">
                {label}
              </div>
              <p className="text-xs text-[#94A3B8] max-w-[220px] leading-relaxed">
                Derived from real-time evaluation of DSA mastery, project complexity, and core subjects.
              </p>
              <div className="text-[11px] text-[#06B6D4] flex items-center justify-center sm:justify-start space-x-1.5 pt-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Deterministic Calculation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Component Breakdown Bento Grid */}
        <div className="pt-4 border-t border-[#38BDF8]/15 space-y-2.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] flex items-center justify-between">
            <span>Component Weights</span>
            <span className="text-[#94A3B8] font-mono text-[10px]">100 pts Max</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
              <div className="text-[10px] text-[#94A3B8]">DSA (30)</div>
              <div className="font-mono text-xs font-bold text-[#06B6D4] mt-0.5">{breakdown.dsa ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
              <div className="text-[10px] text-[#94A3B8]">CGPA (25)</div>
              <div className="font-mono text-xs font-bold text-[#F1F5F9] mt-0.5">{breakdown.cgpa ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
              <div className="text-[10px] text-[#94A3B8]">Projects (20)</div>
              <div className="font-mono text-xs font-bold text-[#F1F5F9] mt-0.5">{breakdown.projects ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
              <div className="text-[10px] text-[#94A3B8]">Core CS (15)</div>
              <div className="font-mono text-xs font-bold text-[#F1F5F9] mt-0.5">{breakdown.coreCs ?? 0} pts</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 col-span-2 sm:col-span-1 hover:border-[#38BDF8]/30 transition">
              <div className="text-[10px] text-[#94A3B8]">Exp (10)</div>
              <div className="font-mono text-xs font-bold text-[#06B6D4] mt-0.5">{breakdown.practical ?? 0} pts</div>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  );
}
