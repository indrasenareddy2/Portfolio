/** Public base path (GitHub Pages serves from /Portfolio). Empty for a root domain. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Canonical origin + base path, used for metadata, sitemap and JSON-LD. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://indrasenareddy2.github.io/Portfolio").replace(/\/$/, "");

/** Origin only. Next adds the base path to file-based metadata (OG images) itself. */
export const SITE_ORIGIN = new URL(SITE_URL).origin;

export const SITE_TITLE = "Indrasena Reddy — AI / ML Engineer | GenAI, RAG & Agentic Systems";
export const SITE_DESCRIPTION =
  "Thallapalli Indrasena Reddy is an AI / ML Engineer building enterprise GenAI applications, RAG assistants, agentic workflows and machine-learning systems that connect LLMs to real business data.";

/** Prefix a public asset path with the base path (next/link does this automatically, <a href> to files does not). */
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "lab", label: "Lab" },
  { id: "contact", label: "Contact" },
] as const;
