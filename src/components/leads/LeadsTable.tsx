import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react'
import { Lead } from '@/context/LeadsContext'
import { useAuth } from '@/context/AuthContext'

interface LeadsTableProps {
  leads: Lead[]
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
}

export function LeadsTable({ leads, onEdit, onDelete }: LeadsTableProps) {
  const { user, role } = useAuth()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200'
      case 'Em Contato':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200'
      case 'Qualificado':
        return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200'
      case 'Negociacao':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200'
      case 'Fechado':
        return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200'
      case 'Perdido':
        return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Permission Logic:
  // Vendedor can only edit/delete their own leads.
  // Admins/Managers can edit/delete all.
  const canEdit = (lead: Lead) => {
    if (!user) return false
    if (role === 'admin' || role === 'gerente') return true
    return lead.createdBy === user.id
  }

  return (
    <div className="rounded-xl border glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead className="hidden md:table-cell">E-mail</TableHead>
            <TableHead className="hidden lg:table-cell">Telefone</TableHead>
            <TableHead className="hidden sm:table-cell">Segmento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Nenhum lead encontrado.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="group hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">{lead.company}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://img.usecurling.com/ppl/thumbnail?gender=${Math.random() > 0.5 ? 'male' : 'female'}&seed=${lead.id}`}
                      />
                      <AvatarFallback>
                        {lead.contactName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{lead.contactName}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {lead.email}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {lead.phone}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {lead.segment}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(lead.status)}
                  >
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                      </DropdownMenuItem>

                      {canEdit(lead) && (
                        <>
                          <DropdownMenuItem onClick={() => onEdit(lead)}>
                            <Pencil className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => onDelete(lead.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
