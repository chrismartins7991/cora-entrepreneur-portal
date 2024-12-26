import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CoraAI from "./pages/CoraAI";
import Roadmap from "./pages/Roadmap";
import Dashboards from "./pages/Dashboards";
import PlugAndFly from "./pages/PlugAndFly";
import Automate from "./pages/Automate";
import Delegate from "./pages/Delegate";
import Brain from "./pages/Brain";
import Entrepreneur from "./pages/Entrepreneur";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cora-ai" element={<CoraAI />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/dashboards" element={<Dashboards />} />
            <Route path="/plug-and-fly" element={<PlugAndFly />} />
            <Route path="/automate" element={<Automate />} />
            <Route path="/delegate" element={<Delegate />} />
            <Route path="/brain" element={<Brain />} />
            <Route path="/entrepreneur" element={<Entrepreneur />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;