import Image from "next/image";
import type { Project } from "./types";

const PLACEHOLDER = "/project-placeholder.svg";

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

  const open = () => {
    setModal(project);
    setShowModal(true);
  };

  return (
    <button
      type="button"
      aria-label={`${openDetailsLabel} ${name}`}
      className="group text-left w-full rounded border border-[var(--surface-border)] bg-[var(--surface)] overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      onClick={open}
    >
      <div className="relative aspect-video w-full bg-[var(--bg-elevated)]">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={src.endsWith(".svg")}
        />
      </div>
      <div className="px-5 py-5">
        <span className="block font-medium text-white group-hover:text-[var(--accent)] transition-colors">
          {name}
        </span>
        <span className="mt-2 block text-sm text-[var(--muted)]">
          {project.content.slice(0, 112)}
          {project.content.length > 112 ? "…" : ""}
        </span>
      </div>
    </button>
  );
}
