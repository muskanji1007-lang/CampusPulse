/**
 * CampusPulse - Client-Side Authentication & Session Manager
 * Provides user registration, persistent login sessions, and 1-click reviewer access
 */

import { INITIAL_STUDENT_STATE } from '../data/companyBenchmarks';

const AUTH_USER_KEY = 'campuspulse_active_user';
const USERS_REGISTRY_KEY = 'campuspulse_registered_users';

// Demo Presets for 1-Click Access
export const DEMO_PROFILES = [
  {
    fullName: 'Muskan Gupta',
    email: 'muskan.gupta@college.edu',
    branch: 'Computer Science & Engineering',
    targetRole: 'Frontend / Full-Stack Engineer',
    cgpa: 8.5,
    projectsCount: 3,
    internshipsCount: 1,
    skills: {
      dsa: 4.2,
      webDev: 4.5,
      coreCs: 3.8,
      problemSolving: 4.0,
      systemDesign: 3.2,
      softSkills: 4.2
    }
  },
  {
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    branch: 'Information Technology',
    targetRole: 'Software Development Engineer (SDE-1)',
    cgpa: 7.2,
    projectsCount: 2,
    internshipsCount: 0,
    skills: {
      dsa: 3.0,
      webDev: 3.2,
      coreCs: 3.0,
      problemSolving: 2.8,
      systemDesign: 2.0,
      softSkills: 3.5
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
  // Client-side authentication logic against registry
  const users = getRegisteredUsers();
  const matched = users.find(u => u.email?.toLowerCase() === email?.toLowerCase());
  if (matched) {
    setActiveUser(matched);
    return { success: true, user: matched };
  }
  // If not found in registry, create dynamic session for testing
  const fallbackUser = {
    ...INITIAL_STUDENT_STATE,
    fullName: email.split('@')[0].replace('.', ' '),
    email: email
  };
  setActiveUser(fallbackUser);
  return { success: true, user: fallbackUser };
}
