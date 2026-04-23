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

  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [savingCompany, setSavingCompany] = useState(false)

  // Profile
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
      setSavingProfile(true)

      const updates: { data?: { name: string }; email?: string } = {}
      if (name) updates.data = { name }
      if (email && email !== user.email) updates.email = email

      if (Object.keys(updates).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(updates)
        if (authError) throw authError
      }

      if (name) {
        const { error: dbError } = await supabase
          .from('users')
          .update({ name })
          .eq('id', user.id)

        if (dbError) throw dbError
      }

      toast({
        title: 'Perfil atualizado',
        description: updates.email
          ? 'Informações salvas. Um e-mail de confirmação pode ter sido enviado para o novo endereço.'
          : 'Suas informações foram salvas com sucesso.',
      })
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar perfil',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setSavingProfile(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (!password) {
      toast({
        title: 'Erro',
        description: 'A nova senha não pode estar vazia.',
        variant: 'destructive',
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem.',
        variant: 'destructive',
      })
      return
    }

    try {
      setSavingPassword(true)
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      toast({
        title: 'Senha atualizada',
        description: 'Sua senha foi alterada com sucesso.',
      })
      setPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar senha',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setSavingPassword(false)
    }
  }

  const handleUpdateCompany = async () => {
    if (!organizationId) return
    try {
      setSavingCompany(true)

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
      setSavingCompany(false)
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
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Usuário</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Ao alterar seu e-mail, pode ser necessário confirmar o novo
                  endereço.
                </p>
              </div>
              <Button onClick={handleUpdateProfile} disabled={savingProfile}>
                {savingProfile ? 'Salvando...' : 'Salvar informações'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Altere sua senha de acesso.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua nova senha"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                />
              </div>
              <Button onClick={handleUpdatePassword} disabled={savingPassword}>
                {savingPassword ? 'Atualizando...' : 'Atualizar senha'}
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
                disabled={savingCompany || !canEditCompany}
              >
                {savingCompany ? 'Salvando...' : 'Salvar alterações'}
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
