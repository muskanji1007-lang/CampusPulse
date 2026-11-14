import React from 'react';
import { CORE_SKILL_CATEGORIES } from '../data/companyBenchmarks';
import { BookOpen, Award, Briefcase, RefreshCw, SlidersHorizontal } from 'lucide-react';

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
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden">
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#38BDF8]/15 pb-4">
        <div>
          <h2 className="text-base font-bold font-heading text-[#F1F5F9] flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#1B2A4A] border border-[#38BDF8]/25 text-[#06B6D4]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <span>Profile & Skill Diagnostics</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Adjust academic parameters and technical skill levels to trigger real-time recalculations.
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-[#94A3B8] hidden md:inline">Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset('fresher')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#0D1527] hover:bg-[#1B2A4A] border border-[#38BDF8]/15 text-[#94A3B8] hover:text-[#F1F5F9] transition"
          >
            Entry
          </button>
          <button
            type="button"
            onClick={() => applyPreset('average')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#0D1527] hover:bg-[#1B2A4A] border border-[#38BDF8]/15 text-[#94A3B8] hover:text-[#F1F5F9] transition"
          >
            Moderate
          </button>
          <button
            type="button"
            onClick={() => applyPreset('top')}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#1B2A4A] hover:bg-[#23385D] border border-[#06B6D4]/40 text-[#38BDF8] font-medium transition shadow-sm"
          >
            Top Tier
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Reset to default"
            className="p-1.5 rounded-lg bg-[#0D1527] hover:bg-[#1B2A4A] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#38BDF8]/15 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Basic Academic Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
          <label className="block text-xs font-semibold text-[#F1F5F9] mb-2 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#06B6D4]" />
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
              className="w-full accent-[#06B6D4] cursor-pointer h-1.5 bg-[#1B2A4A] rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-[#F1F5F9] bg-[#131C31] px-2.5 py-0.5 rounded-lg border border-[#38BDF8]/20 min-w-[45px] text-center">
              {student.cgpa?.toFixed(1) || '0.0'}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
          <label className="block text-xs font-semibold text-[#F1F5F9] mb-2 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-[#06B6D4]" />
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
              className="w-full accent-[#06B6D4] cursor-pointer h-1.5 bg-[#1B2A4A] rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-[#F1F5F9] bg-[#131C31] px-2.5 py-0.5 rounded-lg border border-[#38BDF8]/20 min-w-[40px] text-center">
              {student.projectsCount ?? 0}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
          <label className="block text-xs font-semibold text-[#F1F5F9] mb-2 flex items-center space-x-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#06B6D4]" />
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
              className="w-full accent-[#06B6D4] cursor-pointer h-1.5 bg-[#1B2A4A] rounded-lg"
            />
            <span className="font-mono text-sm font-bold text-[#F1F5F9] bg-[#131C31] px-2.5 py-0.5 rounded-lg border border-[#38BDF8]/20 min-w-[40px] text-center">
              {student.internshipsCount ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Skill Level Sliders (1 to 5) */}
      <div className="pt-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3 flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></span>
          <span>Core Technical Competencies (1 to 5 Scale)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {CORE_SKILL_CATEGORIES.map((category) => {
            const currentScore = student.skills?.[category.key] || 3.0;
            return (
              <div key={category.key} className="p-3.5 rounded-xl bg-[#0D1527] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 transition">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[#F1F5F9]">{category.label}</span>
                  <span className="font-mono font-bold text-[#06B6D4] bg-[#1B2A4A] px-2 py-0.5 rounded border border-[#06B6D4]/30">
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
                  className="w-full accent-[#06B6D4] cursor-pointer h-1.5 bg-[#1B2A4A] rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
