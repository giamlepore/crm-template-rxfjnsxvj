import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLeads } from '@/context/LeadsContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal } from 'lucide-react'

const stages = [
  { id: 'Novo', title: 'Prospecção', color: 'bg-blue-500/10 border-blue-200' },
  {
    id: 'Em Contato',
    title: 'Qualificação',
    color: 'bg-yellow-500/10 border-yellow-200',
  },
  {
    id: 'Qualificado',
    title: 'Proposta',
    color: 'bg-orange-500/10 border-orange-200',
  },
  {
    id: 'Negociacao',
    title: 'Negociação',
    color: 'bg-purple-500/10 border-purple-200',
  }, // Added for visual completeness
  {
    id: 'Fechado',
    title: 'Fechado',
    color: 'bg-green-500/10 border-green-200',
  }, // Added for visual completeness
]

export default function Pipeline() {
  const { leads } = useLeads()

  // Mock distribution for the extra stages not in the Lead Status enum for visualization
  const getLeadsForStage = (stageId: string) => {
    if (stageId === 'Negociacao') return []
    if (stageId === 'Fechado') return []
    return leads.filter((l) => l.status === stageId)
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Pipeline de Vendas
        </h1>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm py-1 px-3">
            Total: R$ 1.2M
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex h-full gap-4 min-w-[1200px]">
          {stages.map((stage) => (
            <div key={stage.id} className="flex-1 flex flex-col min-w-[280px]">
              <div
                className={`p-3 rounded-t-xl border-t border-x ${stage.color} flex justify-between items-center bg-white/50 backdrop-blur-sm`}
              >
                <h3 className="font-semibold text-sm uppercase tracking-wide">
                  {stage.title}
                </h3>
                <Badge variant="secondary" className="bg-white/80">
                  {getLeadsForStage(stage.id).length}
                </Badge>
              </div>
              <div className="flex-1 bg-muted/30 border-x border-b rounded-b-xl p-3 space-y-3 overflow-y-auto">
                {getLeadsForStage(stage.id).map((lead) => (
                  <Card
                    key={lead.id}
                    className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 border-none shadow-sm"
                  >
                    <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start space-y-0">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1 py-0 h-5 mb-2"
                      >
                        {lead.segment}
                      </Badge>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <h4 className="font-semibold text-sm mb-1">
                        {lead.company}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        {lead.contactName}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${lead.id}`}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-mono font-medium">
                          R$ {Math.floor(Math.random() * 50 + 10)}k
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {getLeadsForStage(stage.id).length === 0 && (
                  <div className="h-24 border-2 border-dashed border-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                    Arraste leads aqui
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
