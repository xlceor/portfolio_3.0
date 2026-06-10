import Image from "next/image";
import { useEffect } from "react";
import type { Project } from "./types";

const PLACEHOLDER = "/project-placeholder.svg";

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
  function exit() {
    setShowModal(false);
    setModal(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setShowModal, setModal]);

  const { name, imagePath, content, technologies, keyFeatures, impact } =
    project;
  const src = imagePath ?? PLACEHOLDER;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={exit}
    >
      <div
        className="relative max-h-[85dvh] w-full max-w-3xl overflow-y-auto rounded border border-[var(--surface-border)] bg-[var(--bg-elevated)] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          type="button"
          onClick={exit}
          className="absolute right-6 top-6 text-sm text-[var(--muted)] hover:text-white transition-colors"
        >
          {copy.close}
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative aspect-video w-full md:w-64 shrink-0 overflow-hidden rounded border border-[var(--surface-border)] bg-[var(--surface)]">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover"
              unoptimized={src.endsWith(".svg")}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 id="project-modal-title" className="text-2xl font-semibold text-white pr-12">
              {name}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
              {content}
            </p>

            {keyFeatures && keyFeatures.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
                  {copy.highlights}
                </h3>
                <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-[var(--muted)]">
                  {keyFeatures.map((feature: string, i: number) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {impact && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
                  {copy.impact}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {impact}
                </p>
              </div>
            )}

            {technologies && technologies.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
                  {copy.tech}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
