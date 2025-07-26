export type Agent = "dolphin" | "elephant" | "cheetah"

export interface Message {
  id: string
  type: "user" | "agent"
  agent?: Agent
  content: string
  timestamp: Date
  data?: any
  quickReplies?: string[]
  multiSelect?: string[]
  slider?: {
    label: string
    min: number
    max: number
    step: number
    defaultValue: number
    unit?: string
  }
  chart?: {
    name: string
    value: number
    color: string
  }[]
  calculator?: "sip" | "emi" | "compound"
  showProgress?: boolean
}

export interface Badge {
  id: string
  title: string
  description: string
  icon: string
}

export interface UserProfile {
  name: string
  financialHealthScore: number
  level: "Beginner" | "Intermediate" | "Expert"
  streak: number
  badges: Badge[]
}

export interface ConversationStep {
  agent: Agent
  content: string
  delay?: number
  quickReplies?: string[]
  multiSelect?: string[]
  slider?: {
    label: string
    min: number
    max: number
    step: number
    defaultValue: number
    unit?: string
  }
  chart?: {
    name: string
    value: number
    color: string
  }[]
  calculator?: "sip" | "emi" | "compound"
  progressUpdate?: number
  badge?: Badge
  showProgress?: boolean
}
