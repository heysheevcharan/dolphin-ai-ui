"use client"

import { useState, useEffect } from "react"
import { ChatContainer } from "@/components/chat-container"
import { ProgressBar } from "@/components/progress-bar"
import { BadgeNotification } from "@/components/badge-notification"
import { StreakCounter } from "@/components/streak-counter"
import { LevelIndicator } from "@/components/level-indicator"
import type { Message, Agent, Badge, UserProfile, TextMessage, AskQuestionMessage } from "@/types"
import { mockConversationFlow } from "@/lib/mock-data"
import {initiateWorkflowAPI, resumeWorkflowAPI} from "@/services";

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
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Function to parse API messages into our Message format
  const parseApiMessages = (apiMessages: any[]): Message[] => {
    if (!apiMessages || !Array.isArray(apiMessages)) return [];


    return apiMessages.map((msg, index) => {
      try {
        // Common properties for all message types
        const baseMessage = {
          id: `api-${index}`,
          timestamp: new Date(),
        };

        // Handle text messages
        if (msg.type === "text") {
          const textMessage: TextMessage = {
            ...baseMessage,
            type: "text",
            role: msg.role,
            content: msg.content,
            additional_kwargs: msg.additional_kwargs || {},
            response_metadata: msg.response_metadata || {},
          };
          return textMessage;
        }

        // Handle ask_question messages
        else if (msg.type === "ask_question") {
          try {
            const content = typeof msg.content === 'string' 
              ? JSON.parse(msg.content) 
              : msg.content;

            const askQuestionMessage: AskQuestionMessage = {
              ...baseMessage,
              type: "ask_question",
              role: "ai",
              content: msg.content,
              options: content.options || [],
              question: content.question || "",
            };
            return askQuestionMessage;
          } catch (e) {
            console.error("Error parsing ask_question message:", e);
            // Fallback to text message if parsing fails
            return {
              ...baseMessage,
              type: "text",
              role: "ai",
              content: msg.content,
            } as TextMessage;
          }
        }

        // Default fallback
        return {
          ...baseMessage,
          type: msg.type,
          role: msg.role || "ai",
          content: msg.content || "Message could not be displayed",
        } as TextMessage;
      } catch (e) {
        console.error("Error parsing message:", e);
        return {
          id: `error-${index}`,
          type: "text",
          role: "ai",
          content: "Error displaying message",
          timestamp: new Date(),
        } as TextMessage;
      }
    });
  };

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

    // Use the API to get messages
    initiateWorkflowAPI("onboarding", {
      content: JSON.stringify({}),
      role: "user",
    }).then((response) => {
      console.log("Workflow initiated:", {response, messages: response.response.messages})

      if (response.response && response.response.messages) {
        const parsedMessages = parseApiMessages(response.response.messages);
        setMessages([welcomeMessage, ...parsedMessages]);

        // Store session ID for future interactions
        if (response.response.session_id) {
          setSessionId(response.response.session_id);
        }
      } else {
        setMessages([welcomeMessage]);
        // Start mock conversation flow after a brief delay
        setTimeout(() => {
          startConversationFlow()
        }, 2000)
      }
    }).catch((error) => {
      console.error("Error initiating workflow:", error)
      setMessages([welcomeMessage]);
      // Start mock conversation flow after a brief delay
      setTimeout(() => {
        startConversationFlow()
      }, 2000)
    })
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

    // Create a user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
      data,
    }

    setMessages((prev) => [...prev, userMessage])

    // If we have a session ID, use the API to continue the conversation
    if (sessionId) {
      // Show typing indicator by setting a temporary message
      const typingMessage: TextMessage = {
        id: `typing-${Date.now()}`,
        type: "text",
        role: "ai",
        content: "...",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, typingMessage])

      // Call the API
      resumeWorkflowAPI("onboarding", sessionId, {
        content: content,
        role: "user",
      })
        .then((response) => {
          console.log("Workflow resumed:", response)

          if (response.response && response.response.messages) {
            const parsedMessages = parseApiMessages(response.response.messages);
            setMessages(parsedMessages)
          }
        })
        .catch((error) => {
          console.error("Error resuming workflow:", error)

          // Remove the typing indicator
          setMessages((prev) => prev.filter(msg => msg.id !== typingMessage.id))

          // Fallback to mock conversation
          setConversationStep((prev) => prev + 1)
          startConversationFlow()
        })

    } else {
      // Fallback to mock conversation
      setConversationStep((prev) => prev + 1)

      // Continue conversation flow
      setTimeout(() => {
        startConversationFlow()
      }, 500)
    }
  }

  const handleBadgeClose = () => {
    setShowBadge(null)
  }

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto relative">
      {/* Header with gamification elements */}
      <div className="bg-card border-b border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">Fi</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">DolphinAI</h1>
              <p className="text-xs text-muted-foreground">Your AI Finance Team</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StreakCounter streak={userProfile.streak} />
            <LevelIndicator level={userProfile.level} />
          </div>
        </div>

        <ProgressBar progress={onboardingProgress} />

      </div>

      {/* Chat Container */}
      <ChatContainer messages={messages} currentAgent={currentAgent} onUserMessage={handleUserMessage} />

      {/* Badge Notification */}
      {showBadge && <BadgeNotification badge={showBadge} onClose={handleBadgeClose} />}
    </div>
  )
}
