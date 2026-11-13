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
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ai-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-400">
              <Compass className="w-4 h-4" />
            </div>
            <span>AI Career Improvement Roadmap</span>
          </h2>
          <p className="text-xs text-slate-400">
            Intelligent priority tasks designed to bridge your identified skill gaps and boost placement probability.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Milestones Done:</span>
          <span className="font-mono text-xs font-bold text-brand-300 px-2.5 py-0.5 rounded-xl bg-ai-950 border border-brand-500/30 shadow-sm">
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
                  ? 'bg-ai-950/40 border-ai-800/50 opacity-60'
                  : isHighPriority
                  ? 'bg-ai-900/80 border-brand-500/40 hover:border-brand-500/70 hover:shadow-glow-purple/20'
                  : 'bg-ai-950/70 border-ai-800 hover:border-brand-500/30'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-brand-400 hover:text-brand-300 transition shrink-0"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-brand-400" />
                  ) : (
                    <Square className="w-5 h-5 text-ai-700" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isHighPriority
                        ? 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/35'
                        : 'bg-brand-500/15 text-brand-300 border-brand-500/35'
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

              {/* Impact Tag with glowing gradient */}
              <div className="shrink-0 text-right">
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-brand-500/15 border border-brand-500/35 text-[11px] font-bold text-brand-300 shadow-sm">
                  <TrendingUp className="w-3 h-3 text-brand-400" />
                  <span>{item.impact}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-ai-950/70 border border-ai-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-brand-400" />
          <span>Execute prioritized recommendations to unlock top-tier compensation brackets.</span>
        </div>
        <span className="text-brand-400 font-semibold hidden sm:inline flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Synced</span>
        </span>
      </div>
    </div>
  );
}
