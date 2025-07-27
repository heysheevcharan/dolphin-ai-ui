"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Paperclip } from "lucide-react"

interface InputBarProps {
  onSendMessage: (message: string) => void
}

export function InputBar({ onSendMessage }: InputBarProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(JSON.stringify({
        question_response: message.trim()
      }))
      setMessage("")
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Button type="button" variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          <Paperclip className="w-5 h-5" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="rounded-full pr-12 border-gray-300 focus:border-blue-500"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>

        <Button
          type="submit"
          size="sm"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white p-2"
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
