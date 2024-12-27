import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const conversionData = [
  { month: 'Jan', rate: 2.4 },
  { month: 'Feb', rate: 3.1 },
  { month: 'Mar', rate: 2.8 },
  { month: 'Apr', rate: 3.5 },
  { month: 'May', rate: 3.2 },
];

const chartConfig = {
  rate: {
    color: '#8CECFE',
  },
};

export function ConversionRateChart() {
  return (
    <Card className="h-full bg-black/40 backdrop-blur border-white/10">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">Conversion Rate</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 h-[calc(100%-4rem)]">
        <div className="flex flex-col h-full">
          <div className="text-2xl font-bold text-white">3.2%</div>
          <p className="text-sm text-green-400">+0.4% from last month</p>
          <div className="flex-1 min-h-[200px] mt-4">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={conversionData} 
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
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#8CECFE" 
                    fill="#8CECFE20"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}