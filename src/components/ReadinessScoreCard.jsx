import React from 'react';
import { Target, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function ReadinessScoreCard({ assessment }) {
  const { score = 0, label = '', tierRank = '', breakdown = {} } = assessment || {};

  // Circular gauge circumference math
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-emerald-400">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-white">Placement Readiness Index</h3>
          </div>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
            score >= 85
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : score >= 70
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-zinc-800/80 text-zinc-300 border-zinc-700'
          }`}>
            {tierRank}
          </span>
        </div>

        {/* Circular Gauge Display with Magic UI Pro Minimalism */}
        <div className="flex flex-col sm:flex-row items-center justify-around py-4 gap-6">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              <defs>
                <linearGradient id="magicEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
              {/* Background circle track */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-zinc-800/60"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Dynamic progress circle with Emerald Gradient */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke="url(#magicEmeraldGradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {score}%
              </span>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Likelihood</span>
            </div>
          </div>

          {/* Assessment Verdict */}
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-base font-bold text-white">
              {label}
            </div>
            <p className="text-xs text-zinc-400 max-w-[220px] leading-relaxed">
              Derived from automated assessment of DSA mastery, project depth, and core subjects.
            </p>
            <div className="text-[11px] text-emerald-400 flex items-center justify-center sm:justify-start space-x-1.5 pt-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time Recalculated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Component Breakdown Mini Bars */}
      <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
          <span>Component Weights</span>
          <span className="text-zinc-400 font-mono text-[10px]">100 pts Max</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
          <div className="p-2 rounded-xl bg-dark-950/80 border border-white/[0.06] hover:border-white/15 transition">
            <div className="text-[10px] text-zinc-400">DSA (30)</div>
            <div className="font-mono text-xs font-bold text-emerald-400">{breakdown.dsa ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-dark-950/80 border border-white/[0.06] hover:border-white/15 transition">
            <div className="text-[10px] text-zinc-400">CGPA (25)</div>
            <div className="font-mono text-xs font-bold text-zinc-200">{breakdown.cgpa ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-dark-950/80 border border-white/[0.06] hover:border-white/15 transition">
            <div className="text-[10px] text-zinc-400">Projects (20)</div>
            <div className="font-mono text-xs font-bold text-zinc-200">{breakdown.projects ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-dark-950/80 border border-white/[0.06] hover:border-white/15 transition">
            <div className="text-[10px] text-zinc-400">Core CS (15)</div>
            <div className="font-mono text-xs font-bold text-zinc-200">{breakdown.coreCs ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-dark-950/80 border border-white/[0.06] col-span-2 sm:col-span-1 hover:border-white/15 transition">
            <div className="text-[10px] text-zinc-400">Exp (10)</div>
            <div className="font-mono text-xs font-bold text-emerald-400">{breakdown.practical ?? 0} pts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
