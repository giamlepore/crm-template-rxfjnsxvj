import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

export default function Reports() {
  const revenueData = [
    { month: 'Jan', revenue: 45000, target: 40000 },
    { month: 'Fev', revenue: 52000, target: 42000 },
    { month: 'Mar', revenue: 48000, target: 45000 },
    { month: 'Abr', revenue: 61000, target: 48000 },
    { month: 'Mai', revenue: 55000, target: 50000 },
    { month: 'Jun', revenue: 67000, target: 55000 },
  ]

  const leadSourceData = [
    { source: 'Site', count: 120 },
    { source: 'LinkedIn', count: 85 },
    { source: 'Indicação', count: 45 },
    { source: 'Eventos', count: 30 },
    { source: 'Outros', count: 15 },
  ]

  const chartConfig = {
    revenue: {
      label: 'Receita (R$)',
      color: 'hsl(var(--chart-1))',
    },
    target: {
      label: 'Meta (R$)',
      color: 'hsl(var(--chart-2))',
    },
  }

  const sourceConfig = {
    count: {
      label: 'Leads',
      color: 'hsl(var(--chart-3))',
    },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Relatórios de Performance
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Receita vs Meta</CardTitle>
            <CardDescription>
              Comparativo semestral de faturamento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R$${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  strokeWidth={2}
                  stroke="var(--color-revenue)"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  strokeWidth={2}
                  stroke="var(--color-target)"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Origem dos Leads</CardTitle>
            <CardDescription>
              Distribuição de aquisição por canal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={sourceConfig} className="h-[300px] w-full">
              <BarChart
                data={leadSourceData}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="source"
                  type="category"
                  width={80}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="var(--color-count)"
                  radius={[0, 4, 4, 0]}
                  barSize={32}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
