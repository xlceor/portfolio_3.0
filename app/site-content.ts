import { Locale, ProjectTranslation } from "./types";

export const translations = {
  en: {
    nav: {
      work: "Projects",
      about: "About",
      contact: "Contact",
      logo: "Carlos Osorio"
    },
    hero: {
      eyebrow: "Available for projects",
      title: "I build systems<br>that work in the real world.",
      sub: "Full-stack developer and embedded systems builder. From web interfaces to ESP32 controllers — I connect software with physical reality.",
      ctaPrimary: "See my work",
      ctaUpwork: "Hire on Upwork",
      ctaContact: "Get in touch"
    },
    capabilities: {
      label: "Capabilities",
      title: "What I build",
      items: [
        {
          icon: "⬡",
          title: "Interactive interfaces",
          desc: "Web UIs that control real-world systems — dashboards, control panels, real-time telemetry."
        },
        {
          icon: "◎",
          title: "Backend systems",
          desc: "APIs and services that process, decide, and respond — from REST endpoints to real-time communication."
        },
        {
          icon: "◈",
          title: "Embedded systems",
          desc: "ESP32, Arduino, servo control, sensor integration. Hardware that talks to software."
        },
        {
          icon: "⬟",
          title: "Automation tools",
          desc: "Python utilities and scripts that turn hours of manual work into seconds. Desktop apps that real people use daily."
        }
      ]
    },
    work: {
      label: "Selected work",
      title: "Things I've built",
      featuredBadge: "Featured project",
      featured: {
        title: "File Reconciliation Tool",
        desc: "A professional desktop application that reconciles hundreds of invoices and reports against a master Excel — in under two seconds. Built for a real user, solving a real problem, saving real money.",
        metrics: [
          { value: "$230", label: "saved per week" },
          { value: "<2s", label: "processing time" },
          { value: "1000+", label: "files handled" }
        ],
        steps: [
          {
            num: 1,
            title: "The problem",
            desc: "My father manually reviewed 600–1,000 invoices against a master Excel, checking each file by hand to find what was missing. This took hours every week — time that cost real money for the business."
          },
          {
            num: 2,
            title: "The build",
            desc: "I built a Python desktop app that reads a directory, compares filenames against the master Excel, and generates a detailed report: found, missing, and extra files. Then iterated it into a professional product — installer, auto-updater, license system, and a settings panel."
          },
          {
            num: 3,
            title: "The result",
            desc: "A task that took hours now runs in under two seconds. The app is in daily use by real users in a real business context. Not a demo. Not a tutorial project. A tool that works."
          }
        ],
        quote: "Before this, I spent whole afternoons cross-referencing files manually. Now I run it once and I'm done.",
        quoteAttr: "— The user. Also happens to be my dad.",
        tech: ["Python", "Tkinter / CustomTkinter", "openpyxl", "PyInstaller", "License system", "Auto-updater"]
      },
      tags: {
        hw: "Hardware · Web",
        robotics: "Robotics · Embedded",
        testing: "Testing · IoT",
        saas: "SaaS · Full-stack"
      }
    },
    about: {
      label: "About",
      title: "From wanting to build Iron Man's suit<br>to building things that actually work.",
      p1: "It started, honestly, with a YouTube video of an exoskeleton that used pneumatic cylinders. I was already watching Iron Man at the time, and my immediate thought was: <em>what if I built that — but better?</em> I started sketching in notebooks, learning about pneumatics, hydraulic artificial muscles, McKibben actuators. I didn't have components or a workshop. I had a laptop, an internet connection, and a problem I wanted to solve.",
      p2: "That year of chasing an impossible project taught me more than any curriculum. I took an electronics course. I learned embedded systems. I built a robotic gripper for my school's interdisciplinary project — all electronics enclosed inside the housing, custom soldered board, servo-actuated four-bar linkage. It worked during the presentation. More importantly, it stayed within budget. That's when I understood: constraints aren't the enemy of creativity. They're the point.",
      p3: "The self-balancing robot that won second place at the science fair, the hackathon where I was the only participant to integrate real embedded hardware with AI-based browser testing, the two iterations of a full-stack project management platform I built over two school years learning Next.js, Supabase, and TipTap from scratch — each one started as something that sounded almost impossible. That's still how I pick what to build.",
      p4: "Currently I work at the intersection of web development, embedded systems, and automation. Not because I planned a career path, but because those are the tools that let me build what I actually want to build."
    },
    stack: {
      label: "Technical stack",
      title: "Tools I work with",
      groups: [
        {
          label: "Frontend",
          items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS"]
        },
        {
          label: "Backend",
          items: ["Node.js", "Python", "Express", "Flask", "Supabase", "MySQL", "SQLite"]
        },
        {
          label: "Embedded & Robotics",
          items: ["ESP32", "Arduino", "C / C++", "FreeRTOS", "PID control", "SSE", "I²C / SPI", "Servo control", "3D printing"]
        }
      ]
    },
    contact: {
      label: "Contact",
      title: "Let's work together.",
      desc: "If you're building something that involves real-world systems — hardware, software, or both — I want to hear about it.",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent!",
        error: "Error sending message"
      }
    },
    footer: {
      copy: "© 2025 Carlos Osorio"
    },
    modal: {
      close: "Close",
      highlights: "Highlights",
      impact: "Impact",
      technologies: "Technologies"
    },
    cv: {
      title: "Download CV",
      desc: "Choose your preferred language.",
      en: "English version",
      es: "Spanish version"
    }
  },
  es: {
    nav: {
      work: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
      logo: "Carlos Osorio"
    },
    hero: {
      eyebrow: "Disponible para proyectos",
      title: "Construyo sistemas<br>que funcionan en el mundo real.",
      sub: "Desarrollador full-stack y constructor de sistemas embebidos. De interfaces web a controladores ESP32 — conecto software con realidad física.",
      ctaPrimary: "Ver mi trabajo",
      ctaUpwork: "Contratar en Upwork",
      ctaContact: "Hablemos"
    },
    capabilities: {
      label: "Capacidades",
      title: "Lo que construyo",
      items: [
        {
          icon: "⬡",
          title: "Interfaces interactivas",
          desc: "UIs web que controlan sistemas del mundo real — dashboards, paneles de control, telemetría en tiempo real."
        },
        {
          icon: "◎",
          title: "Sistemas backend",
          desc: "APIs y servicios que procesan, deciden y responden — desde endpoints REST hasta comunicación en tiempo real."
        },
        {
          icon: "◈",
          title: "Sistemas embebidos",
          desc: "ESP32, Arduino, control de servos, integración de sensores. Hardware que habla con software."
        },
        {
          icon: "⬟",
          title: "Herramientas de automatización",
          desc: "Utilidades en Python que convierten horas de trabajo manual en segundos. Apps de escritorio que usuarios reales usan a diario."
        }
      ]
    },
    work: {
      label: "Trabajo seleccionado",
      title: "Cosas que he construido",
      featuredBadge: "Proyecto destacado",
      featured: {
        title: "Herramienta de Conciliación de Archivos",
        desc: "Aplicación de escritorio profesional que concilia cientos de facturas e informes contra un Excel maestro — en menos de dos segundos. Construida para un usuario real, resolviendo un problema real, ahorrando dinero real.",
        metrics: [
          { value: "$230", label: "ahorrados por semana" },
          { value: "<2s", label: "tiempo de procesamiento" },
          { value: "1000+", label: "archivos procesados" }
        ],
        steps: [
          {
            num: 1,
            title: "El problema",
            desc: "Mi papá revisaba manualmente 600 a 1,000 facturas contra un Excel maestro, archivo por archivo. Esto tomaba horas semanales — tiempo que le costaba dinero real al negocio."
          },
          {
            num: 2,
            title: "La construcción",
            desc: "Construí una app de escritorio en Python que lee un directorio, compara nombres de archivo contra el Excel maestro y genera un reporte: encontrados, faltantes y sobrantes. Lo iteré hasta convertirlo en producto profesional — instalador, actualizador automático y sistema de licencias."
          },
          {
            num: 3,
            title: "El resultado",
            desc: "Una tarea que tomaba horas ahora corre en menos de dos segundos. En uso diario por usuarios reales en un contexto de negocio real. No es una demo. Es una herramienta que funciona."
          }
        ],
        quote: "Antes pasaba tardes enteras revisando archivos manualmente. Ahora lo corro una vez y listo.",
        quoteAttr: "— El usuario. También es mi papá.",
        tech: ["Python", "Tkinter / CustomTkinter", "openpyxl", "PyInstaller", "License system", "Auto-updater"]
      },
      tags: {
        hw: "Hardware · Web",
        robotics: "Robótica · Embebido",
        testing: "Testing · IoT",
        saas: "SaaS · Full-stack"
      }
    },
    about: {
      label: "Sobre mí",
      title: "De querer construir la armadura de Iron Man<br>a construir cosas que de verdad funcionan.",
      p1: "Empezó, honestamente, con un video de YouTube de un exoesqueleto con cilindros neumáticos. Estaba viendo Iron Man en ese momento, y mi primer pensamiento fue: <em>¿y si lo construyo yo — pero mejor?</em> Empecé a hacer bocetos en libretas, a aprender sobre neumática, músculos artificiales hidráulicos, actuadores McKibben. No tenía componentes ni taller. Tenía una laptop, internet y un problema que quería resolver.",
      p2: "Ese año persiguiendo un proyecto imposible me enseñó más que cualquier currículo. Tomé un curso de electrónica. Aprendió sistemas embebidos. Construí una garra robótica para el proyecto interdisciplinario de la escuela — toda la electrónica encapsulada dentro, placa soldada a mano, mecanismo de cuatro barras. Funcionó en la presentación. Más importante: estuvo dentro del presupuesto.",
      p3: "El robot autobalanceado que ganó segundo lugar en la feria de ciencias, el hackathon donde fui el único participante que integró hardware embebido real con testing por IA, las dos iteraciones de una plataforma full-stack que construí en dos años de escuela — cada uno empezó como algo que sonaba casi imposible. Así es como todavía elijo qué construir.",
      p4: "Actualmente trabajo en la intersección del desarrollo web, los sistemas embebidos y la automatización. No porque haya planeado una trayectoria profesional, sino porque esas son las herramientas que me permiten construir lo que realmente quiero construir."
    },
    stack: {
      label: "Stack técnico",
      title: "Herramientas con las que trabajo",
      groups: [
        {
          label: "Frontend",
          items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS"]
        },
        {
          label: "Backend",
          items: ["Node.js", "Python", "Express", "Flask", "Supabase", "MySQL", "SQLite"]
        },
        {
          label: "Embebido y robótica",
          items: ["ESP32", "Arduino", "C / C++", "FreeRTOS", "PID control", "SSE", "I²C / SPI", "Control de servos", "Impresión 3D"]
        }
      ]
    },
    contact: {
      label: "Contacto",
      title: "Trabajemos juntos.",
      desc: "Si estás construyendo algo que involucra sistemas del mundo real — hardware, software, o ambos — me interesa escucharlo.",
      form: {
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        submit: "Enviar mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado!",
        error: "Error al enviar el mensaje"
      }
    },
    footer: {
      copy: "© 2025 Carlos Osorio"
    },
    modal: {
      close: "Cerrar",
      highlights: "Características",
      impact: "Impacto",
      technologies: "Tecnologías"
    },
    cv: {
      title: "Descargar CV",
      desc: "Elige tu idioma preferido.",
      en: "Versión en inglés",
      es: "Versión en español"
    }
  }
} as const;

export const projectData: Record<string, ProjectTranslation> = {
  'khymera-dashboard': {
    tag: { en: 'Hardware · Web', es: 'Hardware · Web' },
    title: { en: 'Khymera Dashboard', es: 'Khymera Dashboard' },
    desc: {
      en: 'A real-time control and telemetry interface for physical robotic hardware. The user sends commands through a web dashboard; the ESP32 responds with live sensor data.',
      es: 'Interfaz de control y telemetría en tiempo real para hardware robótico. El usuario envía comandos desde un dashboard web; el ESP32 responde con datos del sensor en vivo.'
    },
    features: {
      en: ['Live sensor monitoring via SSE', 'Servo actuator control over HTTP', 'AI-assisted command execution', 'Voice interaction layer'],
      es: ['Monitoreo de sensores en vivo via SSE', 'Control de servos por HTTP', 'Ejecución de comandos asistida por IA', 'Interacción por voz']
    },
    impact: {
      en: 'A direct bridge between a browser interface and a physical robotic system — no intermediate servers, no unnecessary latency.',
      es: 'Un puente directo entre una interfaz web y un sistema robótico físico — sin servidores intermedios, sin latencia innecesaria.'
    },
    tech: ['Next.js', 'SSE', 'ESP32', 'HTTP', 'Voice API', 'AI']
  },
  'khymera-gripper': {
    tag: { en: 'Robotics · Embedded', es: 'Robótica · Embebido' },
    title: { en: 'Khymera — Robotic Gripper', es: 'Khymera — Garra Robótica' },
    desc: {
      en: 'A modular robotic gripper designed as a low-cost prosthetic base. All electronics enclosed inside the 3D-printed housing. No protoboard — custom soldered perfboard for power distribution.',
      es: 'Una garra robótica modular diseñada como base de prótesis de bajo costo. Toda la electrónica encapsulada dentro de la carcasa impresa en 3D. Sin protoboard — placa perforada soldada a mano.'
    },
    features: {
      en: ['3D-printed PLA + TPU structure', 'Four-bar linkage mechanism', 'Servo-actuated with embedded ESP32 control', 'Custom soldered power board'],
      es: ['Estructura impresa en 3D (PLA + TPU)', 'Mecanismo de cuatro barras', 'Servos actuados con control ESP32 embebido', 'Placa de alimentación soldada a mano']
    },
    impact: {
      en: 'Demonstrated that a functional robotic actuation base for a prosthetic is achievable within a tight student budget. Presented and working at the school interdisciplinary final.',
      es: 'Demostró que una base de actuación robótica funcional es viable con un presupuesto de estudiante. Funcionó en la presentación final interdisciplinaria.'
    },
    tech: ['ESP32', 'C++', '3D Printing', 'Servo control', 'Four-bar linkage']
  },
  'getapro': {
    tag: { en: 'SaaS · Full-stack', es: 'SaaS · Full-stack' },
    title: { en: 'GETAPRO', es: 'GETAPRO' },
    desc: {
      en: 'A project management platform built for academic and engineering teams. Role-aware workspaces, structured research chapters, Notion-style editing per section. Built twice — the second time knowing what I was building.',
      es: 'Plataforma de gestión de proyectos para equipos académicos e ingeniería. Espacios con roles, capítulos de investigación estructurados, edición tipo Notion. Construida dos veces — la segunda vez sabiendo lo que construía.'
    },
    features: {
      en: ['Role-based project spaces (student / advisor)', 'Structured chapter editor (TipTap)', 'Google auth + email/password login', 'AI assistant with project context access'],
      es: ['Espacios con roles (alumno / asesor)', 'Editor de capítulos estructurado (TipTap)', 'Auth con Google + email/contraseña', 'Asistente IA con acceso al contexto del proyecto']
    },
    impact: {
      en: 'Reduced tool fragmentation for students doing interdisciplinary projects. Built twice: first as a React app in grade 9, then rebuilt from scratch with Next.js, Supabase, and proper auth in grade 10.',
      es: 'Reduce la fragmentación de herramientas para estudiantes en proyectos interdisciplinarios. Construida dos veces: primero en React en 3°, luego reescrita con Next.js, Supabase y auth real en 4°.'
    },
    tech: ['Next.js', 'React', 'Supabase', 'TipTap', 'TypeScript', 'Tailwind CSS']
  },
  'jevil': {
    tag: { en: 'Testing · IoT', es: 'Testing · IoT' },
    title: { en: 'Jevil — IoT Test System', es: 'Jevil — Sistema de Testing IoT' },
    desc: {
      en: 'An AI-powered testing system for IoT applications, built for a Hashnode hackathon. Combines Playwright browser automation with a software ESP32 simulator that emulates five different device states.',
      es: 'Sistema de testing con IA para aplicaciones IoT, construido para un hackathon de Hashnode. Combina automatización con Playwright y un simulador de ESP32 con cinco modos de operación.'
    },
    features: {
      en: ['ESP32 software simulator with 5 modes', 'Mode 4: malicious device (XSS injection via sensor)', 'AI-based semantic event detection (no CSS selectors needed)', 'Found real bugs in my own production dashboard'],
      es: ['Simulador de ESP32 con 5 modos', 'Modo 4: dispositivo malicioso (inyección XSS via sensor)', 'Detección de eventos semántica con IA', 'Encontró errores reales en mi propio dashboard de producción']
    },
    impact: {
      en: 'The only hackathon entry that integrated real embedded hardware simulation with AI-based browser testing. Found actual vulnerabilities — and was the most unique technical approach in the event.',
      es: 'Única propuesta en el hackathon que integró simulación de hardware embebido con testing por IA. Encontró vulnerabilidades reales y fue el enfoque técnico más único del evento.'
    },
    tech: ['Playwright', 'AI / Passmark', 'Node.js', 'ESP32 simulation', 'SSE']
  }
};
