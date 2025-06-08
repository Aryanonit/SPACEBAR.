import { Line } from "recharts"
import { CartesianGrid, Legend, LineChart as RechartsLineChart, Tooltip, XAxis, YAxis } from "recharts"

interface LineChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function LineChart({ data, index, categories, colors, valueFormatter, className }: LineChartProps) {
  return (
    <RechartsLineChart data={data} className={className}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={index} />
      <YAxis tickFormatter={valueFormatter} />
      <Tooltip formatter={valueFormatter ? (value) => [valueFormatter(value as number)] : undefined} />
      <Legend />
      {categories.map((category, i) => (
        <Line
          key={category}
          type="monotone"
          dataKey={category}
          stroke={colors[i % colors.length]}
          activeDot={{ r: 8 }}
        />
      ))}
    </RechartsLineChart>
  )
}
