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
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts'
import { Clock, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function Index() {
  // Chart Data
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Fev', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Abr', revenue: 61000 },
    { month: 'Mai', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ]

  const revenueConfig = {
    revenue: {
      label: 'Receita (R$)',
      color: 'hsl(var(--chart-1))',
    },
  }

  const salesData = [
    { name: 'Novo', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Qualificado', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Proposta', value: 300, fill: 'hsl(var(--chart-3))' },
    { name: 'Fechado', value: 200, fill: 'hsl(var(--chart-4))' },
  ]

  const salesConfig = {
    visitors: {
      label: 'Vendas',
    },
    novo: {
      label: 'Novo',
      color: 'hsl(var(--chart-1))',
    },
    qualificado: {
      label: 'Qualificado',
      color: 'hsl(var(--chart-2))',
    },
    proposta: {
      label: 'Proposta',
      color: 'hsl(var(--chart-3))',
    },
    fechado: {
      label: 'Fechado',
      color: 'hsl(var(--chart-4))',
    },
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section: Customer Journey */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Fluxo de Vendas e Jornada do Cliente
          </h2>
        </div>
      </section>

      {/* KPI Grid */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Leads
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Estimada
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 542.3k</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atividades Ativas
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              4 urgentes para hoje
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Charts Section */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass-card">
          <CardHeader>
            <CardTitle>Relatório Receita</CardTitle>
            <CardDescription>
              Visualização da receita mensal nos últimos 6 meses.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={revenueConfig} className="h-[300px] w-full">
              <LineChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `R$${value / 1000}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  strokeWidth={2}
                  stroke="var(--color-revenue)"
                  activeDot={{ r: 8 }}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3 glass-card">
          <CardHeader>
            <CardTitle>Distribuição de Pipeline</CardTitle>
            <CardDescription>
              Status atual das oportunidades de venda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesConfig} className="h-[300px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={salesData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                ></Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
