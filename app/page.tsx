"use client"

import { useState, useEffect } from "react"
import { ChatContainer } from "@/components/chat-container"
import { ProgressBar } from "@/components/progress-bar"
import { BadgeNotification } from "@/components/badge-notification"
import { ScoreWidget } from "@/components/score-widget"
import { StreakCounter } from "@/components/streak-counter"
import { LevelIndicator } from "@/components/level-indicator"
import type { Message, Agent, Badge, UserProfile } from "@/types"
import { mockConversationFlow } from "@/lib/mock-data"
import {initiateWorkflowAPI} from "@/services";

export default function FinanceChatApp() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentAgent, setCurrentAgent] = useState<Agent>("dolphin")
  const [onboardingProgress, setOnboardingProgress] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    financialHealthScore: 65,
    level: "Beginner",
    streak: 3,
    badges: [],
  })
  const [showBadge, setShowBadge] = useState<Badge | null>(null)
  const [conversationStep, setConversationStep] = useState(0)

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: "1",
      type: "agent",
      agent: "dolphin",
      content:
        "Hey there! 👋 I'm Dolphin, your friendly finance buddy! Ready to dive into your financial journey? This will be fun, I promise! 🐬✨",
      timestamp: new Date(),
      showProgress: true,
    }
    initiateWorkflowAPI("onboarding", {
      content: JSON.stringify({}),
      role: "user",
    }).then((response) => {
      console.log("Workflow initiated:", {response, messages: response.response.messages})
      // setMessages(response.response.messages)
    }).catch((error) => {
      console.error("Error initiating workflow:", error)
    })

    setMessages([welcomeMessage])

    // Start conversation flow after a brief delay
    setTimeout(() => {
      startConversationFlow()
    }, 2000)
  }, [])

  const startConversationFlow = () => {
    if (conversationStep < mockConversationFlow.length) {
      const step = mockConversationFlow[conversationStep]

      setTimeout(() => {
        const newMessage: Message = {
          id: Date.now().toString(),
          type: "agent",
          agent: step.agent,
          content: step.content,
          timestamp: new Date(),
          quickReplies: step.quickReplies,
          slider: step.slider,
          multiSelect: step.multiSelect,
          chart: step.chart,
          calculator: step.calculator,
          showProgress: step.showProgress,
        }

        setMessages((prev) => [...prev, newMessage])
        setCurrentAgent(step.agent)

        if (step.progressUpdate) {
          setOnboardingProgress(step.progressUpdate)
        }

        if (step.badge) {
          setTimeout(() => {
            setShowBadge(step.badge!)
            setUserProfile((prev) => ({
              ...prev,
              badges: [...prev.badges, step.badge!],
            }))
          }, 1000)
        }
      }, step.delay || 1500)
    }
  }

  const handleUserMessage = (content: string, data?: any) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
      data,
    }

    setMessages((prev) => [...prev, userMessage])
    setConversationStep((prev) => prev + 1)

    // Continue conversation flow
    setTimeout(() => {
      startConversationFlow()
    }, 500)
  }

  const handleBadgeClose = () => {
    setShowBadge(null)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative">
      {/* Header with gamification elements */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">F</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">FinanceGuru</h1>
              <p className="text-xs text-gray-500">Your AI Finance Team</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StreakCounter streak={userProfile.streak} />
            <LevelIndicator level={userProfile.level} />
          </div>
        </div>

        <ProgressBar progress={onboardingProgress} />

        <div className="flex items-center justify-between">
          <ScoreWidget score={userProfile.financialHealthScore} />
          <div className="text-xs text-gray-500">{userProfile.badges.length} badges earned</div>
        </div>
      </div>

      {/* Chat Container */}
      <ChatContainer messages={messages} currentAgent={currentAgent} onUserMessage={handleUserMessage} />

      {/* Badge Notification */}
      {showBadge && <BadgeNotification badge={showBadge} onClose={handleBadgeClose} />}
    </div>
  )
}
