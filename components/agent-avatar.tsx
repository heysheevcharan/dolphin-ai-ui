"use client"

import type { Agent } from "@/types"

interface AgentAvatarProps {
  agent: Agent
}

export function AgentAvatar({ agent }: AgentAvatarProps) {
  const getAgentInfo = (agent: Agent) => {
    switch (agent) {
      case "dolphin":
        return { emoji: "🐬", bg: "bg-primary/10", text: "text-primary" }
      case "elephant":
        return { emoji: "🐘", bg: "bg-secondary/10", text: "text-secondary" }
      case "cheetah":
        return { emoji: "🐆", bg: "bg-accent/10", text: "text-accent" }
    }
  }

  const info = getAgentInfo(agent)

  return (
    <div className={`w-8 h-8 rounded-full ${info.bg} flex items-center justify-center flex-shrink-0`}>
      <span className="text-sm">{info.emoji}</span>
    </div>
  )
}
