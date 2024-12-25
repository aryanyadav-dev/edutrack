'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  FileText,
  Settings,
  Paperclip,
  Image,
  Globe,
  Trash2,
} from 'lucide-react';
import { ChatMessage } from '../../pages/chatbot/ChatMessage';
import { processMessage } from '../../utils/chatUtils';
import { Message, MessageType } from '../../types/chat';
import { useAuth } from '../../context/AuthContext';
import './chatbot.css';

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const suggestedPrompts = [
    {
      title: 'Write a to-do list for a personal project or task',
      description: 'Generate a structured list of tasks for your personal or professional projects.',
      icon: <MessageSquare className="w-5 h-5 text-purple-600" />,
    },
    {
      title: 'Solve me a doubt on a topic or subject',
      description: 'Provide information about a specific topic.',
      icon: <Mail className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Summarize this article or text for me in one paragraph',
      description: 'Provide a concise summary of any article or text you share.',
      icon: <FileText className="w-5 h-5 text-green-600" />,
    },
    {
      title: 'Suggest me some videos or resources to learn OS',
      description: 'Learn the fundamentals of how OS operates on a technical level.',
      icon: <Settings className="w-5 h-5 text-yellow-600" />,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      type: MessageType.User,
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const response = await processMessage(input);
      const botMessage: Message = {
        type: MessageType.Bot,
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        type: MessageType.Error,
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const greeting = `Hi ${user?.displayName || user?.email || 'Guest'}`;

  return (
    <div className="flex flex-col h-screen">
      <div className="h-12 bg-blue-600 flex items-center px-4 text-white font-medium">
        EduTrack ChatBot
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-60 bg-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Menu</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">Dashboard</li>
            <li className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">Resources</li>
            <li className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">Settings</li>
          </ul>
        </div>
        <div className="flex-1 flex justify-center bg-gray-100">
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto p-6">
                {messages.length === 0 ? (
                  <div className="mb-8">
                    <h1 className="gradient-text">
                      Hi <span className="gradient-text">{user?.displayName || user?.email || 'Guest'}</span>
                    </h1>
                    <h2 className="gradient-text">What would you like to know?</h2>
                    <p className="text-sm text-gray-500">
                      Use one of the most common prompts below or use your own to begin.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {suggestedPrompts.map((prompt, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 border border-gray-400 rounded-lg hover:bg-gray-50 cursor-pointer w-[90%]"
                        >
                          {prompt.icon}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700">{prompt.title}</h4>
                            <p className="text-xs text-gray-500">{prompt.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage key={index} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              <div className="border-t bg-white p-4">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask whatever you want..."
                      className="w-full p-4 pr-40 text-gray-700 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-300 shadow-sm"
                      disabled={isProcessing}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-4">
                      <button className="text-gray-400 hover:text-gray-600 flex items-center gap-2">
                        <Paperclip className="w-5 h-5" />
                        <span className="text-sm">Add Attachment</span>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 flex items-center gap-2">
                        <Image className="w-5 h-5" />
                        <span className="text-sm">Use Image</span>
                      </button>
                      <span className="text-sm text-gray-400">{input.length}/1000</span>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 disabled:opacity-50 ml-2"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-5 h-5" />
                    <span className="text-sm">All Web</span>
                  </div>
                  <button
                    onClick={clearChat}
                    className="flex items-center text-gray-600 hover:text-red-500 gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="text-sm">Clear Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
