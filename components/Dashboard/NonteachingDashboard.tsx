"use client";

import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'

export default function NonteachingDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [fullname, setFullname] = useState<string | null>(null)
  
    useEffect(() => {
      const supabase = createClient()
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          const { data: profile } = await supabase
            .from('users')
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Nonteaching Dashboard</h1>
          <p className="text-gray-400">Hello {fullname || user?.email || 'Student'}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700">
            <h3 className="text-sm text-gray-400 mb-2">Placeholder</h3>
            <p className="text-3xl font-bold text-blue-400">--</p>
          </div>
          <div className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700">
            <h3 className="text-sm text-gray-400 mb-2">Placeholder</h3>
            <p className="text-3xl font-bold text-green-400">--</p>
          </div>
          <div className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700">
            <h3 className="text-sm text-gray-400 mb-2">Placeholder</h3>
            <p className="text-3xl font-bold text-orange-400">--</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1b1e2b] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              View Applications
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              View Publications
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              View Awards
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}