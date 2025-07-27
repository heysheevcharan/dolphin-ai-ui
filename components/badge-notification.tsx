"use client"

import { useEffect, useState } from "react"
import type { Badge } from "@/types"
import { X } from "lucide-react"

interface BadgeNotificationProps {
  badge: Badge
  onClose: () => void
}

export function BadgeNotification({ badge, onClose }: BadgeNotificationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onClose, 300)
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-card rounded-2xl p-6 mx-4 max-w-sm w-full text-center transform transition-all duration-300 ${show ? "scale-100" : "scale-95"}`}
      >
        <button
          onClick={() => {
            setShow(false)
            setTimeout(onClose, 300)
          }}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-6xl mb-4">{badge.icon}</div>
        <h3 className="text-lg font-bold text-foreground mb-2">{badge.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>

        {/* Confetti animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
