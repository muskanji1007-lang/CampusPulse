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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#38BDF8]/15 pb-4">
        <div>
          <h2 className="text-base font-bold font-heading text-[#F1F5F9] flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#1B2A4A] border border-[#38BDF8]/25 text-[#06B6D4]">
              <Compass className="w-4 h-4" />
            </div>
            <span>Career Improvement Roadmap</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Targeted milestones designed to bridge your identified skill gaps and boost placement probability.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#94A3B8]">Tasks Completed:</span>
          <span className="font-mono text-xs font-bold text-[#06B6D4] px-2.5 py-0.5 rounded-lg bg-[#0D1527] border border-[#38BDF8]/20">
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
                  ? 'bg-[#0A0F1D]/60 border-[#38BDF8]/10 opacity-50'
                  : 'bg-[#0D1527] border-[#38BDF8]/15 hover:border-[#38BDF8]/30'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-[#06B6D4] hover:text-[#38BDF8] transition shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-[#06B6D4]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#334E7D]" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isHighPriority
                        ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/35'
                        : 'bg-[#1B2A4A] text-[#94A3B8] border-[#38BDF8]/15'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-xs font-semibold text-[#F1F5F9]">{item.tag}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-[#64748B]' : 'text-[#94A3B8]'}`}>
                    {item.action}
                  </p>
                </div>
              </div>

              {/* Impact Tag in Secondary Sky Blue */}
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#1B2A4A] border border-[#06B6D4]/30 text-[11px] font-semibold text-[#38BDF8]">
                  <TrendingUp className="w-3 h-3 text-[#06B6D4]" />
                  <span>{item.impact}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Advice Box */}
      <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 flex items-center justify-between text-xs text-[#94A3B8]">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[#06B6D4]" />
          <span>Execute prioritized recommendations to unlock top-tier compensation brackets.</span>
        </div>
        <span className="text-[#38BDF8] font-medium hidden sm:inline">
          Live Recalculated
        </span>
      </div>
    </div>
  );
}
