'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, Mail, FileText, Settings, RefreshCcw, Paperclip, Image } from 'lucide-react'
import { ChatMessage } from '../../pages/chatbot/ChatMessage';
import { processMessage } from '../../utils/chatUtils';
import { Message, MessageType } from '../../types/chat';
import { Globe } from 'lucide-react'; 

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedPrompts = [
    {
      title: 'Write a to-do list for a personal project or task',
      description: 'Generate a structured list of tasks for your personal or professional projects.',
      icon: <MessageSquare className="w-5 h-5 text-purple-600" />
    },
    {
      title: 'Generate an email to reply to a job offer',
      description: 'Draft a professional and courteous email response for your job offer.',
      icon: <Mail className="w-5 h-5 text-blue-600" />
    },
    {
      title: 'Summarise this article or text for me in one paragraph',
      description: 'Provide a concise summary of any article or text you share.',
      icon: <FileText className="w-5 h-5 text-green-600" />
    },
    {
      title: 'How does AI work in a technical capacity',
      description: 'Learn the fundamentals of how AI operates on a technical level.',
      icon: <Settings className="w-5 h-5 text-yellow-600" />
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userMessage: Message = {
      type: MessageType.User,
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    try {
      const response = await processMessage(input)
      const botMessage: Message = {
        type: MessageType.Bot,
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        type: MessageType.Error,
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-12 bg-blue-600 flex items-center px-4 text-white font-medium">
        EduTrack ChatBot
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Menu</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">Dashboard</li>
            <li className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">Resources</li>
            <li className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">Settings</li>
          </ul>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex justify-center bg-gray-100">
          <div className="w-full bg-white rounded-lg shadow-md">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-auto p-6">
                {messages.length === 0 ? (
                  <>
                    {/* Initial Header */}
                    <div className="mb-8">
                      <h1 className="text-2xl font-normal mb-1">
                        Hi there, <span className="text-purple-600">John</span>
                      </h1>
                      <h2 className="text-2xl font-normal text-purple-600 mb-1">
                        What would you like to know?
                      </h2>
                      <p className="text-sm text-gray-500">
                        Use one of the most common prompts below or use your own to begin
                      </p>
                    </div>

                    {/* Prompt Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {suggestedPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          className="bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-purple-300 transition-all flex flex-col gap-2"
                          onClick={() => setInput(prompt.title)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-gray-600">
                              {prompt.icon}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{prompt.title}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {prompt.description}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Refresh Prompts Button */}
                    <button
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => {/* Add refresh logic */}}
                    >
                      <RefreshCcw className="w-4 h-4" />
                      <span className="text-sm">Refresh Prompts</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <ChatMessage key={index} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Updated Input Form */}
              <div className="border-t bg-white p-4">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask whatever you want...."
                      className="w-full p-4 pr-40 text-gray-700 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-purple-300 shadow-sm"
                      disabled={isProcessing}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-4">
                      <button 
                        type="button" 
                        className="text-gray-400 hover:text-gray-600 flex items-center gap-2"
                      >
                        <Paperclip className="w-5 h-5" />
                        <span className="text-sm">Add Attachment</span>
                      </button>
                      <button 
                        type="button" 
                        className="text-gray-400 hover:text-gray-600 flex items-center gap-2"
                      >
                        <Image className="w-5 h-5" />
                        <span className="text-sm">Use Image</span>
                      </button>
                      <div className="w-px h-6 bg-gray-200"></div>
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
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" /> {/* Globe Icon */}
                      <span className="text-sm text-gray-500">All Web</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {messages.length > 0 && (
                      <button
                        type="button"
                        onClick={clearChat}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Clear Chat
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot
