"use client";

const STATUSES = ["applied", "interview", "offer", "rejected"];

const STATUS_META = {
  applied:   { label: "Applied",   color: "#3b82f6" },
  interview: { label: "Interview", color: "#f59e0b" },
  offer:     { label: "Offer",     color: "#22c55e" },
  rejected:  { label: "Rejected",  color: "#ef4444" },
};

export default function StatsRow({ applications }) {
  const total = applications.length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">Total</div>
        <div className="text-2xl font-semibold text-white">{total}</div>
      </div>

      {STATUSES.map(s => {
        const meta = STATUS_META[s];
        const count = applications.filter(a => a.status === s).length;
        return (
          <div key={s} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">{meta.label}</div>
            <div className="text-2xl font-semibold" style={{ color: meta.color }}>{count}</div>
          </div>
        );
      })}
    </div>
  );
}