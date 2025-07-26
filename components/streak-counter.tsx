"use client"

interface StreakCounterProps {
  streak: number
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center space-x-1 bg-orange-100 rounded-full px-2 py-1">
      <span className="text-orange-600">🔥</span>
      <span className="text-xs font-bold text-orange-600">{streak}</span>
    </div>
  )
}
