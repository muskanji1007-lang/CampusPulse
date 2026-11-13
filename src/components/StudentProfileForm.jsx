import React from 'react';
import { CORE_SKILL_CATEGORIES } from '../data/companyBenchmarks';
import { User, Award, BookOpen, Briefcase, RefreshCw, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function StudentProfileForm({ student, onUpdateStudent, onReset }) {
  const handleInputChange = (field, value) => {
    onUpdateStudent({
      ...student,
      [field]: value
    });
  };

  const handleSkillChange = (skillKey, value) => {
    onUpdateStudent({
      ...student,
      skills: {
        ...student.skills,
        [skillKey]: parseFloat(value)
      }
    });
  };

  const applyPreset = (presetName) => {
    if (presetName === 'top') {
      onUpdateStudent({
        ...student,
        cgpa: 8.9,
        projectsCount: 4,
        internshipsCount: 2,
        skills: {
          dsa: 4.6,
          webDev: 4.5,
          coreCs: 4.3,
          problemSolving: 4.5,
          systemDesign: 3.8,
          softSkills: 4.5
        }
      });
    } else if (presetName === 'average') {
      onUpdateStudent({
        ...student,
        cgpa: 7.4,
        projectsCount: 2,
        internshipsCount: 0,
        skills: {
          dsa: 3.2,
          webDev: 3.5,
          coreCs: 3.0,
          problemSolving: 3.0,
          systemDesign: 2.0,
          softSkills: 3.5
        }
      });
    } else if (presetName === 'fresher') {
      onUpdateStudent({
        ...student,
        cgpa: 6.8,
        projectsCount: 1,
        internshipsCount: 0,
        skills: {
          dsa: 2.4,
          webDev: 2.8,
          coreCs: 2.5,
          problemSolving: 2.6,
          systemDesign: 1.5,
          softSkills: 3.0
        }
      });
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ai-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <span>Interactive Profile & Skill Diagnostic</span>
          </h2>
          <p className="text-xs text-slate-400">
            Dynamically adjust academic benchmarks and skill proficiency to trigger real-time AI analytics.
          </p>
        </div>

        {/* Preset Buttons with AI Violet Styling */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-400 hidden md:inline">Quick Presets:</span>
          <button
            onClick={() => applyPreset('fresher')}
            className="px-2.5 py-1 text-xs rounded-xl bg-ai-850 hover:bg-ai-800 border border-ai-700 text-slate-300 hover:text-white transition"
          >
            Entry Level
          </button>
          <button
            onClick={() => applyPreset('average')}
            className="px-2.5 py-1 text-xs rounded-xl bg-ai-850 hover:bg-ai-800 border border-ai-700 text-brand-300 transition"
          >
            Moderate
          </button>
          <button
            onClick={() => applyPreset('top')}
            className="px-2.5 py-1 text-xs rounded-xl bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/40 text-brand-300 font-semibold shadow-glow-purple/20 transition flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>Top Tier</span>
          </button>
          <button
            onClick={onReset}
            title="Reset to default"
            className="p-1.5 rounded-xl bg-ai-850 hover:bg-ai-800 text-slate-400 hover:text-brand-300 border border-ai-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Basic Academic Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3.5 rounded-xl bg-ai-950/70 border border-ai-800 hover:border-brand-500/30 transition">
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-400" />
            <span>Current CGPA (out of 10)</span>
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="5.0"
              max="10.0"
              step="0.1"
              value={student.cgpa || 7.5}
              onChange={(e) => handleInputChange('cgpa', parseFloat(e.target.value))}
              className="w-full accent-brand-400 cursor-pointer h-2 bg-ai-800 rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-brand-300 bg-ai-900 px-2.5 py-1 rounded-lg border border-ai-700 min-w-[50px] text-center shadow-sm">
              {student.cgpa?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-ai-950/70 border border-ai-800 hover:border-brand-500/30 transition">
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Technical Projects Count</span>
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={student.projectsCount ?? 2}
              onChange={(e) => handleInputChange('projectsCount', parseInt(e.target.value))}
              className="w-full accent-fuchsia-400 cursor-pointer h-2 bg-ai-800 rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-fuchsia-300 bg-ai-900 px-2.5 py-1 rounded-lg border border-ai-700 min-w-[40px] text-center shadow-sm">
              {student.projectsCount ?? 0}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-ai-950/70 border border-ai-800 hover:border-brand-500/30 transition">
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
            <Briefcase className="w-3.5 h-3.5 text-brand-300" />
            <span>Internships Count</span>
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="0"
              max="3"
              step="1"
              value={student.internshipsCount ?? 1}
              onChange={(e) => handleInputChange('internshipsCount', parseInt(e.target.value))}
              className="w-full accent-brand-300 cursor-pointer h-2 bg-ai-800 rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-brand-300 bg-ai-900 px-2.5 py-1 rounded-lg border border-ai-700 min-w-[40px] text-center shadow-sm">
              {student.internshipsCount ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Skill Level Sliders (1 to 5) */}
      <div className="pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Core AI Competency Weights (1 to 5 Scale)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_SKILL_CATEGORIES.map((category) => {
            const currentScore = student.skills?.[category.key] || 3.0;
            return (
              <div key={category.key} className="p-3.5 rounded-xl bg-ai-950/60 border border-ai-800/80 hover:border-brand-500/40 hover:shadow-glow-purple/10 transition">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-slate-200">{category.label}</span>
                  <span className="font-mono font-bold text-brand-300 bg-ai-900 px-2 py-0.5 rounded border border-ai-700">
                    {currentScore.toFixed(1)} / 5.0
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={currentScore}
                  onChange={(e) => handleSkillChange(category.key, e.target.value)}
                  className="w-full accent-brand-400 cursor-pointer h-1.5 bg-ai-800 rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
