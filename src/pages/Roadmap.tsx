import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { Brain, Map, BarChart2, Gauge, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const { toast } = useToast();

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
    <div className="min-h-[calc(100vh-4rem)] bg-black p-2 sm:p-4">
      <div className="flex flex-col h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] overflow-hidden gap-4">
        {/* View Selection Buttons */}
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
          {/* Main Content Area */}
          <div className="flex-1 overflow-auto min-h-[300px] lg:min-h-0">
            <GlassCard className="h-full">
              <div className="text-center">
                {currentView === "neuron" && (
                  <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px]">
                    {sectors.map((sector, index) => {
                      const isMobile = window.innerWidth < 768;
                      const radius = isMobile ? Math.min(window.innerWidth * 0.25, 120) : Math.min(window.innerWidth * 0.15, 200);
                      const buttonSize = isMobile ? 40 : 60;
                      const centerX = "50%";
                      const centerY = "50%";
                      const angle = (index * (2 * Math.PI)) / sectors.length;
                      const isCenter = index === 0;

                      return (
                        <button
                          key={sector.name}
                          onClick={() => handleSectorClick(sector.name)}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 p-1 sm:p-2"
                          style={{
                            width: isCenter ? buttonSize * 1.3 : buttonSize,
                            height: isCenter ? buttonSize * 1.3 : buttonSize,
                            backgroundColor: sector.color,
                            top: isCenter ? centerY : `calc(${centerY} + ${Math.sin(angle) * radius}px)`,
                            left: isCenter ? centerX : `calc(${centerX} + ${Math.cos(angle) * radius}px)`,
                          }}
                        >
                          <span className="font-bold text-white text-[10px] sm:text-xs">
                            {sector.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Chat Sidebar */}
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