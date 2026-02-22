'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  // Check user's role
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('role')
    .eq('id', authData.user.id)
    .single()

  if (profileError) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')


  // Redirect based on role
  if (profile?.role === 'admin') {
    redirect('/admin-home')
  } else if (profile?.role === 'teaching') {
    redirect('/teaching-home')
  } else if (profile?.role === 'nonteaching') {
    redirect('/nonteaching-home')
  }

  redirect('/account')
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
  redirect('/account')
}
