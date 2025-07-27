"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

interface SpendingChartProps {
  data: {
    name: string
    value: number
    color: string
  }[]
}

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="text-sm font-medium text-foreground mb-3 text-center">Your Spending Breakdown</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => (
                <span className="text-xs text-muted-foreground">
                  {value}: ₹{entry.payload?.value?.toLocaleString()}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
