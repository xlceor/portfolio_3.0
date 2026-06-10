export type Locale = "es" | "en";

export const translations = {
  en: {
    nav: {
      work: "Work",
      stack: "Stack",
      contact: "Contact",
    },
    role: "Systems Builder — Software, Embedded & Robotics",
    heroLead:
      "I build systems that connect software with the physical world — turning human intention into real, measurable action.",
    heroSecondary:
      "What started as web development evolved into full-stack architectures that go beyond screens: systems that sense, decide, and act through hardware, real-time communication, and intelligent control.",
    introCtaProjects: "Selected work",
    introCtaConnect: "Connect",
    whatIDoTitle: "What I do",
    whatIDo: [
      "Design interactive interfaces that control real-world systems",
      "Build intelligent backends that process, decide, and respond in real time",
      "Develop embedded control systems for sensors and actuators",
      "Prototype robotic and electromechanical solutions",
    ],
    workTitle: "Selected work",
    stackTitle: "Technical focus",
    stackSubtitle:
      "Rather than isolated skills, I work across layers — frontend, backend, and embedded.",
    stacks: [
      {
        title: "Frontend & interfaces",
        items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      },
      {
        title: "Backend & logic",
        items: ["Python", "Flask", "Firebase", "TypeScript", "Node.js"],
      },
      {
        title: "Embedded & systems",
        items: [
          "ESP32",
          "Microcontrollers",
          "Real-time communication",
          "Sensor integration",
          "Actuator control",
        ],
      },
    ],
    directionTitle: "Direction",
    direction:
      "I'm particularly interested in systems where software directly interacts with the physical world — robotics, assistive technology, and human-machine interfaces.",
    connectTitle: "Let's connect",
    connectLead:
      "If you're working on something that involves real-world systems — hardware, software, or both — I'm interested.",
    contactTitle: "Message",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    messagePlaceholder: "Your message",
    sendButton: "Send",
    sentButton: "Sent — thanks for reaching out.",
    socialUpwork: "Upwork",
    socialLinkedIn: "LinkedIn",
    socialInstagram: "Instagram",
    themeLight: "Light",
    themeDark: "Dark",
    themeAuto: "System",
    openProjectAria: "View details:",
    footer: "Carlos Osorio",
    modal: {
      close: "Close",
      highlights: "Highlights",
      impact: "Impact",
      tech: "Technologies",
    },
  },
  es: {
    nav: {
      work: "Proyectos",
      stack: "Stack",
      contact: "Contacto",
    },
    role: "Constructor de sistemas — Software, embebidos y robótica",
    heroLead:
      "Construyo sistemas que unen software con el mundo físico: de la intención humana a la acción medible.",
    heroSecondary:
      "Lo que empezó como desarrollo web se volvió arquitectura full-stack más allá de la pantalla: sistemas que perciben, deciden y actúan mediante hardware, comunicación en tiempo real y control inteligente.",
    introCtaProjects: "Trabajos destacados",
    introCtaConnect: "Conectar",
    whatIDoTitle: "Qué hago",
    whatIDo: [
      "Diseño interfaces interactivas que controlan sistemas reales",
      "Implemento backends que procesan, deciden y responden en tiempo real",
      "Desarrollo control embebido para sensores y actuadores",
      "Prototipo soluciones robóticas y electromecánicas",
    ],
    workTitle: "Trabajos destacados",
    stackTitle: "Enfoque técnico",
    stackSubtitle:
      "Trabajo entre capas — frontend, backend y sistemas embebidos — en lugar de habilidades aisladas.",
    stacks: [
      {
        title: "Frontend e interfaces",
        items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
      },
      {
        title: "Backend y lógica",
        items: ["Python", "Flask", "Firebase", "TypeScript", "Node.js"],
      },
      {
        title: "Embebidos y sistemas",
        items: [
          "ESP32",
          "Microcontroladores",
          "Comunicación en tiempo real",
          "Integración de sensores",
          "Control de actuadores",
        ],
      },
    ],
    directionTitle: "Línea de trabajo",
    direction:
      "Me interesan los sistemas donde el software interactúa con el mundo físico: robótica, tecnología asistiva e interfaces hombre-máquina.",
    connectTitle: "Conectemos",
    connectLead:
      "Si estás trabajando en algo con sistemas del mundo real — hardware, software o ambos — me interesa conversar.",
    contactTitle: "Mensaje",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo",
    messagePlaceholder: "Tu mensaje",
    sendButton: "Enviar",
    sentButton: "Enviado — gracias por escribir.",
    socialUpwork: "Upwork",
    socialLinkedIn: "LinkedIn",
    socialInstagram: "Instagram",
    themeLight: "Claro",
    themeDark: "Oscuro",
    themeAuto: "Sistema",
    openProjectAria: "Ver detalle:",
    footer: "Carlos Osorio",
    modal: {
      close: "Cerrar",
      highlights: "Destacados",
      impact: "Impacto",
      tech: "Tecnologías",
    },
  },
} as const;
