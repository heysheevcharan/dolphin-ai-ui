"use client"

interface LevelIndicatorProps {
  level: "Beginner" | "Intermediate" | "Expert"
}

export function LevelIndicator({ level }: LevelIndicatorProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-600"
      case "Intermediate":
        return "bg-blue-100 text-blue-600"
      case "Expert":
        return "bg-purple-100 text-purple-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className={`px-2 py-1 rounded-full ${getLevelColor(level)}`}>
      <span className="text-xs font-medium">{level}</span>
    </div>
  )
}
