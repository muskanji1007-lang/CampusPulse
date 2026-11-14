import React from 'react';
import { Building2, CheckCircle2, XCircle, AlertCircle, DollarSign } from 'lucide-react';

export default function CompanyEligibilityTable({ tiers = [] }) {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
        <div>
          <h2 className="text-base font-bold font-heading text-[#E8EDE9] flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#1D3028] border border-white/[0.08] text-[#10B981]">
              <Building2 className="w-4 h-4" />
            </div>
            <span>Company Tier Eligibility Matrix</span>
          </h2>
          <p className="text-xs text-[#9CA9A1] mt-0.5">
            Automated qualification validation against standardized recruitment cutoffs.
          </p>
        </div>
        <div className="text-xs text-[#9CA9A1] font-medium">
          5 Core Assessment Dimensions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.tierId}
            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
              tier.isEligible
                ? 'bg-[#151C19] border-[#10B981]/30 shadow-sm'
                : 'bg-[#101613] border-white/[0.08] hover:border-white/[0.14]'
            }`}
          >
            <div className="space-y-4">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    tier.tierId === 'tier1'
                      ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                      : tier.tierId === 'tier2'
                      ? 'bg-[#10B981]/10 text-[#6EE7B7] border-[#10B981]/30'
                      : 'bg-[#1D3028] text-[#9CA9A1] border-white/[0.08]'
                  }`}>
                    {tier.badge}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-[#E8EDE9] mt-2.5 leading-snug">{tier.tierName}</h3>
                </div>
                {tier.isEligible ? (
                  <span className="p-1.5 rounded-full bg-[#1D3028] text-[#10B981] border border-[#10B981]/30" title="Eligible">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1.5 rounded-full bg-[#1D3028] text-[#F59E0B] border border-[#F59E0B]/20" title="Benchmark Gaps">
                    <AlertCircle className="w-4 h-4" />
                  </span>
                )}
              </div>

              {/* CTC Range & Typical Recruiters */}
              <div className="p-3 rounded-xl bg-[#0B0F0E] border border-white/[0.08] space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-[#E8EDE9] font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Est. Package: {tier.salaryRange}</span>
                </div>
                <div className="text-[11px] text-[#9CA9A1]">
                  <span className="font-medium text-[#E8EDE9]">Recruiters:</span> {tier.examples.join(', ')}
                </div>
              </div>

              {/* Match Percentage Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9CA9A1] text-[11px]">Criteria Match:</span>
                  <span className="font-mono font-bold text-[#E8EDE9]">{tier.matchPercentage}% ({tier.criteriaMet}/{tier.totalCriteria})</span>
                </div>
                <div className="w-full h-1.5 bg-[#1D3028] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tier.isEligible ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                    }`}
                    style={{ width: `${tier.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Gap List or Success message */}
              <div className="pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA9A1] mb-2">
                  {tier.isEligible ? 'Status' : 'Pending Requirements'}
                </div>
                {tier.gaps.length > 0 ? (
                  <ul className="space-y-1.5">
                    {tier.gaps.map((gap, index) => (
                      <li key={index} className="text-[11px] text-[#9CA9A1] flex items-start space-x-1.5 leading-tight">
                        <XCircle className="w-3.5 h-3.5 text-[#F87171] shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-[#10B981] font-medium flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Candidate satisfies all primary benchmarks for this tier!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="pt-4 mt-4 border-t border-white/[0.08]">
              <div className={`text-center py-1.5 px-3 rounded-lg text-xs font-semibold ${
                tier.isEligible
                  ? 'bg-[#1D3028] text-[#6EE7B7] border border-[#10B981]/30'
                  : 'bg-[#0B0F0E] text-[#9CA9A1] border border-white/[0.08]'
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
