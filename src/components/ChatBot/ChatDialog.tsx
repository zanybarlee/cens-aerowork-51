
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

async function query(data: { question: string }) {
  const response = await fetch(
    "http://127.0.0.1:3000/api/v1/prediction/28bcbd73-386a-4c50-855d-23bcd0ccde4d",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

const starterPrompts = [
  "Tell me about aircraft maintenance procedures",
  "What are common MRO challenges?",
  "How can I improve compliance tracking?",
];

export function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await query({ question: inputMessage });
      const botMessage = { text: response.text, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarterPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleClearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been cleared.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-workspace-primary">Chat Assistant</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            className="hover:bg-workspace-secondary/20"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 && (
            <div className="p-4 space-y-2">
              <p className="text-sm text-workspace-text/70 mb-2">Try asking about:</p>
              {starterPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left mb-2 h-auto whitespace-normal"
                  onClick={() => handleStarterPrompt(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
