import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

const financialChartData = [
  { name: 'Jan', value: 400, growth: '+12%' },
  { name: 'Feb', value: 300, growth: '-25%' },
  { name: 'Mar', value: 200, growth: '-33%' },
  { name: 'Apr', value: 278, growth: '+39%' },
  { name: 'May', value: 189, growth: '-32%' },
];

const projectChartData = [
  { day: 'Mon', tasks: 10, completed: 8 },
  { day: 'Tue', tasks: 15, completed: 12 },
  { day: 'Wed', tasks: 8, completed: 5 },
  { day: 'Thu', tasks: 12, completed: 10 },
  { day: 'Fri', tasks: 20, completed: 15 },
];

const customerChartData = [
  { month: 'Jan', customers: 20, churn: 2 },
  { month: 'Feb', customers: 25, churn: 3 },
  { month: 'Mar', customers: 30, churn: 1 },
  { month: 'Apr', customers: 22, churn: 4 },
  { month: 'May', customers: 28, churn: 2 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#8B5CF6",
  },
  tasks: {
    label: "Tasks",
    color: "#20B2AA",
  },
  customers: {
    label: "Customers",
    color: "#103DEF",
  },
};

export default function Dashboards() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen w-full space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Analytics Dashboard</h1>
        <Select defaultValue="month">
          <SelectTrigger className="w-[140px] sm:w-[180px] bg-black/40 border-white/10">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-white/10">
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last week</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {/* Revenue Card */}
        <Card className="overflow-hidden bg-black/40 backdrop-blur border-white/10">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-white">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">$45,231.89</div>
              <p className="text-sm text-green-400">+20.1% from last month</p>
              <div className="h-[200px] mt-6">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Completion Card */}
        <Card className="overflow-hidden bg-black/40 backdrop-blur border-white/10">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-white">Task Completion</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">82%</div>
              <p className="text-sm text-green-400">+12% from last week</p>
              <div className="h-[200px] mt-6">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="tasks" 
                        stroke="#20B2AA" 
                        strokeWidth={2}
                        dot={{ fill: "#20B2AA", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card className="overflow-hidden bg-black/40 backdrop-blur border-white/10">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-white">Active Users</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">2,350</div>
              <p className="text-sm text-green-400">+18% new users</p>
              <div className="h-[200px] mt-6">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="customers" 
                        stroke="#103DEF" 
                        strokeWidth={2}
                        dot={{ fill: "#103DEF", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}