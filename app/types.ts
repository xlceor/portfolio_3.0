export type Locale = "en" | "es";

export interface ProjectTranslation {
  tag: { en: string; es: string };
  title: { en: string; es: string };
  desc: { en: string; es: string };
  features: { en: string[]; es: string[] };
  impact?: { en: string; es: string };
  tech: string[];
}

export type Project = {
  id?: string | null;
  name: string;
  /** Image path under /public, or null for abstract placeholder */
  imagePath: string | null;
  content: string;
  technologies?: string[];
  keyFeatures?: string[];
  impact?: string;
};
