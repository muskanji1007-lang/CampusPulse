import React from 'react';
import { Target, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ReadinessScoreCard({ assessment }) {
  const { score = 0, label = '', tierRank = '', color = '', badgeBg = '', breakdown = {} } = assessment || {};

  // Circular gauge circumference math
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base text-white">Placement Readiness Score</h3>
          </div>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${badgeBg}`}>
            {tierRank}
          </span>
        </div>

        {/* Circular Gauge Display */}
        <div className="flex flex-col sm:flex-row items-center justify-around py-4 gap-6">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              {/* Background circle track */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-navy-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress dynamic circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-teal-400 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-white tracking-tight">{score}%</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Likelihood</span>
            </div>
          </div>

          {/* Assessment Verdict */}
          <div className="space-y-2 text-center sm:text-left">
            <div className={`text-base font-bold ${color}`}>{label}</div>
            <p className="text-xs text-slate-300 max-w-[220px] leading-relaxed">
              Based on algorithmic benchmarking across academic consistency, DSA mastery, and core projects.
            </p>
            <div className="text-[11px] text-teal-400/90 flex items-center justify-center sm:justify-start space-x-1 pt-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real-time Recalculated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Component Breakdown Mini Bars */}
      <div className="pt-4 border-t border-navy-800 space-y-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Component Contribution Matrix
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
          <div className="p-2 rounded-lg bg-navy-950/70 border border-navy-800">
            <div className="text-[10px] text-slate-400">DSA (Max 30)</div>
            <div className="font-mono text-xs font-bold text-teal-400">{breakdown.dsa ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-lg bg-navy-950/70 border border-navy-800">
            <div className="text-[10px] text-slate-400">CGPA (Max 25)</div>
            <div className="font-mono text-xs font-bold text-cyan-400">{breakdown.cgpa ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-lg bg-navy-950/70 border border-navy-800">
            <div className="text-[10px] text-slate-400">Projects (Max 20)</div>
            <div className="font-mono text-xs font-bold text-teal-300">{breakdown.projects ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-lg bg-navy-950/70 border border-navy-800">
            <div className="text-[10px] text-slate-400">Core CS (Max 15)</div>
            <div className="font-mono text-xs font-bold text-amber-400">{breakdown.coreCs ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-lg bg-navy-950/70 border border-navy-800 col-span-2 sm:col-span-1">
            <div className="text-[10px] text-slate-400">Experience (Max 10)</div>
            <div className="font-mono text-xs font-bold text-emerald-400">{breakdown.practical ?? 0} pts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
