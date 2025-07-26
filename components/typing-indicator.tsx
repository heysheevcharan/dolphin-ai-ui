"use client"

import { AgentAvatar } from "./agent-avatar"
import type { Agent } from "@/types"

interface TypingIndicatorProps {
  agent: Agent
}

export function TypingIndicator({ agent }: TypingIndicatorProps) {
  return (
    <div className="flex items-start space-x-3">
      <AgentAvatar agent={agent} />
      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
