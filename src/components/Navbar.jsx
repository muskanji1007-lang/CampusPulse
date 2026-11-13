import React from 'react';
import { GraduationCap, Github, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar({ candidateName = 'Muskan Gupta', onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-dark-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title with Magic UI Pro Minimalism */}
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 p-[1px] shadow-sm">
            <div className="w-full h-full bg-dark-900 rounded-[11px] flex items-center justify-center border border-white/10">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white">Campus<span className="text-zinc-400">Pulse</span></span>
              <span className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-300 border border-white/10">
                Placement Suite
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">Diagnostic Placement & Skill Analytics Platform</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-xs text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-zinc-300 font-medium">Drive Season 2026</span>
          </div>

          <div className="flex items-center space-x-3 pl-3 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-zinc-200">{candidateName}</div>
              <div className="text-[10px] text-emerald-400 flex items-center justify-end space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Candidate</span>
              </div>
            </div>

            {/* Logout / Switch Profile Button */}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-rose-400 transition"
                title="Sign Out / Switch Profile"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            <a
              href="https://github.com/muskanji1007-lang/CampusPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-white/10 text-zinc-400 hover:text-white transition-all duration-200"
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
