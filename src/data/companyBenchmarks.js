/**
 * CampusPulse - Industry Hiring Benchmarks & Company Profiles
 * Standard placement thresholds compiled from actual campus recruitment trends
 */

export const COMPANY_TIERS = [
  {
    id: 'tier1',
    name: 'Tier 1: Global Product & Tech Giants',
    badge: 'Product Titans',
    color: 'from-amber-400 to-amber-600',
    accent: '#F59E0B',
    salaryRange: '18 - 45+ LPA',
    examples: ['Google', 'Microsoft', 'Amazon', 'Atlassian', 'Uber'],
    requirements: {
      minCgpa: 8.0,
      minDsaScore: 4.5,
      minProjects: 3,
      minInternships: 1,
      minCoreCs: 4.0, // OS, DBMS, CN, OOPS
      preferredSkills: ['Data Structures & Algorithms', 'System Design', 'Competitive Programming', 'Distributed Systems']
    },
    description: 'Extensive multi-round coding interviews emphasizing Graph algorithms, Dynamic Programming, System Scalability, and CS Fundamentals.'
  },
  {
    id: 'tier2',
    name: 'Tier 2: High-Growth Fintech & Tech Scale-Ups',
    badge: 'Scale-Up Unicorns',
    color: 'from-teal-400 to-cyan-500',
    accent: '#00B4D8',
    salaryRange: '9 - 18 LPA',
    examples: ['Razorpay', 'Cred', 'Zomato', 'BrowserStack', 'Postman'],
    requirements: {
      minCgpa: 7.0,
      minDsaScore: 3.5,
      minProjects: 2,
      minInternships: 0,
      minCoreCs: 3.5,
      preferredSkills: ['React / Modern Frontend', 'Node.js / FastAPI', 'REST APIs', 'SQL / NoSQL Databases']
    },
    description: 'Balanced technical evaluation focusing on real-world practical development capability, clean code architecture, and medium DSA problems.'
  },
  {
    id: 'tier3',
    name: 'Tier 3: Enterprise IT & Mass Recruiters',
    badge: 'Enterprise IT',
    color: 'from-blue-400 to-indigo-500',
    accent: '#3B82F6',
    salaryRange: '4 - 9 LPA',
    examples: ['TCS (Digital/Ninja)', 'Infosys (DSE/SE)', 'Wipro', 'Accenture', 'Cognizant'],
    requirements: {
      minCgpa: 6.5,
      minDsaScore: 2.5,
      minProjects: 1,
      minInternships: 0,
      minCoreCs: 3.0,
      preferredSkills: ['Object Oriented Programming (OOPS)', 'Basic Data Structures', 'Aptitude & Verbal Reasoning', 'SQL Basics']
    },
    description: 'Aptitude screening test, quantitative reasoning, foundational programming logic, and verbal communication interviews.'
  }
];

export const CORE_SKILL_CATEGORIES = [
  { key: 'dsa', label: 'Data Structures & Algo', icon: 'Binary', maxScore: 5 },
  { key: 'webDev', label: 'Web / Full-Stack Dev', icon: 'Code2', maxScore: 5 },
  { key: 'coreCs', label: 'Core CS (OS, DBMS, CN)', icon: 'Cpu', maxScore: 5 },
  { key: 'problemSolving', label: 'Problem Solving & Logic', icon: 'Zap', maxScore: 5 },
  { key: 'systemDesign', label: 'System Architecture', icon: 'Layers', maxScore: 5 },
  { key: 'softSkills', label: 'Communication & HR', icon: 'MessageSquare', maxScore: 5 },
];

export const INITIAL_STUDENT_STATE = {
  fullName: 'Muskan Gupta',
  branch: 'Computer Science & Engineering',
  targetRole: 'Frontend / Full-Stack Engineer',
  cgpa: 8.2,
  tenthPercentage: 88,
  twelfthPercentage: 86,
  projectsCount: 2,
  internshipsCount: 1,
  skills: {
    dsa: 3.5,
    webDev: 4.5,
    coreCs: 3.5,
    problemSolving: 3.8,
    systemDesign: 2.5,
    softSkills: 4.0
  }
};
