/**
 * CampusPulse Analytics Engine
 * Pure client-side algorithmic scoring, tier matching, and skill gap detection
 */

import { COMPANY_TIERS, CORE_SKILL_CATEGORIES } from '../data/companyBenchmarks';

/**
 * Calculates the overall Placement Readiness Index (0 - 100%)
 * Uses weighted multi-variable evaluation based on industry hiring trends
 */
export function calculateReadinessIndex(student) {
  if (!student) return { score: 0, label: 'Unassessed', color: 'text-slate-400' };

  // 1. CGPA Component (Weight: 25%) -> Normalized to 10
  const cgpaNormalized = Math.min(Math.max((student.cgpa || 0) / 10, 0), 1);
  const cgpaScore = cgpaNormalized * 25;

  // 2. Data Structures & Problem Solving (Weight: 30%)
  const dsaNormalized = ((student.skills?.dsa || 0) / 5);
  const dsaScore = dsaNormalized * 30;

  // 3. Technical Projects & Web Dev (Weight: 20%)
  // Factors in both project count and practical dev proficiency
  const projectFactor = Math.min((student.projectsCount || 0) / 3, 1) * 0.4;
  const devFactor = ((student.skills?.webDev || 0) / 5) * 0.6;
  const projectScore = (projectFactor + devFactor) * 20;

  // 4. Core Computer Science (OS, DBMS, CN) (Weight: 15%)
  const coreCsNormalized = ((student.skills?.coreCs || 0) / 5);
  const coreCsScore = coreCsNormalized * 15;

  // 5. Practical Experience & Soft Skills (Weight: 10%)
  const internshipBonus = Math.min((student.internshipsCount || 0) * 0.5, 1) * 0.5;
  const softSkillsNormalized = ((student.skills?.softSkills || 0) / 5) * 0.5;
  const practicalScore = (internshipBonus + softSkillsNormalized) * 10;

  // Total Composite Score
  const rawTotal = cgpaScore + dsaScore + projectScore + coreCsScore + practicalScore;
  const finalScore = Math.round(Math.min(Math.max(rawTotal, 0), 100));

  let label = 'Foundational Prep Needed';
  let tierRank = 'Not Yet Eligible for Campus Drives';
  let color = 'text-rose-400';
  let badgeBg = 'bg-rose-500/10 text-rose-300 border-rose-500/30';

  if (finalScore >= 85) {
    label = 'Top Product Tier Ready';
    tierRank = 'Tier 1 MNC Eligible';
    color = 'text-teal-400';
    badgeBg = 'bg-teal-500/10 text-teal-300 border-teal-500/30';
  } else if (finalScore >= 70) {
    label = 'High Growth Tech Ready';
    tierRank = 'Tier 2 Scale-Up Eligible';
    color = 'text-cyan-400';
    badgeBg = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
  } else if (finalScore >= 55) {
    label = 'Enterprise IT Ready';
    tierRank = 'Tier 3 Mass Recruiter Eligible';
    color = 'text-amber-400';
    badgeBg = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
  }

  return {
    score: finalScore,
    label,
    tierRank,
    color,
    badgeBg,
    breakdown: {
      cgpa: Math.round(cgpaScore),
      dsa: Math.round(dsaScore),
      projects: Math.round(projectScore),
      coreCs: Math.round(coreCsScore),
      practical: Math.round(practicalScore),
    }
  };
}

/**
 * Checks eligibility against each company tier and details specific gaps
 */
export function evaluateTierEligibility(student) {
  return COMPANY_TIERS.map(tier => {
    const gaps = [];
    let criteriaMet = 0;
    const totalCriteria = 5;

    // 1. CGPA check
    if ((student.cgpa || 0) >= tier.requirements.minCgpa) {
      criteriaMet++;
    } else {
      gaps.push(`CGPA is ${student.cgpa}, required is minimum ${tier.requirements.minCgpa}`);
    }

    // 2. DSA check
    if ((student.skills?.dsa || 0) >= tier.requirements.minDsaScore) {
      criteriaMet++;
    } else {
      gaps.push(`DSA rating is ${student.skills?.dsa || 0}/5, required is ${tier.requirements.minDsaScore}/5`);
    }

    // 3. Projects check
    if ((student.projectsCount || 0) >= tier.requirements.minProjects) {
      criteriaMet++;
    } else {
      gaps.push(`Completed ${student.projectsCount || 0} projects, recommended at least ${tier.requirements.minProjects}`);
    }

    // 4. Core CS check
    if ((student.skills?.coreCs || 0) >= tier.requirements.minCoreCs) {
      criteriaMet++;
    } else {
      gaps.push(`Core CS fundamentals rated ${student.skills?.coreCs || 0}/5, benchmark is ${tier.requirements.minCoreCs}/5`);
    }

    // 5. Internship check
    if ((student.internshipsCount || 0) >= tier.requirements.minInternships) {
      criteriaMet++;
    } else {
      gaps.push(`Needs at least ${tier.requirements.minInternships} technical internship`);
    }

    const matchPercentage = Math.round((criteriaMet / totalCriteria) * 100);
    const isEligible = criteriaMet >= 4; // allow 1 soft criteria margin for real-world nuance

    return {
      tierId: tier.id,
      tierName: tier.name,
      badge: tier.badge,
      color: tier.color,
      accent: tier.accent,
      salaryRange: tier.salaryRange,
      examples: tier.examples,
      isEligible,
      criteriaMet,
      totalCriteria,
      matchPercentage,
      gaps
    };
  });
}

/**
 * Prepares the formatted dataset for the Recharts Radar Chart
 */
export function prepareRadarChartData(student) {
  // Industry target standard across key competencies
  const industryBenchmark = {
    dsa: 4.5,
    webDev: 4.0,
    coreCs: 4.0,
    problemSolving: 4.2,
    systemDesign: 3.5,
    softSkills: 4.0
  };

  return CORE_SKILL_CATEGORIES.map(category => {
    const studentValue = student.skills?.[category.key] || 0;
    const benchmarkValue = industryBenchmark[category.key] || 4.0;
    const gap = Math.max(Number((benchmarkValue - studentValue).toFixed(1)), 0);

    return {
      subject: category.label,
      studentScore: studentValue,
      industryStandard: benchmarkValue,
      gap: gap,
      fullMark: 5
    };
  });
}

/**
 * Generates actionable, prioritized roadmap based on identified deficiencies
 */
export function generateActionableRoadmap(student) {
  const roadmap = [];

  if ((student.skills?.dsa || 0) < 4.0) {
    roadmap.push({
      priority: 'High Priority',
      tag: 'DSA & Algorithms',
      action: 'Solve 75 Blind/NeetCode problems focusing on Binary Trees, HashMaps, and Dynamic Programming.',
      impact: '+12% Placement Likelihood'
    });
  }

  if ((student.projectsCount || 0) < 2 || (student.skills?.webDev || 0) < 3.5) {
    roadmap.push({
      priority: 'Medium Priority',
      tag: 'Portfolio Projects',
      action: 'Build and deploy a full-stack CRUD application with authentication and responsive Tailwind UI.',
      impact: '+8% Placement Likelihood'
    });
  }

  if ((student.skills?.coreCs || 0) < 3.5) {
    roadmap.push({
      priority: 'High Priority',
      tag: 'Core CS Subjects',
      action: 'Revise Operating Systems (Deadlocks, Paging), DBMS (Normalization, Indexing, ACID), and Computer Networks.',
      impact: '+10% Placement Likelihood'
    });
  }

  if ((student.internshipsCount || 0) === 0) {
    roadmap.push({
      priority: 'Suggested',
      tag: 'Industry Experience',
      action: 'Contribute to open-source GitHub projects or apply for summer developer internships/freelance gigs.',
      impact: '+6% Placement Likelihood'
    });
  }

  if (roadmap.length === 0) {
    roadmap.push({
      priority: 'Maintenance',
      tag: 'Mock Interviews',
      action: 'Your profile is highly competitive! Practice timed LeetCode contests and mock behavioral HR rounds.',
      impact: 'Maintain Tier 1 Readiness'
    });
  }

  return roadmap;
}
