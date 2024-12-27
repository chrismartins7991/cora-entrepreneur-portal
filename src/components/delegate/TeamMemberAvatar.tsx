import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GlassCard } from "@/components/GlassCard";

interface TeamMemberAvatarProps {
  member: {
    avatar: string;
    initials: string;
    name: string;
  };
  onClick: () => void;
  className?: string;
}

export const TeamMemberAvatar = ({ member, onClick, className }: TeamMemberAvatarProps) => {
  return (
    <button
      className={`transform transition-transform duration-300 hover:scale-110 ${className}`}
      onClick={onClick}
    >
      <GlassCard className="p-2 sm:p-3">
        <Avatar className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.initials}</AvatarFallback>
        </Avatar>
      </GlassCard>
    </button>
  );
};