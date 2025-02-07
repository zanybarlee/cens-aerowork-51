
import React from "react";

export interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isBot
            ? "bg-workspace-secondary text-workspace-text"
            : "bg-workspace-primary text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
