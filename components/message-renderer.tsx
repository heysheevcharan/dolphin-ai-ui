"use client"

import { useState } from "react"
import type { Message, TextMessage, AskQuestionMessage, ImageUrlsMessage } from "@/types"
import { QuickReplyChips } from "./quick-reply-chips"
import { formatTimestamp } from "@/lib/utils"

interface MessageRendererProps {
  message: Message
  onUserMessage: (content: string, data?: any) => void
}

// ChatMessage component for rendering message bubbles
const ChatMessage = ({ role, content, children, timestamp }: { role: "user" | "ai", content?: string | string[], children?: React.ReactNode, timestamp?: Date }) => {
  const isUser = role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? "" : "flex items-start space-x-3"}`}>
        {!isUser && (
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
        )}
        <div>
          <div className={`${isUser ? "bg-blue-500 text-white" : "bg-white text-gray-800"} rounded-2xl ${isUser ? "rounded-br-md" : "rounded-bl-md"} px-4 py-2 ${!isUser ? "shadow-sm border border-gray-100" : ""}`}>
            {content && typeof content === 'string' && <p className="text-sm">{content}</p>}
            {children}
          </div>
          <p className={`text-xs text-gray-500 mt-1 ${isUser ? "text-right" : ""}`}>
            {timestamp && formatTimestamp(timestamp)}
          </p>
        </div>
      </div>
    </div>
  )
}

export function MessageRenderer({ message, onUserMessage }: MessageRendererProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    onUserMessage(JSON.stringify({
      question_response: option
    }))
  }

  const messageRenderer = () => {
    const messageTypeSwitch = (message: Message) => {
      switch (message.type) {
        case "text":
          if (message.role === "user") {
            let messageContent
            try {
              messageContent = JSON.parse(message.content as string).question_response
            } catch (e) {
              messageContent = message.content
            }
            if (messageContent) {
              return (
                  <ChatMessage role={message.role} content={messageContent} />
              )
            } else {
              return null
            }

          }
          const textMessage = message as TextMessage
          return <ChatMessage role={textMessage.role} content={textMessage.content} timestamp={textMessage.timestamp} />
        case "image_urls":
          const imageMessage = message as ImageUrlsMessage
          return (
            <ChatMessage role={imageMessage.role} timestamp={imageMessage.timestamp}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {imageMessage.content.map((image_url: string, idx: number) => (
                  <img
                    key={idx}
                    src={image_url}
                    alt="uploaded"
                    style={{
                      height: "230px",
                      objectFit: "contain",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            </ChatMessage>
          )
        case "ask_question":
          const questionMessage = message as AskQuestionMessage
          return (
            <ChatMessage role="ai" timestamp={questionMessage.timestamp}>
              <div>
                <p className="text-sm text-gray-800 leading-relaxed">{questionMessage.question}</p>
                <div className="mt-3">
                  <QuickReplyChips
                    options={questionMessage.options}
                    onSelect={handleOptionSelect}
                    selectedOption={selectedOption}
                  />
                </div>
              </div>
            </ChatMessage>
          )
        default:
          return <ChatMessage role="ai" content={message.content?.toString()} />
      }
    }

    return messageTypeSwitch(message)
  }

  return messageRenderer()
}
