import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useState } from "react";

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
  onDelegate: (memberId: string, selectedTask: string) => void;
}

const getRecommendedTasks = (skills: string[]) => {
  const taskRecommendations: Record<string, string[]> = {
    'React': [
      'Implement new UI components',
      'Fix responsive design issues',
      'Optimize component performance'
    ],
    'TypeScript': [
      'Add type definitions',
      'Refactor JavaScript to TypeScript',
      'Implement type-safe features'
    ],
    'UI/UX': [
      'Design user flows',
      'Create wireframes',
      'Improve user experience'
    ],
    'Node.js': [
      'Build API endpoints',
      'Optimize server performance',
      'Implement authentication'
    ],
    'Python': [
      'Create data processing scripts',
      'Build automation tools',
      'Implement ML features'
    ],
    'Database Design': [
      'Optimize database schemas',
      'Write efficient queries',
      'Implement data migrations'
    ],
    'Strategy': [
      'Define product roadmap',
      'Analyze market trends',
      'Plan feature releases'
    ],
    'Agile': [
      'Lead sprint planning',
      'Facilitate retrospectives',
      'Manage backlog'
    ],
    'Figma': [
      'Create UI mockups',
      'Design system maintenance',
      'Prototype interactions'
    ]
  };

  // Get unique recommended tasks based on skills
  const recommendations = new Set<string>();
  skills.forEach(skill => {
    taskRecommendations[skill]?.forEach(task => recommendations.add(task));
  });

  return Array.from(recommendations).slice(0, 5); // Return top 5 recommendations
};

export const TeamMemberDialog = ({ member, isOpen, onClose, onDelegate }: TeamMemberDialogProps) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  if (!member) return null;

  const recommendedTasks = getRecommendedTasks(member.skills);

  const handleDelegate = () => {
    if (selectedTask && member) {
      onDelegate(member.id, selectedTask);
    }
  };

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

          {/* Recommended Tasks Section */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">Select a Task to Delegate:</h4>
            <ul className="space-y-2 mb-4">
              {recommendedTasks.map((task, index) => (
                <li 
                  key={index}
                  onClick={() => setSelectedTask(task)}
                  className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer transition-colors
                    ${selectedTask === task 
                      ? 'bg-purple-500/20 border-2 border-purple-500' 
                      : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-500 text-xs">
                    {index + 1}
                  </span>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full gap-2"
            onClick={handleDelegate}
            disabled={!selectedTask}
          >
            <Send className="h-4 w-4" />
            Delegate {selectedTask ? `"${selectedTask}"` : 'Task'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};