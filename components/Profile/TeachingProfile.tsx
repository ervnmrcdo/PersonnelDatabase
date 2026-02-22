"use client";

import { useAuth } from '@/context/AuthContext'
import ProfileEditForm from './ProfileEditForm'

export default function TeachingProfile() {
  const { user, profile } = useAuth()

  return (
    <div className="flex-1 overflow-auto bg-[#0f1117] text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        </div>

        {/* profile */}
        <div className="bg-[#1b1e2b] rounded-lg p-8 border border-gray-700 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-white">{profile?.first_name || user?.email}</h2>
              <p className="text-gray-400">Faculty Member</p>
            </div>
          </div>

          {/* info and edit form */}
          <div className="border-t border-gray-700 pt-6">
            <ProfileEditForm user={user} compact={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
