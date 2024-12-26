import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { Brain, Map, BarChart2, Gauge, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
        <div className="flex gap-4 mb-4">
          <Button
            variant={currentView === "cockpit" ? "default" : "outline"}
            onClick={() => setCurrentView("cockpit")}
          >
            <Gauge className="mr-2 h-4 w-4" />
            Cockpit View
          </Button>
          <Button
            variant={currentView === "neuron" ? "default" : "outline"}
            onClick={() => setCurrentView("neuron")}
          >
            <Brain className="mr-2 h-4 w-4" />
            Neuron View
          </Button>
          <Button
            variant={currentView === "mindmap" ? "default" : "outline"}
            onClick={() => setCurrentView("mindmap")}
          >
            <Map className="mr-2 h-4 w-4" />
            Mind Map View
          </Button>
          <Button
            variant={currentView === "list" ? "default" : "outline"}
            onClick={() => setCurrentView("list")}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            List View
          </Button>
          <Button
            variant={currentView === "notes" ? "default" : "outline"}
            onClick={() => setCurrentView("notes")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Notes View
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto mr-4">
            <GlassCard className="h-full">
              <div className="text-center">
                {currentView === "neuron" && (
                  <div className="relative w-[600px] h-[600px] mx-auto">
                    {sectors.map((sector, index) => (
                      <button
                        key={sector.name}
                        onClick={() => handleSectorClick(sector.name)}
                        className="absolute rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                        style={{
                          width: index === 0 ? "120px" : "100px",
                          height: index === 0 ? "120px" : "100px",
                          backgroundColor: sector.color,
                          top: index === 0 ? "240px" : `${240 + Math.sin(index * Math.PI / 2.5) * 200}px`,
                          left: index === 0 ? "240px" : `${240 + Math.cos(index * Math.PI / 2.5) * 200}px`,
                        }}
                      >
                        <span className="font-bold text-white">{sector.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          <div className="w-[300px] flex flex-col gap-4">
            <GlassCard className="flex-1 overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">Chat with Cora</h3>
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 text-${msg.sender === "User" ? "right" : "left"}`}
                >
                  <span className="font-bold">{msg.sender}</span>
                  <p>{msg.message}</p>
                </div>
              ))}
            </GlassCard>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}