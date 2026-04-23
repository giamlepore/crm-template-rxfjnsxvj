import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTheme } from '@/components/theme-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Settings() {
  const { user, organizationId, organizationName, role } = useAuth()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const [loading, setLoading] = useState(false)

  // Profile
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Company
  const [orgName, setOrgName] = useState('')

  useEffect(() => {
    if (user) {
      setEmail(user.email || '')
      supabase
        .from('users')
        .select('name')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data && data.name) setName(data.name)
        })
    }
    if (organizationName) {
      setOrgName(organizationName)
    }
  }, [user, organizationName])

  const handleUpdateProfile = async () => {
    if (!user) return
    try {
      setLoading(true)

      const { error: authError } = await supabase.auth.updateUser({
        data: { name },
      })

      if (authError) throw authError

      const { error: dbError } = await supabase
        .from('users')
        .update({ name })
        .eq('id', user.id)

      if (dbError) throw dbError

      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram salvas com sucesso.',
      })
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCompany = async () => {
    if (!organizationId) return
    try {
      setLoading(true)

      const { error } = await supabase
        .from('organizations')
        .update({ name: orgName })
        .eq('id', organizationId)

      if (error) throw error

      toast({
        title: 'Organização atualizada',
        description: 'Os dados da empresa foram salvos com sucesso.',
      })
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar organização',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const canEditCompany = role === 'admin' || role === 'gerente'

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="appearance">Preferências</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Usuário</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" value={email} disabled />
                <p className="text-[0.8rem] text-muted-foreground">
                  O e-mail não pode ser alterado por aqui.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>
              <Button onClick={handleUpdateProfile} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Empresa</CardTitle>
              <CardDescription>
                Atualize as informações da sua organização. Apenas
                administradores ou gerentes podem alterar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="orgName">Nome da Empresa</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  disabled={!canEditCompany}
                />
              </div>
              <Button
                onClick={handleUpdateCompany}
                disabled={loading || !canEditCompany}
              >
                {loading ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>
                Personalize a aparência do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select value={theme} onValueChange={(v: any) => setTheme(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Escuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
