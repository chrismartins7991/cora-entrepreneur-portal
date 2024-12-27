import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TaskCompletionChart } from "@/components/dashboard/TaskCompletionChart";
import { ActiveUsersChart } from "@/components/dashboard/ActiveUsersChart";

export default function Dashboards() {
  return (
    <div className="h-screen w-full p-4">
      <div className="flex flex-col h-full gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
          <div className="h-full">
            <RevenueChart />
          </div>
          <div className="h-full">
            <TaskCompletionChart />
          </div>
          <div className="h-full">
            <ActiveUsersChart />
          </div>
        </div>
      </div>
    </div>
  );
}