import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export type LeadStatus =
  | 'Novo Lead'
  | 'Qualificação'
  | 'Proposta Enviada'
  | 'Negociação'
  | 'Fechado Ganho'
  | 'Fechado Perdido'

export interface Proposal {
  id: string
  title: string
  valor: number
  status: string | null
}

export interface Lead {
  id: string
  company: string
  contactName: string
  email: string
  phone: string
  segment: string
  size: string
  origin: string
  status: LeadStatus
  createdAt: string
  createdBy: string
  proposals: Proposal[]
}

interface LeadsContextType {
  leads: Lead[]
  addLead: (
    lead: Omit<Lead, 'id' | 'createdAt' | 'createdBy' | 'proposals'>,
  ) => Promise<boolean>
  updateLead: (id: string, updates: Partial<Lead>) => Promise<boolean>
  deleteLead: (id: string) => Promise<void>
  loading: boolean
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined)

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select(
          `
          *,
          proposals (
            id,
            titulo,
            valor,
            status
          )
        `,
        )
        .order('created_at', { ascending: false })

      if (error) throw error

      if (data) {
        const mappedLeads: Lead[] = data.map((dbLead: any) => ({
          id: dbLead.id,
          company: dbLead.empresa,
          contactName: dbLead.contato,
          email: dbLead.email || '',
          phone: dbLead.telefone || '',
          segment: dbLead.segmento || '',
          size: dbLead.tamanho || '',
          origin: dbLead.origem || '',
          status: dbLead.status as LeadStatus,
          createdAt: dbLead.created_at,
          createdBy: dbLead.created_by || '',
          proposals:
            dbLead.proposals?.map((p: any) => ({
              id: p.id,
              title: p.titulo,
              valor: p.valor || 0,
              status: p.status,
            })) || [],
        }))
        setLeads(mappedLeads)
      }
    } catch (error: any) {
      console.error('Error fetching leads:', error)
      toast({
        title: 'Erro ao carregar leads',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()

    const channel = supabase
      .channel('public:leads-proposals')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          fetchLeads()
        },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'proposals' },
        (payload) => {
          fetchLeads()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const addLead = async (
    newLead: Omit<Lead, 'id' | 'createdAt' | 'createdBy' | 'proposals'>,
  ) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const dbLead = {
        empresa: newLead.company,
        contato: newLead.contactName,
        email: newLead.email,
        telefone: newLead.phone,
        segmento: newLead.segment,
        tamanho: newLead.size,
        origem: newLead.origin,
        status: newLead.status,
        created_by: user?.id,
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([dbLead])
        .select()
        .single()

      if (error) throw error

      if (data) {
        const mappedLead: Lead = {
          id: data.id,
          company: data.empresa,
          contactName: data.contato,
          email: data.email || '',
          phone: data.telefone || '',
          segment: data.segmento || '',
          size: data.tamanho || '',
          origin: data.origem || '',
          status: data.status as LeadStatus,
          createdAt: data.created_at,
          createdBy: data.created_by || user?.id || '',
          proposals: [],
        }
        setLeads((prev) => [mappedLead, ...prev])
        return true
      }
      return false
    } catch (error: any) {
      console.error('Error adding lead:', error)
      toast({
        title: 'Erro ao adicionar lead',
        description: error.message,
        variant: 'destructive',
      })
      return false
    }
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      // Optimistic update
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)),
      )

      const dbUpdates: any = {}
      if (updates.company) dbUpdates.empresa = updates.company
      if (updates.contactName) dbUpdates.contato = updates.contactName
      if (updates.email) dbUpdates.email = updates.email
      if (updates.phone) dbUpdates.telefone = updates.phone
      if (updates.segment) dbUpdates.segmento = updates.segment
      if (updates.size) dbUpdates.tamanho = updates.size
      if (updates.origin) dbUpdates.origem = updates.origin
      if (updates.status) dbUpdates.status = updates.status

      const { error } = await supabase
        .from('leads')
        .update(dbUpdates)
        .eq('id', id)

      if (error) {
        fetchLeads()
        throw error
      }

      return true
    } catch (error: any) {
      console.error('Error updating lead:', error)
      toast({
        title: 'Erro ao atualizar lead',
        description: error.message,
        variant: 'destructive',
      })
      return false
    }
  }

  const deleteLead = async (id: string) => {
    try {
      setLeads((prev) => prev.filter((lead) => lead.id !== id))

      const { error } = await supabase.from('leads').delete().eq('id', id)

      if (error) {
        fetchLeads()
        throw error
      }
    } catch (error: any) {
      console.error('Error deleting lead:', error)
      toast({
        title: 'Erro ao excluir lead',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <LeadsContext.Provider
      value={{ leads, addLead, updateLead, deleteLead, loading }}
    >
      {children}
    </LeadsContext.Provider>
  )
}

export const useLeads = () => {
  const context = useContext(LeadsContext)
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider')
  }
  return context
}
