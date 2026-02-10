"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate brief auth delay
    await new Promise((r) => setTimeout(r, 600));

    localStorage.setItem(
      "user_session",
      JSON.stringify({ email, loggedInAt: Date.now() })
    );

    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f2f2f4] dark:bg-[#09090d]">
      {/* Background */}
      <div className="grid-pattern fixed inset-0 opacity-50" />
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-200/20 dark:bg-brand-700/8 blur-[160px]" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/15 dark:bg-blue-700/6 blur-[140px]" />

      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-5 left-5 z-50 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-300/80 dark:border-zinc-700/40 backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>

      {/* Theme toggle */}
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center mb-4 glow-brand">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Sign in to your voice
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all glow-brand hover:glow-brand-strong hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-600 mt-6">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/")}
            className="text-brand-500 dark:text-brand-400 hover:text-brand-400 dark:hover:text-brand-300 transition"
          >
            Learn more
          </button>
        </p>
      </div>
    </div>
  );
}
