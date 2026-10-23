import type { SectionIconName } from "../components/sections/SectionIcon.tsx";

export interface ProjectPresentation {
  label: string;
  icon: SectionIconName;
  headline: string;
  nodeIds: string[];
}

/** Presentation only; all descriptions, tools and workflow details come from resume-backed projects. */
export const projectPresentation: Record<string, ProjectPresentation> = {
  "vyn-insights": { label: "VYN Insights", icon: "chart", headline: "Your business data. A conversation away.", nodeIds: ["q", "vec", "hyde", "mql", "zod", "out"] },
  vinny: { label: "Vinny Chat", icon: "chat", headline: "Useful answers, right where you work.", nodeIds: ["user", "screen", "router", "cache", "retrieve", "resp"] },
  "crew-call": { label: "Crew Call Agent", icon: "calendar", headline: "From staffing request to a validated shift.", nodeIds: ["req", "elig", "avail", "rank", "rules", "shift"] },
  wikihire: { label: "Wikihire", icon: "network", headline: "A connected workflow for enterprise hiring.", nodeIds: ["req", "appr", "svc", "ai", "pg", "iam"] },
  "edw-report-mapping": { label: "EDW Mapping", icon: "document", headline: "Turn a legacy report estate into a clear map.", nodeIds: ["inv", "refs", "cmp", "cls", "map", "ev"] },
  "facial-recognition-attendance": { label: "Face Attendance", icon: "shield", headline: "The right identity. The right location.", nodeIds: ["enroll", "capture", "geo", "search", "thr", "log"] },
};

export const projectOrder = ["vyn-insights", "vinny", "crew-call", "wikihire", "edw-report-mapping", "facial-recognition-attendance"] as const;
