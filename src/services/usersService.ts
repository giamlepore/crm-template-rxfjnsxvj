import { supabase } from '@/lib/supabase/client'

export interface UserProfile {
  id: string
  role: 'vendedor' | 'gerente' | 'admin'
  email?: string
  name?: string
}

export const usersService = {
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data as UserProfile[]
  },

  async createUser(data: {
    email: string
    password: string
    role: string
    name: string
  }) {
    const { data: result, error } = await supabase.functions.invoke(
      'create-user',
      {
        body: data,
      },
    )

    if (error) throw error
    if (result.error) throw new Error(result.error)

    return result
  },

  async updateUserRole(id: string, role: string) {
    const { error } = await supabase.from('users').update({ role }).eq('id', id)

    if (error) throw error
    return true
  },

  async deleteUser(id: string) {
    // Note: Deleting from public.users doesn't delete from auth.users.
    // Usually admin delete requires edge function too for full cleanup.
    // For this scope, we allow deleting the profile reference which might cascade or leave auth orphan.
    // Given the constraints, we will just delete the public profile which is what the policy allows.
    // Ideally we would need an edge function 'delete-user' to call admin.deleteUser.
    // We will stick to public.users deletion for permission management.

    const { error } = await supabase.from('users').delete().eq('id', id)

    if (error) throw error
    return true
  },
}
