"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "./types";

const PLACEHOLDER = "/project-placeholder.svg";

// Sound effect helper
const playCloseSound = () => {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
};

export type ModalCopy = {
  highlights: string;
  impact: string;
  tech: string;
  close: string;
};

type ModalProps = {
  project: Project;
  setModal: (project: Project | null) => void;
  setShowModal: (state: boolean) => void;
  copy: ModalCopy;
};

export default function Modal({
  project,
  setModal,
  setShowModal,
  copy,
}: ModalProps) {
  const [glitch, setGlitch] = useState(false);

  function exit() {
    playCloseSound();
    setShowModal(false);
    setModal(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    document.addEventListener("keydown", onKey);
    
    // Quick holographic glitch trigger on open
    const interval = setTimeout(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 400);

    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(interval);
    };
  }, [setShowModal, setModal]);

  const { name, imagePath, content, technologies, keyFeatures, impact } =
    project;
  const src = imagePath ?? PLACEHOLDER;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
      onClick={exit}
    >
      <div
        className={`relative max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[var(--panel-border)] bg-[var(--panel-bg-solid)] p-6 md:p-10 shadow-[0_0_50px_var(--accent-glow)] transition-all duration-300 ${
          glitch ? "skew-x-3 translate-y-1 brightness-150 saturate-200" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Holographic static grid & lines */}
        <div className="absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none rounded-xl" />
        
        {/* Glowing HUD frame details */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent-cyan)]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--accent-cyan)]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--accent-cyan)]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--accent-cyan)]" />

        {/* Top bar indicators */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[var(--accent-cyan)]/50 mb-6 pb-2 border-b border-[var(--panel-border)]">
          <span>SECURE_DATA_FEED // UNIT_03</span>
          <span>EST_LATENCY: 1.48s</span>
        </div>

        {/* Exit Button */}
        <button
          type="button"
          onClick={exit}
          className="absolute right-6 top-10 font-mono text-xs text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 hover:border-[var(--accent-cyan)]/80 hover:bg-[var(--accent-cyan)]/10 px-3 py-1 rounded transition-all z-10"
        >
          [ {copy.close.toUpperCase()} ]
        </button>

        <div className="flex flex-col md:flex-row gap-8 mt-4">
          <div className="relative aspect-video w-full md:w-80 shrink-0 overflow-hidden rounded-lg border border-[var(--panel-border)] bg-slate-900 group shadow-[0_0_15px_var(--accent-glow)]">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover filter brightness-95 saturate-100 contrast-105"
              unoptimized={src.endsWith(".svg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              <h2 id="project-modal-title" className="text-2xl md:text-3xl font-mono font-bold tracking-tight text-[var(--text-primary)] pr-12">
                {name}
              </h2>
            </div>
            
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--text-secondary)] font-sans border-l-2 border-[var(--accent-cyan)]/40 pl-4 bg-[var(--accent-cyan)]/5 py-2 rounded-r">
              {content}
            </p>

            {keyFeatures && keyFeatures.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-mono font-bold text-[var(--accent-cyan)] uppercase tracking-widest flex items-center gap-2">
                  <span className="text-[var(--accent-emerald)]/80">◇</span> {copy.highlights.toUpperCase()}
                </h3>
                <ul className="mt-3 space-y-2 text-[13px] text-[var(--text-secondary)] font-sans pl-1">
                  {keyFeatures.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent-cyan)]/80 font-mono mt-0.5">▪</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {impact && (
              <div className="mt-8">
                <h3 className="text-xs font-mono font-bold text-[var(--accent-cyan)] uppercase tracking-widest flex items-center gap-2">
                  <span className="text-[var(--accent-emerald)]/80">⬡</span> {copy.impact.toUpperCase()}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--text-secondary)] font-sans pl-1">
                  {impact}
                </p>
              </div>
            )}

            {technologies && technologies.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-mono font-bold text-[var(--accent-cyan)] uppercase tracking-widest flex items-center gap-2">
                  <span className="text-[var(--accent-emerald)]/80">⬟</span> {copy.tech.toUpperCase()}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2 pl-1">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded border border-[var(--panel-border)] bg-[var(--accent-cyan)]/5 px-3 py-1 text-[11px] font-mono text-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-glow)] hover:border-[var(--accent-emerald)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tech footer telemetry */}
        <div className="mt-8 pt-4 border-t border-[var(--panel-border)] flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>SYS_INTEG_OK [v12.4.9]</span>
          <span>DCC_CYBER_MATRIX_CORE</span>
        </div>
      </div>
    </div>
  );
}
