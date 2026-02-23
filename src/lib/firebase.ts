import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
    initializeFirestore,
    getFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
    type Firestore,
} from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Guard against double initialization (HMR in dev)
const isNew = !getApps().length;
const app: FirebaseApp = isNew ? initializeApp(firebaseConfig) : getApp();

// Auth
const auth: Auth = getAuth(app);

// Firestore — on first init, use persistent local cache (v10+ API).
// On subsequent HMR reloads the app already exists, so fall back to getFirestore.
let db: Firestore;
if (isNew) {
    try {
        db = initializeFirestore(app, {
            localCache: persistentLocalCache({
                tabManager: persistentMultipleTabManager(),
            }),
        });
    } catch {
        // Fallback if persistentLocalCache is not supported (e.g. SSR, test env)
        db = getFirestore(app);
    }
} else {
    db = getFirestore(app);
}

// Analytics — browser only, silently ignore ad-blocker / missing config errors
let analytics: Analytics | null = null;
if (typeof window !== "undefined" && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
    try {
        analytics = getAnalytics(app);
    } catch {
        // Intentionally swallowed — analytics should never crash the app
    }
}

export { app, auth, db, analytics };
