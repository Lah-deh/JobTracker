"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

function OtpInput({ value, onChange }) {
  const inputs = useRef([]);
  const digits = value.split("");

  const handleKey = (e, index) => {
    if (e.key === "Backspace") {
      const next = [...digits];
      next[index] = "";
      onChange(next.join(""));
      if (index > 0) inputs.current[index - 1].focus();
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = [...digits];
    next[index] = e.key;
    onChange(next.join(""));
    if (index < 5) inputs.current[index + 1].focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted.padEnd(6, ""));
    const focusIndex = Math.min(pasted.length, 5);
    inputs.current[focusIndex]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onKeyDown={(e) => handleKey(e, i)}
          onPaste={handlePaste}
          onChange={() => {}}
          className={`w-11 h-12 text-center text-lg font-semibold bg-zinc-900 border rounded-xl text-white outline-none transition-colors ${
            digits[i]
              ? "border-[#cf1247] bg-[#cf1247]/5"
              : "border-zinc-700 focus:border-zinc-500"
          }`}
        />
      ))}
    </div>
  );
}

export default function AuthCard() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
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
      if (error) setError(error.message);
      else router.push("/dashboard");

    } else {
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: null,
            data: {},
        },
        });
      if (error) setError(error.message);
      else setMode("otp"); 
    }

    setLoading(false);
  };

  const handleOtp = async () => {
    setError("");
    if (otp.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });

    if (error) setError(error.message);
    else router.push("/dashboard");

    setLoading(false);
  };

  const resendOtp = async () => {
    setError("");
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) setError(error.message);
    else setError("Code resent — check your inbox.");
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setEmail("");
    setPassword("");
    setOtp("");
  };

  
  if (mode === "otp") {
    return (
      <div className="w-full max-w-md px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
        
          <div className="w-14 h-14 rounded-2xl bg-[#cf1247]/15 border border-[#cf1247]/30 flex items-center justify-center text-2xl mx-auto mb-6">
            ✉️
          </div>

          <h2 className="text-2xl font-semibold text-white text-center mb-1">
            Check your email
          </h2>
          <p className="text-sm text-zinc-400 text-center mb-2">
            We sent a 6-digit code to
          </p>
          <p className="text-sm font-medium text-white text-center mb-8">
            {email}
          </p>

          
          <OtpInput value={otp} onChange={setOtp} />

          
          {error && (
            <p
              className={`text-xs text-center mt-4 ${
                error.includes("resent") ? "text-green-400" : "text-red-400"
              }`}
            >
              {error}
            </p>
          )}

          
          <button
            onClick={handleOtp}
            disabled={loading || otp.length < 6}
            className="w-full mt-6 bg-[#cf1247] hover:bg-[#b00f3d] active:scale-[0.98] transition-all py-3 rounded-full text-white text-sm font-medium disabled:opacity-40"
          >
            {loading ? "Verifying..." : "Confirm code"}
          </button>

        
          <p className="text-xs text-zinc-500 text-center mt-5">
            Didn&apos;t get it?{" "}
            <button onClick={resendOtp} className="text-[#cf1247] hover:underline">
              Resend code
            </button>
          </p>

          
          <p className="text-xs text-zinc-600 text-center mt-3">
            <button onClick={() => switchMode("signup")} className="hover:text-zinc-400 transition-colors">
              ← Back to sign up
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  
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
            <label className="text-xs text-gray-400 block mb-1.5">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-zinc-600 placeholder-zinc-600 transition-colors"
            />
          </div>

        
          <div className="mb-2">
            <label className="text-xs text-gray-400 block mb-1.5">Password</label>
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
            <p className="text-xs text-red-400 mb-4">{error}</p>
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
                <button onClick={() => switchMode("signup")} className="text-[#cf1247] hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => switchMode("login")} className="text-[#cf1247] hover:underline">
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