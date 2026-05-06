"use client";

import AuthCard from "../components/AuthCard";

export const dynamic = "force-dynamic";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex bg-black text-white">

      
      <div className="hidden md:flex w-1/2 items-center justify-center p-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Track your <br />
            <span className="text-[#cf1247]">job search.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            One dashboard. All applications. Clear status at a glance.
          </p>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0d0d0d]">
        <AuthCard />
      </div>

    </div>
  );
}