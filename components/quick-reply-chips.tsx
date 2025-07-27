"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface QuickReplyChipsProps {
  options: string[]
  multiSelect?: boolean
  onSelect?: (option: string) => void
  onMultiSelect?: (options: string[]) => void
  selectedOption?: string | null
}

export function QuickReplyChips({ 
  options, 
  multiSelect, 
  onSelect, 
  onMultiSelect,
  selectedOption 
}: QuickReplyChipsProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedOption ? [selectedOption] : []
  )

  // Update selectedOptions when selectedOption prop changes
  useEffect(() => {
    if (selectedOption) {
      setSelectedOptions([selectedOption]);
    }
  }, [selectedOption])

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      const newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option]
      setSelectedOptions(newSelected)
    } else {
      // If selectedOption is provided, don't allow selecting a different option
      if (selectedOption && option !== selectedOption) {
        return;
      }
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
            variant={(selectedOptions.includes(option) || selectedOption === option) ? "default" : "outline"}
            size="sm"
            className={`rounded-full text-xs transition-all duration-200 ${
              (selectedOptions.includes(option) || selectedOption === option)
                ? "bg-primary text-primary-foreground transform scale-105"
                : "hover:bg-primary/10 hover:border-primary/30"
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
            {((selectedOptions.includes(option) && multiSelect) || (selectedOption === option)) && <span className="ml-1">✓</span>}
          </Button>
        ))}
      </div>

      {multiSelect && selectedOptions.length > 0 && (
        <Button
          onClick={handleSubmitMultiSelect}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full"
          size="sm"
        >
          Continue with {selectedOptions.length} selected
        </Button>
      )}
    </div>
  )
}
