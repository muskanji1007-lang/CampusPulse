import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StudentProfileForm from './components/StudentProfileForm';
import ReadinessScoreCard from './components/ReadinessScoreCard';
import SkillRadarChart from './components/SkillRadarChart';
import CompanyEligibilityTable from './components/CompanyEligibilityTable';
import ActionableRoadmap from './components/ActionableRoadmap';
import AuthModal from './components/AuthModal';
import Hero3DCanvas from './components/Hero3DCanvas';
import { 
  calculateReadinessIndex, 
  evaluateTierEligibility, 
  prepareRadarChartData, 
  generateActionableRoadmap 
} from './utils/analyticsEngine';
import { loadStoredStudent, saveStoredStudent } from './utils/storage';
import { getActiveUser, clearActiveUser, setActiveUser } from './utils/auth';
import { INITIAL_STUDENT_STATE } from './data/companyBenchmarks';
import { Share2, Check, Sparkles } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getActiveUser());
  const [student, setStudent] = useState(() => {
    const user = getActiveUser();
    if (user) return user;
    return loadStoredStudent();
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  // Sync to LocalStorage on update
  useEffect(() => {
    if (currentUser) {
      saveStoredStudent(student);
      setActiveUser(student);
    }
  }, [student, currentUser]);

  // Algorithmic derivations using useMemo for high performance
  const assessment = useMemo(() => calculateReadinessIndex(student), [student]);
  const tiers = useMemo(() => evaluateTierEligibility(student), [student]);
  const radarData = useMemo(() => prepareRadarChartData(student), [student]);
  const roadmap = useMemo(() => generateActionableRoadmap(student), [student]);

  // Trigger celebration confetti when readiness crosses into Tier 1 (85%+)
  useEffect(() => {
    if (currentUser && assessment.score >= 85) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#0284C7', '#38BDF8', '#10B981', '#F59E0B']
        });
      } catch (e) {
        // graceful fallback if canvas-confetti fails
      }
    }
  }, [assessment.score, currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setStudent(user);
    saveStoredStudent(user);
  };

  const handleLogout = () => {
    clearActiveUser();
    setCurrentUser(null);
  };

  const handleReset = () => {
    setStudent(INITIAL_STUDENT_STATE);
  };

  const handleCopySummary = () => {
    const summaryText = `🎓 CampusPulse Placement Diagnostic for ${student.fullName}:
- Readiness Score: ${assessment.score}% (${assessment.label})
- Tier Status: ${assessment.tierRank}
- CGPA: ${student.cgpa} | Projects: ${student.projectsCount} | Internships: ${student.internshipsCount}
- DSA Rating: ${student.skills?.dsa}/5.0 | WebDev: ${student.skills?.webDev}/5.0
Analyzed via CampusPulse Placement Suite 🚀`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#0284C7] selection:text-white">
      {/* If not authenticated, show Auth Modal */}
      {!currentUser && (
        <AuthModal onLoginSuccess={handleLoginSuccess} />
      )}

      {/* Top Navigation */}
      <Navbar 
        candidateName={student.fullName} 
        onLogout={currentUser ? handleLogout : null}
      />

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
          
          {/* Top Banner Alert / Overview Header in Light Bento Style */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs">
            {/* Ambient subtle sky glow in background */}
            <div className="absolute top-0 right-1/4 w-64 h-32 bg-sky-100/60 rounded-full blur-3xl pointer-events-none"></div>

            {/* Left Content */}
            <div className="relative z-10 flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0284C7] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Enterprise Placement Audit</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-xs text-slate-500">{student.branch}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-1.5">
                Candidate Dashboard • {student.fullName}
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                Profile currently qualifies for <span className="font-semibold text-slate-900">{assessment.tierRank}</span>. Explore interactive analytics and diagnostic benchmarks below.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 mt-4">
                <button
                  onClick={handleCopySummary}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 transition flex items-center space-x-2 shadow-2xs"
                  title="Copy text summary to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#0284C7]" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Summary Copied!' : 'Share Audit'}</span>
                </button>

                <div className="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center space-x-2 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-[#0284C7]">Readiness:</span>
                  <span className="text-xs font-mono font-bold text-slate-900">{assessment.score}%</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Placement Constellation Node */}
            <div className="w-full sm:w-64 h-44 shrink-0 relative flex items-center justify-center">
              <Hero3DCanvas className="w-full h-full" />
              <div className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-mono tracking-wider pointer-events-none">
                Interactive Graph
              </div>
            </div>
          </div>

          {/* Tab 1: Overview Dashboard with Bento Layout */}
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
      <footer className="border-t border-slate-200 bg-white mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            CampusPulse © 2026. Built with Clean Light Enterprise Design System by{' '}
            <span className="font-semibold text-slate-800">Muskan Gupta</span>.
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-500">Deterministic Placement Engine</span>
            <span>•</span>
            <span className="text-[#0284C7] font-semibold">Production Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
