"use client";

import { ExternalLink, Pencil, Trash2 } from "lucide-react";

const STATUS_META = {
  applied:   { label: "Applied",   color: "#3b82f6", bg: "#3b82f615" },
  interview: { label: "Interview", color: "#f59e0b", bg: "#f59e0b15" },
  offer:     { label: "Offer",     color: "#22c55e", bg: "#22c55e15" },
  rejected:  { label: "Rejected",  color: "#ef4444", bg: "#ef444415" },
};

export default function ApplicationCard({ app, onEdit, onDelete }) {
  const meta = STATUS_META[app.status];

  return (
    <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-3.5 mb-2.5 transition-colors">
      
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-sm font-semibold text-white leading-tight">{app.company}</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {app.job_url && (
            <a
              href={app.job_url}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <ExternalLink size={13} />
            </a>
          )}
          <button
            onClick={() => onEdit(app)}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(app.id)}
            className="text-zinc-600 hover:text-red-400 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      
      <div className="text-xs text-zinc-400 mb-2">{app.role}</div>

      
      {app.notes && (
        <div className="text-[11px] text-zinc-600 mb-2 leading-relaxed line-clamp-2">
          {app.notes}
        </div>
      )}

      
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-600">{app.date_applied}</span>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: meta.bg, color: meta.color }}
        >
          {meta.label}
        </span>
      </div>
    </div>
  );
}