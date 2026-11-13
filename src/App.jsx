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
import { Sparkles, Bot, Share2, Check, Download, Zap } from 'lucide-react';

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
          particleCount: 65,
          spread: 75,
          origin: { y: 0.8 },
          colors: ['#A855F7', '#C084FC', '#E879F9', '#38BDF8']
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
    const summaryText = `🎓 CampusPulse Placement Audit for ${student.fullName}:
- Placement Readiness Score: ${assessment.score}% (${assessment.label})
- Tier Status: ${assessment.tierRank}
- CGPA: ${student.cgpa} | Projects: ${student.projectsCount} | Internships: ${student.internshipsCount}
- DSA Rating: ${student.skills?.dsa}/5.0 | WebDev: ${student.skills?.webDev}/5.0
Generated via CampusPulse AI Engine 🚀`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-ai-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
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
          
          {/* Top Banner Alert / Overview Header with AI Violet Glow */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-ai-900 via-ai-850 to-ai-900 border border-brand-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glow-purple/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-fuchsia-400 flex items-center space-x-1">
                  <Bot className="w-3.5 h-3.5 text-brand-400 inline" />
                  <span>AI Placement Diagnostic</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                <span className="text-xs text-slate-400">{student.branch}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Welcome back, {student.fullName.split(' ')[0]} 👋
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Your profile is synthesized for <span className="font-semibold text-brand-300">{assessment.tierRank}</span>. Real-time skill gaps and recommendations are analyzed below.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0 relative z-10">
              <button
                onClick={handleCopySummary}
                className="px-3.5 py-2 rounded-xl bg-ai-950/80 hover:bg-ai-850 border border-brand-500/30 text-xs font-semibold text-brand-300 hover:text-white transition flex items-center space-x-2 shadow-sm"
                title="Copy text summary to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Summary Copied!' : 'Share Audit'}</span>
              </button>

              <div className="px-4 py-2 rounded-xl bg-brand-500/15 border border-brand-500/35 text-center shadow-glow-purple/20">
                <div className="text-[10px] uppercase font-bold text-brand-400">Readiness</div>
                <div className="text-sm font-mono font-extrabold text-brand-200">{assessment.score}%</div>
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
      <footer className="border-t border-ai-800/60 bg-ai-950/80 mt-12 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            CampusPulse © 2026. Built with React & AI Purple Theme by{' '}
            <span className="font-semibold text-brand-400">Muskan Gupta</span>.
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-400">Algorithmic Placement Engine</span>
            <span>•</span>
            <span className="text-brand-400">Open-Source Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
