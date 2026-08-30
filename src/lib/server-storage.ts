import fs from 'fs';
import path from 'path';
import { Contribution, PublicCampaignData, Student } from './types';
import { calculatePublicAggregates } from './utils';
import { INITIAL_CAMPAIGN_CONFIG, INITIAL_CONTRIBUTIONS, INITIAL_STUDENTS_ROSTER } from './mock-data';

interface ServerState {
  target: number;
  students: Student[];
  contributions: Contribution[];
  updatedAt: number;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'campaign-store.json');

function ensureDataFile(): ServerState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content) as ServerState;
      if (parsed && typeof parsed.target === 'number') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Server storage read note:', e);
  }

  // Initial state fallback
  const initialState: ServerState = {
    target: INITIAL_CAMPAIGN_CONFIG.target,
    students: INITIAL_STUDENTS_ROSTER,
    contributions: INITIAL_CONTRIBUTIONS,
    updatedAt: Date.now(),
  };

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Server storage write note:', e);
  }

  return initialState;
}

export function getServerState(): ServerState {
  return ensureDataFile();
}

export function saveServerState(state: ServerState): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (e) {
    console.error('Server storage write error:', e);
  }
}

export function getPublicCampaignState(): PublicCampaignData {
  const state = getServerState();
  return calculatePublicAggregates(state.target, state.contributions, state.students);
}

export function addServerContribution(
  studentId: string,
  studentName: string,
  amount: number,
  note?: string
): ServerState {
  const state = getServerState();
  const newId = 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const newContribution: Contribution = {
    id: newId,
    studentId,
    studentName,
    amount: Number(amount),
    note: note || '',
    createdAt: Date.now(),
  };

  state.contributions = [newContribution, ...state.contributions];
  state.updatedAt = Date.now();
  saveServerState(state);
  return state;
}

export function updateServerContribution(
  id: string,
  studentId: string,
  studentName: string,
  amount: number,
  note?: string
): ServerState {
  const state = getServerState();
  state.contributions = state.contributions.map((c) =>
    c.id === id
      ? {
          ...c,
          studentId,
          studentName,
          amount: Number(amount),
          note: note || '',
          updatedAt: Date.now(),
        }
      : c
  );
  state.updatedAt = Date.now();
  saveServerState(state);
  return state;
}

export function deleteServerContribution(id: string): ServerState {
  const state = getServerState();
  state.contributions = state.contributions.filter((c) => c.id !== id);
  state.updatedAt = Date.now();
  saveServerState(state);
  return state;
}

export function addServerStudent(name: string, rollNumber?: string): Student {
  const state = getServerState();
  const newId = 'stu_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
  const newStudent: Student = {
    id: newId,
    name: name.trim(),
    rollNumber: rollNumber?.trim() || '',
    active: true,
    createdAt: Date.now(),
  };

  state.students = [...state.students, newStudent].sort((a, b) => a.name.localeCompare(b.name));
  state.updatedAt = Date.now();
  saveServerState(state);
  return newStudent;
}

export function updateServerTarget(target: number): ServerState {
  const state = getServerState();
  state.target = Number(target);
  state.updatedAt = Date.now();
  saveServerState(state);
  return state;
}
