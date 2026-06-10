"use client";
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import projectsData from "@/app/proyects.json" assert { type: "json" };
import Image from "next/image";
import Card from "@/app/card";
import {
  FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaPython,
} from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiTypescript, SiExpress, SiFlask, SiMysql, SiSqlite,
} from "react-icons/si";
import Modal from "./modal";
import { Project } from "./types";
import GradientSvgIcon from "@/app/GradientSvgIcon";

// ─── Sound Generator Utility ──────────────────────────────────────
const playBeep = (type: "nav" | "click" | "heavy-click" | "glitch" | "alert") => {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "nav") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "heavy-click") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else if (type === "glitch") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(Math.random() * 800 + 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } else if (type === "alert") {
      osc.type = "square";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Audio Context is blocked or unsupported
  }
};

// ─── Translations ────────────────────────────────────────────────
const translations = {
  es: {
    name: "Carlos Osorio",
    tagline: "Constructor de Sistemas",
    subtitle: "Software · Embebido · Robótica",
    description:
      "Construyo sistemas que conectan software con el mundo físico — convirtiendo intención humana en acción real y medible.",
    nav: { projects: "Proyectos", about: "Sobre mí", contact: "Contacto" },
    buttons: {
      projects: "Ver trabajo",
      upwork: "Contratar en Upwork",
      contact: "Hablemos",
    },
    whatIDoTitle: "Lo que hago",
    whatIDo: [
      {
        icon: "◈",
        title: "Interfaces interactivas",
        desc: "Diseño UIs que controlan sistemas del mundo real en tiempo real.",
      },
      {
        icon: "⬡",
        title: "Backends inteligentes",
        desc: "Backends que procesan, deciden y responden con lógica robusta.",
      },
      {
        icon: "◎",
        title: "Sistemas embebidos",
        desc: "Control embebido para sensores y actuadores (ESP32, Arduino).",
      },
      {
        icon: "⬟",
        title: "Robótica & Electromecánica",
        desc: "Prototipos funcionales: grippers, exotrajes y prótesis modulares.",
      },
    ],
    projectsTitle: "Trabajo seleccionado",
    aboutTitle: "Sobre mí",
    aboutDesc: `Soy desarrollador Full-Stack y constructor de sistemas autodidacta. Lo que comenzó como desarrollo web evolucionó hacia el diseño de arquitecturas que van más allá de las pantallas: sistemas que perciben, deciden y actúan a través de hardware, comunicación en tiempo real y control inteligente.

Mis proyectos no surgen de la improvisación, sino de la necesidad. Cuando una herramienta no cumplía su propósito, la construí mejor. Ese enfoque me dio una mentalidad orientada a resolver problemas reales e iterar rápido.

Actualmente trabajo en la intersección entre software, sistemas embebidos y robótica — desarrollando soluciones donde la interfaz, la lógica y el hardware funcionan como una sola unidad.`,
    stackTitle: "Stack técnico",
    frontEnd: "Frontend",
    backEnd: "Backend & Embebido",
    contactTitle: "Conectemos",
    contactDesc:
      "Si estás construyendo algo que involucra sistemas del mundo real — hardware, software, o ambos — me interesa.",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo",
    messagePlaceholder: "Cuéntame sobre tu proyecto...",
    sendButton: "Enviar mensaje",
    sentButton: "¡Enviado! [OK]",
    cv: { es: "CV en Español", en: "CV en Inglés" },
    theme: { dark: "Oscuro", light: "Claro" },
    modal: {
      highlights: "Características",
      impact: "Impacto",
      tech: "Tecnologías",
      close: "Cerrar",
    },
  },
  en: {
    name: "Carlos Osorio",
    tagline: "Systems Builder",
    subtitle: "Software · Embedded · Robotics",
    description:
      "I build systems that connect software with the physical world — turning human intention into real, measurable action.",
    nav: { projects: "Projects", about: "About", contact: "Contact" },
    buttons: {
      projects: "See Work",
      upwork: "Hire on Upwork",
      contact: "Let's Talk",
    },
    whatIDoTitle: "What I Do",
    whatIDo: [
      {
        icon: "◈",
        title: "Interactive Interfaces",
        desc: "UI that controls real-world systems and communicates in real time.",
      },
      {
        icon: "⬡",
        title: "Intelligent Backends",
        desc: "Backends that process, decide, and respond with robust logic.",
      },
      {
        icon: "◎",
        title: "Embedded Systems",
        desc: "Embedded control for sensors and actuators (ESP32, Arduino).",
      },
      {
        icon: "⬟",
        title: "Robotics & Electromechanics",
        desc: "Functional prototypes: grippers, exosuits, and modular prosthetics.",
      },
    ],
    projectsTitle: "Selected Work",
    aboutTitle: "About Me",
    aboutDesc: `I'm a self-taught Full-Stack Developer and systems builder. What began as web development evolved into designing architectures that go beyond screens — systems that sense, decide, and act through hardware, real-time communication, and intelligent control.

My projects are not born from improvisation, but from necessity. When an existing tool didn't meet its purpose, I rebuilt it. When something was missing, I created it. This approach shaped a strong problem-solving mindset and the ability to iterate rapidly on real systems.

I currently work at the intersection of software, embedded systems, and robotics — building solutions where interface, logic, and hardware operate as a single unit.`,
    stackTitle: "Technical Stack",
    frontEnd: "Frontend",
    backEnd: "Backend & Embedded",
    contactTitle: "Let's Connect",
    contactDesc:
      "If you're working on something that involves real-world systems — hardware, software, or both — I'm interested.",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    messagePlaceholder: "Tell me about your project...",
    sendButton: "Send Message",
    sentButton: "Sent! [OK]",
    cv: { es: "CV in Spanish", en: "CV in English" },
    theme: { dark: "Dark", light: "Light" },
    modal: {
      highlights: "Highlights",
      impact: "Impact",
      tech: "Technologies",
      close: "Close",
    },
  },
};

// ─── Component ───────────────────────────────────────────────────
export default function Home() {
  const [locale, setLocale] = useState<"es" | "en">(() =>
    typeof navigator !== "undefined" && navigator.language.startsWith("es") ? "es" : "en"
  );
  const t = translations[locale];

  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme support
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Core metrics for the sci-fi telemetry UI panel
  const [sysInteg, setSysInteg] = useState(99.4);
  const [cpuTemp, setCpuTemp] = useState(41);
  const [networkSync, setNetworkSync] = useState(true);
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [cyberInput, setCyberInput] = useState("");

  const proyects = projectsData.projects as Project[];

  // Send Email JS call
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    playBeep("heavy-click");
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setSent(true);
        setToast({ message: t.sentButton, type: "success" });
        pushLog(`EMAIL_DISPATCH_SUCCESS: Server node responsive.`);
        form.current?.reset();
        setTimeout(() => setToast(null), 3000);
      })
      .catch(() => {
        playBeep("alert");
        setToast({ message: "Error sending message ", type: "error" });
        pushLog(`CRITICAL_WARN: Message transmission failed.`);
        setTimeout(() => setToast(null), 3000);
      });
  };

  // Log updater
  const pushLog = (text: string) => {
    const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);
    setCommandLog((prev) => [`[${timestamp}] ${text}`, ...prev.slice(0, 5)]);
  };

  useEffect(() => {
    // Initial logs
    pushLog("KHYMERA_CORE v45.2 online.");
    pushLog("Quantum link synced. Cryptographic keys validated.");
    pushLog("Diagnostics: Active sensory nodes responding.");

    // Dynamic metrics updates
    const interval = setInterval(() => {
      setSysInteg((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.min(100, Math.max(97.2, prev + delta)).toFixed(2));
      });
      setCpuTemp((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.min(55, Math.max(38, prev + delta));
      });
      if (Math.random() > 0.85) {
        setNetworkSync((s) => !s);
        pushLog(Math.random() > 0.5 ? "Link node re-routed." : "Entropy filter calibrated.");
        playBeep("glitch");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setModalProject(null);
        setShowCV(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    playBeep("click");
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Interactive Command Terminal Command Dispatcher
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cyberInput.trim()) return;
    const cmd = cyberInput.toLowerCase().trim();
    playBeep("click");

    if (cmd === "help" || cmd === "?") {
      pushLog("COMMANDS: system, tech, pulse, theme, decrypt [project], cls");
    } else if (cmd === "system") {
      pushLog(`INTEG: ${sysInteg}% | CPU: ${cpuTemp}°C | LOCALE: ${locale.toUpperCase()}`);
    } else if (cmd === "tech") {
      pushLog("CORE_TECH: Next.js, React, ESP32, Python, C++, RTOS");
    } else if (cmd === "pulse") {
      playBeep("alert");
      pushLog("EMP WAVEFORM SIMULATION ENGAGED.");
    } else if (cmd === "theme") {
      const nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      pushLog(`THEME_RECONFIGURED: -> ${nextTheme.toUpperCase()}`);
    } else if (cmd === "cls" || cmd === "clear") {
      setCommandLog([]);
    } else if (cmd.startsWith("decrypt ")) {
      const pName = cmd.replace("decrypt ", "").toLowerCase();
      const match = proyects.find((p) => p.name.toLowerCase().includes(pName));
      if (match) {
        setModalProject(match);
        setShowModal(true);
        pushLog(`DECRYPTING FEED: ${match.name}`);
      } else {
        pushLog(`NODE NOT FOUND: "${pName}"`);
      }
    } else {
      pushLog(`UNKNOWN CMD: "${cmd}". Type "help"`);
    }
    setCyberInput("");
  };

  // Toggle theme directly
  const handleThemeToggle = () => {
    playBeep("click");
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    pushLog(`THEME_RECONFIGURED: -> ${nextTheme.toUpperCase()}`);
  };

  // ─── Render ────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Orbitron:wght@400;500;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── Theme Definitions ── */
        :root {
          --accent-cyan:     #06b6d4;
          --accent-emerald:  #10b981;
          --gradient-accent: linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald));
          --accent-glow:     rgba(6, 182, 212, 0.25);
          --font-sans:       'Inter', sans-serif;
          --font-cyber:      'Orbitron', sans-serif;
          --font-mono:       'JetBrains Mono', monospace;
        }

        .theme-dark {
          --bg-cyber:        #020617;
          --text-primary:    #f8fafc;
          --text-secondary:  #cbd5e1;
          --text-muted:      #64748b;
          --panel-bg:        rgba(15, 23, 42, 0.65);
          --panel-bg-solid:  #0f172a;
          --panel-border:    rgba(6, 182, 212, 0.2);
          --grid-line:       rgba(6, 182, 212, 0.04);
          --vignette:        rgba(2, 6, 23, 0.85);
          --terminal-bg:     #01040d;
          --terminal-text:   #38bdf8;
          --scanline-opacity:0.25;
        }

        .theme-light {
          --bg-cyber:        #f1f5f9;
          --text-primary:    #0f172a;
          --text-secondary:  #334155;
          --text-muted:      #94a3b8;
          --panel-bg:        rgba(255, 255, 255, 0.75);
          --panel-bg-solid:  #ffffff;
          --panel-border:    rgba(6, 182, 212, 0.35);
          --grid-line:       rgba(6, 182, 212, 0.08);
          --vignette:        rgba(241, 245, 249, 0.4);
          --terminal-bg:     #e2e8f0;
          --terminal-text:   #0369a1;
          --scanline-opacity:0.07;
        }

        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font-sans);
          background-color: var(--bg-cyber);
          color: var(--text-primary);
          margin: 0;
          overflow-x: hidden;
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        /* Scanline Overlay Effect */
        body::before {
          content: " ";
          display: block;
          position: fixed;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, var(--scanline-opacity)) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          z-index: 9999;
          background-size: 100% 4px, 6px 100%;
          pointer-events: none;
        }

        /* ── Cyber Nav ── */
        .nav-cyber {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: var(--panel-bg);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 2px solid var(--panel-border);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15), 0 1px 0 var(--panel-border);
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          transition: background-color 0.4s, border-color 0.4s;
        }
        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .nav-logo-cyber {
          font-family: var(--font-cyber);
          font-size: 1.1rem;
          font-weight: 900;
          color: var(--text-primary);
          text-shadow: 0 0 10px var(--accent-glow), 0 0 20px var(--accent-glow);
          background: none; border: none;
          cursor: pointer;
          letter-spacing: 2px;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-logo-cyber span {
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link-cyber {
          font-family: var(--font-cyber);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: none; border: none;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 4px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 1px;
          border: 1px solid transparent;
        }
        .nav-link-cyber:hover {
          color: var(--text-primary);
          background: var(--accent-glow);
          border-color: var(--panel-border);
          text-shadow: 0 0 8px var(--accent-cyan);
          box-shadow: inset 0 0 8px var(--accent-glow);
        }
        .nav-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cyber-toggle {
          display: flex;
          border: 1px solid var(--panel-border);
          border-radius: 4px;
          overflow: hidden;
          background: var(--panel-bg-solid);
        }
        .cyber-toggle-btn {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 6px 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.15s ease;
        }
        .cyber-toggle-btn.active {
          background: var(--gradient-accent);
          color: #ffffff;
          box-shadow: 0 0 10px var(--accent-cyan);
        }
        .cyber-toggle-btn:not(.active):hover {
          color: var(--text-primary);
          background: var(--accent-glow);
        }
        .btn-cyber-cv {
          font-family: var(--font-cyber);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 8px 18px;
          border: 1px solid var(--accent-emerald);
          background: var(--accent-glow);
          color: var(--text-primary);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 1px;
          box-shadow: 0 0 8px var(--accent-glow);
        }
        .btn-cyber-cv:hover {
          background: var(--gradient-accent);
          color: #ffffff;
          box-shadow: 0 0 15px var(--accent-cyan);
        }

        /* ── Cyber Hero Panel ── */
        .hero-cyber {
          padding-top: 150px;
          padding-bottom: 80px;
          position: relative;
        }
        .hero-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .hero-layout { grid-template-columns: 1fr; }
        }

        /* Tech Dashboard Widgets */
        .cyber-panel {
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          padding: 24px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), inset 0 0 20px var(--accent-glow);
          transition: background-color 0.4s, border-color 0.4s;
        }
        .cyber-panel::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--gradient-accent);
        }

        /* Cyber corner elements */
        .panel-corner {
          position: absolute;
          width: 8px; height: 8px;
          border-color: var(--accent-cyan);
          border-style: solid;
        }
        .corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

        .tag-status-cyber {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-primary);
          background: var(--accent-glow);
          border: 1px solid var(--panel-border);
          border-radius: 4px;
          padding: 6px 14px;
          margin-bottom: 24px;
          box-shadow: 0 0 10px var(--accent-glow);
        }
        .tag-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 8px var(--accent-emerald);
          animation: statusPulse 1.8s infinite ease-in-out;
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .title-cyber {
          font-family: var(--font-cyber);
          font-size: clamp(2.5rem, 6vw, 4.8rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -1px;
          color: var(--text-primary);
          margin: 0;
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 8px var(--accent-glow));
        }
        .subtitle-cyber {
          font-family: var(--font-cyber);
          font-size: clamp(0.9rem, 2vw, 1.25rem);
          font-weight: 700;
          color: var(--accent-emerald);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-top: 12px;
          margin-bottom: 24px;
          text-shadow: 0 0 8px var(--accent-glow);
        }
        .desc-cyber {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 620px;
        }

        /* Premium Cyber Buttons */
        .btn-cyber-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-cyber);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 14px 28px;
          background: var(--gradient-accent);
          color: #ffffff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 20px var(--glow-level);
          overflow: hidden;
        }
        .btn-cyber-primary::before {
          content: "";
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: all 0.5s;
        }
        .btn-cyber-primary:hover::before {
          left: 100%;
        }
        .btn-cyber-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px var(--accent-cyan);
        }

        .btn-cyber-secondary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-cyber);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 14px 28px;
          background: var(--panel-bg-solid);
          color: var(--accent-cyan);
          border: 1px solid var(--panel-border);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: inset 0 0 10px var(--accent-glow);
        }
        .btn-cyber-secondary:hover {
          background: var(--accent-glow);
          border-color: var(--accent-cyan);
          color: var(--text-primary);
          box-shadow: 0 0 20px var(--glow-level), inset 0 0 15px var(--accent-glow);
          transform: translateY(-2px);
        }

        /* HUD Live Diagnostics */
        .hud-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        .hud-metric-card {
          background: var(--panel-bg-solid);
          border: 1px solid var(--panel-border);
          border-radius: 6px;
          padding: 12px 16px;
          font-family: var(--font-mono);
          transition: all 0.4s;
        }
        .hud-metric-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        .hud-metric-val {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--accent-cyan);
          text-shadow: 0 0 8px var(--accent-glow);
        }

        /* Terminal Display Box */
        .terminal-panel {
          font-family: var(--font-mono);
          background: var(--terminal-bg);
          border: 1px solid var(--panel-border);
          border-radius: 6px;
          padding: 16px;
          font-size: 0.72rem;
          line-height: 1.5;
          color: var(--terminal-text);
          height: 150px;
          overflow-y: auto;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
          transition: all 0.4s;
        }
        .terminal-log-row {
          margin-bottom: 6px;
          white-space: pre-wrap;
          opacity: 0.95;
        }
        .terminal-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          border-top: 1px solid var(--panel-border);
          padding-top: 10px;
        }
        .terminal-prompt {
          color: var(--accent-emerald);
          font-weight: 700;
        }
        .terminal-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          flex-grow: 1;
        }

        /* ── Grid/Sections layout ── */
        .container-cyber {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .section-cyber {
          padding: 100px 0;
          position: relative;
        }
        .section-cyber-header {
          margin-bottom: 60px;
          border-left: 3px solid var(--accent-cyan);
          padding-left: 20px;
        }
        .section-cyber-eyebrow {
          font-family: var(--font-cyber);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--accent-emerald);
          text-shadow: 0 0 8px var(--accent-glow);
          margin-bottom: 8px;
        }
        .section-cyber-title {
          font-family: var(--font-cyber);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.5px;
          color: var(--text-primary);
          margin: 0;
          text-shadow: 0 0 15px var(--accent-glow);
        }

        /* ── Service Grid (How I can help) ── */
        .service-grid-cyber {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) {
          .service-grid-cyber { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .service-grid-cyber { grid-template-columns: 1fr; }
        }
        .service-card-cyber {
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          border-radius: 8px;
          padding: 32px 24px;
          transition: all 0.25s ease-in-out;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .service-card-cyber:hover {
          transform: translateY(-4px);
          border-color: var(--accent-cyan);
          background: var(--accent-glow);
          box-shadow: 0 12px 30px var(--accent-glow), inset 0 0 15px var(--accent-glow);
        }
        .service-card-cyber::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 4px; height: 0;
          background: var(--gradient-accent);
          transition: height 0.25s ease;
        }
        .service-card-cyber:hover::before {
          height: 100%;
        }
        .service-icon-cyber {
          font-size: 1.5rem;
          color: var(--accent-cyan);
          margin-bottom: 20px;
          display: inline-block;
          text-shadow: 0 0 10px var(--accent-glow);
        }
        .service-title-cyber {
          font-family: var(--font-cyber);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin: 0 0 12px;
          text-transform: uppercase;
        }
        .service-desc-cyber {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        /* ── Projects Matrix ── */
        .projects-grid-cyber {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 960px) {
          .projects-grid-cyber { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .projects-grid-cyber { grid-template-columns: 1fr; }
        }

        /* ── Cyber About ── */
        .about-layout-cyber {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 840px) {
          .about-layout-cyber { grid-template-columns: 1fr; gap: 32px; }
        }
        .frame-photo-cyber {
          position: relative;
          border: 1px solid var(--panel-border);
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 3/4;
          background: var(--panel-bg-solid);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        .frame-photo-cyber::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, var(--bg-cyber) 100%), var(--accent-glow);
          pointer-events: none;
        }
        .photo-scan-bar {
          position: absolute;
          left: 0; right: 0; height: 3px;
          background: var(--accent-cyan);
          box-shadow: 0 0 10px var(--accent-cyan);
          animation: photoSweep 3s linear infinite;
          z-index: 5;
        }
        @keyframes photoSweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .about-links-cyber {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }
        .about-link-cyber {
          font-family: var(--font-cyber);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid var(--panel-border);
          background: var(--panel-bg);
          transition: all 0.2s;
        }
        .about-link-cyber:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: var(--accent-glow);
          box-shadow: 0 0 10px var(--accent-glow);
          transform: translateX(4px);
        }
        .about-text-cyber p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 0 0 24px;
          border-left: 2px solid var(--panel-border);
          padding-left: 16px;
        }
        .about-text-cyber p:last-child { margin-bottom: 0; }

        /* ── Cyber Stack Panel ── */
        .stack-grid-cyber {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .stack-grid-cyber { grid-template-columns: 1fr; }
        }
        .stack-card-cyber {
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          border-radius: 8px;
          padding: 24px;
          backdrop-filter: blur(12px);
          position: relative;
        }
        .stack-label-cyber {
          font-family: var(--font-cyber);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent-cyan);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stack-icons-cyber {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .icon-wrapper-cyber {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid var(--panel-border);
          background: var(--panel-bg-solid);
          transition: all 0.2s ease-in-out;
        }
        .icon-wrapper-cyber:hover {
          border-color: var(--accent-cyan);
          background: var(--accent-glow);
          transform: scale(1.1) rotate(2deg);
          box-shadow: 0 0 12px var(--accent-glow);
        }
        .chip-tag-cyber {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-cyan);
          background: var(--accent-glow);
          border: 1px solid var(--panel-border);
          border-radius: 4px;
          padding: 6px 12px;
          letter-spacing: 1px;
          transition: all 0.2s;
        }
        .chip-tag-cyber:hover {
          border-color: var(--accent-emerald);
          color: var(--accent-emerald);
          background: var(--accent-glow);
          box-shadow: 0 0 10px var(--accent-glow);
        }

        /* ── Interactive Contact Console ── */
        .form-grid-cyber {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .field-wrap-cyber {
          position: relative;
        }
        .field-wrap-cyber label {
          position: absolute;
          top: -8px; left: 12px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--accent-cyan);
          background: var(--bg-cyber);
          padding: 0 6px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: background-color 0.4s;
        }
        .input-cyber {
          width: 100%;
          padding: 14px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-primary);
          background: var(--panel-bg-solid);
          border: 1px solid var(--panel-border);
          border-radius: 6px;
          outline: none;
          transition: all 0.25s;
        }
        .input-cyber:focus {
          border-color: var(--accent-emerald);
          box-shadow: 0 0 15px var(--accent-glow);
        }
        textarea.input-cyber { resize: vertical; min-height: 130px; }

        /* ── Cyber Footer ── */
        .footer-cyber {
          background: var(--panel-bg-solid);
          border-top: 1px solid var(--panel-border);
          padding: 40px 0;
          position: relative;
          transition: background-color 0.4s, border-color 0.4s;
        }
        .footer-inner-cyber {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-copy-cyber {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 1px;
        }
        .footer-links-cyber {
          display: flex;
          gap: 16px;
        }
        .footer-link-cyber {
          font-family: var(--font-cyber);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 4px 8px;
          transition: color 0.15s;
        }
        .footer-link-cyber:hover {
          color: var(--accent-cyan);
          text-shadow: 0 0 8px var(--accent-cyan);
        }

        /* ── Overlay Holographic Modals ── */
        .cyber-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(2, 6, 23, 0.8);
          backdrop-filter: blur(12px);
          padding: 24px;
        }
        .cv-panel-cyber {
          background: var(--panel-bg-solid);
          border: 2px solid var(--accent-cyan);
          border-radius: 12px;
          padding: 40px;
          max-width: 420px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          box-shadow: 0 0 40px var(--accent-glow);
          position: relative;
        }
        .cv-panel-cyber::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: var(--gradient-accent);
        }
        .cv-title-cyber {
          font-family: var(--font-cyber);
          font-size: 1.15rem;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-primary);
          text-shadow: 0 0 10px var(--accent-glow);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cv-btn-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .cv-close-cyber {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s;
          letter-spacing: 1px;
        }
        .cv-close-cyber:hover { color: var(--accent-cyan); }

        /* ── Cyber Toast Notifications ───────────────── */
        .toast-cyber {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 60;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 12px 20px;
          border-radius: 6px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          gap: 10px;
          border-left: 4px solid;
          background: var(--panel-bg-solid);
          transition: all 0.4s;
        }
        .toast-cyber-success {
          border-color: var(--accent-emerald);
          color: var(--accent-emerald);
          box-shadow: 0 0 20px var(--accent-glow);
        }
        .toast-cyber-error {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 20px var(--accent-glow);
        }

        /* ── Cyber HUD Mobile menu ── */
        .cyber-menu-btn {
          display: none;
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;
          color: var(--accent-cyan);
          font-family: var(--font-cyber);
          font-size: 0.75rem;
          font-weight: 700;
          transition: all 0.2s;
        }
        .cyber-menu-btn:hover {
          background: var(--accent-glow);
          box-shadow: 0 0 10px var(--accent-glow);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .cyber-menu-btn { display: inline-flex; align-items: center; }
        }
        .mobile-menu-cyber {
          position: fixed;
          top: 70px;
          left: 0; right: 0;
          background: var(--panel-bg-solid);
          border-bottom: 1px solid var(--panel-border);
          padding: 16px 24px;
          z-index: 49;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .mobile-nav-link-cyber {
          font-family: var(--font-cyber);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px;
          text-align: left;
          border-radius: 4px;
          transition: all 0.2s;
          border-left: 2px solid transparent;
        }
        .mobile-nav-link-cyber:hover {
          background: var(--accent-glow);
          color: var(--accent-cyan);
          border-left-color: var(--accent-cyan);
        }

        /* ── High Tech Layout Details ── */
        .tech-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--panel-border) 50%, transparent);
          border: none;
          margin: 0;
        }

        /* Float/Theme toggle button in header */
        .btn-theme-selector {
          background: none;
          border: 1px solid var(--panel-border);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .btn-theme-selector:hover {
          border-color: var(--accent-cyan);
          background: var(--accent-glow);
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Dynamic Theme Host Wrapping Class */}
      <div className={theme === "dark" ? "theme-dark" : "theme-light"} style={{ minHeight: "100vh", backgroundColor: "var(--bg-cyber)", color: "var(--text-primary)", transition: "background-color 0.4s ease, color 0.4s ease" }}>
        
        {/* ─── Cybernetic Header/Navbar ────────────────── */}
        <nav className="nav-cyber">
          <div className="nav-inner">
            <button className="nav-logo-cyber" onClick={() => scrollTo("hero")}>
              CARLOS_OSORIO //<span>NODE_45</span>
            </button>

            <div className="nav-links">
              {[
                { label: t.nav.projects, id: "projects" },
                { label: t.nav.about,    id: "about"    },
                { label: t.nav.contact,  id: "contact"  },
              ].map(({ label, id }) => (
                <button key={id} onClick={() => scrollTo(id)} className="nav-link-cyber" onMouseEnter={() => playBeep("nav")}>
                  {label.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="nav-controls">
              {/* Language Switch */}
              <div className="cyber-toggle">
                {(["es", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      playBeep("click");
                      setLocale(l);
                      pushLog(`LANG_RECONFIGURED: -> ${l.toUpperCase()}`);
                    }}
                    className={`cyber-toggle-btn ${locale === l ? "active" : ""}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Theme Toggle Button */}
              <button className="btn-theme-selector" onClick={handleThemeToggle}>
                <span>{theme === "dark" ? "DM_ON" : "LM_ON"}</span>
              </button>

              <button className="btn-cyber-cv" onClick={() => { playBeep("heavy-click"); setShowCV(true); }}>
                CV_SYS
              </button>

              <button
                className="cyber-menu-btn"
                onClick={() => {
                  playBeep("click");
                  setMobileMenuOpen((v) => !v);
                }}
                aria-label="Toggle Cyber menu"
              >
                {mobileMenuOpen ? "[ CLOSE ]" : "[ HUD_MENU ]"}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile HUD overlay menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-cyber animate-fade-in">
            {[
              { label: t.nav.projects, id: "projects" },
              { label: t.nav.about,    id: "about"    },
              { label: t.nav.contact,  id: "contact"  },
            ].map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} className="mobile-nav-link-cyber">
                {label.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* ─── Hero Command Console ────────────────────── */}
        <section id="hero" className="hero-cyber">
          {/* Abstract cyber backdrop elements */}
          <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="container-cyber">
            <div className="hero-layout">
              {/* Intro Lead Text Panel */}
              <div>
                <div className="tag-status-cyber">
                  <span className="tag-status-dot" />
                  {locale === "es" ? "SISTEMA INTEGRAL EN LÍNEA" : "SYSTEM STATUS OVERWATCH: OK"}
                </div>

                <h1 className="title-cyber">{t.tagline}</h1>
                <p className="subtitle-cyber">— {t.subtitle}</p>
                <p className="desc-cyber">{t.description}</p>

                <div className="flex flex-wrap gap-4">
                  <button className="btn-cyber-primary" onClick={() => scrollTo("projects")}>
                    {t.buttons.projects} _
                  </button>
                  <button
                    className="btn-cyber-secondary"
                    onClick={() => {
                      playBeep("click");
                      window.open("https://www.upwork.com/freelancers/~01093075254cf375b0", "_blank");
                    }}
                  >
                    {t.buttons.upwork} _
                  </button>
                  <button className="btn-cyber-secondary" onClick={() => scrollTo("contact")}>
                    {t.buttons.contact} _
                  </button>
                </div>
              </div>

              {/* Micro-Dashboard / Diagnostics Overlord Widget Panel */}
              <div className="cyber-panel">
                <div className="panel-corner corner-tl" />
                <div className="panel-corner corner-tr" />
                <div className="panel-corner corner-bl" />
                <div className="panel-corner corner-br" />

                {/* Glowing Hologram Ring Grid Backdrop */}
                <div className="absolute top-4 right-4 w-12 h-12 border border-cyan-500/20 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '8s' }} />
                <div className="absolute top-5 right-5 w-10 h-10 border border-emerald-500/20 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />

                <h3 className="font-cyber text-xs font-bold text-[var(--text-primary)] tracking-widest uppercase mb-4 flex items-center justify-between pb-2 border-b border-[var(--panel-border)]">
                  <span>SYSTEM_OVERWATCH</span>
                  <span className="text-[var(--accent-cyan)] font-mono text-[10px]">[REAL_TIME]</span>
                </h3>

                {/* HUD Live stats */}
                <div className="hud-grid">
                  <div className="hud-metric-card">
                    <div className="hud-metric-label">SYS_INTEGRITY</div>
                    <div className="hud-metric-val">{sysInteg}%</div>
                  </div>
                  <div className="hud-metric-card">
                    <div className="hud-metric-label">CPU_TEMP</div>
                    <div className="hud-metric-val">{cpuTemp}°C</div>
                  </div>
                  <div className="hud-metric-card">
                    <div className="hud-metric-label">NET_SYNC</div>
                    <div className={`hud-metric-val ${networkSync ? 'text-[var(--accent-cyan)]' : 'text-rose-400'}`}>
                      {networkSync ? "ENCRYPTED" : "RE-ROUTING"}
                    </div>
                  </div>
                  <div className="hud-metric-card">
                    <div className="hud-metric-label">HOST_LOCALE</div>
                    <div className="hud-metric-val text-[var(--accent-emerald)]">{locale.toUpperCase()} // SW-45</div>
                  </div>
                </div>

                {/* Interactive terminal command emulator */}
                <div className="terminal-panel">
                  {commandLog.map((log, i) => (
                    <div key={i} className="terminal-log-row">{log}</div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="terminal-input-wrap">
                  <span className="terminal-prompt">&gt;</span>
                  <input
                    type="text"
                    placeholder='Type "help", "theme", or "decrypt [project_name]" ...'
                    value={cyberInput}
                    onChange={(e) => setCyberInput(e.target.value)}
                    className="terminal-input"
                  />
                  <button type="submit" className="hidden" />
                </form>
              </div>
            </div>
          </div>
        </section>

        <hr className="tech-divider" />

        {/* ─── What I Do Panel ─────────────────────────── */}
        <section className="section-cyber">
          <div className="container-cyber">
            <div className="section-cyber-header">
              <div className="section-cyber-eyebrow">{t.whatIDoTitle}</div>
              <h2 className="section-cyber-title">
                {locale === "es" ? "DIRECCIONAMIENTO DE CAPACIDADES" : "CAPABILITY ARCHITECTURES"}
              </h2>
            </div>

            <div className="service-grid-cyber">
              {t.whatIDo.map((item, i) => (
                <div key={i} className="service-card-cyber" onMouseEnter={() => playBeep("nav")}>
                  <div className="panel-corner corner-tl opacity-40" />
                  <div className="panel-corner corner-tr opacity-40" />
                  <div className="panel-corner corner-bl opacity-40" />
                  <div className="panel-corner corner-br opacity-40" />
                  <span className="service-icon-cyber">{item.icon}</span>
                  <h3 className="service-title-cyber">{item.title}</h3>
                  <p className="service-desc-cyber">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="tech-divider" />

        {/* ─── Projects Grid Matrix ───────────────────── */}
        <section id="projects" className="section-cyber">
          <div className="container-cyber">
            <div className="section-cyber-header">
              <div className="section-cyber-eyebrow">{t.projectsTitle}</div>
              <h2 className="section-cyber-title">
                {locale === "es" ? "NODOS DE TRABAJO SELECCIONADOS" : "DECRYPTED PROJECT FEED"}
              </h2>
            </div>

            <div className="projects-grid-cyber">
              {proyects.map((project, index) => (
                <Card
                  key={index}
                  project={project}
                  setModal={setModalProject}
                  setShowModal={setShowModal}
                  openDetailsLabel={locale === "es" ? "Abrir detalles" : "Open details"}
                />
              ))}
            </div>
          </div>
        </section>

        <hr className="tech-divider" />

        {/* ─── About Cyber Console ────────────────────── */}
        <section id="about" className="section-cyber">
          <div className="container-cyber">
            <div className="section-cyber-header">
              <div className="section-cyber-eyebrow">{t.aboutTitle}</div>
              <h2 className="section-cyber-title">
                {locale === "es" ? "PERFIL DEL OPERADOR" : "CONSTRUCT_INTELLIGENCE"}
              </h2>
            </div>

            <div className="about-layout-cyber">
              {/* Photo + HUD connections */}
              <div>
                <div className="frame-photo-cyber">
                  <div className="photo-scan-bar" />
                  <Image
                    src="/fto.png"
                    alt="Carlos Osorio"
                    fill
                    className="object-cover filter grayscale contrast-125 saturate-50 hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="about-links-cyber">
                  {[
                    { label: "GITHUB_NODE",   href: "https://github.com/xlceor" },
                    { label: "LINKEDIN_PORT", href: "https://www.linkedin.com/in/carlos-osorio-a6967b2a6/" },
                    { label: "UPWORK_SYS",   href: "https://www.upwork.com/freelancers/~01093075254cf375b0" },
                  ].map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="about-link-cyber" onMouseEnter={() => playBeep("nav")}>
                      <span>{label}</span>
                      <span>↗</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Bio Construct Text */}
              <div className="about-text-cyber">
                {t.aboutDesc.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="tech-divider" />

        {/* ─── Technical Stack Matrix ─────────────────── */}
        <section className="section-cyber">
          <div className="container-cyber">
            <div className="section-cyber-header">
              <div className="section-cyber-eyebrow">{t.stackTitle}</div>
              <h2 className="section-cyber-title">
                {locale === "es" ? "MATRIZ DE TECNOLOGÍA" : "ENGINEERING MATRIX"}
              </h2>
            </div>

            <div className="stack-grid-cyber">
              {[
                {
                  title: t.frontEnd,
                  icons: [FaHtml5, FaCss3, FaJs, FaReact, SiTypescript, RiTailwindCssFill, RiNextjsFill],
                },
                {
                  title: t.backEnd,
                  icons: [SiTypescript, FaNodeJs, FaPython, SiExpress, SiFlask, SiMysql, SiSqlite],
                },
              ].map((group, i) => (
                <div key={i} className="stack-card-cyber">
                  <div className="panel-corner corner-tl opacity-40" />
                  <div className="panel-corner corner-tr opacity-40" />
                  <div className="panel-corner corner-bl opacity-40" />
                  <div className="panel-corner corner-br opacity-40" />
                  <div className="stack-label-cyber">
                    <span className="text-[var(--accent-emerald)]">⬡</span>
                    {group.title.toUpperCase()}
                  </div>
                  <div className="stack-icons-cyber">
                    {group.icons.map((Icon, j) => (
                      <div key={j} className="icon-wrapper-cyber">
                        <GradientSvgIcon Icon={Icon} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded and robotics advanced panel */}
            <div className="stack-card-cyber">
              <div className="panel-corner corner-tl opacity-40" />
              <div className="panel-corner corner-tr opacity-40" />
              <div className="panel-corner corner-bl opacity-40" />
              <div className="panel-corner corner-br opacity-40" />
              <div className="stack-label-cyber">
                <span className="text-[var(--accent-emerald)]">⬟</span>
                EMBEDDED, REAL-TIME & ROBOTICS FEED
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["ESP32", "Arduino", "C/C++", "RTOS", "SSE", "Serial", "PWM", "I2C", "PID Loops", "Actuators"].map((tag) => (
                  <span key={tag} className="chip-tag-cyber" onMouseEnter={() => playBeep("nav")}>
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="tech-divider" />

        {/* ─── Contact Uplink Console ──────────────────── */}
        <section id="contact" className="section-cyber">
          <div className="container-cyber">
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>
              <div className="section-cyber-header" style={{ borderLeftColor: "var(--accent-emerald)" }}>
                <div className="section-cyber-eyebrow" style={{ color: "var(--accent-cyan)" }}>{t.contactTitle}</div>
                <h2 className="section-cyber-title">
                  {locale === "es" ? "ESTABLECER ENLACE TRANSMISIÓN" : "SECURE COMM LINK UPLINK"}
                </h2>
                <p className="desc-cyber" style={{ marginTop: "12px", marginBottom: "0" }}>{t.contactDesc}</p>
              </div>

              <div className="cyber-panel">
                <div className="panel-corner corner-tl" style={{ borderColor: "var(--accent-cyan)" }} />
                <div className="panel-corner corner-tr" style={{ borderColor: "var(--accent-cyan)" }} />
                <div className="panel-corner corner-bl" style={{ borderColor: "var(--accent-cyan)" }} />
                <div className="panel-corner corner-br" style={{ borderColor: "var(--accent-cyan)" }} />

                <form ref={form} onSubmit={sendEmail} className="form-grid-cyber">
                  <div className="field-wrap-cyber">
                    <label>IDENTIFIER_NAME</label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      className="input-cyber"
                      autoComplete="off"
                    />
                  </div>
                  <div className="field-wrap-cyber">
                    <label>COMM_CHANN_EMAIL</label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      className="input-cyber"
                      autoComplete="off"
                    />
                  </div>
                  <div className="field-wrap-cyber">
                    <label>PAYLOAD_MESSAGE</label>
                    <textarea
                      name="message"
                      required
                      className="input-cyber"
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="btn-cyber-primary">
                      {sent ? t.sentButton.toUpperCase() : t.sendButton.toUpperCase()} _
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Cyber Footer ────────────────────────────── */}
        <footer className="footer-cyber">
          <div className="container-cyber">
            <div className="footer-inner-cyber">
              <span className="footer-copy-cyber">
                © {new Date().getFullYear()} CARLOS_OSORIO // OVERWATCH_COGNIZANCE
              </span>
              <div className="footer-links-cyber">
                {[
                  { label: "GITHUB_SYS",    href: "https://github.com/xlceor" },
                  { label: "LINKEDIN_SYS",  href: "https://www.linkedin.com/in/carlos-osorio-a6967b2a6/" },
                  { label: "INSTA_FEED", href: "https://www.instagram.com/xlceor/" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-link-cyber" onMouseEnter={() => playBeep("nav")}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* ─── Overlay Holographic Modals ──────────────── */}
        {showModal && modalProject && (
          <Modal
            project={modalProject}
            setModal={setModalProject}
            setShowModal={setShowModal}
            copy={t.modal}
          />
        )}

        {showCV && (
          <div className="cyber-modal-overlay" onClick={() => setShowCV(false)}>
            <div className="cv-panel-cyber" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <p className="cv-title-cyber">
                <span className="text-[var(--accent-cyan)]">⬡</span> CHOOSE_PAYLOAD_FORMAT
              </p>
              <div className="cv-btn-stack">
                <a href="/CV_Espanol.pdf" target="_blank" className="btn-cyber-secondary text-center w-full block justify-center flex" onClick={() => playBeep("click")}>
                  {t.cv.es.toUpperCase()} _
                </a>
                <a href="/CV_Ingles.pdf" target="_blank" className="btn-cyber-primary text-center w-full block justify-center flex" onClick={() => playBeep("click")}>
                  {t.cv.en.toUpperCase()} _
                </a>
              </div>
              <button className="cv-close-cyber" onClick={() => setShowCV(false)}>
                [ CLOSE_OVERLAY ]
              </button>
            </div>
          </div>
        )}

        {/* ─── Cyber Toast Notifications ───────────────── */}
        {toast && (
          <div className={`toast-cyber ${toast.type === "success" ? "toast-cyber-success" : "toast-cyber-error"}`}>
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-ping" />
            <span>{toast.message.toUpperCase()}</span>
          </div>
        )}
      </div>
    </>
  );
}
