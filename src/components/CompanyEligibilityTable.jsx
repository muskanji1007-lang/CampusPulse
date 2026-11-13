import React from 'react';
import { Building2, CheckCircle2, XCircle, AlertCircle, DollarSign, Sparkles } from 'lucide-react';

export default function CompanyEligibilityTable({ tiers = [] }) {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden group">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ai-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-brand-500/15 border border-brand-500/30 text-brand-400">
              <Building2 className="w-4 h-4" />
            </div>
            <span>Company Tier Eligibility Engine</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time multi-variable qualification against standardized industry tier benchmarks.
          </p>
        </div>
        <div className="text-xs text-brand-300 font-medium flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Automated Eligibility Auditing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((tier) => (
          <div
            key={tier.tierId}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              tier.isEligible
                ? 'bg-ai-900/90 border-brand-500/40 shadow-glow-purple/20'
                : 'bg-ai-950/70 border-ai-800 hover:border-ai-700'
            }`}
          >
            <div className="space-y-4">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-ai-850 text-brand-300 border border-brand-500/30">
                    {tier.badge}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-2 leading-snug">{tier.tierName}</h3>
                </div>
                {tier.isEligible ? (
                  <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" title="Eligible">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="p-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30" title="Criteria Gaps">
                    <AlertCircle className="w-5 h-5" />
                  </span>
                )}
              </div>

              {/* CTC Range & Typical Recruiters */}
              <div className="p-3 rounded-xl bg-ai-950/90 border border-ai-800 space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-brand-300 font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-brand-400" />
                  <span>Est. Package: {tier.salaryRange}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="font-medium text-slate-300">Recruiters:</span> {tier.examples.join(', ')}
                </div>
              </div>

              {/* Match Percentage Progress in AI Violet */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 text-[11px]">Criteria Match:</span>
                  <span className="font-mono font-bold text-white">{tier.matchPercentage}% ({tier.criteriaMet}/{tier.totalCriteria})</span>
                </div>
                <div className="w-full h-1.5 bg-ai-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tier.isEligible ? 'bg-gradient-to-r from-brand-500 to-fuchsia-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${tier.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Gap List or Success message */}
              <div className="pt-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {tier.isEligible ? 'Qualification Status' : 'Identified Requirements'}
                </div>
                {tier.gaps.length > 0 ? (
                  <ul className="space-y-1.5">
                    {tier.gaps.map((gap, index) => (
                      <li key={index} className="text-[11px] text-fuchsia-300 flex items-start space-x-1.5 leading-tight">
                        <XCircle className="w-3.5 h-3.5 text-fuchsia-400 shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-emerald-400 font-medium flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Candidate satisfies all primary benchmarks for this tier!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="pt-4 mt-4 border-t border-ai-800">
              <div className={`text-center py-1.5 px-3 rounded-xl text-xs font-semibold ${
                tier.isEligible
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-glow-purple/20'
                  : 'bg-ai-950 text-slate-400 border border-ai-800'
              }`}>
                {tier.isEligible ? 'Direct Campus Drive Eligible' : 'Requires Targeted Prep'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
