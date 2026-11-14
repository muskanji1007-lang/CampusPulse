import React from 'react';
import { Building2, CheckCircle2, XCircle, AlertCircle, DollarSign } from 'lucide-react';

export default function CompanyEligibilityTable({ tiers = [] }) {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold font-heading text-slate-900 flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-100 text-[#0284C7]">
              <Building2 className="w-4 h-4" />
            </div>
            <span>Company Tier Eligibility Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated qualification validation against standardized recruitment cutoffs.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          5 Core Assessment Dimensions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.tierId}
            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
              tier.isEligible
                ? 'bg-white border-sky-300 shadow-md ring-1 ring-sky-200'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-4">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    tier.tierId === 'tier1'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : tier.tierId === 'tier2'
                      ? 'bg-sky-50 text-[#0284C7] border-sky-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    {tier.badge}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-slate-900 mt-2.5 leading-snug">{tier.tierName}</h3>
                </div>
                {tier.isEligible ? (
                  <span className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-xs" title="Eligible">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200" title="Benchmark Gaps">
                    <AlertCircle className="w-4 h-4" />
                  </span>
                )}
              </div>

              {/* CTC Range & Typical Recruiters */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-900 font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Est. Package: {tier.salaryRange}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <span className="font-medium text-slate-900">Recruiters:</span> {tier.examples.join(', ')}
                </div>
              </div>

              {/* Match Percentage Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 text-[11px]">Criteria Match:</span>
                  <span className="font-mono font-bold text-slate-900">{tier.matchPercentage}% ({tier.criteriaMet}/{tier.totalCriteria})</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tier.isEligible ? 'bg-[#0284C7]' : 'bg-amber-500'
                    }`}
                    style={{ width: `${tier.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Gap List or Success message */}
              <div className="pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  {tier.isEligible ? 'Status' : 'Pending Requirements'}
                </div>
                {tier.gaps.length > 0 ? (
                  <ul className="space-y-1.5">
                    {tier.gaps.map((gap, index) => (
                      <li key={index} className="text-[11px] text-slate-600 flex items-start space-x-1.5 leading-tight">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-emerald-600 font-medium flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Candidate satisfies all primary benchmarks for this tier!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className={`text-center py-1.5 px-3 rounded-lg text-xs font-semibold ${
                tier.isEligible
                  ? 'bg-sky-50 text-[#0284C7] border border-sky-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
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
