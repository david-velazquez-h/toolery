/**
 * Represents the category a tool belongs to.
 * Used for grouping tools in the UI (navbar sections, landing page groups).
 */
export type ToolCategory =
  | "formatters"
  | "generators"
  | "converters"
  | "security";

/**
 * Represents a single tool available in Toolery.
 * This is the single source of truth for every tool in the app —
 * the navbar, search, landing page and sitemap are all derived from this shape.
 */
export interface Tool {
  /** URL-safe identifier, must match the folder name under app/(tools)/ */
  slug: string;
  /** Display name shown in UI */
  name: string;
  /** Short description shown in cards and search results */
  description: string;
  /** Category used for grouping/filtering */
  category: ToolCategory;
  /** Lucide icon name (we'll wire this to lucide-react components) */
  icon: string;
  /** Whether the tool is available yet (lets us "announce" upcoming tools) */
  status: "live" | "coming-soon";
}