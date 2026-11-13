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
import { Activity, AlertTriangle } from 'lucide-react';

export default function SkillRadarChart({ data = [] }) {
  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-navy-950 p-3 rounded-xl border border-navy-700 shadow-xl text-xs space-y-1">
          <div className="font-bold text-white mb-1">{item.subject}</div>
          <div className="text-teal-400">Student Rating: <span className="font-mono font-bold">{item.studentScore} / 5</span></div>
          <div className="text-amber-400">Industry Standard: <span className="font-mono font-bold">{item.industryStandard} / 5</span></div>
          {item.gap > 0 ? (
            <div className="text-rose-400 font-semibold pt-1 border-t border-navy-800">
              Gap: -{item.gap} pts
            </div>
          ) : (
            <div className="text-emerald-400 font-semibold pt-1 border-t border-navy-800">
              Meets / Exceeds Benchmark
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base text-white">Skill Gap Radar Analysis</h3>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
              <span className="text-slate-300">Your Skills</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
              <span className="text-slate-400">Target Standard</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Multi-axis profile contrast against Tier-1 and high-growth hiring expectations.
        </p>

        {/* Recharts Container */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="#1C2541" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 5]}
                tick={{ fill: '#475569', fontSize: 9 }}
                stroke="#1C2541"
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
              {/* Student Skills Radar */}
              <Radar
                name="Your Skill Profile"
                dataKey="studentScore"
                stroke="#00B4D8"
                fill="#00B4D8"
                fillOpacity={0.35}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Identified Deficiencies Pills */}
      <div className="pt-4 border-t border-navy-800">
        <div className="flex items-center justify-between text-[11px] mb-2">
          <span className="font-bold uppercase tracking-wider text-slate-400">Immediate Gaps</span>
          <span className="text-slate-500 text-[10px]">Delta vs 4.0+ Benchmark</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data
            .filter(d => d.gap > 0)
            .map(d => (
              <span
                key={d.subject}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-navy-950 border border-rose-500/30 text-[11px] text-rose-300"
              >
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                <span>{d.subject}:</span>
                <span className="font-mono font-bold text-rose-400">-{d.gap}</span>
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
