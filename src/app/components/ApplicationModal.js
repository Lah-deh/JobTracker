"use client";

import { X } from "lucide-react";

const STATUSES = ["applied", "interview", "offer", "rejected"];
const STATUS_LABELS = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export default function ApplicationModal({ form, setForm, onSave, onClose, loading, isEdit }) {
  const inputClass = "w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-colors placeholder-zinc-700";
  const labelClass = "text-xs text-zinc-500 block mb-1.5";

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">

     
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white text-base font-semibold">
            {isEdit ? "Edit application" : "New application"}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Company *</label>
            <input
              type="text"
              placeholder="e.g. Paystack"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Role *</label>
            <input
              type="text"
              placeholder="e.g. Frontend Engineer"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              className={inputClass}
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Date applied</label>
            <input
              type="date"
              value={form.date_applied}
              onChange={e => setForm(f => ({ ...f, date_applied: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Job URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.job_url}
              onChange={e => setForm(f => ({ ...f, job_url: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              rows={3}
              placeholder="Any notes about this application..."
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className={`${inputClass} resize-none font-sans`}
            />
          </div>
        </div>

        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={loading || !form.company || !form.role}
            className="flex-1 py-2.5 rounded-full bg-[#cf1247] hover:bg-[#b00f3d] active:scale-[0.98] transition-all text-white text-sm font-medium disabled:opacity-40"
          >
            {loading ? "Saving..." : isEdit ? "Save changes" : "Add application"}
          </button>
        </div>
      </div>
    </div>
  );
}