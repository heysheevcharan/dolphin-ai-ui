"use client"

import { useState } from "react"
import type { Message } from "@/types"
import { QuickReplyChips } from "./quick-reply-chips"
import { SliderInput } from "./slider-input"
import { SpendingChart } from "./spending-chart"
import { CalculatorWidget } from "./calculator-widget"
import { AgentAvatar } from "./agent-avatar"
import { formatTimestamp } from "@/lib/utils"

interface MessageBubbleProps {
  message: Message
  onUserMessage: (content: string, data?: any) => void
}

export function MessageBubble({ message, onUserMessage }: MessageBubbleProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

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
    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-2">
            <p className="text-sm">{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">{formatTimestamp(message.timestamp)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start space-x-3">
      <AgentAvatar agent={message.agent!} />

      <div className="flex-1 max-w-xs lg:max-w-md">
        <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-800 leading-relaxed">{message.content}</p>

          {/* Quick Replies */}
          {message.quickReplies && (
            <div className="mt-3">
              <QuickReplyChips options={message.quickReplies} onSelect={handleQuickReply} />
            </div>
          )}

          {/* Multi Select */}
          {message.multiSelect && (
            <div className="mt-3">
              <QuickReplyChips options={message.multiSelect} multiSelect onMultiSelect={handleMultiSelect} />
            </div>
          )}

          {/* Slider */}
          {message.slider && (
            <div className="mt-3">
              <SliderInput {...message.slider} onValueChange={handleSliderChange} />
            </div>
          )}

          {/* Chart */}
          {message.chart && (
            <div className="mt-3">
              <SpendingChart data={message.chart} />
            </div>
          )}

          {/* Calculator */}
          {message.calculator && (
            <div className="mt-3">
              <CalculatorWidget type={message.calculator} />
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">{formatTimestamp(message.timestamp)}</p>
      </div>
    </div>
  )
}
