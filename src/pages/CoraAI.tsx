import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlassCard } from "@/components/GlassCard";
import { MessageCircle, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CoraAI() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string; message: string }>>([]);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to chat
      setChatHistory([...chatHistory, { sender: "User", message }]);

      // Simulate Cora's response
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          { sender: "Cora", message: "Thank you for your message. How can I assist you further?" }
        ]);
      }, 1000);

      setMessage("");
    } else {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
      <div className="flex flex-col h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] gap-4">
        {/* Chat History */}
        <GlassCard className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-4 flex items-start gap-2 ${
                  chat.sender === "User" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    chat.sender === "User" ? "bg-blue-500" : "bg-purple-500"
                  }`}
                >
                  {chat.sender === "User" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <MessageCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    chat.sender === "User"
                      ? "bg-blue-500 text-white"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  <p className="text-sm">{chat.message}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </GlassCard>

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}