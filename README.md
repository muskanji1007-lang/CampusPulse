# 🎓 CampusPulse – Student Placement & Skill Gap Analytics Dashboard

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.13-22B5BF?style=for-the-badge)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **CampusPulse** is an interactive, industry-oriented placement readiness and skill-gap analytics dashboard for engineering students. It empowers students to evaluate their academic and technical profile, identify skill gaps against real recruitment benchmarks, check tier-wise company eligibility, and generate tailored preparation roadmaps.

---

## 🌟 Key Features

- **📊 Placement Readiness Score (0–100%)**: Dynamic weighted algorithm evaluating Academic Consistency (CGPA), DSA Proficiency, Full-Stack / Core Projects, and Internship experience.
- **🎯 Company Tier Eligibility Matrix**: Real-time evaluation against standard criteria across **Tier 1 (Product MNCs)**, **Tier 2 (High-Growth Tech Startups)**, and **Tier 3 (Mass Recruiters)**.
- **🕸️ Skill Gap Radar Visualization**: Interactive radar comparison chart (powered by `Recharts`) contrasting the student's current skill distribution against industry expectations.
- **🗺️ Actionable Prep Roadmap**: Automated step-by-step guidance pinpointing exact topics to focus on to bridge identified deficiencies.
- **💾 LocalStorage Session Persistence**: Seamless client-side caching so student assessment history and input data persist across browser refreshes without requiring external servers.
- **🎨 Premium Dark Navy & Teal UI**: Built with Tailwind CSS following an ergonomic, professional color palette designed for clarity and modern aesthetic appeal.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 18 (Vite SPA)
- **Styling & Design System:** Tailwind CSS with custom navy (`#0B132B`) and teal (`#00B4D8`) tokens
- **Data Visualization:** Recharts (Radar, Bar, and Gauge charts)
- **Iconography:** Lucide React
- **Analytics Logic:** Pure Client-side Algorithmic Scoring Engine (`src/utils/analyticsEngine.js`)
- **State & Storage:** React Hooks (`useState`, `useMemo`, `useEffect`) + Browser `localStorage`

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muskanji1007-lang/CampusPulse.git
   cd CampusPulse
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📂 Project Structure

```text
CampusPulse/
├── src/
│   ├── components/         # Modular UI Components
│   │   ├── Navbar.jsx              # Header with logo & status indicator
│   │   ├── Sidebar.jsx             # Category and page navigation
│   │   ├── StudentProfileForm.jsx  # Input form for CGPA, DSA, & Skills
│   │   ├── ReadinessScoreCard.jsx  # Animated radial gauge & tier badge
│   │   ├── SkillRadarChart.jsx     # Recharts multi-axis skill comparison
│   │   ├── CompanyEligibility.jsx  # Tier 1, 2, 3 eligibility breakdown
│   │   └── ActionableRoadmap.jsx   # Dynamic weekly prep recommendations
│   ├── data/
│   │   └── companyBenchmarks.js    # Industry hiring benchmarks & cutoffs
│   ├── utils/
│   │   ├── analyticsEngine.js      # Weighted scoring & gap detection logic
│   │   └── storage.js              # LocalStorage sync helpers
│   ├── App.jsx                     # Root application container & state
│   ├── index.css                   # Global styles & Tailwind directives
│   └── main.jsx                    # Vite React entry point
├── index.html                      # HTML template
├── tailwind.config.js              # Theme customization
├── vite.config.js                  # Vite configuration
└── package.json                    # Project metadata & scripts
```

---

## 👩‍💻 Author

Developed with ❤️ by **[Muskan Gupta](https://github.com/muskanji1007-lang)**.
