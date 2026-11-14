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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold font-heading text-slate-900 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-100 text-[#0284C7]">
              <Compass className="w-4 h-4" />
            </div>
            <span>Career Improvement Roadmap</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Targeted milestones designed to bridge your identified skill gaps and boost placement probability.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">Tasks Completed:</span>
          <span className="font-mono text-xs font-bold text-[#0284C7] px-2.5 py-0.5 rounded-lg bg-sky-50 border border-sky-200">
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
                  ? 'bg-slate-50/70 border-slate-200 opacity-60'
                  : isHighPriority
                  ? 'bg-amber-50/30 border-amber-200 hover:border-amber-300 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-[#0284C7] hover:text-sky-700 transition shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-[#0284C7]" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isHighPriority
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">{item.tag}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                    {item.action}
                  </p>
                </div>
              </div>

              {/* Impact Tag */}
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[11px] font-semibold text-[#0284C7]">
                  <TrendingUp className="w-3 h-3 text-[#0284C7]" />
                  <span>{item.impact}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Advice Box */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-[#0284C7]" />
          <span>Execute prioritized recommendations to unlock top-tier compensation brackets.</span>
        </div>
        <span className="text-[#0284C7] font-semibold hidden sm:inline">
          Live Recalculated
        </span>
      </div>
    </div>
  );
}
