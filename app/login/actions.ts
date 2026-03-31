'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export type LoginState = {
  error?: string;
  successPath?: string;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  if (profileError || !profile) {
    return { error: 'Failed to get user profile' }
  }

  revalidatePath('/', 'layout')

  let successPath = '/account'
  if (profile.role === 'admin') {
    successPath = '/admin/home'
  } else if (profile.role === 'teaching') {
    successPath = '/teaching/home'
  } else if (profile.role === 'nonteaching') {
    successPath = '/nonteaching/home'
  }

  return { successPath }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}
