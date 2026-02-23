import type { Timestamp } from "firebase/firestore";

// ─── users/{uid} ─────────────────────────────────────────────────────────────
export interface UserDocument {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string | null;
    /** Authentication provider used to create this account */
    provider: "email" | "google";
    createdAt: Timestamp;
    /** Role-based access control */
    role: "client" | "admin";
}

// ─── leads/{autoId} ──────────────────────────────────────────────────────────
export interface LeadDocument {
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: Timestamp;
    status: "new" | "contacted" | "converted";
}
