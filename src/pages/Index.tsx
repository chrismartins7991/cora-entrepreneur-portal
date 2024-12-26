import { GlassCard } from "@/components/GlassCard";
import { ProgressCircle } from "@/components/ProgressCircle";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

export default function Index() {
  return (
    <div className="min-h-screen w-full">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl">Good Afternoon, Christian</h1>
        <p className="text-sm text-white/80 md:text-base">
          "Success is not final, failure is not fatal: it is the courage to continue that counts."
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <GlassCard className="col-span-1 sm:col-span-2">
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
        <GlassCard className="col-span-1 sm:col-span-2 lg:col-span-3">
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
      <div className="fixed right-4 top-4 md:right-8 md:top-8">
        <ProgressCircle value={97} />
      </div>
    </div>
  );
}