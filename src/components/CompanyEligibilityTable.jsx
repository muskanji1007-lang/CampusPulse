import React from 'react';
import { Building2, CheckCircle2, XCircle, AlertCircle, Briefcase, DollarSign } from 'lucide-react';

export default function CompanyEligibilityTable({ tiers = [] }) {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <span>Company Tier Eligibility Matrix</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time candidate profile validation across industry tier benchmarks.
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Evaluated against 5 key technical & academic factors
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tiers.map((tier) => (
          <div
            key={tier.tierId}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              tier.isEligible
                ? 'bg-navy-900/90 border-teal-500/40 shadow-glow-teal/20'
                : 'bg-navy-950/70 border-navy-800 hover:border-navy-700'
            }`}
          >
            <div className="space-y-4">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy-800 text-slate-300 border border-navy-700">
                    {tier.badge}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-2 leading-snug">{tier.tierName}</h3>
                </div>
                {tier.isEligible ? (
                  <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" title="Eligible">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="p-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30" title="Criteria Gaps">
                    <AlertCircle className="w-5 h-5" />
                  </span>
                )}
              </div>

              {/* CTC Range & Typical Recruiters */}
              <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-850 space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-teal-300 font-semibold">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Est. Package: {tier.salaryRange}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="font-medium text-slate-300">Recruiters:</span> {tier.examples.join(', ')}
                </div>
              </div>

              {/* Match Percentage Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 text-[11px]">Criteria Match:</span>
                  <span className="font-mono font-bold text-white">{tier.matchPercentage}% ({tier.criteriaMet}/{tier.totalCriteria})</span>
                </div>
                <div className="w-full h-1.5 bg-navy-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tier.isEligible ? 'bg-teal-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${tier.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Gap List or Success message */}
              <div className="pt-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {tier.isEligible ? 'Status Overview' : 'Pending Requirements'}
                </div>
                {tier.gaps.length > 0 ? (
                  <ul className="space-y-1.5">
                    {tier.gaps.map((gap, index) => (
                      <li key={index} className="text-[11px] text-rose-300 flex items-start space-x-1.5 leading-tight">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
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
            <div className="pt-4 mt-4 border-t border-navy-850">
              <div className={`text-center py-1.5 px-3 rounded-lg text-xs font-semibold ${
                tier.isEligible
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-navy-950 text-slate-400 border border-navy-800'
              }`}>
                {tier.isEligible ? 'Eligible for Direct Drives' : 'Requires Preparation'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
