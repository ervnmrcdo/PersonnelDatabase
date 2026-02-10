'use client'
import { type User } from '@supabase/supabase-js'
import ProfileEditForm from '@/components/Profile/ProfileEditForm'

export default function AccountForm({ user }: { user: User | null }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Profile Settings</h2>
        <ProfileEditForm user={user} />
      </div>

      <div className="border-t border-gray-700 pt-6">
        <form action="/auth/signout" method="post">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition w-full" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}