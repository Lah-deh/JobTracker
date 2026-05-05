"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AuthCard() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMode("login");
        setError("Account created! Please sign in.");
      }
    }

    setLoading(false);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-md px-8 py-10">

      
      <h2 className="text-2xl font-semibold text-white mb-1">
        {mode === "login" ? "Welcome back" : "Create account"}
      </h2>
      <p className="text-sm text-gray-400 mb-8">
        {mode === "login"
          ? "Sign in to your Job Tracker account."
          : "Start tracking your job search today."}
      </p>

      
      <div className="flex bg-zinc-900 rounded-full p-1 gap-1 mb-8">
        <button
          onClick={() => switchMode("login")}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            mode === "login"
              ? "bg-[#cf1247] text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Sign in
        </button>
        <button
          onClick={() => switchMode("signup")}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            mode === "signup"
              ? "bg-[#cf1247] text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Sign up
        </button>
      </div>

    
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >

        
          <div className="mb-4">
            <label className="text-xs text-gray-400 block mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-zinc-600 placeholder-zinc-600 transition-colors"
            />
          </div>

    
          <div className="mb-2">
            <label className="text-xs text-gray-400 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 pr-11 text-white text-sm outline-none focus:border-zinc-600 placeholder-zinc-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          
          {mode === "login" && (
            <div className="text-right mb-6">
              <button className="text-xs text-[#cf1247] hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {mode === "signup" && <div className="mb-6" />}

        
          {error && (
            <p
              className={`text-xs mb-4 ${
                error.startsWith("Account created")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {error}
            </p>
          )}

          
          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-[#cf1247] hover:bg-[#b00f3d] active:scale-[0.98] transition-all py-3 rounded-full text-white text-sm font-medium disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign in"
              : "Create account"}
          </button>

    
          <p className="text-xs text-gray-500 text-center mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => switchMode("signup")}
                  className="text-[#cf1247] hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="text-[#cf1247] hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}