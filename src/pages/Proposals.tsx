import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download, Send, Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Proposals() {
  const proposals = [
    {
      id: 'PROP-001',
      client: 'TechSolutions Ltda',
      value: 'R$ 45.000,00',
      date: '05/02/2026',
      status: 'Enviada',
    },
    {
      id: 'PROP-002',
      client: 'Varejo Express',
      value: 'R$ 12.500,00',
      date: '04/02/2026',
      status: 'Rascunho',
    },
    {
      id: 'PROP-003',
      client: 'Indústrias Metal',
      value: 'R$ 120.000,00',
      date: '01/02/2026',
      status: 'Aprovada',
    },
    {
      id: 'PROP-004',
      client: 'Educa Mais',
      value: 'R$ 8.000,00',
      date: '28/01/2026',
      status: 'Rejeitada',
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovada':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Aprovada</Badge>
        )
      case 'Rejeitada':
        return <Badge variant="destructive">Rejeitada</Badge>
      case 'Enviada':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Enviada</Badge>
      default:
        return <Badge variant="secondary">Rascunho</Badge>
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Propostas Comerciais
          </h1>
          <p className="text-muted-foreground">
            Gerencie orçamentos e contratos enviados.
          </p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Nova Proposta
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Histórico de Propostas</CardTitle>
          <CardDescription>
            Lista de todas as propostas geradas recentemente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell className="font-mono text-xs">{prop.id}</TableCell>
                  <TableCell className="font-medium">{prop.client}</TableCell>
                  <TableCell>{prop.value}</TableCell>
                  <TableCell>{prop.date}</TableCell>
                  <TableCell>{getStatusBadge(prop.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Baixar PDF">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Enviar por Email"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Ver Detalhes">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
