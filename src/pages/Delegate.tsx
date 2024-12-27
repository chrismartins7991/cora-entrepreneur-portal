import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Users, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const handleDelegate = (memberId: string) => {
    console.log("Delegating task to member:", memberId);
    toast({
      title: "Task Delegated",
      description: "The task has been assigned successfully.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-black p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 md:text-3xl lg:text-4xl">
          <Users className="w-6 h-6 md:w-8 md:h-8" />
          Team Delegation Hub
        </h1>
        <p className="text-white/60 text-sm md:text-base lg:text-lg">
          Delegate tasks to team members based on their skills and expertise
        </p>
      </div>

      {/* Team Web Layout */}
      <div className="relative w-full h-[calc(100vh-12rem)] min-h-[400px] max-h-[800px] flex items-center justify-center">
        <div className="absolute w-full h-full flex items-center justify-center">
          {/* Connection Lines - Responsive scaling */}
          <svg className="absolute w-full h-full max-w-[800px]" style={{ zIndex: 0 }}>
            {!isMobile && (
              <>
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2="25%" 
                  y2="25%" 
                  stroke="rgba(139, 92, 246, 0.2)" 
                  strokeWidth="2" 
                  className="transition-all duration-300"
                />
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2="75%" 
                  y2="25%" 
                  stroke="rgba(139, 92, 246, 0.2)" 
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2="25%" 
                  y2="75%" 
                  stroke="rgba(139, 92, 246, 0.2)" 
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2="75%" 
                  y2="75%" 
                  stroke="rgba(139, 92, 246, 0.2)" 
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              </>
            )}
          </svg>

          {/* Team Members - Responsive positioning */}
          <div className="relative w-full h-full max-w-[800px]">
            {teamMembers.map((member, index) => {
              const positions = {
                mobile: [
                  'top-[15%] left-[25%]',
                  'top-[15%] right-[25%]',
                  'bottom-[15%] left-[25%]',
                  'bottom-[15%] right-[25%]',
                ],
                tablet: [
                  'top-[20%] left-[25%]',
                  'top-[20%] right-[25%]',
                  'bottom-[20%] left-[25%]',
                  'bottom-[20%] right-[25%]',
                ],
                desktop: [
                  'top-[25%] left-[25%]',
                  'top-[25%] right-[25%]',
                  'bottom-[25%] left-[25%]',
                  'bottom-[25%] right-[25%]',
                ],
              };

              const position = `${positions.mobile[index]} sm:${positions.tablet[index]} lg:${positions.desktop[index]}`;

              return (
                <Dialog key={member.id}>
                  <DialogTrigger asChild>
                    <button
                      className={`absolute ${position} transform -translate-x-1/2 -translate-y-1/2 z-10`}
                      onClick={() => setSelectedMember(member)}
                    >
                      <GlassCard className="p-2 hover:scale-110 transition-transform duration-300">
                        <Avatar className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                      </GlassCard>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] w-[95vw] sm:w-full">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Skills & Expertise:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs sm:text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button
                        className="w-full gap-2"
                        onClick={() => handleDelegate(member.id)}
                      >
                        <Send className="w-4 h-4" />
                        Delegate Task
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}

            {/* Central Hub - Responsive sizing */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <GlassCard className="p-2 sm:p-3 rounded-full bg-cora-purple/20">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cora-purple" />
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}