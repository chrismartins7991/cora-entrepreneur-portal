import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlassCard } from "@/components/GlassCard";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/types/chat";

export function ChatSidebar() {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { sender: 'User', message: chatMessage }]);
      setTimeout(() => {
        setChatHistory(prev => [...prev, { sender: 'Cora', message: 'Thank you for your message. How can I assist you further?' }]);
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
  );
}