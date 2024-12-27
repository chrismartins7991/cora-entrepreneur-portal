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
    <div className="min-h-screen bg-black p-4">
      <div className="flex flex-col h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] overflow-hidden">
        {/* View Selection Buttons */}
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-2">
            <Button
              variant={currentView === "cockpit" ? "default" : "outline"}
              onClick={() => setCurrentView("cockpit")}
              className="flex-shrink-0"
            >
              <Gauge className="mr-2 h-4 w-4" />
              Cockpit View
            </Button>
            <Button
              variant={currentView === "neuron" ? "default" : "outline"}
              onClick={() => setCurrentView("neuron")}
              className="flex-shrink-0"
            >
              <Brain className="mr-2 h-4 w-4" />
              Neuron View
            </Button>
            <Button
              variant={currentView === "mindmap" ? "default" : "outline"}
              onClick={() => setCurrentView("mindmap")}
              className="flex-shrink-0"
            >
              <Map className="mr-2 h-4 w-4" />
              Mind Map View
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "outline"}
              onClick={() => setCurrentView("list")}
              className="flex-shrink-0"
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              List View
            </Button>
            <Button
              variant={currentView === "notes" ? "default" : "outline"}
              onClick={() => setCurrentView("notes")}
              className="flex-shrink-0"
            >
              <FileText className="mr-2 h-4 w-4" />
              Notes View
            </Button>
          </div>
        </ScrollArea>

        <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <GlassCard className="h-full">
              <div className="text-center">
                {currentView === "neuron" && (
                  <div className="relative w-full h-full min-h-[300px] lg:min-h-[600px]">
                    {sectors.map((sector, index) => {
                      // Calculate positions based on viewport size
                      const radius = Math.min(window.innerWidth * 0.15, 200); // Responsive radius
                      const centerX = "50%";
                      const centerY = "50%";
                      const angle = (index * (2 * Math.PI)) / sectors.length;
                      const isCenter = index === 0;

                      return (
                        <button
                          key={sector.name}
                          onClick={() => handleSectorClick(sector.name)}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 p-2 md:p-4"
                          style={{
                            width: isCenter ? "80px" : "60px",
                            height: isCenter ? "80px" : "60px",
                            backgroundColor: sector.color,
                            top: isCenter ? centerY : `calc(${centerY} + ${Math.sin(angle) * radius}px)`,
                            left: isCenter ? centerX : `calc(${centerX} + ${Math.cos(angle) * radius}px)`,
                          }}
                        >
                          <span className="font-bold text-white text-xs md:text-sm">
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
              <h3 className="text-lg font-bold mb-4">Chat with Cora</h3>
              <ScrollArea className="h-[200px] lg:h-[400px]">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${msg.sender === "User" ? "text-right" : "text-left"}`}
                  >
                    <span className="font-bold">{msg.sender}</span>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </ScrollArea>
            </GlassCard>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}