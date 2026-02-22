'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const user = data.user
    if (!user) {
      setError('Signup failed')
      setLoading(false)
      return
    }

    // 2. Insert profile row
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        role: role,
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    // 3. Redirect
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSignup}>
      <h1>Sign Up</h1>

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

      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="nonteaching">Nonteaching</option>
        <option value="teaching">Teaching</option>
        <option value="admin">Admin</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>
    </form>
  )
}
