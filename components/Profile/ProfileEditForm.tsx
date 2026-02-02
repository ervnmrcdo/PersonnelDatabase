'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'

interface ProfileEditFormProps {
  user: User | null
  onSuccess?: () => void
  compact?: boolean
}

export default function ProfileEditForm({ user, onSuccess, compact = false }: ProfileEditFormProps) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      if (!user?.id) {
        console.log('No user ID available')
        return
      }

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, email`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.error('Profile fetch error:', error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setEmail(data.email)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : JSON.stringify(error)
      console.error('Error loading user data:', errorMsg)
      alert(`Error loading user data! ${errorMsg}`)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile() {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        email: user?.email,
      })
      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message || 'Unknown Supabase error')
      }
      alert('Profile updated!')
      setIsEditing(false)
      onSuccess?.()
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : JSON.stringify(error)
      console.error('Profile update error:', errorMsg)
      alert(`Error updating the data! ${errorMsg}`)
    } finally {
      setLoading(false)
    }
  }

  if (compact) {
    // Compact version for dashboard profile
    return (
      <div>
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 uppercase">Email</label>
              <p className="text-white font-semibold">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 uppercase">Full Name</label>
              <p className="text-white font-semibold">{fullname || 'Not set'}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4 bg-[#0f1117] p-4 rounded-lg border border-gray-600">
            <div>
              <label htmlFor="email-compact" className="block text-sm text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email-compact"
                type="text"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="fullName-compact" className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="fullName-compact"
                type="text"
                value={fullname || ''}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-4 py-2 bg-[#1b1e2b] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={updateProfile}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-4 py-2 rounded-lg transition"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full version for account page
  return (
    <div className="form-widget space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email || ''}
          disabled
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
        />
      </div>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full px-4 py-2 bg-[#1b1e2b] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-2 rounded-lg transition w-full"
        onClick={updateProfile}
        disabled={loading}
      >
        {loading ? 'Saving ...' : 'Update Profile'}
      </button>
    </div>
  )
}
