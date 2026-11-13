import React from 'react';
import { GraduationCap, Sparkles, Github, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar({ candidateName = 'Muskan Gupta' }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ai-800/80 bg-ai-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title with AI Purple Gradient */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-fuchsia-400 p-0.5 flex items-center justify-center shadow-glow-purple">
            <div className="w-full h-full bg-ai-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-white">
                Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-fuchsia-400 to-brand-300">Pulse</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-300 border border-brand-500/35 shadow-sm">
                AI Powered
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Intelligent Placement & Skill Gap Diagnostic Engine</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-ai-900 border border-ai-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping"></span>
            <span className="text-brand-300 font-medium">Diagnostic Live</span>
          </div>

          <div className="flex items-center space-x-3 pl-2 border-l border-ai-800">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-200">{candidateName}</div>
              <div className="text-[10px] text-brand-400 flex items-center justify-end space-x-1">
                <ShieldCheck className="w-3 h-3 text-brand-400" />
                <span>Verified Candidate</span>
              </div>
            </div>

            <a
              href="https://github.com/muskanji1007-lang/CampusPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-ai-900 hover:bg-ai-850 border border-ai-800 hover:border-brand-500/50 text-slate-300 hover:text-brand-300 hover:shadow-glow-purple transition-all duration-200"
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
