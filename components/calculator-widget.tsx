"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CalculatorWidgetProps {
  type: "sip" | "emi" | "compound"
}

export function CalculatorWidget({ type }: CalculatorWidgetProps) {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 100
    const t = Number.parseFloat(time)

    if (type === "sip") {
      // SIP calculation
      const monthlyRate = r / 12
      const months = t * 12
      const futureValue = p * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
      setResult(futureValue)
    } else if (type === "compound") {
      // Compound interest
      const amount = p * Math.pow(1 + r, t)
      setResult(amount)
    }
  }

  const getTitle = () => {
    switch (type) {
      case "sip":
        return "SIP Calculator"
      case "emi":
        return "EMI Calculator"
      case "compound":
        return "Compound Interest Calculator"
    }
  }

  const getLabels = () => {
    switch (type) {
      case "sip":
        return { p: "Monthly Investment (₹)", r: "Expected Return (%)", t: "Investment Period (Years)" }
      case "compound":
        return { p: "Principal Amount (₹)", r: "Interest Rate (%)", t: "Time Period (Years)" }
      default:
        return { p: "Amount (₹)", r: "Rate (%)", t: "Time (Years)" }
    }
  }

  const labels = getLabels()

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/20">
      <h3 className="text-sm font-semibold text-foreground mb-3 text-center">{getTitle()}</h3>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">{labels.p}</label>
          <Input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter amount"
            className="text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">{labels.r}</label>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter rate"
            className="text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">{labels.t}</label>
          <Input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time"
            className="text-sm"
          />
        </div>

        <Button
          onClick={calculate}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
          size="sm"
        >
          Calculate
        </Button>

        {result && (
          <div className="bg-card rounded-lg p-3 text-center border border-secondary/20">
            <p className="text-xs text-muted-foreground">{type === "sip" ? "Future Value" : "Final Amount"}</p>
            <p className="text-lg font-bold text-secondary">
              ₹{result.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
