import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CoraAI from "./pages/CoraAI";
import Roadmap from "./pages/Roadmap";
import Dashboards from "./pages/Dashboards";
import PlugAndFly from "./pages/PlugAndFly";
import Automate from "./pages/Automate";
import Delegate from "./pages/Delegate";
import Brain from "./pages/Brain";
import Entrepreneur from "./pages/Entrepreneur";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

// Protected Route component with onboarding check
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("ProtectedRoute: Checking authentication and user status...");

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("ProtectedRoute: Session check", { session });
        
        if (session?.user) {
          setIsAuthenticated(true);
          
          // Check if user has a profile and if they've completed onboarding
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("is_onboarded, created_at")
            .eq("id", session.user.id)
            .maybeSingle();
          
          console.log("ProtectedRoute: Profile check", { profile, error });
          
          if (!error) {
            // User is new if they haven't completed onboarding
            setIsNewUser(profile?.is_onboarded === false);
          } else {
            console.error("Error fetching profile:", error);
            setIsNewUser(false);
          }
        } else {
          setIsAuthenticated(false);
          setIsNewUser(null);
        }
      } catch (error) {
        console.error("ProtectedRoute: Error checking auth/profile", error);
        setIsAuthenticated(false);
        setIsNewUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("ProtectedRoute: Auth state changed", { event, session });
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_onboarded")
          .eq("id", session.user.id)
          .maybeSingle();
        
        setIsNewUser(profile?.is_onboarded === false);
      } else {
        setIsNewUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading || isAuthenticated === null) {
    console.log("ProtectedRoute: Still loading...");
    return null;
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute: User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (isNewUser) {
    console.log("ProtectedRoute: New user detected, redirecting to onboarding");
    return <Navigate to="/onboarding" replace />;
  }

  console.log("ProtectedRoute: User is authenticated and not new, rendering protected content");
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Index />} />
            <Route path="cora-ai" element={<CoraAI />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="dashboards" element={<Dashboards />} />
            <Route path="plug-and-fly" element={<PlugAndFly />} />
            <Route path="automate" element={<Automate />} />
            <Route path="delegate" element={<Delegate />} />
            <Route path="brain" element={<Brain />} />
            <Route path="entrepreneur" element={<Entrepreneur />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;