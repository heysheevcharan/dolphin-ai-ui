export type Agent = "dolphin" | "elephant" | "cheetah"

export type MessageType = "user" | "agent" | "text" | "ask_question" | "image_urls"

export interface BaseMessage {
  id: string
  type: MessageType
  timestamp: Date
}

export interface UserMessage extends BaseMessage {
  type: "user"
  content: string
  data?: any
}

export interface AgentMessage extends BaseMessage {
  type: "agent"
  agent: Agent
  content: string
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

export interface TextMessage extends BaseMessage {
  type: "text"
  role: "user" | "ai"
  content: string
  additional_kwargs?: any
  response_metadata?: any
}

export interface AskQuestionMessage extends BaseMessage {
  type: "ask_question"
  role: "ai"
  content: string
  options: string[]
  question: string
}

export interface ImageUrlsMessage extends BaseMessage {
  type: "image_urls"
  role: "user" | "ai"
  content: string[]
  additional_kwargs?: any
  response_metadata?: any
}

export type Message = UserMessage | AgentMessage | TextMessage | AskQuestionMessage | ImageUrlsMessage

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
