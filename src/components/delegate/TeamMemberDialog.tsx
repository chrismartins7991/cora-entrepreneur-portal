import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface TeamMemberDialogProps {
  member: {
    id: string;
    name: string;
    position: string;
    skills: string[];
    avatar: string;
    initials: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onDelegate: (memberId: string) => void;
}

export const TeamMemberDialog = ({ member, isOpen, onClose, onDelegate }: TeamMemberDialogProps) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
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
            onClick={() => onDelegate(member.id)}
          >
            <Send className="h-4 w-4" />
            Delegate Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};