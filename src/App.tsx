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

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Log initial check
    console.log("ProtectedRoute: Checking authentication state...");

    supabase.auth.onAuthStateChange((event, session) => {
      console.log("ProtectedRoute: Auth state changed", { event, session });
      setIsAuthenticated(!!session);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("ProtectedRoute: Initial session check", { session });
      setIsAuthenticated(!!session);
    });
  }, []);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    console.log("ProtectedRoute: Still checking authentication...");
    return null;
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute: User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: User is authenticated, rendering protected content");
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