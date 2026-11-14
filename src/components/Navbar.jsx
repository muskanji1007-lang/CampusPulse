import React from 'react';
import { GraduationCap, Github, ShieldCheck, LogOut } from 'lucide-react';

export default function Navbar({ candidateName = 'Muskan Gupta', onLogout }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#38BDF8]/15 bg-[#0D1527]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title with Midnight Oceanic System */}
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#1B2A4A] border border-[#38BDF8]/20 flex items-center justify-center shadow-sm">
            <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-base tracking-tight text-[#F1F5F9]">
                Campus<span className="text-[#38BDF8]">Pulse</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full bg-[#1B2A4A] text-[#38BDF8] border border-[#38BDF8]/25">
                Oceanic Suite
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] hidden sm:block">Diagnostic Placement & Skill Analytics Platform</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#131C31] border border-[#38BDF8]/15 text-xs text-[#94A3B8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
            <span className="text-[#F1F5F9] font-medium">Drive Season 2026</span>
          </div>

          <div className="flex items-center space-x-3 pl-3 border-l border-[#38BDF8]/15">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-[#F1F5F9]">{candidateName}</div>
              <div className="text-[10px] text-[#06B6D4] flex items-center justify-end space-x-1">
                <ShieldCheck className="w-3 h-3 text-[#06B6D4]" />
                <span>Verified Candidate</span>
              </div>
            </div>

            {/* Logout / Switch Profile Button */}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-2 rounded-xl bg-[#131C31] hover:bg-[#1B2A4A] border border-[#38BDF8]/15 text-[#94A3B8] hover:text-[#FB7185] transition"
                title="Sign Out / Switch Profile"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            <a
              href="https://github.com/muskanji1007-lang/CampusPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#131C31] hover:bg-[#1B2A4A] border border-[#38BDF8]/15 text-[#94A3B8] hover:text-[#F1F5F9] transition-all duration-200"
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
