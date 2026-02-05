import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'jsr:@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { email, password, role, name } = await req.json()

    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios')
    }

    // Create user in Auth
    const { data: userData, error: createError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name: name || '' },
      })

    if (createError) throw createError

    // Update role if specified (and different from default 'vendedor')
    if (userData.user && role && role !== 'vendedor') {
      const { error: updateError } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userData.user.id)

      if (updateError) {
        // Log error but don't fail the request completely as user is created
        console.error('Error updating role:', updateError)
      }
    }

    return new Response(JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      status: 200,
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
      status: 400,
    })
  }
})
