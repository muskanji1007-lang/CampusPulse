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
import Card3D from './Card3D';

export default function SkillRadarChart({ data = [] }) {
  // Custom Recharts Tooltip styled in Magic UI Dark Theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-dark-950 p-3 rounded-xl border border-white/10 shadow-2xl text-xs space-y-1 backdrop-blur-xl">
          <div className="font-semibold text-white mb-1 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{item.subject}</span>
          </div>
          <div className="text-emerald-400">Student Rating: <span className="font-mono font-bold">{item.studentScore} / 5</span></div>
          <div className="text-zinc-400">Industry Standard: <span className="font-mono font-bold text-zinc-300">{item.industryStandard} / 5</span></div>
          {item.gap > 0 ? (
            <div className="text-rose-400 font-semibold pt-1 border-t border-white/10">
              Gap: -{item.gap} pts
            </div>
          ) : (
            <div className="text-emerald-400 font-semibold pt-1 border-t border-white/10">
              Meets / Exceeds Benchmark
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card3D depth={18} className="h-full">
      <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white">Skill Gap Radar Matrix</h3>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-zinc-200 font-medium">Your Profile</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="text-zinc-400">Target Standard</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-400 mb-4">
            Multi-dimensional competency assessment against Tier-1 hiring expectations.
          </p>

          {/* Recharts Container with 3D Depth */}
          <div style={{ transform: 'translateZ(30px)' }} className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#27272A" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 5]}
                  tick={{ fill: '#52525B', fontSize: 9 }}
                  stroke="#27272A"
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Target Benchmark Radar */}
                <Radar
                  name="Industry Target"
                  dataKey="industryStandard"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.08}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                {/* Student Skills Radar in Emerald */}
                <Radar
                  name="Your Skill Profile"
                  dataKey="studentScore"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Identified Deficiencies Pills */}
        <div style={{ transform: 'translateZ(15px)' }} className="pt-4 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="font-semibold uppercase tracking-wider text-zinc-400">Immediate Gaps</span>
            <span className="text-zinc-400 text-[10px]">Delta vs 4.0+ Benchmark</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data
              .filter(d => d.gap > 0)
              .map(d => (
                <span
                  key={d.subject}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-dark-950 border border-white/10 text-[11px] text-zinc-300"
                >
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span>{d.subject}:</span>
                  <span className="font-mono font-bold text-amber-400">-{d.gap}</span>
                </span>
              ))}
            {data.every(d => d.gap === 0) && (
              <span className="text-xs text-emerald-400 font-medium">All core categories meet or exceed standard!</span>
            )}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
