import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { useToast } from "@/components/ui/use-toast";

export default function CoraAI() {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // For now, just show a toast that the message was sent
    toast({
      title: "Message sent",
      description: "Your message has been sent to Cora AI",
    });
    setMessage("");
  };

  return (
    <div className="h-full w-full overflow-y-auto md:overflow-hidden pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 md:h-8 md:w-8" />
          Chat with Cora AI
        </h1>
        <p className="text-sm md:text-base text-white/60">
          Get instant answers and assistance from Cora AI
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 h-[calc(100%-5rem)]">
        {/* Chat Messages Area */}
        <GlassCard className="flex-1 overflow-y-auto min-h-[300px] md:min-h-[400px]">
          <div className="flex items-center justify-center h-full text-white/60">
            Start a conversation with Cora AI
          </div>
        </GlassCard>

        {/* Message Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!message.trim()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}