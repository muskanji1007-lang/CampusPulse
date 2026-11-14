import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  EyeOff,
  Briefcase
} from 'lucide-react';
import { DEMO_PROFILES, registerUser, authenticateUser } from '../utils/auth';

export default function AuthModal({ onLoginSuccess }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [branch, setBranch] = useState('CSE - Artificial Intelligence & Machine Learning (CSE-AIML)');
  const [targetRole, setTargetRole] = useState('Frontend / Full-Stack Engineer');
  const [cgpa, setCgpa] = useState(8.5);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email) return;
    const res = authenticateUser(email, password);
    if (res.success) {
      onLoginSuccess(res.user);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName || !email) return;
    const newUser = registerUser({
      fullName,
      email,
      branch,
      targetRole,
      cgpa: parseFloat(cgpa)
    });
    if (newUser) {
      onLoginSuccess(newUser);
    }
  };

  const handleDemoSelect = (profile) => {
    registerUser(profile);
    onLoginSuccess(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#151C19] p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl border border-white/[0.08]">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-11 h-11 mx-auto rounded-xl bg-[#1D3028] border border-white/[0.08] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-[#10B981]" />
          </div>
          <h2 className="text-xl font-bold font-heading text-[#E8EDE9] tracking-tight">
            Campus<span className="text-[#9CA9A1]">Pulse</span> Authentication
          </h2>
          <p className="text-xs text-[#9CA9A1]">
            Sign in to access your placement readiness audit and personalized benchmarks.
          </p>
        </div>

        {/* Quick Reviewer 1-Click Access Box */}
        <div className="mb-6 p-3.5 rounded-xl bg-[#101613] border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-[#E8EDE9] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>1-Click Reviewer Access</span>
            </span>
            <span className="text-[#6EE7B7] text-[10px] font-medium">Instant Access</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_PROFILES.map((profile, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleDemoSelect(profile)}
                className="p-2.5 rounded-xl bg-[#151C19] hover:bg-[#1D3028] border border-white/[0.08] hover:border-[#10B981]/30 text-left transition text-xs group"
              >
                <div className="font-semibold text-[#E8EDE9] group-hover:text-[#6EE7B7] transition text-[11px] truncate">
                  {profile.fullName}
                </div>
                <div className="text-[10px] text-[#9CA9A1] truncate">
                  {profile.branch.includes('AIML') ? 'CSE (AI/ML)' : 'CSE (Data Science)'} • CGPA {profile.cgpa}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Sign In vs Register */}
        <div className="flex rounded-xl bg-[#101613] p-1 border border-white/[0.08] mb-5">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-[#1D3028] text-[#E8EDE9] border border-white/[0.08] shadow-sm'
                : 'text-[#9CA9A1] hover:text-[#E8EDE9]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-[#1D3028] text-[#E8EDE9] border border-white/[0.08] shadow-sm'
                : 'text-[#9CA9A1] hover:text-[#E8EDE9]'
            }`}
          >
            Create Profile
          </button>
        </div>

        {/* Form: Sign In */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#E8EDE9] mb-1">College Email / Student ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#9CA9A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="muskan.gupta@college.edu"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#101613] border border-white/[0.08] text-xs text-[#E8EDE9] placeholder-[#6E7D75] focus:outline-none focus:border-[#10B981]/50 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#E8EDE9] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9CA9A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#101613] border border-white/[0.08] text-xs text-[#E8EDE9] placeholder-[#6E7D75] focus:outline-none focus:border-[#10B981]/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#9CA9A1] hover:text-[#E8EDE9] absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#10B981] hover:bg-[#6EE7B7] text-[#0B0F0E] font-semibold text-xs transition flex items-center justify-center space-x-2 mt-4 shadow-sm"
            >
              <span>Sign In to Candidate Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          /* Form: Register Profile */
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-[#E8EDE9] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-[#9CA9A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muskan Gupta"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#101613] border border-white/[0.08] text-xs text-[#E8EDE9] placeholder-[#6E7D75] focus:outline-none focus:border-[#10B981]/50 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#E8EDE9] mb-1">College Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#9CA9A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="muskan@college.edu"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#101613] border border-white/[0.08] text-xs text-[#E8EDE9] placeholder-[#6E7D75] focus:outline-none focus:border-[#10B981]/50 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-[#E8EDE9] mb-1">Engineering Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-xl bg-[#101613] border border-white/[0.08] text-[11px] text-[#E8EDE9] focus:outline-none focus:border-[#10B981]/50 transition"
                >
                  <option value="CSE - Artificial Intelligence & Machine Learning (CSE-AIML)">CSE (AI & ML)</option>
                  <option value="CSE - Data Science (CSE-DS)">CSE (Data Science)</option>
                  <option value="Computer Science & Engineering (Core CSE)">Core CSE</option>
                  <option value="CSE - Cyber Security (CSE-CS)">CSE (Cyber Security)</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#E8EDE9] mb-1">Current CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  min="5.0"
                  max="10.0"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-xl bg-[#101613] border border-white/[0.08] text-[11px] text-[#E8EDE9] focus:outline-none focus:border-[#10B981]/50 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#E8EDE9] mb-1">Target Dream Role</label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-[#9CA9A1] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Frontend Engineer / SDE-1"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#101613] border border-white/[0.08] text-xs text-[#E8EDE9] placeholder-[#6E7D75] focus:outline-none focus:border-[#10B981]/50 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#10B981] hover:bg-[#6EE7B7] text-[#0B0F0E] font-semibold text-xs transition flex items-center justify-center space-x-2 mt-4 shadow-sm"
            >
              <span>Register Profile & Launch Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
