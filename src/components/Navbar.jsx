import React from 'react';
import { GraduationCap, Sparkles, Github, ShieldCheck } from 'lucide-react';

export default function Navbar({ candidateName = 'Muskan Gupta' }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-800/80 bg-navy-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-300 p-0.5 flex items-center justify-center shadow-glow-teal">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">Campus<span className="text-teal-400">Pulse</span></span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                v1.0 Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Placement Readiness & Skill Gap Analytics</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Batch 2026-27 Active</span>
          </div>

          <div className="flex items-center space-x-3 pl-2 border-l border-navy-800">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-200">{candidateName}</div>
              <div className="text-[10px] text-teal-400 flex items-center justify-end space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Candidate</span>
              </div>
            </div>

            <a
              href="https://github.com/muskanji1007-lang/CampusPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-navy-900 hover:bg-navy-850 border border-navy-800 hover:border-teal-500/40 text-slate-300 hover:text-teal-300 transition-all duration-200"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
