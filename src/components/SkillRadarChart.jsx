import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Activity, AlertTriangle, Sparkles } from 'lucide-react';

export default function SkillRadarChart({ data = [] }) {
  // Custom Recharts Tooltip styled in AI Dark Theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-ai-950 p-3 rounded-xl border border-brand-500/50 shadow-glow-purple text-xs space-y-1 backdrop-blur-md">
          <div className="font-bold text-white mb-1 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-400"></span>
            <span>{item.subject}</span>
          </div>
          <div className="text-brand-300">Student Rating: <span className="font-mono font-bold">{item.studentScore} / 5</span></div>
          <div className="text-amber-400">Industry Standard: <span className="font-mono font-bold">{item.industryStandard} / 5</span></div>
          {item.gap > 0 ? (
            <div className="text-rose-400 font-semibold pt-1 border-t border-ai-800">
              Gap: -{item.gap} pts
            </div>
          ) : (
            <div className="text-emerald-400 font-semibold pt-1 border-t border-ai-800">
              Meets / Exceeds Benchmark
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-fuchsia-500/20 transition-all duration-500"></div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-400">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-white">Skill Gap Radar Diagnostic</h3>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-400 shadow-glow-purple"></span>
              <span className="text-slate-200 font-medium">Your Profile</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
              <span className="text-slate-400">Industry Target</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Multi-dimensional AI competency analysis against high-growth recruitment standards.
        </p>

        {/* Recharts Container */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="#221648" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#C084FC', fontSize: 10, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 5]}
                tick={{ fill: '#6344B5', fontSize: 9 }}
                stroke="#221648"
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Target Benchmark Radar */}
              <Radar
                name="Industry Target"
                dataKey="industryStandard"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.12}
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />
              {/* Student Skills Radar in Glowing AI Violet */}
              <Radar
                name="Your Skill Profile"
                dataKey="studentScore"
                stroke="#A855F7"
                fill="#A855F7"
                fillOpacity={0.4}
                strokeWidth={2.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Identified Deficiencies Pills */}
      <div className="pt-4 border-t border-ai-800">
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Immediate Skill Bottlenecks</span>
          </span>
          <span className="text-slate-500 text-[10px]">Delta vs 4.0+ Benchmark</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data
            .filter(d => d.gap > 0)
            .map(d => (
              <span
                key={d.subject}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-ai-950 border border-brand-500/30 text-[11px] text-brand-300 shadow-sm"
              >
                <AlertTriangle className="w-3 h-3 text-fuchsia-400" />
                <span>{d.subject}:</span>
                <span className="font-mono font-bold text-fuchsia-300">-{d.gap}</span>
              </span>
            ))}
          {data.every(d => d.gap === 0) && (
            <span className="text-xs text-emerald-400 font-medium">All core categories meet or exceed standard!</span>
          )}
        </div>
      </div>
    </div>
  );
}
