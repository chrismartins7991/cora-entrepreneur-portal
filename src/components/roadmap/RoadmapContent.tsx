import { Brain, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoadmapData } from "@/types/roadmap";

interface RoadmapContentProps {
  isGenerating: boolean;
  isLoading: boolean;
  error: Error | null;
  roadmapData: { tasks: RoadmapData } | null;
  onGenerateRoadmap: () => void;
}

export function RoadmapContent({
  isGenerating,
  isLoading,
  error,
  roadmapData,
  onGenerateRoadmap
}: RoadmapContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Your Business Roadmap</h2>
        <Button
          onClick={onGenerateRoadmap}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          {isGenerating ? "Generating..." : "Generate Roadmap"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          Failed to load roadmap. Please try again.
        </div>
      ) : !roadmapData ? (
        <div className="text-center text-white/60">
          No roadmap generated yet. Click the button above to create one.
        </div>
      ) : roadmapData?.tasks?.milestones ? (
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-6">
            {roadmapData.tasks.milestones.map((milestone, index) => (
              <div key={index} className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                  <p className="text-sm text-white/60">{milestone.description}</p>
                  <span className="text-xs text-purple-400">{milestone.timeline}</span>
                </div>
                <div className="space-y-2 pl-6">
                  {milestone.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white">{task.title}</h4>
                          <p className="text-sm text-white/60">{task.description}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500/20 text-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-green-500/20 text-green-500'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center text-white/60">
          No roadmap generated yet. Click the button above to create one.
        </div>
      )}
    </div>
  );
}