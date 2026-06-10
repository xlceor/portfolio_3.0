"use client";
import { useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      router.push("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-cyber)] theme-dark">
      <div className="cyber-panel p-8 w-full max-w-md border border-[var(--panel-border)] bg-[var(--panel-bg-solid)] rounded-lg">
        <h1 className="text-2xl font-cyber text-[var(--accent-cyan)] mb-6 tracking-widest text-center">SYSTEM_ACCESS</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="OPERATOR_EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-cyber bg-[var(--terminal-bg)] border border-[var(--panel-border)] p-3 rounded text-[var(--text-primary)] font-mono"
            required
          />
          <input
            type="password"
            placeholder="ACCESS_TOKEN"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-cyber bg-[var(--terminal-bg)] border border-[var(--panel-border)] p-3 rounded text-[var(--text-primary)] font-mono"
            required
          />
          <button type="submit" className="btn-cyber-primary w-full p-3 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-emerald)] text-[var(--bg-cyber)] font-bold rounded" disabled={loading}>
            {loading ? "INITIALIZING..." : "AUTHENTICATE"}
          </button>
        </form>
      </div>
    </div>
  );
}
