import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'
import { CheckCircle2, Circle, Clock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Activities() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const activities = [
    {
      id: 1,
      title: 'Reunião com TechSolutions',
      type: 'meeting',
      time: '09:00',
      status: 'completed',
      user: 'Carlos Silva',
    },
    {
      id: 2,
      title: 'Enviar proposta para Varejo Express',
      type: 'task',
      time: '11:30',
      status: 'pending',
      user: 'Ana Souza',
    },
    {
      id: 3,
      title: 'Almoço de negócios',
      type: 'meeting',
      time: '13:00',
      status: 'pending',
      user: 'Roberto Lima',
    },
    {
      id: 4,
      title: 'Follow-up Indústrias Metal',
      type: 'call',
      time: '15:45',
      status: 'pending',
      user: 'Roberto Lima',
    },
    {
      id: 5,
      title: 'Atualizar CRM',
      type: 'task',
      time: '17:00',
      status: 'pending',
      user: 'Admin',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Atividades e Tarefas
        </h1>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Nova Atividade
        </Button>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-4">
          {/* Today's Schedule */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Agenda de Hoje</CardTitle>
              <CardDescription>
                Você tem{' '}
                {activities.filter((a) => a.status === 'pending').length}{' '}
                atividades pendentes para hoje.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-3 bg-background/60 rounded-xl border hover:shadow-md transition-all group"
                  >
                    <div className="mr-4">
                      {activity.status === 'completed' ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-medium ${activity.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {activity.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                        <span className="capitalize px-2 py-0.5 rounded-full bg-muted text-[10px]">
                          {activity.type === 'meeting'
                            ? 'Reunião'
                            : activity.type === 'task'
                              ? 'Tarefa'
                              : 'Ligação'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage
                          src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${activity.id}`}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm mx-auto"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
