import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TaskCompletionChart } from "@/components/dashboard/TaskCompletionChart";
import { ActiveUsersChart } from "@/components/dashboard/ActiveUsersChart";
import { ConversionRateChart } from "@/components/dashboard/ConversionRateChart";
import { EngagementChart } from "@/components/dashboard/EngagementChart";

export default function Dashboards() {
  return (
    <div className="flex h-full flex-col overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">Analytics Dashboard</h1>
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

      {/* Charts Grid */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 gap-4 overflow-auto">
        <RevenueChart />
        <TaskCompletionChart />
        <ActiveUsersChart />
        <ConversionRateChart />
        <EngagementChart />
      </div>
    </div>
  );
}
