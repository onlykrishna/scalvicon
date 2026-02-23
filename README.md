# Scalvicon

**Premium Web Design & Development for Indian SMEs**

Scalvicon builds stunning, high-performance websites for small and medium businesses across India — restaurants, clinics, salons, real estate agencies, and more.

🌐 **Live site:** [scalvicon.in](https://scalvicon.in)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 5 (SWC compiler) |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Component Library | shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| Routing | React Router DOM v6 |
| Backend / Auth | Firebase (Auth, Firestore, Analytics) |
| Forms | react-hook-form + zod |
| Notifications | Sonner |
| Fonts | Syne, DM Sans, JetBrains Mono (Google Fonts) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# 1. Clone the repo
git clone <YOUR_GIT_URL>
cd webcraft-ascend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your Firebase credentials

# 4. Start development server
npm run dev
```

The app runs at **http://localhost:8080**

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
VITE_WHATSAPP_NUMBER=91XXXXXXXXXX
```

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore`.

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives
│   ├── Navbar.tsx        # Auth-aware navigation
│   ├── Hero.tsx
│   ├── Pricing.tsx
│   ├── Portfolio.tsx
│   ├── Process.tsx
│   ├── Testimonials.tsx
│   ├── FAQSection.tsx
│   ├── CTASection.tsx
│   ├── Footer.tsx
│   └── ProtectedRoute.tsx
├── context/
│   └── AuthContext.tsx   # Firebase Auth context & provider
├── hooks/               # Custom React hooks
├── lib/
│   ├── firebase.ts       # Firebase initialization (single file)
│   ├── animations.ts     # Framer Motion variants
│   ├── scroll.ts         # Smooth scroll utility
│   └── utils.ts          # cn() classname helper
├── pages/
│   ├── Index.tsx         # Landing page
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── ForgotPassword.tsx
│   ├── Dashboard.tsx     # Protected page
│   └── NotFound.tsx
└── types/
    └── firestore.ts      # TypeScript interfaces for Firestore docs
```

---

## Firebase Setup

This project uses **Firebase Modular SDK v9+**.

Services used:
- **Authentication** — Email/Password + Google Sign-In
- **Firestore** — User profiles, lead tracking
- **Analytics** — Page view tracking

Firestore Collections:

| Collection | Document | Fields |
|-----------|----------|--------|
| `users` | `{uid}` | uid, email, displayName, photoURL, provider, createdAt, role |
| `leads` | `{autoId}` | name, email, phone, message, createdAt, status |

---

## Scripts

```bash
npm run dev          # Start development server (port 8080)
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run test:watch   # Watch mode tests
```

---

## Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/login` | Login | Public (redirects to /dashboard if logged in) |
| `/signup` | Sign Up | Public (redirects to /dashboard if logged in) |
| `/forgot-password` | Password Reset | Public |
| `/dashboard` | Dashboard | **Protected** |
| `*` | 404 Not Found | Public |

---

## Contact

📧 hello@scalvicon.in  
📱 +91 95556 39038  
📍 Mumbai, India
