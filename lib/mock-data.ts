import type { ConversationStep } from "@/types"

export const mockConversationFlow: ConversationStep[] = [
  {
    agent: "dolphin",
    content: "Let's start with something fun! What's the one thing you'd buy tomorrow if money wasn't a thing? 🤑",
    delay: 2000,
    quickReplies: ["Dream House 🏠", "Sports Car 🏎️", "World Trip ✈️", "Tech Gadgets 📱", "Investment Portfolio 📈"],
    progressUpdate: 10,
  },
  {
    agent: "dolphin",
    content:
      "Interesting choice! Now, let's talk about your current spending. Which of these categories do you spend the most on? (Select all that apply)",
    delay: 1500,
    multiSelect: ["Food & Dining 🍕", "Shopping 🛍️", "Entertainment 🎬", "Travel ✈️", "Utilities 💡", "Healthcare 🏥"],
    progressUpdate: 25,
  },
  {
    agent: "dolphin",
    content:
      "Great! Now I'm curious about your risk appetite. On a scale of 1-10, how comfortable are you with investment risks? 📊",
    delay: 2000,
    slider: {
      label: "Risk Tolerance",
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 5,
      unit: "",
    },
    progressUpdate: 40,
    badge: {
      id: "risk-assessor",
      title: "Risk Assessor",
      description: "You've completed your risk profile assessment!",
      icon: "🎯",
    },
  },
  {
    agent: "elephant",
    content:
      "Hello! I'm Elephant, your financial advisor 🐘. Based on your responses, here's how your spending typically breaks down compared to others in your age group:",
    delay: 2000,
    chart: [
      { name: "Food & Dining", value: 25000, color: "#FF6B6B" },
      { name: "Shopping", value: 15000, color: "#4ECDC4" },
      { name: "Entertainment", value: 8000, color: "#45B7D1" },
      { name: "Utilities", value: 12000, color: "#96CEB4" },
      { name: "Savings", value: 20000, color: "#FFEAA7" },
    ],
    progressUpdate: 60,
  },
  {
    agent: "elephant",
    content:
      "Let's plan your financial future! Here's a SIP calculator to see how your investments can grow. Try different amounts to see the magic of compounding! ✨",
    delay: 2000,
    calculator: "sip",
    progressUpdate: 75,
    badge: {
      id: "planner",
      title: "Future Planner",
      description: "You've explored investment planning tools!",
      icon: "📈",
    },
  },
  {
    agent: "cheetah",
    content:
      "Hi there! I'm Cheetah, your action agent 🐆. Ready to turn plans into reality? Based on your profile, here are some quick wins you can implement today:",
    delay: 2000,
    quickReplies: [
      "Set up Auto-SIP 💰",
      "Create Emergency Fund 🛡️",
      "Track Expenses 📱",
      "Compare Insurance 🏥",
      "Optimize Taxes 📋",
    ],
    progressUpdate: 90,
  },
  {
    agent: "cheetah",
    content:
      "Fantastic! You've completed your financial onboarding journey! 🎉 Your personalized financial plan is ready. Let's start building your wealth together! 💪",
    delay: 1500,
    progressUpdate: 100,
    badge: {
      id: "onboarding-complete",
      title: "Onboarding Champion",
      description: "You've successfully completed your financial journey setup!",
      icon: "🏆",
    },
  },
]
