"use client"

import { useEffect, useRef, useState } from "react"
import { MessageBubble } from "./message-bubble"
import { InputBar } from "./input-bar"
import { TypingIndicator } from "./typing-indicator"
import type { Message, Agent } from "@/types"

interface ChatContainerProps {
  messages: Message[]
  currentAgent: Agent
  onUserMessage: (content: string, data?: any) => void
}

export function ChatContainer({ messages, currentAgent, onUserMessage }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Show typing indicator when agent is about to respond
    if (messages.length > 0 && messages[messages.length - 1].type === "user") {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 1500)
    }
  }, [messages])

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary/5">
        <div>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} onUserMessage={onUserMessage} />
          ))}
        </div>

        {isTyping && <TypingIndicator agent={currentAgent} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <InputBar onSendMessage={onUserMessage} />
    </div>
  )
}
