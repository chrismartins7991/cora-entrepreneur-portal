import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const customerChartData = [
  { month: 'Jan', customers: 20, churn: 2 },
  { month: 'Feb', customers: 25, churn: 3 },
  { month: 'Mar', customers: 30, churn: 1 },
  { month: 'Apr', customers: 22, churn: 4 },
  { month: 'May', customers: 28, churn: 2 },
];

const chartConfig = {
  customers: {
    color: '#103DEF',
  },
};

export function ActiveUsersChart() {
  return (
    <Card className="h-full bg-black/40 backdrop-blur border-white/10">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">Active Users</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-4rem)]">
        <div className="flex flex-col h-full">
          <div className="text-2xl font-bold text-white">2,350</div>
          <p className="text-sm text-green-400">+18% new users</p>
          <div className="flex-1 min-h-[200px] mt-4">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={customerChartData} 
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
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
  );
}