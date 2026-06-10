"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "./types";

const PLACEHOLDER = "/project-placeholder.svg";

// Web Audio API sound generator helper
const playCyberSound = (type: "hover" | "click") => {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "hover") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === "click") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch (e) {
    // AudioContext blocked or unsupported
  }
};

type CardProps = {
  project: Project;
  setModal: (project: Project) => void;
  setShowModal: (state: boolean) => void;
  openDetailsLabel: string;
};

export default function Card({
  project,
  setModal,
  setShowModal,
  openDetailsLabel,
}: CardProps) {
  const { name, imagePath } = project;
  const src = imagePath ?? PLACEHOLDER;
  const [isHovered, setIsHovered] = useState(false);

  const open = () => {
    playCyberSound("click");
    setModal(project);
    setShowModal(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playCyberSound("hover");
  };

  // Generate some semi-random diagnostic metrics based on name length for visual interest
  const hash = name.length;
  const sysId = `SYS-0x${hash.toString(16).toUpperCase()}`;
  const coreClock = `${(3.2 + (hash % 5) * 0.4).toFixed(1)} GHz`;
  const integrity = `${98 + (hash % 3)}%`;

  return (
    <button
      type="button"
      aria-label={`${openDetailsLabel} ${name}`}
      className="group relative text-left w-full overflow-hidden bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--panel-border)] hover:border-[var(--accent-cyan)] transition-all duration-300 rounded-lg p-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] hover:shadow-[0_0_25px_var(--accent-glow)]"
      onClick={open}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Laser Sweep Scanline Animation */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div 
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-80" 
            style={{
              position: 'absolute',
              animation: 'sweep 2.5s linear infinite'
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-cyan)]/0 via-[var(--accent-cyan)]/[0.03] to-[var(--accent-cyan)]/0 pointer-events-none" />
        </div>
      )}

      {/* Cyber Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--accent-cyan)]/40 group-hover:border-[var(--accent-cyan)] transition-colors" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-cyan)]/40 group-hover:border-[var(--accent-cyan)] transition-colors" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-cyan)]/40 group-hover:border-[var(--accent-cyan)] transition-colors" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--accent-cyan)]/40 group-hover:border-[var(--accent-cyan)] transition-colors" />

      {/* Card Content Outer Frame */}
      <div className="bg-[var(--panel-bg-solid)] p-4 rounded-lg flex flex-col h-full">
        {/* Diagnostic Bar */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[var(--accent-cyan)]/60 mb-2.5 pb-1 border-b border-[var(--panel-border)]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-ping" />
            <span>{sysId}</span>
          </div>
          <span className="opacity-80">INT_SYS: {integrity}</span>
        </div>

        {/* Project Image Panel */}
        <div className="relative aspect-video w-full overflow-hidden rounded border border-[var(--panel-border)] bg-slate-900 group-hover:border-[var(--accent-cyan)]/30 transition-colors">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-105 filter saturate-75 group-hover:saturate-100"
            unoptimized={src.endsWith(".svg")}
          />
          {/* Futuristic grid overlay over image */}
          <div className="absolute inset-0 bg-[radial-gradient(transparent_60%,var(--vignette)_100%)] mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,107,222,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(18,107,222,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        </div>

        {/* Title and descriptions */}
        <div className="pt-4 flex-grow flex flex-col justify-between">
          <div>
            <h4 className="font-mono text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors flex items-center justify-between gap-2">
              <span>{name}</span>
              <span className="text-[10px] text-[var(--accent-emerald)] font-mono tracking-widest hidden group-hover:inline">[DECRYPT]</span>
            </h4>
            <p className="mt-2 text-xs font-sans text-[var(--text-secondary)] leading-relaxed line-clamp-3">
              {project.content}
            </p>
          </div>

          {/* Core telemetries */}
          <div className="mt-4 pt-3 border-t border-[var(--panel-border)] grid grid-cols-2 gap-2 text-[10px] font-mono text-[var(--text-muted)]">
            <div className="flex justify-between border-r border-[var(--panel-border)] pr-2">
              <span>CLOCK_SPD</span>
              <span className="text-[var(--accent-cyan)]">{coreClock}</span>
            </div>
            <div className="flex justify-between pl-1">
              <span>LAT_DELTA</span>
              <span className="text-[var(--accent-emerald)]">{(hash % 8) + 4} ms</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
