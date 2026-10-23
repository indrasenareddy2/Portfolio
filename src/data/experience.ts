export interface Track {
  label: string;
  body: string;
  projects?: string[];
}

export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  tracks: Track[];
}

export const roles: Role[] = [
  {
    company: "Onusworks",
    title: "AI / ML Engineer",
    period: "June 2025 – Present",
    location: "Bangalore, India · On-site",
    current: true,
    summary:
      "Building enterprise AI and GenAI systems across workforce analytics, employee support, scheduling, recruitment and data intelligence, combining LLM workflows with backend services and enterprise data.",
    tracks: [
      {
        label: "Agentic analytics",
        body: "LangGraph + RAG workflows for VYN: natural-language-to-MongoDB generation, vector retrieval, schema verification before execution, sliding-window memory and secure multi-tenant access.",
        projects: ["vyn-insights"],
      },
      {
        label: "Workforce intelligence",
        body: "Crew Call's engine layer: eligibility, availability, preference and historical signals feeding recommendations, with business-rule validation and enterprise scheduling APIs.",
        projects: ["crew-call"],
      },
      {
        label: "Enterprise assistants",
        body: "Vinny: a screen-aware RAG assistant with three-layer caching, deterministic routing, escalation and bounded memory.",
        projects: ["vinny"],
      },
      {
        label: "Data intelligence & ML",
        body: "EDW report rationalization with LLM-assisted mapping, SG&A expense anomaly detection, OTIF delivery-risk prediction, and an evaluation of Snowflake-native AI/ML for combined live and historical analytics.",
        projects: ["edw-report-mapping"],
      },
      {
        label: "Backend & cloud",
        body: "Face-verification APIs, REST services, and GCP / Terraform infrastructure for enterprise applications, including Wikihire.",
        projects: ["wikihire", "facial-recognition-attendance"],
      },
    ],
  },
  {
    company: "VCodez",
    title: "Machine Learning Engineer · Intern",
    period: "Feb 2025 – May 2025",
    location: "Chennai, India",
    summary:
      "End-to-end ML workflows in Python, scikit-learn and Pandas: data preprocessing, feature engineering, model training and evaluation.",
    tracks: [
      {
        label: "Applied ML prototype",
        body: "Built an AI-powered outfit suggestion prototype using ML-based image recognition, and worked with application teams to integrate model outputs into real-time workflows.",
      },
      {
        label: "Analytics & mentoring",
        body: "Created stakeholder-facing visualisations in Power BI and Excel, and mentored junior interns on Python, ML fundamentals and AI tooling.",
      },
    ],
  },
];
