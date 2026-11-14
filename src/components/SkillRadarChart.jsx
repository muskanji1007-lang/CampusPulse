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
  // Custom Recharts Tooltip styled in Obsidian + Emerald System
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#101613] p-3 rounded-xl border border-white/[0.08] shadow-xl text-xs space-y-1 backdrop-blur-md">
          <div className="font-heading font-semibold text-[#E8EDE9] mb-1 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>{item.subject}</span>
          </div>
          <div className="text-[#10B981]">Your Rating: <span className="font-mono font-bold">{item.studentScore} / 5</span></div>
          <div className="text-[#9CA9A1]">Target Benchmark: <span className="font-mono font-bold text-[#F59E0B]">{item.industryStandard} / 5</span></div>
          {item.gap > 0 ? (
            <div className="text-[#F87171] font-semibold pt-1 border-t border-white/[0.08]">
              Gap: -{item.gap} pts
            </div>
          ) : (
            <div className="text-[#10B981] font-semibold pt-1 border-t border-white/[0.08] flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 inline text-[#10B981]" />
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
              <div className="p-1.5 rounded-lg bg-[#1D3028] border border-white/[0.08] text-[#10B981]">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#E8EDE9]">Skill Gap Radar Matrix</h3>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span className="text-[#E8EDE9] font-medium text-[11px]">Your Profile</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                <span className="text-[#9CA9A1] text-[11px]">Benchmark</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#9CA9A1] mb-4">
            Multi-dimensional competency assessment against Tier-1 hiring expectations.
          </p>

          {/* Recharts Container */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#263B32" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#9CA9A1', fontSize: 10, fontWeight: 500, fontFamily: 'Inter' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 5]}
                  tick={{ fill: '#6E7D75', fontSize: 9, fontFamily: 'Inter' }}
                  stroke="#263B32"
                />
                <Tooltip content={<CustomTooltip />} />
                {/* Target Benchmark Radar in Amber */}
                <Radar
                  name="Industry Benchmark"
                  dataKey="industryStandard"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.06}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                {/* Student Skills Radar in Emerald */}
                <Radar
                  name="Your Skill Profile"
                  dataKey="studentScore"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.22}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Identified Deficiencies Pills */}
        <div className="pt-4 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="font-semibold uppercase tracking-wider text-[#9CA9A1]">Identified Skill Gaps</span>
            <span className="text-[#9CA9A1] text-[10px]">Delta vs 4.0+ Benchmark</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data
              .filter(d => d.gap > 0)
              .map(d => (
                <span
                  key={d.subject}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#101613] border border-white/[0.08] text-[11px] text-[#E8EDE9]"
                >
                  <AlertCircle className="w-3 h-3 text-[#F87171]" />
                  <span>{d.subject}:</span>
                  <span className="font-mono font-bold text-[#F87171]">-{d.gap}</span>
                </span>
              ))}
            {data.every(d => d.gap === 0) && (
              <span className="text-xs text-[#10B981] font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>All core categories meet or exceed standard benchmark!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
