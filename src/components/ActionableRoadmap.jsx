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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-emerald-400">
              <Compass className="w-4 h-4" />
            </div>
            <span>Career Improvement Roadmap</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Targeted milestones designed to bridge your identified skill gaps and boost placement probability.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-zinc-400">Tasks Completed:</span>
          <span className="font-mono text-xs font-bold text-emerald-400 px-2.5 py-0.5 rounded-lg bg-dark-950 border border-white/10">
            {completedCount} / {roadmap.length}
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {roadmap.map((item, index) => {
          const isDone = !!completedActions[index];
          const isHighPriority = item.priority === 'High Priority';
          
          return (
            <div
              key={index}
              onClick={() => toggleAction(index)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 ${
                isDone
                  ? 'bg-dark-950/40 border-white/[0.04] opacity-50'
                  : isHighPriority
                  ? 'bg-dark-900/80 border-white/15 hover:border-white/25'
                  : 'bg-dark-950/70 border-white/[0.07] hover:border-white/15'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-emerald-400 hover:text-emerald-300 transition shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4 text-zinc-600" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isHighPriority
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-white/[0.05] text-zinc-300 border-white/10'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-xs font-semibold text-zinc-300">{item.tag}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-zinc-500' : 'text-zinc-300'}`}>
                    {item.action}
                  </p>
                </div>
              </div>

              {/* Impact Tag with clean badge */}
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-300">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>{item.impact}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-dark-950/70 border border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Execute prioritized recommendations to unlock top-tier compensation brackets.</span>
        </div>
        <span className="text-zinc-400 font-medium hidden sm:inline">
          Live Recalculated
        </span>
      </div>
    </div>
  );
}
