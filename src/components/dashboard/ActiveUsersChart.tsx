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

export function ActiveUsersChart() {
  return (
    <Card className="overflow-hidden bg-black/40 backdrop-blur border-white/10 h-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">Active Users</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-4rem)]">
        <div className="space-y-2 h-full">
          <div className="text-2xl font-bold text-white">2,350</div>
          <p className="text-sm text-green-400">+18% new users</p>
          <div className="h-[calc(100%-5rem)]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={customerChartData} 
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    domain={[0, 'auto']}
                    padding={{ top: 20, bottom: 20 }}
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