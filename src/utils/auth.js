/**
 * CampusPulse - Client-Side Authentication & Session Manager
 * Provides user registration, persistent login sessions, and 1-click reviewer access
 */

import { INITIAL_STUDENT_STATE } from '../data/companyBenchmarks';

const AUTH_USER_KEY = 'campuspulse_active_user';
const USERS_REGISTRY_KEY = 'campuspulse_registered_users';

// Real Demo Profiles tailored for Muskan
export const DEMO_PROFILES = [
  {
    fullName: 'Muskan Gupta',
    email: 'muskan.gupta@college.edu',
    branch: 'CSE - Artificial Intelligence & Machine Learning (CSE-AIML)',
    targetRole: 'Frontend / Full-Stack Engineer',
    cgpa: 8.5,
    projectsCount: 3,
    internshipsCount: 1,
    skills: {
      dsa: 4.2,
      webDev: 4.6,
      coreCs: 4.0,
      problemSolving: 4.2,
      systemDesign: 3.5,
      softSkills: 4.2
    }
  },
  {
    fullName: 'Muskan Gupta',
    email: 'muskan.ds@college.edu',
    branch: 'CSE - Data Science (CSE-DS)',
    targetRole: 'Software Development Engineer (SDE-1)',
    cgpa: 8.2,
    projectsCount: 2,
    internshipsCount: 1,
    skills: {
      dsa: 3.8,
      webDev: 4.0,
      coreCs: 3.6,
      problemSolving: 3.8,
      systemDesign: 3.0,
      softSkills: 4.0
    }
  }
];

export function getActiveUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse active user:', err);
    return null;
  }
}

export function setActiveUser(user) {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to set active user:', err);
  }
}

export function clearActiveUser() {
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (err) {
    console.error('Failed to clear active user:', err);
  }
}

export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_REGISTRY_KEY);
    if (!raw) return DEMO_PROFILES;
    return JSON.parse(raw);
  } catch (err) {
    return DEMO_PROFILES;
  }
}

export function registerUser(newUserData) {
  try {
    const existing = getRegisteredUsers();
    const newUser = {
      ...INITIAL_STUDENT_STATE,
      ...newUserData,
      createdAt: new Date().toISOString()
    };
    const updated = [newUser, ...existing.filter(u => u.email !== newUser.email)];
    localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(updated));
    setActiveUser(newUser);
    return newUser;
  } catch (err) {
    console.error('Registration failed:', err);
    return null;
  }
}

export function authenticateUser(email, password) {
  const users = getRegisteredUsers();
  const matched = users.find(u => u.email?.toLowerCase() === email?.toLowerCase());
  if (matched) {
    setActiveUser(matched);
    return { success: true, user: matched };
  }
  const fallbackUser = {
    ...INITIAL_STUDENT_STATE,
    fullName: email.split('@')[0].replace('.', ' '),
    email: email
  };
  setActiveUser(fallbackUser);
  return { success: true, user: fallbackUser };
}
