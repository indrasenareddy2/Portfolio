export type Accent = "cyan" | "blue" | "violet";

/** What a step in a system trace does. Drives the colour + mono tag of each node. */
export type NodeKind =
  | "input"
  | "context"
  | "router"
  | "retrieval"
  | "cache"
  | "llm"
  | "guard"
  | "rule"
  | "signal"
  | "rank"
  | "system"
  | "data"
  | "output";

export interface TraceNode {
  id: string;
  label: string;
  kind: NodeKind;
  detail: string;
  /** Sub-layers rendered inside the node (e.g. Vinny's three caches). */
  layers?: { label: string; detail: string }[];
}

export interface TraceGroup {
  label: string;
  /** Inclusive node-id range covered by the bracket. */
  from: string;
  to: string;
  tone: "ai" | "deterministic" | "neutral";
}

export interface Trace {
  title: string;
  nodes: TraceNode[];
  groups?: TraceGroup[];
}

export interface Decision {
  title: string;
  body: string;
}

export interface StackGroup {
  group: string;
  items: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** Short descriptor shown under the name. */
  descriptor: string;
  tier: "flagship" | "system";
  accent: Accent;
  context: string;
  domain: string;
  /** One-line problem statement. */
  problem: string;
  /** Longer problem framing for the case study. */
  problemLong: string;
  role: string;
  contribution: string[];
  challenge: string;
  solution: string;
  outcome: string;
  outcomes: string[];
  constraints: string[];
  decisions: Decision[];
  stack: StackGroup[];
  trace: Trace;
  links?: { label: string; href: string }[];
  note: string;
}

export interface LabItem {
  id: string;
  title: string;
  status: string;
  origin: string;
  summary: string;
  details: string[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  /** Project-style slug used by the skills map. */
  skillKey: string;
}
