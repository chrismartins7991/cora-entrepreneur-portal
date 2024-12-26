import { Link } from "react-router-dom";
import { Home, MessageCircle, Map, BarChart2, Plug, Zap, Users, Brain, User } from "lucide-react";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-black">
      {/* Sidebar */}
      <nav className="fixed left-0 top-0 h-screen w-64 flex-none bg-black/50 p-4 backdrop-blur-lg">
        <div className="mb-8 text-2xl font-bold text-white">CORA</div>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="group mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors hover:bg-white/10"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.soon && (
              <span className="ml-auto rounded bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-500">
                Soon
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Main content */}
      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}