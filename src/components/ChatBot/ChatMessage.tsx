
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

export interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4 items-start gap-2`}>
      {isBot && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-workspace-primary text-white">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isBot
            ? "bg-workspace-secondary text-workspace-text"
            : "bg-workspace-primary text-white"
        }`}
      >
        {message}
      </div>
      {!isBot && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-workspace-accent text-white">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
