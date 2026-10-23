import type { Accent, NodeKind, TraceGroup } from "@/data/types";

export const KIND_STYLE: Record<NodeKind, { color: string; tag: string }> = {
  input: { color: "#c3c9d4", tag: "input" },
  context: { color: "#5ee1f0", tag: "context" },
  router: { color: "#f5c26b", tag: "router" },
  retrieval: { color: "#6d8dff", tag: "retrieval" },
  cache: { color: "#5eead4", tag: "cache" },
  llm: { color: "#a58bff", tag: "llm" },
  guard: { color: "#f5c26b", tag: "guard" },
  rule: { color: "#f5c26b", tag: "rule" },
  signal: { color: "#8fb3ff", tag: "signal" },
  rank: { color: "#a58bff", tag: "rank" },
  system: { color: "#94a3b8", tag: "system" },
  data: { color: "#94a3b8", tag: "data" },
  output: { color: "#6ee7b7", tag: "output" },
};

export const TONE: Record<TraceGroup["tone"], string> = {
  ai: "#a58bff",
  deterministic: "#f5c26b",
  neutral: "#6d8dff",
};

export const ACCENT: Record<Accent, string> = { cyan: "#5ee1f0", blue: "#6d8dff", violet: "#a58bff" };
