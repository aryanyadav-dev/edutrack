import React from 'react';
import { User, Bot, AlertCircle } from 'lucide-react';
import { Message, MessageType } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const getMessageStyle = () => {
    switch (message.type) {
      case MessageType.User:
        return 'bg-white border';
      case MessageType.Bot:
        return 'bg-indigo-50';
      case MessageType.Error:
        return 'bg-red-50';
      default:
        return 'bg-white';
    }
  };

  const getIcon = () => {
    switch (message.type) {
      case MessageType.User:
        return <User className="w-6 h-6 text-gray-600" />;
      case MessageType.Bot:
        return <Bot className="w-6 h-6 text-indigo-600" />;
      case MessageType.Error:
        return <AlertCircle className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg ${getMessageStyle()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
          <span className="text-xs text-gray-400 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}