"use client";

import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import ProfileEditForm from './ProfileEditForm'

export default function TeachingProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [fullname, setFullname] = useState<string | null>(null)
  
    useEffect(() => {
      const supabase = createClient()
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single()
          
          if (profile) {
            setFullname(profile.full_name)
          }
        }
      }
      getUser()
    }, [])

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
              <h2 className="text-2xl font-bold text-white">{fullname}</h2>
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