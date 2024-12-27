import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const engagementData = [
  { day: 'Mon', sessions: 120, duration: 45 },
  { day: 'Tue', sessions: 150, duration: 52 },
  { day: 'Wed', sessions: 180, duration: 61 },
  { day: 'Thu', sessions: 140, duration: 48 },
  { day: 'Fri', sessions: 200, duration: 55 },
];

const chartConfig = {
  sessions: {
    color: '#20B2AA',
  },
  duration: {
    color: '#8B5CF6',
  },
};

export function EngagementChart() {
  return (
    <Card className="h-full bg-black/40 backdrop-blur border-white/10">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">User Engagement</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-4rem)]">
        <div className="flex flex-col h-full">
          <div className="text-2xl font-bold text-white">158 sessions/day</div>
          <p className="text-sm text-green-400">52.2 min avg. duration</p>
          <div className="flex-1 min-h-[200px] mt-4">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={engagementData} 
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
                  <Bar 
                    dataKey="sessions" 
                    fill="#20B2AA" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={40}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: "#8B5CF6", r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}