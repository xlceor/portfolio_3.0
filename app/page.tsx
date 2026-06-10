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

// ─── NOTE: Add `darkMode: 'class'` to your tailwind.config.js ───

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
    sentButton: "¡Enviado! ✓",
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
    sentButton: "Sent! ✓",
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

// ─── Theme helpers ───────────────────────────────────────────────
type Theme = "dark" | "light";

function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

// ─── Component ───────────────────────────────────────────────────
export default function Home() {
  const [locale, setLocale] = useState<"es" | "en">(() =>
    typeof navigator !== "undefined" && navigator.language.startsWith("es") ? "es" : "en"
  );
  const t = translations[locale];
  const { theme, toggle: toggleTheme } = useTheme();

  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCV, setShowCV] = useState(false);

  const proyects = projectsData.projects as Project[];

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
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
        form.current?.reset();
        setTimeout(() => setToast(null), 3000);
      })
      .catch(() => {
        setToast({ message: "Error sending message 😥", type: "error" });
        setTimeout(() => setToast(null), 3000);
      });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setModalProject(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // ─── Render ────────────────────────────────────────────────────
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --font-display: 'Cormorant Garamond', serif;
          --font-mono: 'DM Mono', monospace;
          --font-body: 'Outfit', sans-serif;
          --accent: #00d4aa;
          --accent-dim: #00a888;
          --accent-glow: rgba(0, 212, 170, 0.15);
        }

        html { scroll-behavior: smooth; }

        .font-display { font-family: var(--font-display); }
        .font-mono    { font-family: var(--font-mono); }
        .font-body    { font-family: var(--font-body); }

        .accent-text  { color: var(--accent); }
        .accent-border{ border-color: var(--accent); }
        .accent-bg    { background: var(--accent); }

        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px var(--accent-glow);
        }

        .nav-link {
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          background: var(--accent);
          color: #0a0f0d;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          padding: 0.65rem 1.4rem;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-outline {
          background: transparent;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          padding: 0.65rem 1.4rem;
          border: 1px solid var(--accent);
          color: var(--accent);
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .btn-outline:hover {
          background: var(--accent-glow);
          transform: translateY(-1px);
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
      `}</style>

      <div
        className="
          font-body min-h-screen
          bg-[var(--bg)] text-[var(--text)]
          transition-colors duration-300
        "
      >

        {/* ─── Navbar ──────────────────────────────────────────── */}
        <nav className="
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-6 md:px-16 py-4
          bg-[var(--bg)]/80 backdrop-blur-md
          border-b border-[var(--surface-border)]
        ">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm tracking-widest text-[var(--accent)] hover:opacity-70 transition-opacity"
          >
            CO /
          </button>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: t.nav.projects, id: "projects" },
              { label: t.nav.about, id: "about" },
              { label: t.nav.contact, id: "contact" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="nav-link text-sm font-body text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Locale */}
            <div className="flex border border-[var(--surface-border)] rounded overflow-hidden">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`
                    font-mono text-xs px-2.5 py-1 transition-colors
                    ${locale === l
                      ? "bg-[var(--accent)] text-black"
                      : "text-[var(--muted)] hover:bg-[var(--surface)]"
                    }
                  `}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="
                font-mono text-xs px-2.5 py-1 rounded
                border border-[var(--surface-border)]
                text-[var(--muted)]
                hover:bg-[var(--surface)]
                transition-colors
              "
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "◑"}
            </button>

            {/* CV */}
            <button
              onClick={() => setShowCV(true)}
              className="hidden md:block border border-[var(--accent)] text-[var(--accent)] font-mono text-xs px-4 py-1.5 rounded hover:bg-[var(--accent)] hover:text-black transition-all"
            >
              CV
            </button>
          </div>
        </nav>

        {/* ─── Hero ────────────────────────────────────────────── */}
        <section
          id="hero"
          className="
            min-h-screen flex flex-col justify-center
            px-6 md:px-16 lg:px-24
            pt-24 pb-16
          "
        >
          <div className="max-w-3xl">
            {/* System indicator */}
            <div className="section-label text-[var(--accent)] mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              {locale === "es" ? "Disponible para proyectos" : "Available for projects"}
            </div>

            {/* Main heading */}
            <h1 className="font-display text-[clamp(3.2rem,9vw,7rem)] leading-[1.0] mb-3 text-white">
              {t.tagline}
            </h1>
            <h2 className="font-mono text-sm md:text-base tracking-widest text-[var(--muted)] mb-6">
              — {t.subtitle}
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-[var(--muted)] max-w-xl mb-10">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo("projects")} className="bg-[var(--accent)] text-black font-mono text-xs px-6 py-3 rounded hover:opacity-90 transition-opacity">
                {t.buttons.projects}
              </button>
              <button
                onClick={() => window.open("https://www.upwork.com/freelancers/~01093075254cf375b0", "_blank")}
                className="border border-[var(--accent)] text-[var(--accent)] font-mono text-xs px-6 py-3 rounded hover:bg-[var(--accent)] hover:text-black transition-all"
              >
                {t.buttons.upwork}
              </button>
              <button onClick={() => scrollTo("contact")} className="border border-[var(--surface-border)] text-[var(--text)] font-mono text-xs px-6 py-3 rounded hover:border-[var(--accent)] transition-all">
                {t.buttons.contact}
              </button>
            </div>
          </div>
        </section>

        {/* ─── What I Do ───────────────────────────────────────── */}
        <section className="
          py-20 px-6 md:px-16 lg:px-24
          bg-[var(--bg-elevated)]
        ">
          <div className="max-w-5xl mx-auto">
            <div className="section-label text-[var(--accent)] mb-3">01</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-12 text-white">
              {t.whatIDoTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.whatIDo.map((item, i) => (
                <div
                  key={i}
                  className="
                    p-8 rounded-lg
                    bg-[var(--surface)] border border-[var(--surface-border)]
                    group
                  "
                >
                  <div className="font-mono text-2xl text-[var(--accent)] mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Projects ────────────────────────────────────────── */}
        <section id="projects" className="py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="section-label text-[var(--accent)] mb-3">02</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-12 text-white">
              {t.projectsTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* ─── About ───────────────────────────────────────────── */}
        <section
          id="about"
          className="
            py-20 px-6 md:px-16 lg:px-24
            bg-[var(--bg-elevated)]
            border-t border-b border-[var(--surface-border)]
          "
        >
          <div className="max-w-5xl mx-auto">
            <div className="section-label text-[var(--accent)] mb-3">03</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-10 text-white">
              {t.aboutTitle}
            </h2>

            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-52 h-64 relative border border-[var(--surface-border)] p-1">
                  <div className="relative w-full h-full overflow-hidden bg-[var(--surface)]">
                    <Image
                      src="/fto.png"
                      alt="Carlos Osorio"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-5 flex flex-col gap-2">
                  {[
                    { label: "GitHub", href: "https://github.com/xlceor" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-osorio-a6967b2a6/" },
                    { label: "Upwork", href: "https://www.upwork.com/freelancers/~01093075254cf375b0" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-4 h-px bg-[var(--surface-border)] group-hover:bg-[var(--accent)] transition-colors" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                {t.aboutDesc.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className={`text-base leading-relaxed text-[var(--muted)] ${i > 0 ? "mt-5" : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stack ───────────────────────────────────────────── */}
        <section className="
          py-20 px-6 md:px-16 lg:px-24
        ">
          <div className="max-w-5xl mx-auto">
            <div className="section-label text-[var(--accent)] mb-3">04</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-12 text-white">
              {t.stackTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend & Backend */}
              {[
                { title: t.frontEnd, icons: [FaHtml5, FaCss3, FaJs, FaReact, SiTypescript, RiTailwindCssFill, RiNextjsFill] },
                { title: t.backEnd, icons: [SiTypescript, FaNodeJs, FaPython, SiExpress, SiFlask, SiMysql, SiSqlite] }
              ].map((group, i) => (
                <div key={i} className="p-7 rounded border border-[var(--surface-border)] bg-[var(--bg-elevated)]">
                  <div className="font-mono text-xs tracking-widest text-[var(--muted)] mb-5">
                    {group.title.toUpperCase()}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {group.icons.map((Icon, j) => (
                      <div key={j} className="p-2 transition-transform hover:scale-110">
                        <GradientSvgIcon Icon={Icon} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Extra: Embedded */}
            <div className="mt-6 p-7 rounded border border-[var(--surface-border)] bg-[var(--bg-elevated)]">
              <div className="font-mono text-xs tracking-widest text-[var(--muted)] mb-3">
                EMBEDDED & ROBOTICS
              </div>
              <div className="flex flex-wrap gap-2">
                {["ESP32", "Arduino", "C/C++", "RTOS", "SSE", "Serial", "PWM", "I2C"].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 border border-[var(--surface-border)] text-[var(--muted)] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contact ─────────────────────────────────────────── */}
        <section
          id="contact"
          className="py-20 px-6 md:px-16 lg:px-24 border-t border-[var(--surface-border)]"
        >
          <div className="max-w-2xl mx-auto">
            <div className="section-label text-[var(--accent)] mb-3">05</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] mb-3 text-white">
              {t.contactTitle}
            </h2>
            <p className="text-sm text-[var(--muted)] mb-10">{t.contactDesc}</p>

            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col gap-4"
            >
              {[
                { name: "user_name", placeholder: t.namePlaceholder, type: "text" },
                { name: "user_email", placeholder: t.emailPlaceholder, type: "email" },
              ].map(({ name, placeholder, type }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required
                  className="
                    w-full px-4 py-3 text-sm
                    bg-[var(--surface)] border border-[var(--surface-border)]
                    text-white placeholder:text-[var(--muted)]
                    focus:outline-none focus:border-[var(--accent)]
                    rounded transition-colors
                  "
                />
              ))}
              <textarea
                name="message"
                rows={5}
                placeholder={t.messagePlaceholder}
                required
                className="
                  w-full px-4 py-3 text-sm resize-none
                  bg-[var(--surface)] border border-[var(--surface-border)]
                  text-white placeholder:text-[var(--muted)]
                  focus:outline-none focus:border-[var(--accent)]
                  rounded transition-colors
                "
              />
              <button type="submit" className="bg-[var(--accent)] text-black font-mono text-xs px-6 py-3 rounded hover:opacity-90 transition-opacity">
                {sent ? t.sentButton : t.sendButton}
              </button>
            </form>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────── */}
        <footer className="
          border-t border-[var(--surface-border)]
          py-6 px-6 md:px-16
          flex flex-col sm:flex-row items-center justify-between gap-3
        ">
          <span className="font-mono text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Carlos Osorio
          </span>
          <div className="flex gap-5">
            {[
              { label: "GitHub", href: "https://github.com/xlceor" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-osorio-a6967b2a6/" },
              { label: "Instagram", href: "https://www.instagram.com/xlceor/" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </footer>

        {/* ─── Modals ──────────────────────────────────────────── */}
        {showModal && modalProject && (
          <Modal
            project={modalProject}
            setModal={setModalProject}
            setShowModal={setShowModal}
            copy={t.modal}
          />
        )}

        {showCV && (
          <div
            onClick={() => setShowCV(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              className="
                flex flex-col items-center justify-center gap-6
                p-10 rounded border border-[var(--surface-border)]
                bg-[var(--bg-elevated)] shadow-2xl
                max-w-sm w-full
              "
            >
              <p className="font-display text-2xl text-white">
                Download CV
              </p>
              <div className="flex gap-4">
                <a href="/CV_Espanol.pdf" target="_blank" className="border border-[var(--accent)] text-[var(--accent)] font-mono text-xs px-4 py-2 rounded hover:bg-[var(--accent)] hover:text-black">
                  {t.cv.es}
                </a>
                <a href="/CV_Ingles.pdf" target="_blank" className="bg-[var(--accent)] text-black font-mono text-xs px-4 py-2 rounded hover:opacity-90">
                  {t.cv.en}
                </a>
              </div>
              <button
                onClick={() => setShowCV(false)}
                className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)]"
              >
                {locale === "es" ? "cerrar" : "close"}
              </button>
            </div>
          </div>
        )}

        {/* ─── Toast ───────────────────────────────────────────── */}
        {toast && (
          <div
            className={`
              fixed bottom-6 right-6 z-50
              font-mono text-xs px-4 py-3 rounded shadow-lg
              ${toast.type === "success" ? "bg-[var(--accent)] text-black" : "bg-red-600 text-white"}
            `}
          >
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}