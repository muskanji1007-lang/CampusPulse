import React from 'react';
import { Building2, CheckCircle2, XCircle, AlertCircle, DollarSign } from 'lucide-react';

export default function CompanyEligibilityTable({ tiers = [] }) {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#38BDF8]/15 pb-4">
        <div>
          <h2 className="text-base font-bold font-heading text-[#F1F5F9] flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#1B2A4A] border border-[#38BDF8]/25 text-[#06B6D4]">
              <Building2 className="w-4 h-4" />
            </div>
            <span>Company Tier Eligibility Matrix</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Automated qualification validation against standardized recruitment cutoffs.
          </p>
        </div>
        <div className="text-xs text-[#94A3B8] font-medium">
          5 Core Assessment Dimensions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.tierId}
            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
              tier.isEligible
                ? 'bg-[#131C31] border-[#06B6D4]/45 shadow-sm'
                : 'bg-[#0D1527] border-[#38BDF8]/15 hover:border-[#38BDF8]/30'
            }`}
          >
            <div className="space-y-4">
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    tier.tierId === 'tier1'
                      ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/35'
                      : tier.tierId === 'tier2'
                      ? 'bg-[#06B6D4]/15 text-[#38BDF8] border-[#06B6D4]/35'
                      : 'bg-[#1B2A4A] text-[#94A3B8] border-white/[0.08]'
                  }`}>
                    {tier.badge}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-[#F1F5F9] mt-2.5 leading-snug">{tier.tierName}</h3>
                </div>
                {tier.isEligible ? (
                  <span className="p-1.5 rounded-full bg-[#1B2A4A] text-[#06B6D4] border border-[#06B6D4]/40" title="Eligible">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1.5 rounded-full bg-[#1B2A4A] text-[#F59E0B] border border-[#F59E0B]/25" title="Benchmark Gaps">
                    <AlertCircle className="w-4 h-4" />
                  </span>
                )}
              </div>

              {/* CTC Range & Typical Recruiters */}
              <div className="p-3 rounded-xl bg-[#0A0F1D] border border-[#38BDF8]/15 space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-[#F1F5F9] font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>Est. Package: {tier.salaryRange}</span>
                </div>
                <div className="text-[11px] text-[#94A3B8]">
                  <span className="font-medium text-[#F1F5F9]">Recruiters:</span> {tier.examples.join(', ')}
                </div>
              </div>

              {/* Match Percentage Progress in Cyan */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#94A3B8] text-[11px]">Criteria Match:</span>
                  <span className="font-mono font-bold text-[#F1F5F9]">{tier.matchPercentage}% ({tier.criteriaMet}/{tier.totalCriteria})</span>
                </div>
                <div className="w-full h-1.5 bg-[#1B2A4A] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      tier.isEligible ? 'bg-[#06B6D4]' : 'bg-[#F59E0B]'
                    }`}
                    style={{ width: `${tier.matchPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Gap List or Success message */}
              <div className="pt-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                  {tier.isEligible ? 'Status' : 'Pending Requirements'}
                </div>
                {tier.gaps.length > 0 ? (
                  <ul className="space-y-1.5">
                    {tier.gaps.map((gap, index) => (
                      <li key={index} className="text-[11px] text-[#94A3B8] flex items-start space-x-1.5 leading-tight">
                        <XCircle className="w-3.5 h-3.5 text-[#FB7185] shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-[#06B6D4] font-medium flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0" />
                    <span>Candidate satisfies all primary benchmarks for this tier!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Ribbon */}
            <div className="pt-4 mt-4 border-t border-[#38BDF8]/15">
              <div className={`text-center py-1.5 px-3 rounded-lg text-xs font-semibold ${
                tier.isEligible
                  ? 'bg-[#1B2A4A] text-[#38BDF8] border border-[#06B6D4]/35 shadow-sm'
                  : 'bg-[#0A0F1D] text-[#94A3B8] border border-[#38BDF8]/15'
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
