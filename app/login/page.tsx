'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    setError(error.message)
    return
  }

  // Fetch role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .single()

  if (profileError || !profile) {
    setError('Could not determine user role')
    return
  }

  // Redirect based on role
  switch (profile.role) {
    case 'admin':
      router.push('/admin-home')
      break
    case 'teaching':
      router.push('/teaching-home')
      break
    case 'nonteaching':
      router.push('/nonteaching-home')
      break
    default:
      router.push('/dashboard')
  }
}


  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        required
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Login</button>
      <p>Don&apos;t have an account? <a href="/signup">Sign up</a></p>

    </form>
  )
}
