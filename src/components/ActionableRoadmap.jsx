import React, { useState } from 'react';
import { Compass, CheckSquare, Square, Zap, TrendingUp, Sparkles } from 'lucide-react';

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
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Compass className="w-5 h-5 text-teal-400" />
            <span>Targeted Career Improvement Roadmap</span>
          </h2>
          <p className="text-xs text-slate-400">
            Algorithmic priority tasks designed to bridge your identified skill gaps and boost placement probability.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Tasks Completed:</span>
          <span className="font-mono text-xs font-bold text-teal-300 px-2 py-0.5 rounded bg-navy-950 border border-navy-800">
            {completedCount} / {roadmap.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {roadmap.map((item, index) => {
          const isDone = !!completedActions[index];
          const isHighPriority = item.priority === 'High Priority';
          
          return (
            <div
              key={index}
              onClick={() => toggleAction(index)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 ${
                isDone
                  ? 'bg-navy-950/40 border-navy-800/50 opacity-60'
                  : isHighPriority
                  ? 'bg-navy-900/80 border-teal-500/30 hover:border-teal-500/60'
                  : 'bg-navy-950/70 border-navy-800 hover:border-navy-700'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-teal-400 hover:text-teal-300 transition shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-teal-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isHighPriority
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      {item.priority}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">{item.tag}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.action}
                  </p>
                </div>
              </div>

              {/* Impact Tag */}
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-[11px] font-bold text-teal-300">
                  <TrendingUp className="w-3 h-3 text-teal-400" />
                  <span>{item.impact}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-teal-400" />
          <span>Complete all checklist actions to advance your readiness to next tier level.</span>
        </div>
        <span className="text-teal-400 font-semibold hidden sm:inline">Updated automatically</span>
      </div>
    </div>
  );
}
