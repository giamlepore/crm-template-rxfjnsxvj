import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  Area,
  AreaChart,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Index() {
  // Chart Data
  const supportTicketData = [
    { month: 'Jan', tickets: 120, resolved: 100 },
    { month: 'Fev', tickets: 150, resolved: 130 },
    { month: 'Mar', tickets: 180, resolved: 170 },
    { month: 'Abr', tickets: 220, resolved: 200 },
    { month: 'Mai', tickets: 250, resolved: 240 },
    { month: 'Jun', tickets: 300, resolved: 280 },
  ]

  const chartConfig = {
    tickets: {
      label: 'Tickets',
      color: 'hsl(var(--chart-1))',
    },
    resolved: {
      label: 'Resolvidos',
      color: 'hsl(var(--chart-2))',
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

  // Journey Steps
  const journeySteps = [
    {
      title: 'Alocação de Caso',
      status: 'completed',
      users: ['https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1'],
    },
    {
      title: 'Identificação do Problema',
      status: 'active',
      users: [
        'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
        'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
      ],
    },
    { title: 'Resolução Técnica', status: 'pending', users: [] },
    { title: 'Processamento', status: 'pending', users: [] },
    { title: 'Notificação', status: 'pending', users: [] },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section: Customer Journey */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Fluxo de Vendas e Jornada do Cliente
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full h-8">
              <Calendar className="mr-2 h-4 w-4" /> Ver Agenda
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 min-w-[1000px]">
            {journeySteps.map((step, index) => (
              <div key={index} className="flex-1 relative group">
                <div
                  className={`glass-card rounded-2xl p-5 h-48 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-4 ${step.status === 'completed' ? 'border-l-green-500' : step.status === 'active' ? 'border-l-accent' : 'border-l-gray-300'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex -space-x-2">
                      {step.users.length > 0 ? (
                        step.users.map((u, i) => (
                          <Avatar
                            key={i}
                            className="border-2 border-background w-8 h-8"
                          >
                            <AvatarImage src={u} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-dashed border-2 border-muted-foreground/30">
                          <Users className="h-4 w-4 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="text-green-500 h-6 w-6" />
                    ) : step.status === 'active' ? (
                      <Clock className="text-accent h-6 w-6 animate-pulse" />
                    ) : (
                      <Circle className="text-muted-foreground/30 h-6 w-6" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg leading-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Etapa {index + 1} de {journeySteps.length}
                    </p>
                  </div>
                </div>

                {index < journeySteps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-muted-foreground/40">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
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
            <CardTitle>Jornada de Vendas</CardTitle>
            <CardDescription>
              Volume de tickets e resoluções nos últimos 6 meses.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={supportTicketData}>
                <defs>
                  <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorResolved"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
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
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="tickets"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorTickets)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={1}
                  fill="url(#colorResolved)"
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
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
