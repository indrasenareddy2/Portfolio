export const profile = {
  firstName: "Thallapalli",
  lastName: "Indrasena Reddy",
  fullName: "Thallapalli Indrasena Reddy",
  shortName: "Indrasena Reddy",
  role: "AI / ML Engineer",
  company: "Onusworks",
  location: "Bangalore, India",
  email: "thallapalliindrasenareddy@gmail.com",
  github: "https://github.com/indrasenareddy2",
  githubHandle: "indrasenareddy2",
  linkedin: "https://www.linkedin.com/in/thallapalli-indrasena-reddy-4045ab224/",
  resume: "/resume/Thallapalli-Indrasena-Reddy-Resume.pdf",
  headline: "Building intelligent systems that connect LLMs to enterprise data.",
  rotating: ["RAG pipelines", "agentic workflows", "machine learning models", "retrieval systems", "enterprise data"],
  summary:
    "AI / ML Engineer at Onusworks building enterprise GenAI applications, RAG assistants, agentic workflows and workforce-intelligence systems, where LLM reasoning meets enterprise data, business rules and validation layers.",
  about: [
    "I build the part of AI systems that has to be right: the retrieval that grounds a model, the validation that stops a bad query before it runs, and the deterministic logic that decides what actually gets executed.",
    "At Onusworks that has meant an analytics agent that turns questions into verified MongoDB pipelines, a scheduling engine that keeps AI recommendations separate from business-rule execution, and an in-app assistant with layered caching and safe escalation, alongside ML work on delivery-risk prediction and expense anomaly detection.",
  ],
} as const;

export const pillars = [
  {
    title: "GenAI & RAG",
    body: "Schema-aware and context-aware retrieval, vector search, HyDE and caching, so model answers stay grounded in the right data.",
    tags: ["RAG", "MongoDB Vector Search", "Embeddings", "HyDE"],
  },
  {
    title: "Agentic systems",
    body: "LangGraph workflows with memory, tool use and routing, wrapped in validation layers that the model cannot talk its way around.",
    tags: ["LangGraph", "LangChain", "Zod", "MCP"],
  },
  {
    title: "Machine learning",
    body: "Classification, anomaly detection and recommendation logic, from feature engineering and leakage control to calibration and explainability.",
    tags: ["XGBoost", "scikit-learn", "Isolation Forest", "SHAP"],
  },
  {
    title: "AI backend & cloud",
    body: "The services, APIs and infrastructure that put models into enterprise workflows: Node.js, Python, GCP, AWS and Terraform.",
    tags: ["Node.js", "Python", "GCP", "Terraform"],
  },
] as const;

export const education = {
  degree: "B.Tech in Artificial Intelligence",
  school: "Dr. M.G.R. University, Chennai",
  period: "Aug 2021 – Mar 2025",
  score: "86%",
};

export const certifications = [
  {
    title: "Model Context Protocol (MCP): Advanced Topics",
    issuer: "Anthropic",
    href: "https://verify.skilljar.com/c/q5epn9s4capy",
  },
  { title: "Claude with the Anthropic API", issuer: "Anthropic" },
  { title: "Train and Evaluate Regression Models", issuer: "Microsoft" },
  { title: "Train and Evaluate Deep Learning Models", issuer: "Microsoft" },
  { title: "Cybersecurity in a Post-Quantum World", issuer: "Workshop · SRM University, Chennai" },
] as const;
