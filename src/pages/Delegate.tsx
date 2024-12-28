import { useState } from "react";
import { Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { GlassCard } from "@/components/GlassCard";
import { TeamMemberAvatar } from "@/components/delegate/TeamMemberAvatar";
import { TeamMemberDialog } from "@/components/delegate/TeamMemberDialog";
import { ConnectionLines } from "@/components/delegate/ConnectionLines";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  skills: string[];
  avatar: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    position: "Frontend Developer",
    skills: ["React", "TypeScript", "UI/UX", "Responsive Design"],
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    initials: "SC"
  },
  {
    id: "2",
    name: "Michael Ross",
    position: "Backend Developer",
    skills: ["Node.js", "Python", "Database Design", "API Development"],
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    initials: "MR"
  },
  {
    id: "3",
    name: "Emma Wilson",
    position: "Product Manager",
    skills: ["Strategy", "Agile", "User Research", "Roadmapping"],
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    initials: "EW"
  },
  {
    id: "4",
    name: "David Kim",
    position: "UX Designer",
    skills: ["Figma", "User Testing", "Wireframing", "Design Systems"],
    avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    initials: "DK"
  }
];

export default function Delegate() {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleDelegate = (memberId: string, selectedTask: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    console.log("Delegating task:", selectedTask, "to member:", member?.name);
    
    toast({
      title: "Task Delegated",
      description: `Task "${selectedTask}" has been assigned to ${member?.name}.`,
      duration: 3000,
    });
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen w-full bg-black p-4 lg:p-8 overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          <Users className="h-6 w-6 md:h-8 md:w-8" />
          Team Delegation Hub
        </h1>
        <p className="text-sm text-white/60 md:text-base lg:text-lg">
          Delegate tasks to team members based on their skills and expertise
        </p>
      </div>

      <div className="relative mx-auto flex h-[calc(100vh-12rem)] min-h-[400px] max-h-[800px] max-w-5xl items-center justify-center px-4">
        <ConnectionLines />

        <div className="relative grid h-full w-full max-w-[800px] grid-cols-2 grid-rows-2 gap-8 sm:gap-12 lg:gap-16">
          {teamMembers.map((member, index) => {
            const positions = [
              "self-start justify-self-start",
              "self-start justify-self-end",
              "self-end justify-self-start",
              "self-end justify-self-end",
            ];

            return (
              <TeamMemberAvatar
                key={member.id}
                member={member}
                onClick={() => setSelectedMember(member)}
                className={positions[index]}
              />
            );
          })}

          {/* Central Hub */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <GlassCard className="rounded-full bg-cora-purple/20 p-2 sm:p-3">
              <Users className="h-6 w-6 text-cora-purple sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
            </GlassCard>
          </div>
        </div>
      </div>

      <TeamMemberDialog
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        onDelegate={handleDelegate}
      />
    </div>
  );
}
