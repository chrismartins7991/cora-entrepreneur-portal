import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { Brain, Map, BarChart2, Gauge, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { RoadmapData } from "@/types/roadmap";

const sectors = [
  { name: "Core", color: "#6530D3", departments: ["Strategy", "Innovation", "Leadership"] },
  { name: "Marketing", color: "#0C3DF0", departments: ["Digital", "Branding", "PR"] },
  { name: "Finance", color: "#00C9FF", departments: ["Accounting", "Investments", "Budgeting"] },
  { name: "Operations", color: "#7C4DFF", departments: ["Logistics", "Quality Control", "Supply Chain"] },
  { name: "HR", color: "#B388FF", departments: ["Recruitment", "Training", "Employee Relations"] },
  { name: "R&D", color: "#3D5AFE", departments: ["Product Development", "Research", "Innovation Lab"] },
];

export default function Roadmap() {
  const [currentView, setCurrentView] = useState<'cockpit' | 'neuron' | 'mindmap' | 'list' | 'notes'>('neuron');
  const [openSector, setOpenSector] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{sender: string, message: string}>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Update the query to properly type the roadmap data
  const { data: roadmapData, isLoading, error, refetch } = useQuery({
    queryKey: ['roadmap'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('roadmap')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      
      // Parse the tasks JSON field into our typed structure
      const parsedTasks = data.tasks as RoadmapData;
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

  const handleSectorClick = (sectorName: string) => {
    setOpenSector(openSector === sectorName ? null : sectorName);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, {sender: 'User', message: chatMessage}]);
      setTimeout(() => {
        setChatHistory(prev => [...prev, {sender: 'Cora', message: 'Thank you for your message. How can I assist you further?'}]);
      }, 1000);
      setChatMessage('');
    } else {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black p-2 sm:p-4 overflow-y-auto md:overflow-hidden pb-8">
      <div className="flex flex-col h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] overflow-hidden gap-4">
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex gap-2 px-2">
            <Button
              variant={currentView === "cockpit" ? "default" : "outline"}
              onClick={() => setCurrentView("cockpit")}
              className="flex-shrink-0 text-xs sm:text-sm"
            >
              <Gauge className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Cockpit View
            </Button>
            <Button
              variant={currentView === "neuron" ? "default" : "outline"}
              onClick={() => setCurrentView("neuron")}
              className="flex-shrink-0 text-xs sm:text-sm"
            >
              <Brain className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Neuron View
            </Button>
            <Button
              variant={currentView === "mindmap" ? "default" : "outline"}
              onClick={() => setCurrentView("mindmap")}
              className="flex-shrink-0 text-xs sm:text-sm"
            >
              <Map className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Mind Map View
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "outline"}
              onClick={() => setCurrentView("list")}
              className="flex-shrink-0 text-xs sm:text-sm"
            >
              <BarChart2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              List View
            </Button>
            <Button
              variant={currentView === "notes" ? "default" : "outline"}
              onClick={() => setCurrentView("notes")}
              className="flex-shrink-0 text-xs sm:text-sm"
            >
              <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Notes View
            </Button>
          </div>
        </ScrollArea>

        <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">
          <div className="flex-1 overflow-auto min-h-[300px] lg:min-h-0">
            <GlassCard className="h-full p-4">
              {currentView === 'neuron' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Your Business Roadmap</h2>
                    <Button
                      onClick={generateRoadmap}
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
              )}
            </GlassCard>
          </div>

          <div className="w-full lg:w-[300px] flex flex-col gap-4">
            <GlassCard className="flex-1 overflow-y-auto">
              <h3 className="text-base sm:text-lg font-bold mb-4">Chat with Cora</h3>
              <ScrollArea className="h-[200px] lg:h-[400px]">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${msg.sender === "User" ? "text-right" : "text-left"}`}
                  >
                    <span className="font-bold text-sm">{msg.sender}</span>
                    <p className="text-xs sm:text-sm">{msg.message}</p>
                  </div>
                ))}
              </ScrollArea>
            </GlassCard>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 text-sm"
              />
              <Button onClick={handleSendMessage} className="text-sm">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
