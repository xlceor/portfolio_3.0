"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import { Project } from "../types";

const initialProjectState: Project = {
  id: null,
  name: "",
  imagePath: null,
  content: "",
  technologies: [],
  keyFeatures: [],
  impact: "",
};

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(initialProjectState);
  const [showFormModal, setShowFormModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // Dashboard Telemetry
  const [sysInteg, setSysInteg] = useState(99.4);
  const [cpuTemp, setCpuTemp] = useState(41);
  const [logs, setLogs] = useState<string[]>(["SYSTEM_INITIALIZED", "DATABASE_CONNECTED"]);

  const addLog = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLogs(prev => [`[${ts}] ${msg}`, ...prev.slice(0, 4)]);
  }, []); // Empty dependency array means this function is stable

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
        setProjects(data as Project[]);
        addLog(`DATA_FETCHED: ${data.length} projects loaded.`);
    }
    setLoading(false);
  }, [addLog]); // addLog is a dependency for fetchProjects

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchProjects();
        addLog("AUTH_SESSION_VALIDATED");
      }
    };
    checkAuth();

    const interval = setInterval(() => {
        setSysInteg((prev) => parseFloat(Math.min(100, Math.max(97, prev + (Math.random()-0.5))).toFixed(2)));
        setCpuTemp((prev) => Math.min(60, Math.max(38, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchProjects, router, addLog]);

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    addLog("TRANSACTION_STARTED: Saving project...");
    
    // ... (DB logic remains same)
    if (isEditing) {
      await supabase.from("projects").update({
        name: currentProject.name,
        image_path: currentProject.imagePath,
        content: currentProject.content,
        technologies: currentProject.technologies,
        key_features: currentProject.keyFeatures,
        impact: currentProject.impact,
      }).eq("id", currentProject.id);
    } else {
      await supabase.from("projects").insert({
        name: currentProject.name,
        image_path: currentProject.imagePath,
        content: currentProject.content,
        technologies: currentProject.technologies,
        key_features: currentProject.keyFeatures,
        impact: currentProject.impact,
      });
    }
    
    setSaving(false);
    setShowFormModal(false);
    setCurrentProject(initialProjectState);
    setIsEditing(false);
    addLog("TRANSACTION_SUCCESS: Project committed.");
    fetchProjects();
  };

  const handleLogout = async () => {
    addLog("SESSION_TERMINATION_REQUESTED");
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --accent-cyan:     #06b6d4;
          --accent-emerald:  #10b981;
          --bg-cyber:        #020617;
          --panel-bg:        rgba(15, 23, 42, 0.65);
          --panel-border:    rgba(6, 182, 212, 0.2);
          --text-primary:    #f8fafc;
        }

        body { background-color: var(--bg-cyber); color: var(--text-primary); font-family: 'Inter', sans-serif; }
        .cyber-panel { background: var(--panel-bg); border: 1px solid var(--panel-border); border-radius: 8px; padding: 20px; backdrop-filter: blur(8px); }
        .terminal { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--accent-emerald); }
        .btn { padding: 8px 16px; border: 1px solid var(--accent-cyan); background: transparent; color: var(--accent-cyan); cursor: pointer; font-family: 'Orbitron'; font-size: 0.7rem; }
        .btn:hover { background: var(--accent-cyan); color: var(--bg-cyber); }
      `}</style>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside style={{ width: '220px', borderRight: '1px solid var(--panel-border)', padding: '20px' }}>
            <h2 style={{fontFamily: 'Orbitron'}}>OS_ADMIN</h2>
            <div style={{marginTop: '40px'}}><button className="btn" onClick={handleLogout}>EXEC_LOGOUT</button></div>
        </aside>

        <main style={{ flex: 1, padding: '40px' }}>
            <h1 style={{fontFamily: 'Orbitron', marginBottom: '30px'}}>CENTRAL_CONTROL</h1>
            
            <section className="cyber-panel" style={{marginBottom: '20px'}}>
                <div style={{display: 'flex', gap: '40px'}}>
                    <div><div className="terminal">INTEGRITY</div><div style={{fontSize: '1.5rem'}}>{sysInteg}%</div></div>
                    <div><div className="terminal">CPU_TEMP</div><div style={{fontSize: '1.5rem'}}>{cpuTemp}°C</div></div>
                    <div style={{flex: 1}}>
                        <div className="terminal" style={{marginBottom: '5px'}}>LOG_OUTPUT</div>
                        {logs.map((l, i) => <div key={i} className="terminal">{l}</div>)}
                    </div>
                </div>
            </section>

            <button className="btn" onClick={() => setShowFormModal(true)}>+ ADD_PROJECT_NODE</button>
            
            <section className="cyber-panel" style={{marginTop: '20px'}}>
                {/* Table implementation goes here */}
            </section>
        </main>
      </div>
    </>
  );
}
