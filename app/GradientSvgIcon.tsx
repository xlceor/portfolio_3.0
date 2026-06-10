import type { IconType } from "react-icons";

export default function GradientSvgIcon({
  Icon,
  className = "h-11 w-11",
}: {
  Icon: IconType;
  className?: string;
}) {
  return (
    <Icon
      className={`${className} text-[var(--accent)] opacity-[0.92] transition-opacity hover:opacity-100`}
      aria-hidden
    />
  );
}
