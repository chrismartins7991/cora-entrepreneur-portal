import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { GlassCard } from "@/components/GlassCard";
import { supabase } from "@/integrations/supabase/client";
import { RoadmapData } from "@/types/roadmap";
import { ViewSelector } from "@/components/roadmap/ViewSelector";
import { RoadmapContent } from "@/components/roadmap/RoadmapContent";

function isValidRoadmapData(data: unknown): data is RoadmapData {
  if (!data || typeof data !== 'object') return false;
  
  const roadmapData = data as RoadmapData;
  if (!Array.isArray(roadmapData.milestones)) return false;
  
  return roadmapData.milestones.every(milestone => 
    typeof milestone.title === 'string' &&
    typeof milestone.description === 'string' &&
    typeof milestone.timeline === 'string' &&
    Array.isArray(milestone.tasks) &&
    milestone.tasks.every(task =>
      typeof task.title === 'string' &&
      typeof task.description === 'string' &&
      ['high', 'medium', 'low'].includes(task.priority)
    )
  );
}

export default function Roadmap() {
  const [currentView, setCurrentView] = useState<'cockpit' | 'neuron' | 'mindmap' | 'list' | 'notes'>('neuron');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const { data: roadmapData, isLoading, error, refetch } = useQuery({
    queryKey: ['roadmap'],
    queryFn: async () => {
      console.log('Fetching roadmap data...');
      const { data, error } = await supabase
        .from('roadmap')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching roadmap:', error);
        throw error;
      }
      
      console.log('Fetched roadmap data:', data);
      
      if (!data) {
        console.log('No roadmap found');
        return null;
      }

      const parsedTasks = data.tasks as unknown;
      if (!isValidRoadmapData(parsedTasks)) {
        console.error('Invalid roadmap data structure:', parsedTasks);
        throw new Error('Invalid roadmap data structure');
      }
      
      return {
        ...data,
        tasks: parsedTasks
      };
    }
  });

  const generateRoadmap = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-roadmap');
      if (error) throw error;
      
      toast({
        title: "Roadmap Generated",
        description: "Your personalized roadmap has been created based on your profile.",
      });
      
      refetch();
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black p-2 sm:p-4 overflow-y-auto md:overflow-hidden pb-8">
      <div className="flex flex-col h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] overflow-hidden gap-4">
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />

        <div className="flex-1 overflow-auto min-h-[300px] lg:min-h-0">
          <GlassCard className="h-full p-4">
            {currentView === 'neuron' && (
              <RoadmapContent
                isGenerating={isGenerating}
                isLoading={isLoading}
                error={error as Error}
                roadmapData={roadmapData}
                onGenerateRoadmap={generateRoadmap}
              />
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}