import type { Tool } from "@/types/tool";

/**
 * Central registry of every tool in Toolery.
 * Adding a new tool here automatically makes it appear in the navbar,
 * the homepage grid, and search — no need to touch UI code elsewhere.
 */
export const tools: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate and minify JSON instantly.",
    category: "formatters",
    icon: "Braces",
    status: "live",
  },
  {
    slug: "jwt-debugger",
    name: "JWT Debugger",
    description: "Decode and inspect JWT tokens, header and payload.",
    category: "security",
    icon: "KeyRound",
    status: "live",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate v4 UUIDs in bulk, one click to copy.",
    category: "generators",
    icon: "Fingerprint",
    status: "live",
  },
  {
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    description: "Encode text to Base64 or decode it back instantly.",
    category: "converters",
    icon: "Binary",
    status: "live",
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates.",
    category: "converters",
    icon: "Clock",
    status: "live",
  },
];

/** Helper to look up a tool by its slug — used in dynamic page metadata. */
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}