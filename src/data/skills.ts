import { labItems } from "./lab.ts";
import { projects } from "./projects.ts";

export interface Skill {
  name: string;
  /** Project slugs / lab ids where this was used. Empty = part of the toolkit, no project claim. */
  usedIn: string[];
}

export interface SkillCluster {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

const s = (name: string, ...usedIn: string[]): Skill => ({ name, usedIn });

export const skillClusters: SkillCluster[] = [
  {
    id: "genai",
    title: "AI / GenAI",
    blurb: "Models and the patterns that make them useful",
    skills: [
      s("LLMs", "vyn-insights", "vinny", "crew-call", "edw-report-mapping"),
      s("RAG", "vyn-insights", "vinny"),
      s("AI Agents", "vyn-insights", "crew-call"),
      s("Semantic Search", "vyn-insights", "vinny", "edw-report-mapping"),
      s("Prompt Engineering", "vyn-insights", "vinny", "edw-report-mapping"),
      s("NLP"),
      s("Machine Learning", "otif", "sga", "outfit", "breach"),
      s("Deep Learning", "cnn"),
      s("Caching strategies", "vinny"),
      s("Validation layers", "vyn-insights", "crew-call"),
    ],
  },
  {
    id: "agents",
    title: "Agents & LLM platforms",
    blurb: "Orchestration, protocols and model providers",
    skills: [
      s("LangGraph", "vyn-insights"),
      s("LangChain", "vyn-insights", "vinny"),
      s("LlamaIndex"),
      s("MCP"),
      s("A2A"),
      s("OpenAI", "vyn-insights", "vinny"),
      s("Gemini", "vinny"),
      s("OpenRouter", "vyn-insights"),
      s("Groq"),
    ],
  },
  {
    id: "retrieval",
    title: "Data & retrieval",
    blurb: "Where grounding comes from",
    skills: [
      s("MongoDB", "vyn-insights", "vinny", "crew-call"),
      s("MongoDB Vector Search", "vyn-insights", "vinny"),
      s("PostgreSQL", "wikihire"),
      s("Snowflake", "otif", "snowflake"),
      s("Supabase"),
      s("BigQuery"),
    ],
  },
  {
    id: "ml",
    title: "ML & data science",
    blurb: "Modelling, evaluation, explainability",
    skills: [
      s("Python", "otif", "sga", "cnn", "outfit", "breach"),
      s("scikit-learn", "otif", "sga"),
      s("XGBoost", "otif"),
      s("SHAP", "otif"),
      s("Pandas", "otif", "sga"),
      s("NumPy"),
      s("Power BI", "edw-report-mapping"),
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Services that put models to work",
    skills: [
      s("Node.js", "vyn-insights", "vinny", "crew-call", "wikihire"),
      s("REST APIs", "crew-call", "wikihire", "facial-recognition-attendance"),
      s("FastAPI", "otif", "breach"),
      s("Zod", "vyn-insights"),
      s("JavaScript", "vinny"),
    ],
  },
  {
    id: "cloud",
    title: "Cloud & infrastructure",
    blurb: "Reproducible, least-privilege deployment",
    skills: [
      s("GCP", "wikihire"),
      s("Terraform", "wikihire"),
      s("IAM", "wikihire"),
      s("Docker", "wikihire"),
      s("AWS Rekognition", "facial-recognition-attendance"),
    ],
  },
];

/** Human-readable name + link for every key a skill can point to. */
export const workIndex: Record<string, { name: string; href: string }> = Object.fromEntries([
  ...projects.map((p) => [p.slug, { name: p.name, href: `/projects/${p.slug}/` }] as const),
  ...labItems.map((l) => [l.skillKey, { name: l.title, href: `/#lab-${l.id}` }] as const),
]);

/** Combine the curated skills with every tool named in a showcased project's actual stack. */
const catalog = new Map<string, Skill>();
for (const cluster of skillClusters) {
  for (const skill of cluster.skills) catalog.set(skill.name.toLowerCase(), { name: skill.name, usedIn: [...skill.usedIn] });
}
function connectTool(name: string, work: string) {
  const key = name.toLowerCase();
  const skill = catalog.get(key) ?? { name, usedIn: [] };
  if (!skill.usedIn.includes(work)) skill.usedIn.push(work);
  catalog.set(key, skill);
}
for (const project of projects) for (const group of project.stack) for (const tool of group.items) connectTool(tool, project.slug);
for (const item of labItems) for (const tool of item.stack) connectTool(tool, item.skillKey);

export const toolCatalog = [...catalog.values()];
const curatedKeys = new Set(skillClusters.flatMap(cluster => cluster.skills.map(skill => skill.name.toLowerCase())));
export const toolClusters: SkillCluster[] = [
  ...skillClusters.map(cluster => ({ ...cluster, skills: cluster.skills.map(skill => catalog.get(skill.name.toLowerCase())!) })),
  { id: "project-tools", title: "More tools from the projects", blurb: "Taken directly from the stacks of the projects and experiments above", skills: toolCatalog.filter(skill => !curatedKeys.has(skill.name.toLowerCase())) },
];
