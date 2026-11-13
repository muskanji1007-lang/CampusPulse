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
import { Share2, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [student, setStudent] = useState(() => loadStoredStudent());
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

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
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#10B981', '#34D399', '#F59E0B', '#FFFFFF']
        });
      } catch (e) {
        // graceful fallback if canvas-confetti fails
      }
    }
  }, [assessment.score]);

  const handleReset = () => {
    setStudent(INITIAL_STUDENT_STATE);
  };

  const handleCopySummary = () => {
    const summaryText = `🎓 CampusPulse Placement Diagnostic for ${student.fullName}:
- Readiness Score: ${assessment.score}% (${assessment.label})
- Tier Status: ${assessment.tierRank}
- CGPA: ${student.cgpa} | Projects: ${student.projectsCount} | Internships: ${student.internshipsCount}
- DSA Rating: ${student.skills?.dsa}/5.0 | WebDev: ${student.skills?.webDev}/5.0
Analyzed via CampusPulse Suite 🚀`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
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
          
          {/* Top Banner Alert / Overview Header - Magic UI Pro Bento Style */}
          <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">Student Placement Audit</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                <span className="text-xs text-zinc-400">{student.branch}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Candidate Dashboard • {student.fullName}
              </h1>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                Profile currently qualifies for <span className="font-semibold text-zinc-200">{assessment.tierRank}</span>. Real-time skill gaps and benchmarks are detailed below.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0 relative z-10">
              <button
                onClick={handleCopySummary}
                className="px-3.5 py-2 rounded-xl bg-dark-950 hover:bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition flex items-center space-x-2 shadow-sm"
                title="Copy text summary to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copied ? 'Summary Copied!' : 'Share Audit'}</span>
              </button>

              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <div className="text-[10px] uppercase font-bold text-emerald-400">Readiness</div>
                <div className="text-sm font-mono font-bold text-white">{assessment.score}%</div>
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
      <footer className="border-t border-white/[0.08] bg-dark-950/80 mt-12 py-6 text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            CampusPulse © 2026. Built with React & Bento Dark Aesthetic by{' '}
            <span className="font-semibold text-white">Muskan Gupta</span>.
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-zinc-400">Algorithmic Placement Engine</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Production Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
