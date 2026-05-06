"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Plus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

import Sidebar from "../components/SideBar";
import StatsRow from "../components/StatsRow";
import KanbanBoard from "../components/KanbanBoard";
import ApplicationModal from "../components/ApplicationModal";
import DeleteModal from "../components/DeleteModal";

const EMPTY_FORM = {
  company: "",
  role: "",
  status: "applied",
  date_applied: new Date().toISOString().split("T")[0],
  job_url: "",
  notes: "",
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/auth");
      else setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) router.push("/auth");
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setApplications(data || []);
    setLoading(false);
  };

  
  const openAdd = (status = "applied") => {
    setForm({ ...EMPTY_FORM, status });
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (app) => {
    setForm({
      company: app.company,
      role: app.role,
      status: app.status,
      date_applied: app.date_applied,
      job_url: app.job_url || "",
      notes: app.notes || "",
    });
    setEditingId(app.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);

    if (editingId) {
      const { error } = await supabase
        .from("applications")
        .update({ ...form })
        .eq("id", editingId);
      if (!error) {
        setApplications(prev =>
          prev.map(a => a.id === editingId ? { ...a, ...form } : a)
        );
      }
    } else {
      const { data, error } = await supabase
        .from("applications")
        .insert([{ ...form, user_id: user.id }])
        .select()
        .single();
      if (!error && data) {
        setApplications(prev => [data, ...prev]);
      }
    }

    setSaving(false);
    setShowModal(false);
  };


  const handleDelete = async () => {
    setDeleting(true);
    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", deleteId);
    if (!error) setApplications(prev => prev.filter(a => a.id !== deleteId));
    setDeleting(false);
    setDeleteId(null);
  };


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };


  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-white">

      <Sidebar
        user={user}
        onSignOut={handleSignOut}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      
      <main className="flex-1 flex flex-col min-w-0">

        
        <div className="flex items-center justify-between px-4 md:px-7 py-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-base font-semibold text-white leading-none">Dashboard</h1>
              <p className="text-xs text-zinc-500 mt-0.5 hidden sm:block">
                {loading ? "Loading..." : `${applications.length} application${applications.length !== 1 ? "s" : ""} tracked`}
              </p>
            </div>
          </div>

          <button
            onClick={() => openAdd()}
            className="flex items-center gap-2 bg-[#cf1247] hover:bg-[#b00f3d] active:scale-[0.98] transition-all px-4 py-2 rounded-full text-sm font-medium text-white"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add application</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        
        <div className="flex-1 px-4 md:px-7 py-6 overflow-x-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-zinc-600 text-sm">
              Loading your applications...
            </div>
          ) : (
            <>
              <StatsRow applications={applications} />
              <KanbanBoard
                applications={applications}
                onEdit={openEdit}
                onDelete={id => setDeleteId(id)}
                onAddClick={openAdd}
              />
            </>
          )}
        </div>
      </main>

      
      {showModal && (
        <ApplicationModal
          form={form}
          setForm={setForm}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          loading={saving}
          isEdit={!!editingId}
        />
      )}

      {deleteId && (
        <DeleteModal
          onConfirm={handleDelete}
          onClose={() => setDeleteId(null)}
          loading={deleting}
        />
      )}
    </div>
  );
}