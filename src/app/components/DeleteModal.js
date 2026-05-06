"use client";

export default function DeleteModal({ onConfirm, onClose, loading }) {
  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm text-center">
        <div className="text-4xl mb-4">🗑️</div>
        <h2 className="text-white text-base font-semibold mb-2">Delete application?</h2>
        <p className="text-zinc-500 text-sm mb-6">This can't be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all text-white text-sm font-medium disabled:opacity-40"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}