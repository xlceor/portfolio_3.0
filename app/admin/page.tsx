"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { Project } from "../types";

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/login");
      else fetchProjects();
    };
    checkAuth();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  if (loading) return <div className="text-[var(--text-primary)] p-10">INITIALIZING_ADMIN_NODE...</div>;

  return (
    <div className="min-h-screen bg-[var(--bg-cyber)] p-10 theme-dark">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-cyber text-[var(--accent-cyan)] mb-10">ADMIN_DASHBOARD // PROJECT_MGMT</h1>
        <div className="grid gap-6">
          {projects.map((p: any) => (
            <div key={p.id} className="cyber-panel p-6 flex justify-between items-center bg-[var(--panel-bg-solid)] border border-[var(--panel-border)] rounded-lg">
              <div>
                <h3 className="text-xl font-bold text-white">{p.name}</h3>
                <p className="text-[var(--text-secondary)]">{p.content.slice(0, 50)}...</p>
              </div>
              <div className="flex gap-4">
                <button className="text-[var(--accent-cyan)] font-mono hover:underline">EDIT</button>
                <button onClick={() => handleDelete(p.id)} className="text-rose-400 font-mono hover:underline">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
