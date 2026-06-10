export type Project = {
  name: string;
  /** Image path under /public, or null for abstract placeholder */
  imagePath: string | null;
  content: string;
  technologies?: string[];
  keyFeatures?: string[];
  impact?: string;
};
