import React from 'react';
import { BookOpen, HelpCircle, PenTool, Brain } from 'lucide-react';

interface SuggestedPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onPromptSelect }: SuggestedPromptsProps) {
  const suggestions = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      text: "Can you help me create study notes for Biology chapter on Cell Structure?",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      text: "Explain the concept of photosynthesis in simple terms",
    },
    {
      icon: <PenTool className="w-5 h-5" />,
      text: "Help me solve this calculus problem: Find the derivative of f(x) = x²",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      text: "What are some effective study techniques for memorizing historical dates?",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onPromptSelect(suggestion.text)}
          className="flex items-center space-x-3 p-4 bg-white rounded-lg border hover:border-indigo-500 hover:shadow-sm transition-all"
        >
          <div className="text-indigo-600">{suggestion.icon}</div>
          <span className="text-sm text-gray-700 text-left">{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
}