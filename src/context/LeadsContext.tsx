import React, { createContext, useContext, useState, ReactNode } from 'react'

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
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined)

const initialLeads: Lead[] = [
  {
    id: '1',
    company: 'TechSolutions Ltda',
    contactName: 'Carlos Silva',
    email: 'carlos@techsolutions.com',
    phone: '(11) 98765-4321',
    segment: 'Tecnologia',
    size: '51-200',
    origin: 'LinkedIn',
    status: 'Qualificado',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    company: 'Varejo Express',
    contactName: 'Ana Souza',
    email: 'ana@varejoexpress.com.br',
    phone: '(21) 99876-5432',
    segment: 'Varejo',
    size: '201-500',
    origin: 'Site',
    status: 'Novo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    company: 'Indústrias Metal',
    contactName: 'Roberto Lima',
    email: 'roberto@indmetal.com',
    phone: '(31) 91234-5678',
    segment: 'Indústria',
    size: '500+',
    origin: 'Indicação',
    status: 'Em Contato',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    company: 'Educa Mais',
    contactName: 'Fernanda Oliveira',
    email: 'fernanda@educamais.edu',
    phone: '(41) 95555-4444',
    segment: 'Educação',
    size: '11-50',
    origin: 'Evento',
    status: 'Perdido',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    company: 'Finanças Seguras',
    contactName: 'João Mendes',
    email: 'joao@financas.com',
    phone: '(11) 93333-2222',
    segment: 'Financeiro',
    size: '1-10',
    origin: 'Site',
    status: 'Novo',
    createdAt: new Date().toISOString(),
  },
]

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)

  const addLead = (newLead: Omit<Lead, 'id' | 'createdAt'>) => {
    const lead: Lead = {
      ...newLead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    setLeads((prev) => [lead, ...prev])
  }

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)),
    )
  }

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id))
  }

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLead, deleteLead }}>
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
