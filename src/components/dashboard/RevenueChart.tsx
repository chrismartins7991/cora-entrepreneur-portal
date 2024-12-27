import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const financialChartData = [
  { name: 'Jan', value: 400, growth: '+12%' },
  { name: 'Feb', value: 300, growth: '-25%' },
  { name: 'Mar', value: 200, growth: '-33%' },
  { name: 'Apr', value: 278, growth: '+39%' },
  { name: 'May', value: 189, growth: '-32%' },
];

const chartConfig = {
  value: {
    color: '#8B5CF6',
  },
};

export function RevenueChart() {
  return (
    <Card className="overflow-hidden bg-black/40 backdrop-blur border-white/10 h-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">Revenue</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-4rem)]">
        <div className="space-y-2 h-full">
          <div className="text-2xl font-bold text-white">$45,231.89</div>
          <p className="text-sm text-green-400">+20.1% from last month</p>
          <div className="h-[calc(100%-5rem)]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={financialChartData} 
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
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
                  <Bar 
                    dataKey="value" 
                    fill="#8B5CF6" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}