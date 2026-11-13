/**
 * CampusPulse - LocalStorage Client State Manager
 * Provides reliable browser persistence for student profiles and assessment history
 */

import { INITIAL_STUDENT_STATE } from '../data/companyBenchmarks';

const STORAGE_KEY = 'campuspulse_student_profile';
const HISTORY_KEY = 'campuspulse_assessment_history';

export function loadStoredStudent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STUDENT_STATE;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_STUDENT_STATE, ...parsed };
  } catch (error) {
    console.warn('Failed to load profile from localStorage:', error);
    return INITIAL_STUDENT_STATE;
  }
}

export function saveStoredStudent(studentData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studentData));
  } catch (error) {
    console.error('Failed to save profile to localStorage:', error);
  }
}

export function saveAssessmentRecord(record) {
  try {
    const existing = loadAssessmentHistory();
    const updated = [record, ...existing].slice(0, 10); // keep last 10 assessments
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save assessment record:', error);
    return [];
  }
}

export function loadAssessmentHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to load history:', error);
    return [];
  }
}
