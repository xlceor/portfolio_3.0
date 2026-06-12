"use client";



interface CardProps {
  tag: string;
  title: string;
  desc: string;
  techs: string[];
  onClick: () => void;
}

export default function Card({ tag, title, desc, techs, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-[#E5E7EB] rounded-[10px] p-[22px] cursor-pointer transition-all duration-200 hover:border-[#0D9488] hover:shadow-[0_2px_12px_rgba(13,148,136,0.08)] flex flex-col"
    >
      <div className="text-[0.7rem] font-semibold tracking-[0.05em] uppercase text-[#9CA3AF] mb-3">
        {tag}
      </div>
      <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-[#0A0A0A] mb-2">
        {title}
      </h3>
      <p className="text-[0.85rem] text-[#6B7280] leading-[1.6] flex-1">
        {desc}
      </p>
      <div className="flex flex-wrap gap-[6px] mt-4 pt-4 border-t border-[#E5E7EB]">
        {techs.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
