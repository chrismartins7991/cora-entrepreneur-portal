import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { TeamMemberAvatar } from "@/components/delegate/TeamMemberAvatar";
import { ConnectionLines } from "@/components/delegate/ConnectionLines";
import { Globe, Users } from "lucide-react";

export default function Delegate() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample data
  const tasks = [
    { id: 1, title: "Website Development", description: "Create a responsive website" },
    { id: 2, title: "Content Creation", description: "Write blog posts" },
    { id: 3, title: "Social Media", description: "Manage social accounts" },
    { id: 4, title: "Customer Support", description: "Handle customer inquiries" },
  ];

  const teamMembers = [
    { id: 1, name: "John Doe", initials: "JD", avatar: "/placeholder.svg" },
    { id: 2, name: "Jane Smith", initials: "JS", avatar: "/placeholder.svg" },
    { id: 3, name: "Mike Johnson", initials: "MJ", avatar: "/placeholder.svg" },
    { id: 4, name: "Sarah Wilson", initials: "SW", avatar: "/placeholder.svg" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Delegate</h1>
        <p className="text-white/60 mb-8">
          Delegate tasks to your team members efficiently.
        </p>

        {/* Desktop Layout */}
        <div className="hidden md:block relative">
          <div className="flex justify-center items-center mb-8">
            <GlassCard className="p-6 text-center">
              <Globe className="w-12 h-12 mx-auto mb-2 text-cora-purple" />
              <h2 className="text-xl font-semibold text-white">Web</h2>
            </GlassCard>
          </div>

          <ConnectionLines />

          <div className="grid grid-cols-2 gap-8 mt-8">
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.slice(0, 2).map((member) => (
                <TeamMemberAvatar
                  key={member.id}
                  member={member}
                  onClick={() => {
                    setSelectedMember(member);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.slice(2, 4).map((member) => (
                <TeamMemberAvatar
                  key={member.id}
                  member={member}
                  onClick={() => {
                    setSelectedMember(member);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Team Members Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-cora-purple" />
              <h2 className="text-lg font-semibold text-white">Team Members</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <TeamMemberAvatar
                  key={member.id}
                  member={member}
                  onClick={() => {
                    setSelectedMember(member);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Tasks Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-cora-purple" />
              <h2 className="text-lg font-semibold text-white">Tasks</h2>
            </div>
            <div className="grid gap-4">
              {tasks.map((task) => (
                <GlassCard key={task.id} className="p-4">
                  <h3 className="text-white font-medium">{task.title}</h3>
                  <p className="text-white/60 text-sm">{task.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Task Assignment Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Tasks to {selectedMember?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {tasks.map((task) => (
                <GlassCard key={task.id} className="p-4">
                  <h3 className="text-white font-medium">{task.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{task.description}</p>
                  <Button size="sm">Delegate</Button>
                </GlassCard>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}