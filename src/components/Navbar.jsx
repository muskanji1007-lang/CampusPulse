import React from 'react';
import { GraduationCap, Github, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar({ candidateName = 'Muskan Gupta', onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title with Light Theme */}
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-xs">
            <GraduationCap className="w-4 h-4 text-[#0284C7]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-base tracking-tight text-slate-900">
                Campus<span className="text-[#0284C7]">Pulse</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200">
                Enterprise Suite
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Diagnostic Placement & Skill Analytics Platform</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse"></span>
            <span className="text-slate-800 font-medium">Drive Season 2026</span>
          </div>

          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-900">{candidateName}</div>
              <div className="text-[10px] text-[#0284C7] flex items-center justify-end space-x-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-[#0284C7]" />
                <span>Verified Candidate</span>
              </div>
            </div>

            {/* Logout / Switch Profile Button */}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-rose-600 transition"
                title="Sign Out / Switch Profile"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            <a
              href="https://github.com/muskanji1007-lang/CampusPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all duration-200"
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
