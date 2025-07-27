"use client"

interface LevelIndicatorProps {
  level: "Beginner" | "Intermediate" | "Expert"
}

export function LevelIndicator({ level }: LevelIndicatorProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-primary/10 text-primary"
      case "Intermediate":
        return "bg-secondary/10 text-secondary"
      case "Expert":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className={`px-2 py-1 rounded-full ${getLevelColor(level)}`}>
      <span className="text-xs font-medium">{level}</span>
    </div>
  )
}
