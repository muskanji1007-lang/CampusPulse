import React from 'react';
import { GraduationCap, Github, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar({ candidateName = 'Muskan Gupta', onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#101613]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title with Obsidian + Emerald System */}
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#151C19] border border-white/[0.08] flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-base tracking-tight text-[#E8EDE9]">
                Campus<span className="text-[#9CA9A1]">Pulse</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full bg-[#1D3028] text-[#6EE7B7] border border-white/[0.08]">
                Enterprise Suite
              </span>
            </div>
            <p className="text-[11px] text-[#9CA9A1] hidden sm:block">Diagnostic Placement & Skill Analytics Platform</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#151C19] border border-white/[0.08] text-xs text-[#9CA9A1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span className="text-[#E8EDE9] font-medium">Drive Season 2026</span>
          </div>

          <div className="flex items-center space-x-3 pl-3 border-l border-white/[0.08]">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-[#E8EDE9]">{candidateName}</div>
              <div className="text-[10px] text-[#10B981] flex items-center justify-end space-x-1">
                <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                <span>Verified Candidate</span>
              </div>
            </div>

            {/* Logout / Switch Profile Button */}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-2 rounded-xl bg-[#151C19] hover:bg-[#1D3028] border border-white/[0.08] text-[#9CA9A1] hover:text-[#F87171] transition"
                title="Sign Out / Switch Profile"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            <a
              href="https://github.com/muskanji1007-lang/CampusPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#151C19] hover:bg-[#1D3028] border border-white/[0.08] text-[#9CA9A1] hover:text-[#E8EDE9] transition"
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
