"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "teaching" | "nonteaching">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => router.push("/admin-home"), 1500);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        // Update profile with selected role
        if (data.user) {
          await supabase
            .from('users')
            .update({ role })
            .eq('id', data.user.id);
        }

        setSuccess("Signup successful! Check your email to confirm.");
        setEmail("");
        setPassword("");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0f1117] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">DCS Records</h1>
          <p className="text-gray-400 text-sm">Personnel Database System</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#1b1e2b] rounded-lg border border-gray-700 p-8">
          {/* Tab Switch */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${isLogin
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${!isLogin
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition"
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "admin" | "teaching" | "nonteaching")}
                  className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition"
                >
                  <option value="admin">Admin</option>
                  <option value="teaching">Teaching</option>
                  <option value="nonteaching">Non-Teaching</option>
                </select>
              </div>
            )}

            {/* Messages */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 text-sm px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-center text-gray-400 text-xs mt-6">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
