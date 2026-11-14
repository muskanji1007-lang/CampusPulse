import React, { useState } from 'react';
import { Compass, CheckSquare, Square, Zap, TrendingUp } from 'lucide-react';

export default function ActionableRoadmap({ roadmap = [] }) {
  const [completedActions, setCompletedActions] = useState({});

  const toggleAction = (index) => {
    setCompletedActions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(completedActions).filter(Boolean).length;

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
        <div>
          <h2 className="text-base font-bold font-heading text-[#E8EDE9] flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#1D3028] border border-white/[0.08] text-[#10B981]">
              <Compass className="w-4 h-4" />
            </div>
            <span>Career Improvement Roadmap</span>
          </h2>
          <p className="text-xs text-[#9CA9A1] mt-0.5">
            Targeted milestones designed to bridge your identified skill gaps and boost placement probability.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#9CA9A1]">Tasks Completed:</span>
          <span className="font-mono text-xs font-bold text-[#10B981] px-2.5 py-0.5 rounded-lg bg-[#101613] border border-white/[0.08]">
            {completedCount} / {roadmap.length}
          </span>
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-2.5">
        {roadmap.map((item, index) => {
          const isDone = !!completedActions[index];
          const isHighPriority = item.priority === 'High Priority';
          
          return (
            <div
              key={index}
              onClick={() => toggleAction(index)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 flex items-start justify-between gap-4 ${
                isDone
                  ? 'bg-[#0B0F0E]/60 border-white/[0.04] opacity-50'
                  : 'bg-[#101613] border-white/[0.08] hover:border-white/[0.14]'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-[#10B981] hover:text-[#6EE7B7] transition shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#344D42]" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isHighPriority
                        ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                        : 'bg-[#1D3028] text-[#9CA9A1] border-white/[0.08]'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-xs font-semibold text-[#E8EDE9]">{item.tag}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-[#6E7D75]' : 'text-[#9CA9A1]'}`}>
                    {item.action}
                  </p>
                </div>
              </div>

              {/* Impact Tag in Secondary Emerald */}
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#1D3028] border border-[#10B981]/20 text-[11px] font-semibold text-[#6EE7B7]">
                  <TrendingUp className="w-3 h-3 text-[#10B981]" />
                  <span>{item.impact}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Advice Box */}
      <div className="p-3.5 rounded-xl bg-[#101613] border border-white/[0.08] flex items-center justify-between text-xs text-[#9CA9A1]">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[#10B981]" />
          <span>Execute prioritized recommendations to unlock top-tier compensation brackets.</span>
        </div>
        <span className="text-[#9CA9A1] font-medium hidden sm:inline">
          Live Recalculated
        </span>
      </div>
    </div>
  );
}
