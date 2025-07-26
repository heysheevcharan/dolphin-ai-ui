"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface QuickReplyChipsProps {
  options: string[]
  multiSelect?: boolean
  onSelect?: (option: string) => void
  onMultiSelect?: (options: string[]) => void
}

export function QuickReplyChips({ options, multiSelect, onSelect, onMultiSelect }: QuickReplyChipsProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      const newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option]
      setSelectedOptions(newSelected)
    } else {
      onSelect?.(option)
    }
  }

  const handleSubmitMultiSelect = () => {
    if (selectedOptions.length > 0) {
      onMultiSelect?.(selectedOptions)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOptions.includes(option) ? "default" : "outline"}
            size="sm"
            className={`rounded-full text-xs transition-all duration-200 ${
              selectedOptions.includes(option)
                ? "bg-blue-500 text-white transform scale-105"
                : "hover:bg-blue-50 hover:border-blue-300"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
            {selectedOptions.includes(option) && multiSelect && <span className="ml-1">✓</span>}
          </Button>
        ))}
      </div>

      {multiSelect && selectedOptions.length > 0 && (
        <Button
          onClick={handleSubmitMultiSelect}
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full"
          size="sm"
        >
          Continue with {selectedOptions.length} selected
        </Button>
      )}
    </div>
  )
}
