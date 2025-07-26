"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface SliderInputProps {
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
  onValueChange: (value: number, label: string) => void
}

export function SliderInput({ label, min, max, step, defaultValue, unit = "", onValueChange }: SliderInputProps) {
  const [value, setValue] = useState([defaultValue])

  const handleSubmit = () => {
    onValueChange(value[0], label)
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-2xl font-bold text-blue-600 mt-1">
          {unit === "%" ? `${value[0]}%` : `${unit}${value[0].toLocaleString()}`}
        </p>
      </div>

      <Slider value={value} onValueChange={setValue} max={max} min={min} step={step} className="w-full" />

      <div className="flex justify-between text-xs text-gray-500">
        <span>{unit === "%" ? `${min}%` : `${unit}${min.toLocaleString()}`}</span>
        <span>{unit === "%" ? `${max}%` : `${unit}${max.toLocaleString()}`}</span>
      </div>

      <Button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full" size="sm">
        Confirm Selection
      </Button>
    </div>
  )
}
