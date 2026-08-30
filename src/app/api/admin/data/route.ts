import { NextResponse } from 'next/server';
import {
  getServerState,
  addServerContribution,
  updateServerContribution,
  deleteServerContribution,
  addServerStudent,
  updateServerTarget,
} from '@/lib/server-storage';
import { isFirebaseConfigured } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (isFirebaseConfigured()) {
    return NextResponse.json(
      { error: 'Forbidden: Admin data is managed directly via authenticated Firebase client.' },
      { status: 403 }
    );
  }

  const state = getServerState();
  return NextResponse.json(state);
}

export async function POST(request: Request) {
  if (isFirebaseConfigured()) {
    return NextResponse.json(
      { error: 'Forbidden: Admin data is managed directly via authenticated Firebase client.' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { action, payload } = body;

    switch (action) {
      case 'add_contribution': {
        const { studentId, studentName, amount, note } = payload || {};
        if (!studentId || !studentName || Number(amount) <= 0) {
          return NextResponse.json({ error: 'Invalid contribution payload' }, { status: 400 });
        }
        const updated = addServerContribution(studentId, studentName, Number(amount), note);
        return NextResponse.json(updated);
      }
      case 'update_contribution': {
        const { id, studentId, studentName, amount, note } = payload || {};
        if (!id || !studentId || !studentName || Number(amount) <= 0) {
          return NextResponse.json({ error: 'Invalid contribution update payload' }, { status: 400 });
        }
        const updated = updateServerContribution(id, studentId, studentName, Number(amount), note);
        return NextResponse.json(updated);
      }
      case 'delete_contribution': {
        const { id } = payload || {};
        if (!id) {
          return NextResponse.json({ error: 'Valid contribution ID is required' }, { status: 400 });
        }
        const updated = deleteServerContribution(id);
        return NextResponse.json(updated);
      }
      case 'add_student': {
        const { name, rollNumber } = payload || {};
        if (!name || typeof name !== 'string' || !name.trim()) {
          return NextResponse.json({ error: 'Student name is required' }, { status: 400 });
        }
        const student = addServerStudent(name.trim(), rollNumber);
        return NextResponse.json(student);
      }
      case 'update_target': {
        const { target } = payload || {};
        const numeric = Number(target);
        if (isNaN(numeric) || numeric < 1000) {
          return NextResponse.json({ error: 'Target must be at least ₹1,000' }, { status: 400 });
        }
        const updated = updateServerTarget(numeric);
        return NextResponse.json(updated);
      }
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
