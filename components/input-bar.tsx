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
    <div className="bg-card border-t border-border p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Paperclip className="w-5 h-5" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="rounded-full pr-12 border-input focus:border-primary focus:ring-primary"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>

        <Button
          type="submit"
          size="sm"
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground p-2"
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
