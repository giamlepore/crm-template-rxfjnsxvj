import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface Lead {
  id: string
  company: string
  contactName: string
  email: string
  phone: string
  segment: string
  size: string
  origin: string
  status: 'Novo' | 'Em Contato' | 'Qualificado' | 'Perdido'
  createdAt: string
}

interface LeadsContextType {
  leads: Lead[]
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  loading: boolean
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined)

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('leads')
        .select('*')
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
          status: dbLead.status as any,
          createdAt: dbLead.created_at,
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

    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:leads')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        () => {
          fetchLeads()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const addLead = async (newLead: Omit<Lead, 'id' | 'createdAt'>) => {
    try {
      const dbLead = {
        empresa: newLead.company,
        contato: newLead.contactName,
        email: newLead.email,
        telefone: newLead.phone,
        segmento: newLead.segment,
        tamanho: newLead.size,
        origem: newLead.origin,
        status: newLead.status,
      }

      const { error } = await supabase.from('leads').insert([dbLead])

      if (error) throw error
      // Realtime subscription will handle the state update
    } catch (error: any) {
      console.error('Error adding lead:', error)
      toast({
        title: 'Erro ao adicionar lead',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
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

      if (error) throw error
    } catch (error: any) {
      console.error('Error updating lead:', error)
      toast({
        title: 'Erro ao atualizar lead',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id)

      if (error) throw error
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
