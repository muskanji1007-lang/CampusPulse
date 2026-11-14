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
import { Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card3D from './Card3D';

export default function SkillRadarChart({ data = [] }) {
  // Custom Recharts Tooltip styled for Light Theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1">
          <div className="font-heading font-semibold text-slate-900 mb-1 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span>
            <span>{item.subject}</span>
          </div>
          <div className="text-[#0284C7]">Your Rating: <span className="font-mono font-bold">{item.studentScore} / 5</span></div>
          <div className="text-slate-600">Target Benchmark: <span className="font-mono font-bold text-amber-600">{item.industryStandard} / 5</span></div>
          {item.gap > 0 ? (
            <div className="text-rose-600 font-semibold pt-1 border-t border-slate-100">
              Gap: -{item.gap} pts
            </div>
          ) : (
            <div className="text-emerald-600 font-semibold pt-1 border-t border-slate-100 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 inline text-emerald-600" />
              <span>Meets Benchmark</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card3D depth={5} className="h-full">
      <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-100 text-[#0284C7]">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-slate-900">Skill Gap Radar Matrix</h3>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0284C7]"></span>
                <span className="text-slate-800 font-medium text-[11px]">Your Profile</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-slate-500 text-[11px]">Benchmark</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Multi-dimensional competency assessment against Tier-1 hiring expectations.
          </p>

          {/* Recharts Container */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#475569', fontSize: 10, fontWeight: 500, fontFamily: 'Inter' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 5]}
                  tick={{ fill: '#94A3B8', fontSize: 9, fontFamily: 'Inter' }}
                  stroke="#E2E8F0"
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Target Benchmark Radar */}
                <Radar
                  name="Industry Benchmark"
                  dataKey="industryStandard"
                  stroke="#D97706"
                  fill="#D97706"
                  fillOpacity={0.08}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                {/* Student Skills Radar in Royal Blue */}
                <Radar
                  name="Your Skill Profile"
                  dataKey="studentScore"
                  stroke="#0284C7"
                  fill="#0284C7"
                  fillOpacity={0.22}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Identified Deficiencies Pills */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Identified Skill Gaps</span>
            <span className="text-slate-400 text-[10px]">Delta vs 4.0+ Benchmark</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data
              .filter(d => d.gap > 0)
              .map(d => (
                <span
                  key={d.subject}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-800"
                >
                  <AlertCircle className="w-3 h-3 text-rose-500" />
                  <span>{d.subject}:</span>
                  <span className="font-mono font-bold text-rose-600">-{d.gap}</span>
                </span>
              ))}
            {data.every(d => d.gap === 0) && (
              <span className="text-xs text-emerald-600 font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>All core categories meet or exceed standard benchmark!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
