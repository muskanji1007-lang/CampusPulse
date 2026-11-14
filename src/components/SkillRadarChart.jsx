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
  // Custom Recharts Tooltip styled in Midnight Oceanic
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[#0D1527] p-3 rounded-xl border border-[#38BDF8]/20 shadow-2xl text-xs space-y-1 backdrop-blur-md">
          <div className="font-heading font-semibold text-[#F1F5F9] mb-1 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></span>
            <span>{item.subject}</span>
          </div>
          <div className="text-[#06B6D4]">Your Rating: <span className="font-mono font-bold">{item.studentScore} / 5</span></div>
          <div className="text-[#94A3B8]">Target Benchmark: <span className="font-mono font-bold text-[#F59E0B]">{item.industryStandard} / 5</span></div>
          {item.gap > 0 ? (
            <div className="text-[#FB7185] font-semibold pt-1 border-t border-[#38BDF8]/15">
              Gap: -{item.gap} pts
            </div>
          ) : (
            <div className="text-[#06B6D4] font-semibold pt-1 border-t border-[#38BDF8]/15 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 inline text-[#06B6D4]" />
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
              <div className="p-1.5 rounded-lg bg-[#1B2A4A] border border-[#38BDF8]/25 text-[#06B6D4]">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-[#F1F5F9]">Skill Gap Radar Matrix</h3>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span>
                <span className="text-[#F1F5F9] font-medium text-[11px]">Your Profile</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                <span className="text-[#94A3B8] text-[11px]">Benchmark</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#94A3B8] mb-4">
            Multi-dimensional competency assessment against Tier-1 hiring expectations.
          </p>

          {/* Recharts Container */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                <PolarGrid stroke="#1E293B" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500, fontFamily: 'Inter' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 5]}
                  tick={{ fill: '#64748B', fontSize: 9, fontFamily: 'Inter' }}
                  stroke="#1E293B"
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
                {/* Student Skills Radar in Cyan */}
                <Radar
                  name="Your Skill Profile"
                  dataKey="studentScore"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.24}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Identified Deficiencies Pills */}
        <div className="pt-4 border-t border-[#38BDF8]/15">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="font-semibold uppercase tracking-wider text-[#94A3B8]">Identified Skill Gaps</span>
            <span className="text-[#94A3B8] text-[10px]">Delta vs 4.0+ Benchmark</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {data
              .filter(d => d.gap > 0)
              .map(d => (
                <span
                  key={d.subject}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#0D1527] border border-[#38BDF8]/15 text-[11px] text-[#F1F5F9]"
                >
                  <AlertCircle className="w-3 h-3 text-[#FB7185]" />
                  <span>{d.subject}:</span>
                  <span className="font-mono font-bold text-[#FB7185]">-{d.gap}</span>
                </span>
              ))}
            {data.every(d => d.gap === 0) && (
              <span className="text-xs text-[#06B6D4] font-medium flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>All core categories meet or exceed standard benchmark!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
