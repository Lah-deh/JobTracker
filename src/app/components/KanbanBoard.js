"use client";

import { Plus } from "lucide-react";
import ApplicationCard from "./ApplicationCard";

const STATUSES = ["applied", "interview", "offer", "rejected"];

const STATUS_META = {
  applied:   { label: "Applied",   color: "#3b82f6", bg: "#3b82f615" },
  interview: { label: "Interview", color: "#f59e0b", bg: "#f59e0b15" },
  offer:     { label: "Offer",     color: "#22c55e", bg: "#22c55e15" },
  rejected:  { label: "Rejected",  color: "#ef4444", bg: "#ef444415" },
};

function KanbanColumn({ status, applications, onEdit, onDelete, onAddClick }) {
  const meta = STATUS_META[status];
  const cards = applications.filter(a => a.status === status);

  return (
    <div className="flex flex-col min-w-0">
      
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: meta.color }}
        />
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
          {meta.label}
        </span>
        <span
          className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: meta.bg, color: meta.color }}
        >
          {cards.length}
        </span>
      </div>

      
      <div className="flex-1">
        {cards.length === 0 && (
          <div className="border border-dashed border-zinc-800 rounded-xl p-5 text-center text-xs text-zinc-700">
            No applications
          </div>
        )}
        {cards.map(app => (
          <ApplicationCard
            key={app.id}
            app={app}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      
      <button
        onClick={() => onAddClick(status)}
        className="flex items-center justify-center gap-1.5 w-full py-2 mt-1 rounded-lg border border-dashed border-zinc-800 text-zinc-600 hover:border-[#cf1247] hover:text-[#cf1247] transition-all text-xs"
      >
        <Plus size={12} /> Add
      </button>
    </div>
  );
}

export default function KanbanBoard({ applications, onEdit, onDelete, onAddClick }) {
  return (
    <>
      
      <div className="hidden md:grid grid-cols-4 gap-4">
        {STATUSES.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            applications={applications}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddClick={onAddClick}
          />
        ))}
      </div>

   
      <div className="flex flex-col gap-6 md:hidden">
        {STATUSES.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            applications={applications}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddClick={onAddClick}
          />
        ))}
      </div>
    </>
  );
}