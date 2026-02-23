import { Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const { currentUser, loading } = useAuth();
    const deniedRef = useRef(false);

    // show toast once on access denial
    useEffect(() => {
        if (!loading && currentUser && currentUser.email !== ADMIN_EMAIL && !deniedRef.current) {
            deniedRef.current = true;
            toast.error("Access denied. Admin only.");
        }
    }, [loading, currentUser]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!currentUser) return <Navigate to="/login" replace />;
    if (currentUser.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

    return <>{children}</>;
};

export default AdminRoute;
