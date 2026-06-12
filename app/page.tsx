"use client";

import { useState, useEffect } from "react";
import { translations, projectData } from "./site-content";
import { Locale, ProjectTranslation } from "./types";
import Card from "./card";
import Modal from "./modal";
import emailjs from "@emailjs/browser";

export default function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [activeProjectKey, setActiveProjectKey] = useState<string | null>(null);
  
  // Terminal easter egg state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "khymera_core v45.2 initialized.",
    "embedded link: active",
    'type "help" for commands',
  ]);

  // Contact form state
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const t = translations[locale];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Create a form element dynamically or use EmailJS directly with template variables.
      // Since EmailJS often prefers a form element or object parameters, we send the template parameters.
      // For now we simulate EmailJS or allow configuration via environment variables:
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key";

      if (publicKey && publicKey !== "public_key" && serviceId !== "service_id") {
        await emailjs.send(
          serviceId,
          templateId,
          {
            user_name: formData.user_name,
            user_email: formData.user_email,
            message: formData.message,
          },
          publicKey
        );
      } else {
        // Fallback simulation for local/demo usage so it succeeds immediately with a toast
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setFormStatus("success");
      showToast(t.contact.form.success, "success");
      setFormData({ user_name: "", user_email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setFormStatus("error");
      showToast(t.contact.form.error, "error");
    } finally {
      // Revert status to idle after some time
      setTimeout(() => setFormStatus("idle"), 2000);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.toLowerCase().trim();
    if (!cmd) return;

    const ts = new Date().toTimeString().slice(0, 8);
    let response = "";

    if (cmd === "help") {
      response = "commands: system, stack, clear";
    } else if (cmd === "system") {
      response = "os: portfolio v2.0 | mode: clean";
    } else if (cmd === "stack") {
      response = "next.js · python · esp32 · c++ · tailwind";
    } else if (cmd === "clear" || cmd === "cls") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    } else {
      response = `unknown: "${cmd}" — try "help"`;
    }

    setTerminalLogs((prev) => [`[${ts}] ${response}`, `› ${terminalInput}`, ...prev]);
    setTerminalInput("");
  };

  const activeProject = activeProjectKey ? projectData[activeProjectKey] : null;

  return (
    <div className="flex-1 flex flex-col">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-100 bg-[rgba(249,250,251,0.85)] backdrop-blur-[12px] border-b border-[#E5E7EB] h-[60px]">
        <div className="max-w-[780px] mx-auto px-6 h-full flex items-center justify-between">
          <button
            className="text-[0.95rem] font-semibold text-[#0A0A0A] bg-none border-none cursor-pointer font-sans"
            onClick={() => scrollTo("hero")}
          >
            {t.nav.logo}
          </button>
          
          <div className="hidden sm:flex items-center gap-1">
            <button
              className="text-[0.875rem] font-normal text-[#6B7280] bg-none border-none cursor-pointer font-sans px-[10px] py-[6px] rounded-[6px] transition-all hover:text-[#0A0A0A] hover:bg-[#E5E7EB]"
              onClick={() => scrollTo("projects")}
            >
              {t.nav.work}
            </button>
            <button
              className="text-[0.875rem] font-normal text-[#6B7280] bg-none border-none cursor-pointer font-sans px-[10px] py-[6px] rounded-[6px] transition-all hover:text-[#0A0A0A] hover:bg-[#E5E7EB]"
              onClick={() => scrollTo("about")}
            >
              {t.nav.about}
            </button>
            <button
              className="text-[0.875rem] font-normal text-[#6B7280] bg-none border-none cursor-pointer font-sans px-[10px] py-[6px] rounded-[6px] transition-all hover:text-[#0A0A0A] hover:bg-[#E5E7EB]"
              onClick={() => scrollTo("contact")}
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex border border-[#E5E7EB] rounded-[6px] overflow-hidden">
              <button
                className={`font-mono text-[0.7rem] font-medium px-[10px] py-[5px] bg-none border-none cursor-pointer transition-all ${
                  locale === "en" ? "bg-[#0A0A0A] text-white" : "text-[#6B7280]"
                }`}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
              <button
                className={`font-mono text-[0.7rem] font-medium px-[10px] py-[5px] bg-none border-none cursor-pointer transition-all ${
                  locale === "es" ? "bg-[#0A0A0A] text-white" : "text-[#6B7280]"
                }`}
                onClick={() => setLocale("es")}
              >
                ES
              </button>
            </div>
            
            <button
              className="text-[0.85rem] font-medium px-4 py-[7px] bg-white border border-[#E5E7EB] rounded-[6px] cursor-pointer text-[#374151] font-sans transition-all hover:border-[#0D9488] hover:text-[#0D9488]"
              onClick={() => setCvModalOpen(true)}
            >
              CV
            </button>
            
            <button
              className="sm:hidden bg-none border border-[#E5E7EB] rounded-[6px] px-[10px] py-[6px] cursor-pointer text-[#374151] text-[0.8rem] font-sans"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[60px] left-0 right-0 z-99 bg-white border-b border-[#E5E7EB] px-6 py-3 flex flex-col gap-1 sm:hidden">
          <button
            className="text-[0.875rem] font-normal text-[#6B7280] bg-none border-none cursor-pointer font-sans px-[10px] py-[6px] rounded-[6px] text-left w-full transition-all hover:text-[#0A0A0A] hover:bg-[#E5E7EB]"
            onClick={() => {
              scrollTo("projects");
              setMobileMenuOpen(false);
            }}
          >
            {t.nav.work}
          </button>
          <button
            className="text-[0.875rem] font-normal text-[#6B7280] bg-none border-none cursor-pointer font-sans px-[10px] py-[6px] rounded-[6px] text-left w-full transition-all hover:text-[#0A0A0A] hover:bg-[#E5E7EB]"
            onClick={() => {
              scrollTo("about");
              setMobileMenuOpen(false);
            }}
          >
            {t.nav.about}
          </button>
          <button
            className="text-[0.875rem] font-normal text-[#6B7280] bg-none border-none cursor-pointer font-sans px-[10px] py-[6px] rounded-[6px] text-left w-full transition-all hover:text-[#0A0A0A] hover:bg-[#E5E7EB]"
            onClick={() => {
              scrollTo("contact");
              setMobileMenuOpen(false);
            }}
          >
            {t.nav.contact}
          </button>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="pt-[120px] pb-20 hero" id="hero">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-[#0D9488] tracking-[0.04em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse-eyebrow"></span>
            <span>{t.hero.eyebrow}</span>
          </div>
          <h1
            className="text-[clamp(2.4rem,6vw,3.6rem)] font-semibold tracking-[-0.03em] leading-[1.1] mb-5 text-[#0A0A0A]"
            dangerouslySetInnerHTML={{ __html: t.hero.title }}
          />
          <p className="text-[1.1rem] text-[#6B7280] leading-[1.75] mb-9 max-w-[520px]">
            {t.hero.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="text-[0.9rem] font-medium px-[22px] py-2.5 bg-[#0A0A0A] text-white border-none rounded-[6px] cursor-pointer font-sans transition-all hover:opacity-85"
              onClick={() => scrollTo("projects")}
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              className="text-[0.9rem] font-medium px-[22px] py-2.5 bg-white text-[#374151] border border-[#E5E7EB] rounded-[6px] cursor-pointer font-sans transition-all hover:border-[#0D9488] hover:text-[#0D9488]"
              onClick={() => window.open("https://www.upwork.com/freelancers/~01093075254cf375b0", "_blank")}
            >
              {t.hero.ctaUpwork}
            </button>
            <button
              className="text-[0.9rem] font-medium px-[22px] py-2.5 bg-white text-[#374151] border border-[#E5E7EB] rounded-[6px] cursor-pointer font-sans transition-all hover:border-[#0D9488] hover:text-[#0D9488]"
              onClick={() => scrollTo("contact")}
            >
              {t.hero.ctaContact}
            </button>
          </div>
        </div>
      </section>

      {/* ── What I do ── */}
      <section className="py-24 border-t border-[#E5E7EB]" id="what-i-do">
        <div className="max-w-[780px] mx-auto px-6">
          <p className="section-label mb-3">{t.capabilities.label}</p>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-[#0A0A0A]">
            {t.capabilities.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-[#E5E7EB] border border-[#E5E7EB] rounded-[16px] overflow-hidden mt-12">
            {t.capabilities.items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-7 transition-colors duration-150 hover:bg-[#FAFFFE]"
              >
                <div className="text-[1.25rem] mb-3.5 text-[#0A0A0A]">{item.icon}</div>
                <div className="text-[0.95rem] font-semibold mb-2 text-[#0A0A0A]">
                  {item.title}
                </div>
                <p className="text-[0.875rem] text-[#6B7280] leading-[1.6]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="py-24 border-t border-[#E5E7EB]" id="projects">
        <div className="max-w-[780px] mx-auto px-6">
          <p className="section-label mb-3">{t.work.label}</p>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-[#0A0A0A] mb-12">
            {t.work.title}
          </h2>

          {/* Featured Project */}
          <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden">
            <div className="p-8 pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="inline-block text-[0.7rem] font-semibold tracking-[0.06em] uppercase text-[#059669] bg-[#ECFDF5] border border-[#CCFBF1] px-2.5 py-1 rounded-full whitespace-nowrap">
                  {t.work.featuredBadge}
                </span>
                <h3 className="text-[1.35rem] font-semibold mt-3 mb-2 text-[#0A0A0A]">
                  {t.work.featured.title}
                </h3>
                <p className="text-[0.95rem] text-[#6B7280] max-w-[540px] leading-[1.7]">
                  {t.work.featured.desc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-b border-[#E5E7EB] mt-7">
              {t.work.featured.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-6 border-r border-[#E5E7EB] last:border-r-0 text-center flex flex-col items-center justify-center"
                >
                  <div className="font-mono text-[1.8rem] font-medium text-[#0A0A0A] tracking-[-0.02em]">
                    {metric.value.includes("$") ? (
                      <>
                        <span className="text-[#0D9488]">$</span>
                        {metric.value.replace("$", "")}
                      </>
                    ) : metric.value.includes("<") ? (
                      <>
                        &lt;
                        <span className="text-[#0D9488]">{metric.value.replace("<", "").replace("s", "")}</span>
                        s
                      </>
                    ) : metric.value.includes("+") ? (
                      <>
                        {metric.value.replace("+", "")}
                        <span className="text-[#0D9488]">+</span>
                      </>
                    ) : (
                      metric.value
                    )}
                  </div>
                  <div className="text-[0.75rem] text-[#6B7280] mt-1">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="p-8">
              {t.work.featured.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 mb-6 last:mb-0 items-start">
                  <div className="w-[26px] h-[26px] rounded-full bg-[#F0FDFA] text-[#0D9488] text-[0.75rem] font-semibold flex-shrink-0 flex items-center justify-center mt-0.5">
                    {step.num}
                  </div>
                  <div className="font-sans">
                    <h4 className="text-[0.9rem] font-semibold text-[#0A0A0A] mb-1">{step.title}</h4>
                    <p className="text-[0.875rem] text-[#6B7280] leading-[1.6]">{step.desc}</p>
                  </div>
                </div>
              ))}

              <blockquote className="bg-[#F0FDFA] border-l-3 border-[#0D9488] rounded-r-[6px] p-5 mt-6">
                <p className="text-[0.9rem] italic text-[#374151] leading-[1.6]">
                  &quot;{t.work.featured.quote}&quot;
                </p>
                <cite className="text-[0.8rem] text-[#6B7280] not-italic mt-1.5 block">
                  {t.work.featured.quoteAttr}
                </cite>
              </blockquote>

              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#E5E7EB]">
                {t.work.featured.tech.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Grid of other projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Card
              tag={t.work.tags.hw}
              title={projectData["khymera-dashboard"].title[locale]}
              desc={projectData["khymera-dashboard"].desc[locale]}
              techs={projectData["khymera-dashboard"].tech}
              onClick={() => setActiveProjectKey("khymera-dashboard")}
            />
            <Card
              tag={t.work.tags.robotics}
              title={projectData["khymera-gripper"].title[locale]}
              desc={projectData["khymera-gripper"].desc[locale]}
              techs={projectData["khymera-gripper"].tech}
              onClick={() => setActiveProjectKey("khymera-gripper")}
            />
            <Card
              tag={t.work.tags.saas}
              title={projectData["getapro"].title[locale]}
              desc={projectData["getapro"].desc[locale]}
              techs={projectData["getapro"].tech}
              onClick={() => setActiveProjectKey("getapro")}
            />
            <Card
              tag={t.work.tags.testing}
              title={projectData["jevil"].title[locale]}
              desc={projectData["jevil"].desc[locale]}
              techs={projectData["jevil"].tech}
              onClick={() => setActiveProjectKey("jevil")}
            />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-24 border-t border-[#E5E7EB]" id="about">
        <div className="max-w-[780px] mx-auto px-6">
          <p className="section-label mb-3">{t.about.label}</p>
          <h2
            className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-[#0A0A0A] mb-8"
            dangerouslySetInnerHTML={{ __html: t.about.title }}
          />
          <div className="font-sans text-[0.975rem] text-[#374151] leading-[1.75] flex flex-col gap-5">
            <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p3 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p4 }} />
          </div>
          <div className="flex flex-wrap gap-2.5 mt-8">
            <a
              href="https://github.com/xlceor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.85rem] font-medium text-[#374151] border border-[#E5E7EB] rounded-[6px] px-3.5 py-1.5 transition-all hover:border-[#0D9488] hover:text-[#0D9488] hover:no-underline"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/xlceor/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.85rem] font-medium text-[#374151] border border-[#E5E7EB] rounded-[6px] px-3.5 py-1.5 transition-all hover:border-[#0D9488] hover:text-[#0D9488] hover:no-underline"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01093075254cf375b0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.85rem] font-medium text-[#374151] border border-[#E5E7EB] rounded-[6px] px-3.5 py-1.5 transition-all hover:border-[#0D9488] hover:text-[#0D9488] hover:no-underline"
            >
              Upwork ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="py-24 border-t border-[#E5E7EB]" id="stack">
        <div className="max-w-[780px] mx-auto px-6">
          <p className="section-label mb-3">{t.stack.label}</p>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-[#0A0A0A] mb-12">
            {t.stack.title}
          </h2>
          <div className="flex flex-col gap-5 mt-12">
            {t.stack.groups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <div className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-[#6B7280] mb-3">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="text-[0.8rem] font-normal text-[#374151] bg-white border border-[#E5E7EB] rounded-[6px] px-3 py-1 transition-all duration-150 hover:border-[#0D9488] hover:text-[#0D9488] cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-24 border-t border-[#E5E7EB]" id="contact">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="max-w-[540px]">
            <p className="section-label mb-3">{t.contact.label}</p>
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] leading-[1.2] text-[#0A0A0A] mb-3">
              {t.contact.title}
            </h2>
            <p className="text-[1rem] text-[#374151] leading-[1.75] mb-9">
              {t.contact.desc}
            </p>
            
            <form onSubmit={handleContactSubmit}>
              <div className="mb-4">
                <label className="block text-[0.8rem] font-medium text-[#374151] mb-1.5">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-[0.9rem] font-sans bg-white border border-[#E5E7EB] rounded-[6px] text-[#0A0A0A] outline-none transition-all duration-150 focus:border-[#0D9488] focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[0.8rem] font-medium text-[#374151] mb-1.5">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-[0.9rem] font-sans bg-white border border-[#E5E7EB] rounded-[6px] text-[#0A0A0A] outline-none transition-all duration-150 focus:border-[#0D9488] focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[0.8rem] font-medium text-[#374151] mb-1.5">
                  {t.contact.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-[0.9rem] font-sans bg-white border border-[#E5E7EB] rounded-[6px] text-[#0A0A0A] outline-none transition-all duration-150 focus:border-[#0D9488] focus:shadow-[0_0_0_3px_rgba(13,148,136,0.12)] resize-y min-h-[120px]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full mt-1 text-[0.9rem] font-medium px-[22px] py-2.5 bg-[#0A0A0A] text-white border-none rounded-[6px] cursor-pointer font-sans transition-all hover:opacity-85 disabled:opacity-50"
              >
                {formStatus === "sending" ? t.contact.form.sending : t.contact.form.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#E5E7EB] py-9 bg-white mt-auto">
        <div className="max-w-[780px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[0.8rem] text-[#9CA3AF]">{t.footer.copy}</span>
          <button
            className="font-mono text-[0.72rem] text-[#9CA3AF] cursor-pointer transition-colors bg-none border-none hover:text-[#0D9488]"
            onClick={() => setTerminalOpen(!terminalOpen)}
          >
            $ _
          </button>
          <div className="flex gap-4">
            <a
              href="https://github.com/xlceor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8rem] text-[#6B7280] transition-colors hover:text-[#0D9488]"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/carlos-osorio-a6967b2a6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8rem] text-[#6B7280] transition-colors hover:text-[#0D9488]"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/xlceor/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8rem] text-[#6B7280] transition-colors hover:text-[#0D9488]"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Terminal Easter Egg Panel */}
        {terminalOpen && (
          <div className="max-w-[780px] mx-auto px-6 mt-4">
            <div className="bg-[#0A0A0A] rounded-[10px] p-4 font-mono text-[0.75rem] text-[#6EE7B7] h-[160px] overflow-y-auto flex flex-col-reverse justify-end">
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
                <span className="text-[#0D9488]">›</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-[#F9FAFB] font-mono text-[0.75rem] flex-1"
                  placeholder='type "help"'
                  autoComplete="off"
                />
              </form>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[110px]">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-[1.5]">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </footer>

      {/* ── Project Details Modal ── */}
      <Modal isOpen={activeProjectKey !== null} onClose={() => setActiveProjectKey(null)}>
        {activeProject && (
          <>
            <div className="p-6 pb-0 flex justify-between items-start">
              <div>
                <div className="text-[0.7rem] font-semibold tracking-[0.06em] uppercase text-[#9CA3AF] mb-2">
                  {activeProject.tag[locale]}
                </div>
                <h3 className="text-[1.2rem] font-semibold text-[#0A0A0A] mb-2.5">
                  {activeProject.title[locale]}
                </h3>
              </div>
              <button
                className="bg-white border border-[#E5E7EB] rounded-[6px] px-2 py-1 cursor-pointer text-[#6B7280] text-[0.75rem] transition-all hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
                onClick={() => setActiveProjectKey(null)}
              >
                {t.modal.close}
              </button>
            </div>
            <div className="p-6 pt-5">
              <p className="text-[0.9rem] text-[#374151] leading-[1.7] mb-5">
                {activeProject.desc[locale]}
              </p>
              
              <div className="mb-5">
                <div className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-[#6B7280] mb-2.5">
                  {t.modal.highlights}
                </div>
                <ul className="list-none flex flex-col gap-1.5">
                  {activeProject.features[locale].map((feat, idx) => (
                    <li key={idx} className="text-[0.875rem] text-[#374151] flex gap-2 items-start">
                      <span className="text-[#0D9488] flex-shrink-0">–</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeProject.impact && activeProject.impact[locale] && (
                <div className="mb-5">
                  <div className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-[#6B7280] mb-2.5">
                    {t.modal.impact}
                  </div>
                  <div className="bg-[#ECFDF5] border border-[#CCFBF1] rounded-[6px] p-[14px_16px] text-[0.875rem] text-[#374151] leading-[1.6]">
                    {activeProject.impact[locale]}
                  </div>
                </div>
              )}

              <div className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-[#6B7280] mb-2.5">
                {t.modal.technologies}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tech.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* ── CV Downloader Modal ── */}
      <Modal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)}>
        <div className="p-8 text-center max-w-[360px] mx-auto">
          <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0A0A0A] mb-2">
            {t.cv.title}
          </h3>
          <p className="text-[0.875rem] text-[#6B7280] mb-6">
            {t.cv.desc}
          </p>
          <div className="flex flex-col gap-2.5">
            <a
              href="/CV_Ingles.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.9rem] font-medium px-[22px] py-2.5 bg-[#0A0A0A] text-white border-none rounded-[6px] cursor-pointer font-sans transition-all text-center block hover:opacity-85 hover:no-underline"
            >
              {t.cv.en}
            </a>
            <a
              href="/CV_Espanol.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.9rem] font-medium px-[22px] py-2.5 bg-white text-[#374151] border border-[#E5E7EB] rounded-[6px] cursor-pointer font-sans transition-all text-center block hover:border-[#0D9488] hover:text-[#0D9488] hover:no-underline"
            >
              {t.cv.es}
            </a>
          </div>
        </div>
      </Modal>

      {/* Toast notifications */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[300] text-[0.85rem] font-medium p-[12px_18px] rounded-[6px] border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] flex items-center gap-2 animate-[toastIn_0.2s_ease] ${
            toast.type === "success"
              ? "border-[#059669] text-[#059669]"
              : "border-[#DC2626] text-[#DC2626]"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
