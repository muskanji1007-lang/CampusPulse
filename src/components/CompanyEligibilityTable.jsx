import React from 'react';
import { Building2, CheckCircle2, XCircle, AlertCircle, DollarSign } from 'lucide-react';

export default function CompanyEligibilityTable({ tiers = [] }) {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-emerald-400">
              <Building2 className="w-4 h-4" />
            </div>
            <span>Company Tier Eligibility Matrix</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Automated qualification validation against standardized recruitment cutoffs.
          </p>
        </div>
        <div className="text-xs text-zinc-400 font-medium">
          5 Core Assessment Dimensions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.tierId}
            className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              tier.isEligible
                ? 'bg-dark-900/90 border-emerald-500/30'
                : 'bg-dark-950/70 border-white/[0.07] hover:border-white/15'
            }`}
          >
            <div className="space-y-4">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    tier.tierId === 'tier1'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : tier.tierId === 'tier2'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    {tier.badge}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-2 leading-snug">{tier.tierName}</h3>
                </div>
                {tier.isEligible ? (
                  <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" title="Eligible">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700" title="Criteria Gaps">
                    <AlertCircle className="w-4 h-4" />
                  </span>
                )}
              </div>

              {/* CTC Range & Typical Recruiters */}
              <div className="p-3 rounded-xl bg-dark-950/90 border border-white/[0.06] space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-zinc-200 font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Est. Package: {tier.salaryRange}</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  <span className="font-medium text-zinc-300">Recruiters:</span> {tier.examples.join(', ')}
                </div>
              </div>

              {/* Match Percentage Progress in Magic UI style */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-400 text-[11px]">Criteria Match:</span>
                  <span className="font-mono font-bold text-white">{tier.matchPercentage}% ({tier.criteriaMet}/{tier.totalCriteria})</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tier.isEligible ? 'bg-emerald-400' : 'bg-zinc-600'
                    }`}
                    style={{ width: `${tier.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Gap List or Success message */}
              <div className="pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  {tier.isEligible ? 'Status' : 'Pending Requirements'}
                </div>
                {tier.gaps.length > 0 ? (
                  <ul className="space-y-1.5">
                    {tier.gaps.map((gap, index) => (
                      <li key={index} className="text-[11px] text-zinc-300 flex items-start space-x-1.5 leading-tight">
                        <XCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
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
            <div className="pt-4 mt-4 border-t border-white/[0.06]">
              <div className={`text-center py-1.5 px-3 rounded-lg text-xs font-semibold ${
                tier.isEligible
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                  : 'bg-dark-950 text-zinc-400 border border-white/[0.06]'
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
