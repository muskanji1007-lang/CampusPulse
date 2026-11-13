import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StudentProfileForm from './components/StudentProfileForm';
import ReadinessScoreCard from './components/ReadinessScoreCard';
import SkillRadarChart from './components/SkillRadarChart';
import CompanyEligibilityTable from './components/CompanyEligibilityTable';
import ActionableRoadmap from './components/ActionableRoadmap';
import { 
  calculateReadinessIndex, 
  evaluateTierEligibility, 
  prepareRadarChartData, 
  generateActionableRoadmap 
} from './utils/analyticsEngine';
import { loadStoredStudent, saveStoredStudent } from './utils/storage';
import { INITIAL_STUDENT_STATE } from './data/companyBenchmarks';
import { Sparkles, BarChart3, CheckCircle, Flame } from 'lucide-react';

export default function App() {
  const [student, setStudent] = useState(() => loadStoredStudent());
  const [activeTab, setActiveTab] = useState('overview');

  // Sync to LocalStorage on update
  useEffect(() => {
    saveStoredStudent(student);
  }, [student]);

  // Algorithmic derivations using useMemo for high performance
  const assessment = useMemo(() => calculateReadinessIndex(student), [student]);
  const tiers = useMemo(() => evaluateTierEligibility(student), [student]);
  const radarData = useMemo(() => prepareRadarChartData(student), [student]);
  const roadmap = useMemo(() => generateActionableRoadmap(student), [student]);

  // Trigger celebration confetti when readiness crosses into Tier 1 (85%+)
  useEffect(() => {
    if (assessment.score >= 85) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.85 }
        });
      } catch (e) {
        // graceful fallback if canvas-confetti is not loaded
      }
    }
  }, [assessment.score]);

  const handleReset = () => {
    setStudent(INITIAL_STUDENT_STATE);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-navy-950">
      {/* Top Navigation */}
      <Navbar candidateName={student.fullName} />

      {/* Main Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          readinessScore={assessment.score} 
        />

        {/* Dynamic Main Content Pane */}
        <main className="flex-1 space-y-6">
          
          {/* Top Banner Alert / Overview Header */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-teal-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glow-subtle">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Student Placement Audit</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span className="text-xs text-slate-400">{student.branch}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Welcome back, {student.fullName.split(' ')[0]} 👋
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Your profile is currently evaluated for <span className="font-semibold text-teal-300">{assessment.tierRank}</span>. Review skill gaps and recommendations below.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-navy-950/80 border border-navy-800 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Target Role</div>
                <div className="text-xs font-bold text-teal-300">{student.targetRole}</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-center">
                <div className="text-[10px] uppercase font-bold text-teal-400">Readiness</div>
                <div className="text-xs font-mono font-bold text-teal-300">{assessment.score}%</div>
              </div>
            </div>
          </div>

          {/* Tab 1: Overview Dashboard */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Row 1: Readiness Gauge + Radar Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReadinessScoreCard assessment={assessment} />
                <SkillRadarChart data={radarData} />
              </div>

              {/* Row 2: Student Profile Evaluator Form */}
              <StudentProfileForm 
                student={student} 
                onUpdateStudent={setStudent} 
                onReset={handleReset} 
              />

              {/* Row 3: Company Tier Eligibility Table */}
              <CompanyEligibilityTable tiers={tiers} />

              {/* Row 4: Actionable Preparation Roadmap */}
              <ActionableRoadmap roadmap={roadmap} />
            </div>
          )}

          {/* Tab 2: Profile & Skills Evaluator */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <StudentProfileForm 
                student={student} 
                onUpdateStudent={setStudent} 
                onReset={handleReset} 
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReadinessScoreCard assessment={assessment} />
                <SkillRadarChart data={radarData} />
              </div>
            </div>
          )}

          {/* Tab 3: Company Tier Eligibility Matrix */}
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              <CompanyEligibilityTable tiers={tiers} />
              <ReadinessScoreCard assessment={assessment} />
            </div>
          )}

          {/* Tab 4: Actionable Roadmap */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <ActionableRoadmap roadmap={roadmap} />
              <SkillRadarChart data={radarData} />
            </div>
          )}

        </main>
      </div>

      {/* Minimalist Professional Footer */}
      <footer className="border-t border-navy-800/60 bg-navy-950/80 mt-12 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            CampusPulse © 2026. Built with React & Tailwind CSS by{' '}
            <span className="font-semibold text-teal-400">Muskan Gupta</span>.
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-400">Client-Side Analytics Engine</span>
            <span>•</span>
            <span className="text-teal-400">Open-Source Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
