import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Entrepreneur() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Entrepreneur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-3">Business Overview</h2>
            <p className="text-white/60 mb-4">Track your business metrics and performance</p>
            <Button className="w-full">View Details</Button>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-3">Financial Reports</h2>
            <p className="text-white/60 mb-4">Access your financial statements and analytics</p>
            <Button className="w-full">View Reports</Button>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-3">Team Management</h2>
            <p className="text-white/60 mb-4">Manage your team and assignments</p>
            <Button className="w-full">Manage Team</Button>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-3">Goals & Milestones</h2>
            <p className="text-white/60 mb-4">Track your business goals and achievements</p>
            <Button className="w-full">View Goals</Button>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-3">Resources</h2>
            <p className="text-white/60 mb-4">Access entrepreneurial resources and guides</p>
            <Button className="w-full">Browse Resources</Button>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-3">Networking</h2>
            <p className="text-white/60 mb-4">Connect with other entrepreneurs</p>
            <Button className="w-full">Network</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}