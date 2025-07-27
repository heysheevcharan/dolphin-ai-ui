"use client"

interface StreakCounterProps {
  streak: number
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center space-x-1 bg-secondary/10 rounded-full px-2 py-1">
      <span className="text-secondary">🔥</span>
      <span className="text-xs font-bold text-secondary">{streak}</span>
    </div>
  )
}
