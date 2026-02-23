import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    updateProfile,
    type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import type { UserDocument } from "@/types/firestore";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthContextValue {
    currentUser: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Helper: create or update Firestore user doc ─────────────────────────────
async function upsertUserDoc(
    user: User,
    provider: "email" | "google",
): Promise<void> {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        const data: Omit<UserDocument, "createdAt"> & { createdAt: ReturnType<typeof serverTimestamp> } = {
            uid: user.uid,
            email: user.email ?? "",
            displayName: user.displayName ?? "",
            photoURL: user.photoURL,
            provider,
            createdAt: serverTimestamp(),
            role: "client",
        };
        await setDoc(ref, data);
    }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Google Sign-In
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            await upsertUserDoc(result.user, "google");
        } catch (err) {
            const message = mapFirebaseError(err);
            toast.error(message);
            throw err;
        }
    };

    // Email Sign-In
    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            const message = mapFirebaseError(err);
            toast.error(message);
            throw err;
        }
    };

    // Email Sign-Up
    const signUpWithEmail = async (name: string, email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName: name });
            await upsertUserDoc({ ...result.user, displayName: name }, "email");
        } catch (err) {
            const message = mapFirebaseError(err);
            toast.error(message);
            throw err;
        }
    };

    // Sign Out
    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (err) {
            toast.error("Failed to sign out. Please try again.");
            throw err;
        }
    };

    // Password Reset
    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            const message = mapFirebaseError(err);
            toast.error(message);
            throw err;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                signInWithGoogle,
                signInWithEmail,
                signUpWithEmail,
                signOut,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}

// ─── Firebase error → friendly message ───────────────────────────────────────
function mapFirebaseError(err: unknown): string {
    if (err instanceof Error && "code" in err) {
        const code = (err as { code: string }).code;
        const map: Record<string, string> = {
            "auth/user-not-found": "No account found with this email.",
            "auth/wrong-password": "Incorrect password. Please try again.",
            "auth/email-already-in-use": "An account with this email already exists.",
            "auth/weak-password": "Password must be at least 8 characters.",
            "auth/invalid-email": "Please enter a valid email address.",
            "auth/popup-closed-by-user": "Sign-in popup was closed. Please try again.",
            "auth/network-request-failed": "Network error. Please check your connection.",
            "auth/too-many-requests": "Too many attempts. Please try again later.",
            "auth/invalid-credential": "Invalid email or password.",
        };
        return map[code] ?? err.message;
    }
    return "Something went wrong. Please try again.";
}
