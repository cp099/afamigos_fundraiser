import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  CampaignConfig,
  Contribution,
  PublicCampaignData,
  Student,
} from './types';
import { calculatePublicAggregates } from './utils';
import {
  INITIAL_CAMPAIGN_CONFIG,
  INITIAL_CONTRIBUTIONS,
  INITIAL_PUBLIC_DATA,
  INITIAL_STUDENTS_ROSTER,
} from './mock-data';

const PUBLIC_CAMPAIGN_DOC_ID = 'afamigos_fundraiser';
const LOCAL_STORAGE_KEY_PREFIX = 'afamigos_data_v1_';

// Local storage helpers for demo/preview mode
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('afamigos_local_update', { detail: { key } }));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

// -------------------------------------------------------------
// PUBLIC DATA API (Zero-leak guarantee)
// -------------------------------------------------------------

/**
 * Subscribes to the sanitized public campaign data.
 * Works seamlessly on laptops and mobile devices (via HTTP polling in preview, Firestore in prod).
 */
export function subscribeToPublicCampaign(
  callback: (data: PublicCampaignData) => void
): () => void {
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, 'public_campaign', PUBLIC_CAMPAIGN_DOC_ID);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PublicCampaignData;
          callback(data);
        } else {
          callback(INITIAL_PUBLIC_DATA);
        }
      },
      (error) => {
        console.warn('Public campaign snapshot subscription notice:', error);
        callback(INITIAL_PUBLIC_DATA);
      }
    );
    return unsubscribe;
  }

  // Cross-device server fetch & fallback
  let isMounted = true;

  const fetchServerPublicData = async () => {
    try {
      const res = await fetch('/api/public-campaign', { cache: 'no-store' });
      if (res.ok) {
        const data = (await res.json()) as PublicCampaignData;
        if (isMounted && data) {
          callback(data);
          return;
        }
      }
    } catch {
      // Fall back to local calculation if server is unreachable
    }

    if (isMounted) {
      const target = getLocalItem<number>('target', INITIAL_CAMPAIGN_CONFIG.target);
      const contributions = getLocalItem<Contribution[]>('contributions', INITIAL_CONTRIBUTIONS);
      const students = getLocalItem<Student[]>('students', INITIAL_STUDENTS_ROSTER);
      const publicData = calculatePublicAggregates(target, contributions, students);
      callback(publicData);
    }
  };

  fetchServerPublicData();

  // Poll server every 4 seconds so phones and laptops stay 100% in sync without reload
  const pollInterval = setInterval(fetchServerPublicData, 4000);

  const handleStorageChange = () => {
    fetchServerPublicData();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('afamigos_local_update', handleStorageChange);
  }

  return () => {
    isMounted = false;
    clearInterval(pollInterval);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('afamigos_local_update', handleStorageChange);
    }
  };
}

// -------------------------------------------------------------
// ADMIN DATA APIS (Protected Firestore Collections & Sync)
// -------------------------------------------------------------

/**
 * Synchronizes and updates the sanitized public aggregate document in Firestore.
 */
export async function syncAndRecalculateAggregates(customTarget?: number): Promise<PublicCampaignData> {
  if (isFirebaseConfigured() && db) {
    let target = customTarget || INITIAL_CAMPAIGN_CONFIG.target;
    try {
      const campRef = doc(db, 'campaigns', PUBLIC_CAMPAIGN_DOC_ID);
      const campSnap = await getDoc(campRef);
      if (campSnap.exists()) {
        const campData = campSnap.data() as CampaignConfig;
        if (!customTarget && campData.target) {
          target = campData.target;
        }
      }
    } catch (e) {
      console.warn('Could not read campaign config:', e);
    }

    const contribsSnap = await getDocs(collection(db, 'contributions'));
    const contributions: Contribution[] = [];
    contribsSnap.forEach((d) => {
      contributions.push({ id: d.id, ...(d.data() as Omit<Contribution, 'id'>) });
    });

    const studentsSnap = await getDocs(collection(db, 'students'));
    const students: Student[] = [];
    studentsSnap.forEach((d) => {
      students.push({ id: d.id, ...(d.data() as Omit<Student, 'id'>) });
    });

    const publicData = calculatePublicAggregates(target, contributions, students);
    await setDoc(doc(db, 'public_campaign', PUBLIC_CAMPAIGN_DOC_ID), publicData);
    return publicData;
  }

  // Local storage recalculation
  const target = customTarget || getLocalItem<number>('target', INITIAL_CAMPAIGN_CONFIG.target);
  const contributions = getLocalItem<Contribution[]>('contributions', INITIAL_CONTRIBUTIONS);
  const students = getLocalItem<Student[]>('students', INITIAL_STUDENTS_ROSTER);
  const publicData = calculatePublicAggregates(target, contributions, students);
  setLocalItem('public_data', publicData);
  return publicData;
}

export function subscribeToAdminCampaignConfig(
  callback: (config: CampaignConfig) => void
): () => void {
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, 'campaigns', PUBLIC_CAMPAIGN_DOC_ID);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as CampaignConfig);
      } else {
        callback(INITIAL_CAMPAIGN_CONFIG);
      }
    });
  }

  const fetchServerAdminData = async () => {
    try {
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      if (res.ok) {
        const state = await res.json();
        callback({
          ...INITIAL_CAMPAIGN_CONFIG,
          target: state.target,
        });
        return;
      }
    } catch {
      // fallback
    }
    const target = getLocalItem<number>('target', INITIAL_CAMPAIGN_CONFIG.target);
    callback({
      ...INITIAL_CAMPAIGN_CONFIG,
      target,
    });
  };

  fetchServerAdminData();
  const pollInterval = setInterval(fetchServerAdminData, 4000);

  if (typeof window !== 'undefined') {
    const handleUpdate = () => fetchServerAdminData();
    window.addEventListener('afamigos_local_update', handleUpdate);
    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('afamigos_local_update', handleUpdate);
    };
  }
  return () => clearInterval(pollInterval);
}

export function subscribeToStudents(
  callback: (students: Student[]) => void
): () => void {
  if (isFirebaseConfigured() && db) {
    const q = query(collection(db, 'students'), orderBy('name', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const list: Student[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...(doc.data() as Omit<Student, 'id'>) });
      });
      callback(list);
    });
  }

  const fetchServerStudents = async () => {
    try {
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      if (res.ok) {
        const state = await res.json();
        if (state.students && Array.isArray(state.students)) {
          callback(state.students);
          return;
        }
      }
    } catch {
      // fallback
    }
    const students = getLocalItem<Student[]>('students', INITIAL_STUDENTS_ROSTER);
    callback(students);
  };

  fetchServerStudents();
  const pollInterval = setInterval(fetchServerStudents, 4000);

  if (typeof window !== 'undefined') {
    const handleUpdate = () => fetchServerStudents();
    window.addEventListener('afamigos_local_update', handleUpdate);
    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('afamigos_local_update', handleUpdate);
    };
  }
  return () => clearInterval(pollInterval);
}

export function subscribeToContributions(
  callback: (contributions: Contribution[]) => void
): () => void {
  if (isFirebaseConfigured() && db) {
    const q = query(collection(db, 'contributions'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const list: Contribution[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...(doc.data() as Omit<Contribution, 'id'>) });
      });
      callback(list);
    });
  }

  const fetchServerContributions = async () => {
    try {
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      if (res.ok) {
        const state = await res.json();
        if (state.contributions && Array.isArray(state.contributions)) {
          callback(state.contributions);
          return;
        }
      }
    } catch {
      // fallback
    }
    const contribs = getLocalItem<Contribution[]>('contributions', INITIAL_CONTRIBUTIONS);
    callback(contribs);
  };

  fetchServerContributions();
  const pollInterval = setInterval(fetchServerContributions, 4000);

  if (typeof window !== 'undefined') {
    const handleUpdate = () => fetchServerContributions();
    window.addEventListener('afamigos_local_update', handleUpdate);
    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('afamigos_local_update', handleUpdate);
    };
  }
  return () => clearInterval(pollInterval);
}

export async function addContribution(
  studentId: string,
  studentName: string,
  amount: number,
  note?: string
): Promise<void> {
  const numericAmount = Number(amount);
  if (!studentId || !studentName || numericAmount <= 0) {
    throw new Error('Valid student and contribution amount greater than 0 are required.');
  }

  const newId = 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const contributionData: Omit<Contribution, 'id'> = {
    studentId,
    studentName,
    amount: numericAmount,
    createdAt: Date.now(),
    note: note || '',
  };

  if (isFirebaseConfigured() && db) {
    await setDoc(doc(db, 'contributions', newId), contributionData);
    await syncAndRecalculateAggregates();
    return;
  }

  try {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add_contribution',
        payload: { studentId, studentName, amount: numericAmount, note },
      }),
    });
  } catch (e) {
    console.warn('API sync fallback to local:', e);
  }

  const current = getLocalItem<Contribution[]>('contributions', INITIAL_CONTRIBUTIONS);
  const updated = [{ id: newId, ...contributionData }, ...current];
  setLocalItem('contributions', updated);
  await syncAndRecalculateAggregates();
}

export async function updateContribution(
  id: string,
  studentId: string,
  studentName: string,
  amount: number,
  note?: string
): Promise<void> {
  const numericAmount = Number(amount);
  if (!id || !studentId || numericAmount <= 0) {
    throw new Error('Valid ID, student, and contribution amount are required.');
  }

  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, 'contributions', id);
    const existingSnap = await getDoc(docRef);
    const existingData = existingSnap.data() as Contribution | undefined;

    await setDoc(
      docRef,
      {
        studentId,
        studentName,
        amount: numericAmount,
        note: note || '',
        updatedAt: Date.now(),
        createdAt: existingData?.createdAt || Date.now(),
      },
      { merge: true }
    );
    await syncAndRecalculateAggregates();
    return;
  }

  try {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_contribution',
        payload: { id, studentId, studentName, amount: numericAmount, note },
      }),
    });
  } catch (e) {
    console.warn('API sync fallback to local:', e);
  }

  const current = getLocalItem<Contribution[]>('contributions', INITIAL_CONTRIBUTIONS);
  const updated = current.map((c) =>
    c.id === id
      ? {
          ...c,
          studentId,
          studentName,
          amount: numericAmount,
          note: note || '',
          updatedAt: Date.now(),
        }
      : c
  );
  setLocalItem('contributions', updated);
  await syncAndRecalculateAggregates();
}

export async function deleteContribution(id: string): Promise<void> {
  if (!id) throw new Error('Valid contribution ID is required.');

  if (isFirebaseConfigured() && db) {
    await deleteDoc(doc(db, 'contributions', id));
    await syncAndRecalculateAggregates();
    return;
  }

  try {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete_contribution',
        payload: { id },
      }),
    });
  } catch (e) {
    console.warn('API sync fallback to local:', e);
  }

  const current = getLocalItem<Contribution[]>('contributions', INITIAL_CONTRIBUTIONS);
  const updated = current.filter((c) => c.id !== id);
  setLocalItem('contributions', updated);
  await syncAndRecalculateAggregates();
}

export async function addStudent(name: string, rollNumber?: string): Promise<Student> {
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Student name cannot be empty.');

  const newId = 'stu_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
  const newStudent: Student = {
    id: newId,
    name: trimmed,
    rollNumber: rollNumber?.trim() || '',
    active: true,
    createdAt: Date.now(),
  };

  if (isFirebaseConfigured() && db) {
    await setDoc(doc(db, 'students', newId), {
      name: newStudent.name,
      rollNumber: newStudent.rollNumber,
      active: true,
      createdAt: newStudent.createdAt,
    });
    return newStudent;
  }

  try {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add_student',
        payload: { name: trimmed, rollNumber },
      }),
    });
  } catch (e) {
    console.warn('API sync fallback to local:', e);
  }

  const current = getLocalItem<Student[]>('students', INITIAL_STUDENTS_ROSTER);
  const updated = [...current, newStudent].sort((a, b) => a.name.localeCompare(b.name));
  setLocalItem('students', updated);
  return newStudent;
}

export async function updateCampaignTarget(target: number): Promise<void> {
  const numericTarget = Number(target);
  if (numericTarget <= 0) throw new Error('Campaign target must be greater than 0.');

  if (isFirebaseConfigured() && db) {
    await setDoc(
      doc(db, 'campaigns', PUBLIC_CAMPAIGN_DOC_ID),
      {
        target: numericTarget,
        title: 'Child Sponsorship Program',
        active: true,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    await syncAndRecalculateAggregates(numericTarget);
    return;
  }

  try {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_target',
        payload: { target: numericTarget },
      }),
    });
  } catch (e) {
    console.warn('API sync fallback to local:', e);
  }

  setLocalItem('target', numericTarget);
  await syncAndRecalculateAggregates(numericTarget);
}

/**
 * Initializes Firestore with seed roster and campaign if completely empty.
 */
export async function initializeFirestoreSeed(): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;

  try {
    const studentsSnap = await getDocs(collection(db, 'students'));
    if (studentsSnap.empty) {
      for (const s of INITIAL_STUDENTS_ROSTER) {
        await setDoc(doc(db, 'students', s.id), {
          name: s.name,
          active: s.active,
          createdAt: s.createdAt,
        });
      }
    }

    const campRef = doc(db, 'campaigns', PUBLIC_CAMPAIGN_DOC_ID);
    const campSnap = await getDoc(campRef);
    if (!campSnap.exists()) {
      await setDoc(campRef, INITIAL_CAMPAIGN_CONFIG);
    }

    const contribSnap = await getDocs(collection(db, 'contributions'));
    if (contribSnap.empty) {
      for (const c of INITIAL_CONTRIBUTIONS) {
        await setDoc(doc(db, 'contributions', c.id), {
          studentId: c.studentId,
          studentName: c.studentName,
          amount: c.amount,
          createdAt: c.createdAt,
        });
      }
    }

    await syncAndRecalculateAggregates();
  } catch (err) {
    console.warn('Seed initialization notice:', err);
  }
}
