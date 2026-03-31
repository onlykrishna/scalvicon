import { lazy, Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { CookieBanner } from "./components/CookieBanner";
import { RefreshCw } from "lucide-react";
import { DeferredFeature } from "./components/DeferredFeature";

// ── Lazy-loaded admin bundle (recharts + heavy deps split into separate chunk) ─
const Admin = lazy(() => import("./pages/Admin"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ProjectDetailView = lazy(() => import("./pages/ProjectDetailView"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then(module => ({ default: module.ServiceDetailPage })));
const ProblemDetail = lazy(() => import("./pages/ProblemDetail").then(module => ({ default: module.ProblemDetailPage })));
const ProcessDetail = lazy(() => import("./pages/ProcessDetail").then(module => ({ default: module.ProcessDetailPage })));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail").then(module => ({ default: module.PortfolioDetailPage })));
const PortfolioGallery = lazy(() => import("./pages/PortfolioGallery"));

const Careers = lazy(() => import("./pages/company/Careers"));
const Terms = lazy(() => import("./pages/company/Terms"));
const Privacy = lazy(() => import("./pages/company/Privacy"));
const Week1DiscoveryDesign = lazy(() => import("./pages/process/Week1DiscoveryDesign"));
const Week2Development = lazy(() => import("./pages/process/Week2Development"));
const Week3ContentIntegrations = lazy(() => import("./pages/process/Week3ContentIntegrations"));
const Week4TestingLaunch = lazy(() => import("./pages/process/Week4TestingLaunch"));
const OngoingSupportGrowth = lazy(() => import("./pages/process/OngoingSupportGrowth"));

import { BottomCTAPopup } from "./components/BottomCTAPopup";
import ChatWidget from "./features/chatbot";

const PageFallback = () => (
  <div className="flex h-screen items-center justify-center bg-background gap-3">
    <RefreshCw size={18} className="animate-spin text-primary" />
    <span className="text-sm text-muted-foreground font-mono">Loading…</span>
  </div>
);

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <BrowserRouter>
        {/* Toaster inside BrowserRouter so it can use router context if needed */}
        <Toaster richColors position="top-right" closeButton />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageFallback />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/project/:id"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageFallback />}>
                  <ProjectDetailView />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* Admin-only route — lazy loaded, split into separate JS chunk */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Suspense fallback={<PageFallback />}>
                  <Admin />
                </Suspense>
              </AdminRoute>
            }
          />

          <Route path="/services/:slug" element={<Suspense fallback={<PageFallback />}><ServiceDetail /></Suspense>} />
          <Route path="/problems/:slug" element={<Suspense fallback={<PageFallback />}><ProblemDetail /></Suspense>} />
          <Route path="/process/week-1-discovery-design" element={<Suspense fallback={<PageFallback />}><Week1DiscoveryDesign /></Suspense>} />
          <Route path="/process/week-2-development" element={<Suspense fallback={<PageFallback />}><Week2Development /></Suspense>} />
          <Route path="/process/week-3-content-integrations" element={<Suspense fallback={<PageFallback />}><Week3ContentIntegrations /></Suspense>} />
          <Route path="/process/week-4-testing-launch" element={<Suspense fallback={<PageFallback />}><Week4TestingLaunch /></Suspense>} />
          <Route path="/process/ongoing-support-growth" element={<Suspense fallback={<PageFallback />}><OngoingSupportGrowth /></Suspense>} />
          <Route path="/process/:slug" element={<Suspense fallback={<PageFallback />}><ProcessDetail /></Suspense>} />
          <Route path="/portfolio" element={<Suspense fallback={<PageFallback />}><PortfolioGallery /></Suspense>} />
          <Route path="/portfolio/:slug" element={<Suspense fallback={<PageFallback />}><PortfolioDetail /></Suspense>} />

          {/* Blog — public, lazy loaded */}
          <Route
            path="/blog"
            element={
              <Suspense fallback={<PageFallback />}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <BlogPost />
              </Suspense>
            }
          />

          {/* Company pages */}
          <Route path="/careers" element={<Suspense fallback={<PageFallback />}><Careers /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<PageFallback />}><Terms /></Suspense>} />
          <Route path="/privacy" element={<Suspense fallback={<PageFallback />}><Privacy /></Suspense>} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <DeferredFeature delay={2000}>
          <CookieBanner />
        </DeferredFeature>
        <DeferredFeature delay={3000}>
          <BottomCTAPopup />
        </DeferredFeature>
        <DeferredFeature delay={4000}>
          <ChatWidget />
        </DeferredFeature>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;

