import React from 'react';
import { CORE_SKILL_CATEGORIES } from '../data/companyBenchmarks';
import { User, Award, BookOpen, Briefcase, RefreshCw, Sparkles } from 'lucide-react';

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
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <User className="w-5 h-5 text-teal-400" />
            <span>Student Profile & Skill Evaluator</span>
          </h2>
          <p className="text-xs text-slate-400">
            Adjust academic parameters and technical skill ratings to see real-time placement analytics.
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-400 hidden md:inline">Presets:</span>
          <button
            onClick={() => applyPreset('fresher')}
            className="px-2.5 py-1 text-xs rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-slate-300 transition"
          >
            Entry
          </button>
          <button
            onClick={() => applyPreset('average')}
            className="px-2.5 py-1 text-xs rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-teal-300 transition"
          >
            Moderate
          </button>
          <button
            onClick={() => applyPreset('top')}
            className="px-2.5 py-1 text-xs rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 transition font-medium"
          >
            Top Performer
          </button>
          <button
            onClick={onReset}
            title="Reset to original"
            className="p-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-400 hover:text-white transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Basic Academic Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
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
              className="w-full accent-teal-400 cursor-pointer h-2 bg-navy-800 rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-teal-300 bg-navy-950 px-2.5 py-1 rounded-lg border border-navy-800 min-w-[50px] text-center">
              {student.cgpa?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
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
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-navy-800 rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-cyan-300 bg-navy-950 px-2.5 py-1 rounded-lg border border-navy-800 min-w-[40px] text-center">
              {student.projectsCount ?? 0}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
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
              className="w-full accent-amber-400 cursor-pointer h-2 bg-navy-800 rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-amber-300 bg-navy-950 px-2.5 py-1 rounded-lg border border-navy-800 min-w-[40px] text-center">
              {student.internshipsCount ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Skill Level Sliders (1 to 5) */}
      <div className="pt-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Technical & Core Competencies (1 to 5 Scale)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_SKILL_CATEGORIES.map((category) => {
            const currentScore = student.skills?.[category.key] || 3.0;
            return (
              <div key={category.key} className="p-3 rounded-xl bg-navy-950/60 border border-navy-800/80 hover:border-navy-700 transition">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-slate-200">{category.label}</span>
                  <span className="font-mono font-bold text-teal-400 bg-navy-900 px-2 py-0.5 rounded border border-navy-800">
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
                  className="w-full accent-teal-400 cursor-pointer h-1.5 bg-navy-800 rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
