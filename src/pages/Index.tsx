import { GlassCard } from "@/components/GlassCard";
import { ProgressCircle } from "@/components/ProgressCircle";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Home, MessageCircle, Map, BarChart2, Plug, Zap, Users, Brain, User } from "lucide-react";
import { Link } from "react-router-dom";

const dailyData = [
  { day: "Mon", tasks: 10 },
  { day: "Tue", tasks: 15 },
  { day: "Wed", tasks: 8 },
  { day: "Thu", tasks: 12 },
  { day: "Fri", tasks: 20 },
];

const monthlyData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 59 },
  { month: "Mar", value: 80 },
  { month: "Apr", value: 81 },
  { month: "May", value: 56 },
];

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

export default function Index() {
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
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">Good Afternoon, Christian</h1>
          <p className="text-white/80">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Finances */}
          <GlassCard>
            <h3 className="mb-2 font-semibold text-white">Finances</h3>
            <p className="text-sm text-white/80">Available Budget: 1032€</p>
            <p className="mt-2 text-sm text-white/60">Main Expenses:</p>
            <p className="text-sm text-white/80">32.99€ for Shopify</p>
          </GlassCard>

          {/* Reminders */}
          <GlassCard>
            <h3 className="mb-2 font-semibold text-white">Reminders</h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li>• Update icons</li>
              <li>• Pricing sections</li>
              <li>• Card components</li>
              <li>• App template</li>
              <li>• Patterns</li>
            </ul>
          </GlassCard>

          {/* Quick Question */}
          <GlassCard>
            <h3 className="mb-2 font-semibold text-white">Quick Question</h3>
            <p className="mb-2 text-sm text-white/80">
              Should I text Bruno to let him know our budget limits?
            </p>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-purple-500" />
              <span className="text-sm text-white/80">Dinis Malpique</span>
            </div>
          </GlassCard>

          {/* Daily Tasks */}
          <GlassCard className="col-span-2">
            <h3 className="mb-4 font-semibold text-white">Daily Tasks</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="tasks" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Current Project */}
          <GlassCard>
            <h3 className="mb-2 font-semibold text-white">Current Project</h3>
            <p className="mb-4 text-sm text-white/80">Designing a Travel App</p>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-4/5 bg-gradient-to-r from-cora-purple to-cora-blue" />
            </div>
          </GlassCard>

          {/* Monthly Completion */}
          <GlassCard className="col-span-3">
            <h3 className="mb-4 font-semibold text-white">Monthly Completion</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Progress Circle */}
        <div className="fixed right-8 top-8">
          <ProgressCircle value={97} />
        </div>
      </main>
    </div>
  );
}