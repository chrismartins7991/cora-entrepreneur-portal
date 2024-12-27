import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const projectChartData = [
  { day: 'Mon', tasks: 10, completed: 8 },
  { day: 'Tue', tasks: 15, completed: 12 },
  { day: 'Wed', tasks: 8, completed: 5 },
  { day: 'Thu', tasks: 12, completed: 10 },
  { day: 'Fri', tasks: 20, completed: 15 },
];

const chartConfig = {
  tasks: {
    color: '#20B2AA',
  },
};

export function TaskCompletionChart() {
  return (
    <Card className="h-full bg-black/40 backdrop-blur border-white/10">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">Task Completion</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-4rem)]">
        <div className="flex flex-col h-full">
          <div className="text-2xl font-bold text-white">82%</div>
          <p className="text-sm text-green-400">+12% from last week</p>
          <div className="flex-1 min-h-[200px] mt-4">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={projectChartData} 
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={40}
                  />
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
  );
}