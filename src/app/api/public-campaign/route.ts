import { NextResponse } from 'next/server';
import { getPublicCampaignState } from '@/lib/server-storage';
import { isFirebaseConfigured, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { INITIAL_PUBLIC_DATA } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, 'public_campaign', 'afamigos_fundraiser');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return NextResponse.json(docSnap.data());
      }
      return NextResponse.json(INITIAL_PUBLIC_DATA);
    }

    const publicData = getPublicCampaignState();
    return NextResponse.json(publicData);
  } catch (error) {
    console.error('Error fetching public campaign data:', error);
    return NextResponse.json(INITIAL_PUBLIC_DATA, { status: 200 });
  }
}
