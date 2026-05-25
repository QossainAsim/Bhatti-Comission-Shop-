# Commission Shop Management System

React + Vite app for managing a commission shop: material book, cash book amounts, party accounts, sales/deals, and commission tracking.

## Local Setup

```powershell
npm.cmd install
npm.cmd run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

## New Firebase Project

1. Go to Firebase Console and create a new project.
2. Add a Web App.
3. Enable Authentication > Sign-in method > Email/Password.
4. Copy the Firebase web config values into `.env`.

Required Firebase values:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## New Supabase Project

1. Create a new Supabase project.
2. Open SQL Editor.
3. Run the contents of `supabase-schema.sql`.
4. Go to Project Settings > API.
5. Copy Project URL and anon public key into `.env`.

Required Supabase values:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Use `.env.example` as the template. The real `.env` file is ignored by Git so private project keys do not get committed.
