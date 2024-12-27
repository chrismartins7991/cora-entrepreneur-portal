import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { useState } from "react";

const suggestions = [
  "What is the alternative to take my agency to 5k/ month",
  "I want to start automating the customer support. Automate it for me.",
  "Get me the best 5 email marketing tools for an easy setup.",
  "With a Budget of 500€ how can I create 5 different forms the quickest way",
];

export default function CoraAI() {
  const [messages, setMessages] = useState<Array<{ sender: string; message: string }>>([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: "User", message: inputMessage }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "Cora", message: "I'm here to help! Let me assist you with that." }]);
      }, 1000);
      setInputMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">New Chat</Button>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">Sort by Date</Button>
      </div>

      <div className="text-center my-4 sm:my-8 space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white px-4">
          I'm available 24/7 to assist you and make your Business succeed
        </h1>
        <p className="text-lg sm:text-xl text-white/80">
          with you for a successful entrepreneurial journey
        </p>

        <div className="max-w-2xl mx-auto mt-8 px-4">
          <div className="relative">
            <Input
              placeholder="I'm looking for..."
              className="pl-4 sm:pl-10"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
        </div>

        <div className="mt-8 px-4">
          <p className="text-white mb-4">You may ask:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((text, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-xs sm:text-sm"
                onClick={() => setInputMessage(text)}
              >
                {text}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 px-4">
        {messages.map((msg, index) => (
          <GlassCard
            key={index}
            className={`mb-4 ${msg.sender === "User" ? "ml-auto" : "mr-auto"} max-w-[90%] sm:max-w-[80%]`}
          >
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base">{msg.sender}</span>
              <span className="text-sm sm:text-base">{msg.message}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}