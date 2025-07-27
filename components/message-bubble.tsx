"use client"

import { useState } from "react"
import type { Message, AgentMessage, UserMessage } from "@/types"
import { QuickReplyChips } from "./quick-reply-chips"
import { SliderInput } from "./slider-input"
import { SpendingChart } from "./spending-chart"
import { CalculatorWidget } from "./calculator-widget"
import { AgentAvatar } from "./agent-avatar"
import { formatTimestamp } from "@/lib/utils"
import { MessageRenderer } from "./message-renderer"

interface MessageBubbleProps {
  message: Message
  onUserMessage: (content: string, data?: any) => void
}

export function MessageBubble({ message, onUserMessage }: MessageBubbleProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // Handle message types with MessageRenderer
  if (message.type === "text" || message.type === "ask_question" || message.type === "image_urls") {
    return <MessageRenderer message={message} onUserMessage={onUserMessage} />
  }

  const handleQuickReply = (option: string) => {
    onUserMessage(option)
  }

  const handleMultiSelect = (options: string[]) => {
    setSelectedOptions(options)
    onUserMessage(`Selected: ${options.join(", ")}`, { multiSelect: options })
  }

  const handleSliderChange = (value: number, label: string) => {
    onUserMessage(`${label}: ${value}`, { slider: value })
  }

  if (message.type === "user") {
    let userMessage
    try {
      userMessage = JSON.parse(message.content).question_response as string
    } catch (e) {
      userMessage = message.content as string
    }

    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2">
            <p className="text-sm">{userMessage}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">{formatTimestamp(message.timestamp)}</p>
        </div>
      </div>
    )
  }

  if (message.type === "agent") {
    const agentMessage = message as AgentMessage
    return (
      <div className="flex items-start space-x-3">
        <AgentAvatar agent={agentMessage.agent} />

        <div className="flex-1 max-w-xs lg:max-w-md">
          <div className="bg-card rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-border">
            <p className="text-sm text-foreground leading-relaxed">{agentMessage.content}</p>

            {/* Quick Replies */}
            {agentMessage.quickReplies && (
              <div className="mt-3">
                <QuickReplyChips options={agentMessage.quickReplies} onSelect={handleQuickReply} />
              </div>
            )}

            {/* Multi Select */}
            {agentMessage.multiSelect && (
              <div className="mt-3">
                <QuickReplyChips options={agentMessage.multiSelect} multiSelect onMultiSelect={handleMultiSelect} />
              </div>
            )}

            {/* Slider */}
            {agentMessage.slider && (
              <div className="mt-3">
                <SliderInput {...agentMessage.slider} onValueChange={handleSliderChange} />
              </div>
            )}

            {/* Chart */}
            {agentMessage.chart && (
              <div className="mt-3">
                <SpendingChart data={agentMessage.chart} />
              </div>
            )}

            {/* Calculator */}
            {agentMessage.calculator && (
              <div className="mt-3">
                <CalculatorWidget type={agentMessage.calculator} />
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-1">{formatTimestamp(agentMessage.timestamp)}</p>
        </div>
      </div>
    )
  }

  // Fallback for unknown message types
  return null
}
