# AFAmigos — Child Sponsorship Program Fundraiser

> **One Class. One Goal. One Impact.**
> A production-ready real-time web application to gamify our classroom fundraising campaign for the **Child Sponsorship Program (CSA)**.

---

## 🌟 Key Features

- **⚡ Public Campaign Landing (`/`)**:
  - Live animated total raised counter (`₹18,450 of ₹25,000 raised`).
  - Dynamic progress bar with glow effects & percentage display (`73.8% of goal`).
  - Unique contributor counter (`42 contributors`).
  - Dynamic milestone messages based on campaign progress (0-24%, 25-49%, 50-74%, 75-89%, 90-99%, 100%+).
  - Target-achieved celebration with multi-stage confetti explosion.
  - **AFAmigos Leaderboard**:
    - Top 3 Podium layout (🥇 1st Elevated Gold Center, 🥈 2nd Silver Left, 🥉 3rd Bronze Right).
    - Ranks 4+ clean searchable list with deterministic tie indicators (1-2-2-4 standard competition ranking).
    - **Zero-leak privacy guarantee**: Individual donation amounts are never exposed in state, HTML, API queries, or network payloads.

- **🛡️ Private Admin Console (`/admin`)**:
  - Firebase Authentication guard with branded login.
  - Comprehensive metrics bar (Total funds raised, Target editor, Progress %, Contributor count, Total transaction count).
  - **Rapid Contribution Entry Form**: Searchable student dropdown from class roster, quick shortcut chips (+₹100, +₹500, +₹1,000, +₹2,000), continuous focus mode for rapid entry during live drives.
  - **Contribution History Table**: Private table showing Student Name, Private Amount (₹), Date & Time, Edit, and Delete modal with safe confirmation.
  - **Class Roster Management**: Modal to add and manage students, eliminating spelling inconsistencies.
  - **Force Sync Aggregates**: One-click integrity tool to recalculate and sync sanitized public documents.

---

## 🔒 Strict Privacy & Security Architecture

1. **Firestore Security Model**:
   - `/public_campaign/afamigos_fundraiser`: Publicly readable sanitized aggregate document containing `{ target, totalRaised, contributorCount, percentage, currentMilestone, leaderboard: [{ studentId, name, rank, isTie }] }`.
   - `/contributions/{id}`: Locked to authenticated administrators (`allow read, write: if request.auth != null`).
   - `/students/{id}`: Locked to authenticated administrators.
2. **Deterministic Tie Handling**:
   - Students with identical total amounts receive the same ranking value with standard competition skipping (1, 2, 2, 4) and stable alphabetical tie-break.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Variables (Optional for Live Firebase)
Create `.env.local` based on `.env.example`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> **Note**: If Firebase environment variables are not set, the app seamlessly runs in **Local Preview / Demo Mode**, enabling full interactive testing with pre-loaded mock data and cross-tab updates.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the Public Campaign and [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin Console.

### 4. Run Automated Privacy & Logic Tests
```bash
npm test
```

### 5. Production Build
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Add the Firebase environment variables under Project Settings -> Environment Variables.
4. Deploy! Zero additional configuration required.
