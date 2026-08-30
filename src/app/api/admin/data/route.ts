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
  const state = getServerState();
  return NextResponse.json(state);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    if (isFirebaseConfigured()) {
      return NextResponse.json({ message: 'Firebase is configured. Use client SDK.' });
    }

    switch (action) {
      case 'add_contribution': {
        const { studentId, studentName, amount, note } = payload;
        const updated = addServerContribution(studentId, studentName, amount, note);
        return NextResponse.json(updated);
      }
      case 'update_contribution': {
        const { id, studentId, studentName, amount, note } = payload;
        const updated = updateServerContribution(id, studentId, studentName, amount, note);
        return NextResponse.json(updated);
      }
      case 'delete_contribution': {
        const { id } = payload;
        const updated = deleteServerContribution(id);
        return NextResponse.json(updated);
      }
      case 'add_student': {
        const { name, rollNumber } = payload;
        const student = addServerStudent(name, rollNumber);
        return NextResponse.json(student);
      }
      case 'update_target': {
        const { target } = payload;
        const updated = updateServerTarget(target);
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
