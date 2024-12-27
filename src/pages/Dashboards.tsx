import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

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
  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Analytics Dashboard</h1>
        <Select defaultValue="month">
          <SelectTrigger className="w-[140px] sm:w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last week</SelectItem>
            <SelectItem value="month">Last month</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-black/40 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              <div className="h-[180px] sm:h-[200px] mt-4">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base font-medium">Task Completion</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
              <div className="h-[180px] sm:h-[200px] mt-4">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="tasks" 
                        stroke="#20B2AA" 
                        strokeWidth={2}
                        dot={{ fill: "#20B2AA" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur sm:col-span-2 lg:col-span-1">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+18% new users</p>
              <div className="h-[180px] sm:h-[200px] mt-4">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="customers" 
                        stroke="#103DEF" 
                        strokeWidth={2}
                        dot={{ fill: "#103DEF" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-black/40 backdrop-blur">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base font-medium">Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip />
                    <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}