import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  BookOpen,
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
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [targetRole, setTargetRole] = useState('Frontend / Full-Stack Engineer');
  const [cgpa, setCgpa] = useState(8.2);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-white/10">
        
        {/* Subtle top spotlight glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 p-[1px] shadow-sm">
            <div className="w-full h-full bg-dark-900 rounded-[15px] flex items-center justify-center border border-white/10">
              <GraduationCap className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Campus<span className="text-zinc-400">Pulse</span> Authentication
          </h2>
          <p className="text-xs text-zinc-400">
            Sign in to access your placement readiness audit and personalized benchmarks.
          </p>
        </div>

        {/* Quick Reviewer 1-Click Access Box */}
        <div className="mb-6 p-3.5 rounded-2xl bg-dark-950/80 border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-zinc-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>1-Click Reviewer Access</span>
            </span>
            <span className="text-emerald-400 text-[10px] font-medium">Instant Login</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_PROFILES.map((profile, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleDemoSelect(profile)}
                className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/[0.07] hover:border-emerald-500/40 text-left transition text-xs group"
              >
                <div className="font-semibold text-white group-hover:text-emerald-300 transition text-[11px] truncate">
                  {profile.fullName}
                </div>
                <div className="text-[10px] text-zinc-400 truncate">{profile.branch.split(' ')[0]} • CGPA {profile.cgpa}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Sign In vs Register */}
        <div className="flex rounded-xl bg-dark-950 p-1 border border-white/[0.07] mb-5">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Create Profile
          </button>
        </div>

        {/* Form: Sign In */}
        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">College Email / Student ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-500 hover:text-zinc-300 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition flex items-center justify-center space-x-2 mt-4 shadow-sm"
            >
              <span>Sign In to Candidate Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          /* Form: Register Profile */
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muskan Gupta"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">College Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">Engineering Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-[11px] text-zinc-300 focus:outline-none focus:border-emerald-500/60 transition"
                >
                  <option value="Computer Science & Engineering">CSE</option>
                  <option value="Information Technology">IT</option>
                  <option value="Electronics & Communication">ECE</option>
                  <option value="Electrical Engineering">EE</option>
                  <option value="Mechanical Engineering">ME</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">Starting CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  min="5.0"
                  max="10.0"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-[11px] text-white focus:outline-none focus:border-emerald-500/60 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">Target Dream Role</label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. SDE-1 / Frontend Engineer"
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition flex items-center justify-center space-x-2 mt-4 shadow-sm"
            >
              <span>Register & Launch Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
