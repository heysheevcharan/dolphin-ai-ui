"use client"

import type { Agent } from "@/types"

interface AgentAvatarProps {
  agent: Agent
}

export function AgentAvatar({ agent }: AgentAvatarProps) {
  const getAgentInfo = (agent: Agent) => {
    switch (agent) {
      case "dolphin":
        return { emoji: "🐬", bg: "bg-blue-100", text: "text-blue-600" }
      case "elephant":
        return { emoji: "🐘", bg: "bg-gray-100", text: "text-gray-600" }
      case "cheetah":
        return { emoji: "🐆", bg: "bg-yellow-100", text: "text-yellow-600" }
    }
  }

  const info = getAgentInfo(agent)

  return (
    <div className={`w-8 h-8 rounded-full ${info.bg} flex items-center justify-center flex-shrink-0`}>
      <span className="text-sm">{info.emoji}</span>
    </div>
  )
}
