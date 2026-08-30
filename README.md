# AFAmigos — Child Sponsorship Program Fundraiser

> **One Class. One Goal. One Impact.**  
> A real-time fundraising platform for the **Child Sponsorship Programme (CSP)** organized by the **Centre for Social Action (CSA)** at **CHRIST (Deemed to be University)**.

---

## 🌟 Overview

This platform enables the **AFA MIGOS** student collective to conduct a transparent, classroom-driven fundraising initiative for the Child Sponsorship Programme (CSP). CSP provides comprehensive educational support (school fees, textbooks, uniforms, after-school tutoring, health camps, and nutrition) to 800+ underprivileged children across Bengaluru urban slum communities at a benchmark of **₹6,000 per child per year**.

---

## 💎 Features

- **⚡ Public Campaign Dashboard (`/`)**:
  - Live animated total raised counter with smooth milestone tracking.
  - Interactive Olympic Podium for Top 3 student contributors (#2 Left, #1 Center Champion, #3 Right).
  - Strictly unique sequential rankings (1, 2, 3, 4...) with deterministic tie-breaking.
  - **Strict Zero-Leak Privacy Guarantee**: Individual contribution amounts are completely private and never exposed to the public.

- **🛡️ Protected Admin Portal (`/admin`)**:
  - Direct hidden portal route with secure Firebase Authentication.
  - Multi-session and multi-device persistence.
  - Instant searchable student autocomplete combobox across the full official 80-student roster.
  - Live real-time contribution logging, editing, and deletion with instant Firestore sync.
  - Dynamic campaign target goal configuration.

---

## 🔒 Security Architecture

1. **Firestore Security Rules**:
   - `/public_campaign/afamigos_fundraiser`: Publicly readable sanitized aggregates with zero individual amount fields.
   - `/contributions/{id}` & `/students/{id}`: Strictly restricted to authenticated administrators (`allow read, write: if request.auth != null`).
   - `/campaigns/{id}`: Protected configuration document.

2. **HTTP Security Headers**:
   - Automated HSTS (Strict-Transport-Security), X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), and Permissions-Policy enforcement in `next.config.ts`.

---

## 🚀 Development & Build

### Installation
```bash
npm install
```

### Environment Configuration
Create `.env.local` using the template below:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Run Locally
```bash
npm run dev
```

### Run Tests & Validation
```bash
npm test
npm run lint
npm run build
```

---

## 📜 Copyright & Attribution
&copy; {new Date().getFullYear()} **Chirag P Patil (cp099)**. All rights reserved.  
Classroom Collective: **AFA MIGOS**  
Organized by: **Centre for Social Action (CSA), CHRIST (Deemed to be University), Bengaluru, India**.
