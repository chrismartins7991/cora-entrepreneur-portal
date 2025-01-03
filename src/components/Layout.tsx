import { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Home, MessageCircle, Map, BarChart2, Plug, Zap, Users, Brain, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const navItems = [
  { icon: Home, label: "HOME", href: "/" },
  { icon: MessageCircle, label: "CORA AI", href: "/cora-ai" },
  { icon: Map, label: "RoadMap", href: "/roadmap" },
  { icon: BarChart2, label: "Dashboards", href: "/dashboards" },
  { icon: Plug, label: "Plug & Fly", href: "/plug-and-fly" },
  { icon: Zap, label: "Automate", href: "/automate" },
  { icon: Users, label: "Delegate", href: "/delegate", soon: true },
  { icon: Brain, label: "Brain", href: "/brain", soon: true },
  { icon: User, label: "Entrepreneur", href: "/entrepreneur", soon: true },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 -translate-x-full transform bg-black/50 backdrop-blur-lg transition-transform duration-200 ease-in-out md:translate-x-0",
          isSidebarOpen && "translate-x-0"
        )}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-8 mt-16 text-2xl font-bold text-white md:mt-0">CORA</div>
          <div className="flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                           (item.href === "/" && location.pathname === "/") ||
                           (item.href !== "/" && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "group mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors hover:bg-white/10",
                    isActive && "bg-white/20 font-medium"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    isActive && "text-purple-400"
                  )} />
                  <span>{item.label}</span>
                  {item.soon && (
                    <span className="ml-auto rounded bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-500">
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-colors hover:bg-white/10"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="h-screen w-full overflow-hidden md:ml-64">
        <div className="h-full overflow-hidden p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}