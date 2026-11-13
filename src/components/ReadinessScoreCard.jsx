import React from 'react';
import { Target, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

export default function ReadinessScoreCard({ assessment }) {
  const { score = 0, label = '', tierRank = '', color = '', badgeBg = '', breakdown = {} } = assessment || {};

  // Circular gauge circumference math
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-500/20 transition-all duration-500"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-400">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-white">AI Placement Readiness</h3>
          </div>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${
            score >= 85
              ? 'bg-brand-500/15 text-brand-300 border-brand-500/40 shadow-glow-purple/20'
              : score >= 70
              ? 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40'
              : 'bg-ai-800 text-slate-300 border-ai-700'
          }`}>
            {tierRank}
          </span>
        </div>

        {/* Circular Gauge Display with AI Purple/Fuchsia SVG Gradient */}
        <div className="flex flex-col sm:flex-row items-center justify-around py-4 gap-6">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              <defs>
                <linearGradient id="aiPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="50%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#E879F9" />
                </linearGradient>
              </defs>
              {/* Background circle track */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="text-ai-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Dynamic progress circle with AI gradient */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke="url(#aiPurpleGradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-brand-200 to-fuchsia-300 tracking-tight">
                {score}%
              </span>
              <span className="text-[10px] uppercase font-bold text-brand-400 tracking-wider">Likelihood</span>
            </div>
          </div>

          {/* Assessment Verdict */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-fuchsia-300 to-white">
              {label}
            </div>
            <p className="text-xs text-slate-300 max-w-[220px] leading-relaxed">
              Synthesized through automated evaluation of DSA depth, code projects, and academic rigor.
            </p>
            <div className="text-[11px] text-brand-400 flex items-center justify-center sm:justify-start space-x-1.5 pt-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Inferred</span>
            </div>
          </div>
        </div>
      </div>

      {/* Component Breakdown Mini Bars */}
      <div className="pt-4 border-t border-ai-800 space-y-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Component Breakdown</span>
          <span className="text-brand-400/80 font-mono text-[10px]">100 pts Max</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
          <div className="p-2 rounded-xl bg-ai-950/80 border border-ai-800 hover:border-brand-500/40 transition">
            <div className="text-[10px] text-slate-400">DSA (Max 30)</div>
            <div className="font-mono text-xs font-bold text-brand-300">{breakdown.dsa ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-ai-950/80 border border-ai-800 hover:border-brand-500/40 transition">
            <div className="text-[10px] text-slate-400">CGPA (Max 25)</div>
            <div className="font-mono text-xs font-bold text-fuchsia-300">{breakdown.cgpa ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-ai-950/80 border border-ai-800 hover:border-brand-500/40 transition">
            <div className="text-[10px] text-slate-400">Projects (Max 20)</div>
            <div className="font-mono text-xs font-bold text-brand-400">{breakdown.projects ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-ai-950/80 border border-ai-800 hover:border-brand-500/40 transition">
            <div className="text-[10px] text-slate-400">Core CS (Max 15)</div>
            <div className="font-mono text-xs font-bold text-amber-300">{breakdown.coreCs ?? 0} pts</div>
          </div>
          <div className="p-2 rounded-xl bg-ai-950/80 border border-ai-800 col-span-2 sm:col-span-1 hover:border-brand-500/40 transition">
            <div className="text-[10px] text-slate-400">Exp (Max 10)</div>
            <div className="font-mono text-xs font-bold text-emerald-400">{breakdown.practical ?? 0} pts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
