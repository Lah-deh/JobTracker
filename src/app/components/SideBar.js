"use client";

import { LayoutDashboard, Briefcase, LogOut, X } from "lucide-react";

export default function Sidebar({ user, onSignOut, open, onClose }) {
  const content = (
    <div className="flex flex-col h-full">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#cf1247] flex items-center justify-center shrink-0">
            <Briefcase size={15} color="#fff" />
          </div>
          <span className="text-white font-semibold text-sm">Job Tracker</span>
        </div>
        
        <button
          onClick={onClose}
          className="md:hidden text-zinc-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      
      <nav className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#cf1247]/10 text-[#cf1247] text-sm font-medium cursor-pointer">
          <LayoutDashboard size={15} />
          Dashboard
        </div>
      </nav>

      
      <div className="border-t border-zinc-800 pt-4">
        <p className="text-xs text-zinc-600 mb-2 truncate px-1">{user?.email}</p>
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all text-sm"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      
      <aside className="hidden md:flex flex-col w-56 shrink-0 min-h-screen bg-[#111] border-r border-zinc-800/60 px-4 py-6">
        {content}
      </aside>

      
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          
          
          <div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />
          
          <aside className="relative w-64 bg-[#111] border-r border-zinc-800 px-4 py-6 flex flex-col z-10">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}