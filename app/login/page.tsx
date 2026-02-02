'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from "@supabase/supabase-js";
import { login, signup } from './actions'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Personnel Database</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Form Container */}
        <div className="bg-[#1b1e2b] rounded-lg p-8 border border-gray-700">
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 bg-[#0f1117] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 bg-[#0f1117] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="••••••••"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <button
                formAction={login}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              <button
                formAction={signup}
                disabled={isLoading}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1b1e2b] text-gray-400">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                Sign up
              </a>
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2026 Personnel Database. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
