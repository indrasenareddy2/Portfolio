import type { Project } from "./types.ts";

/*
 * Source of truth: Indrasena_Reddy_Resume_Final.pdf (Oct 2026), earlier resume (May 2026)
 * and the project briefs supplied by Indrasena. All enterprise work is proprietary —
 * diagrams are conceptual reconstructions and no metrics are claimed that are not on the resume.
 */

const ENTERPRISE_NOTE =
  "Enterprise work at Onusworks. Source code is proprietary, so this case study describes the architecture and my role rather than linking a repository.";

export const projects: Project[] = [
  {
    slug: "vyn-insights",
    name: "VYN Insights",
    descriptor: "Enterprise AI analytics agent",
    tier: "flagship",
    accent: "cyan",
    context: "Onusworks",
    domain: "Workforce & compliance analytics",
    problem:
      "Business users needed answers from enterprise MongoDB data without writing aggregation pipelines, and without an LLM ever touching data it shouldn't.",
    problemLong:
      "Workforce and compliance data lived in MongoDB collections with large, evolving schemas. Getting answers meant someone hand-writing aggregation pipelines. An LLM can write those pipelines, but a naive text-to-query agent invents field names, over-fetches documents, and has no notion of tenants or sensitive fields.",
    role: "Built the LangGraph + RAG agent from question to rendered answer.",
    contribution: [
      "Built the analytics agent that translates natural-language questions into MongoDB Aggregation Pipelines (MQL).",
      "Implemented a schema-aware RAG flow: collection discovery, schema retrieval with MongoDB Vector Search and HyDE-assisted retrieval, and field verification against source schemas.",
      "Validated every generated pipeline with Zod before execution, and enforced tenant isolation, projection controls and PII guardrails.",
      "Added sliding-window conversational memory so follow-up questions chain onto previous queries.",
      "Rendered responses adaptively as summaries, tables or charts, with speech-to-text input for hands-free questions.",
    ],
    challenge:
      "LLMs hallucinate field names and will happily write pipelines that over-fetch, expose PII or cross tenant boundaries. A generated query has to be correct and safe before it ever reaches the database.",
    solution:
      "A zero-trust schema-RAG pipeline. The agent discovers relevant collections, retrieves schema context via vector search and HyDE, and verifies every field against the source schema. The generated MQL then passes Zod validation, tenant filters, projection limits and PII rules before execution.",
    outcome:
      "Natural-language questions, including follow-ups, become verified aggregation pipelines whose answers render as a summary, table or chart. Safety is enforced in code, not left to the prompt.",
    outcomes: [
      "Non-technical users can query workforce and compliance data conversationally.",
      "Hallucinated field references are caught by schema verification before execution, not discovered in results.",
      "Tenant isolation, projections and PII rules are enforced deterministically on every query.",
      "Answers render in the shape the question needs: summary, table, or bar / pie / line / scatter chart.",
    ],
    constraints: [
      "Multi-tenant data: every query must be scoped to the caller's organisation.",
      "Sensitive identity fields must never be returned directly, though checking that a value exists is allowed.",
      "Large schemas would bloat the context window if passed to the model wholesale.",
      "Users ask follow-ups ('now split that by department') that depend on the previous turn.",
    ],
    decisions: [
      {
        title: "The model proposes, the code disposes",
        body: "Schema verification and Zod validation sit between the LLM and MongoDB. A hallucinated field or malformed stage fails in validation, loudly, instead of silently returning wrong data.",
      },
      {
        title: "HyDE for schema retrieval",
        body: "Users rarely phrase questions in schema vocabulary. Generating a hypothetical description first and embedding that bridges the gap between how people ask and how collections are named.",
      },
      {
        title: "Guardrails in code, not in the prompt",
        body: "Tenant filters (orgId), projection controls and PII rules are applied programmatically to every pipeline. Prompts can be talked around, validators can't.",
      },
      {
        title: "Retrieve schema, don't paste it",
        body: "Only the collections and fields relevant to the question reach the model. That keeps context small and generation focused.",
      },
      {
        title: "Bounded conversational memory",
        body: "A sliding window keeps follow-up chaining working without letting conversation history grow without limit.",
      },
    ],
    stack: [
      { group: "Agent & LLM", items: ["LangGraph", "LangChain", "OpenAI", "OpenRouter"] },
      { group: "Retrieval & data", items: ["MongoDB", "MongoDB Vector Search", "OpenAI Embeddings", "HyDE"] },
      { group: "Validation", items: ["Zod"] },
      { group: "Backend & UI", items: ["Node.js", "React", "Ant Design", "Chart.js"] },
    ],
    trace: {
      title: "Question → verified pipeline → answer",
      nodes: [
        { id: "q", label: "User question", kind: "input", detail: "Typed or spoken (speech-to-text) natural-language question about workforce or compliance data." },
        { id: "ctx", label: "Intent & conversation context", kind: "context", detail: "Sliding-window memory lets follow-up questions build on the previous query." },
        { id: "disc", label: "Collection discovery", kind: "retrieval", detail: "The agent identifies which collections are relevant before any query is written." },
        { id: "vec", label: "Vector search", kind: "retrieval", detail: "MongoDB Vector Search over schema context, embedded with OpenAI embeddings." },
        { id: "hyde", label: "Schema retrieval · HyDE", kind: "retrieval", detail: "Hypothetical-document embeddings improve recall when user wording differs from schema naming." },
        { id: "verify", label: "Field verification", kind: "guard", detail: "Every referenced field is checked against the source schema, so hallucinated fields never reach execution." },
        { id: "mql", label: "MQL generation", kind: "llm", detail: "The LLM writes a MongoDB Aggregation Pipeline grounded in the retrieved, verified schema." },
        { id: "zod", label: "Zod + security validation", kind: "guard", detail: "Zod validates pipeline structure. Tenant isolation, projection controls and PII guardrails are enforced in code." },
        { id: "db", label: "MongoDB execution", kind: "data", detail: "Only validated, tenant-scoped pipelines run against enterprise data." },
        { id: "out", label: "Summary · table · chart", kind: "output", detail: "The response shape adapts to the question: text summary, table, or bar / pie / line / scatter chart." },
      ],
      groups: [
        { label: "Retrieval", from: "disc", to: "hyde", tone: "neutral" },
        { label: "Zero-trust boundary", from: "verify", to: "zod", tone: "deterministic" },
      ],
    },
    note: ENTERPRISE_NOTE,
  },
  {
    slug: "crew-call",
    name: "Crew Call",
    descriptor: "AI workforce scheduling engine",
    tier: "flagship",
    accent: "blue",
    context: "Onusworks",
    domain: "Workforce scheduling",
    problem:
      "Turning a manager's staffing request into the right people on the right shifts, without ever letting AI write an invalid schedule.",
    problemLong:
      "Staffing a shift means weighing who is eligible, who is available, what people prefer and who has worked similar assignments before, then creating shifts in the enterprise workforce-management system. A conversational interface makes requests easy to express, but the system of record must never receive a schedule that breaks business rules.",
    role: "Developed the engine layer between the conversational AI and the scheduling system.",
    contribution: [
      "Developed the engine that turns manager staffing requirements into eligible, ranked employee recommendations.",
      "Combined eligibility, availability, preference and historical-assignment signals in the recommendation logic.",
      "Applied deterministic eligibility and business-rule checks around the AI layer, so recommendations are validated before any downstream scheduling action.",
      "Integrated with UKG workforce-management scheduling services for workforce lookup, schedule validation and approved shift creation.",
    ],
    challenge:
      "Conversational AI is good at interpreting what a manager wants. It should not be the component that decides whether a schedule is valid.",
    solution:
      "Hard separation of layers. AI interprets the request, recommendation logic ranks candidates, and deterministic rules and the scheduling system's own validation decide what is allowed. Only validated, approved shifts are created.",
    outcome:
      "Managers get ranked staffing recommendations from a natural request. Every write to the scheduling system passes deterministic validation first.",
    outcomes: [
      "Staffing requests are expressed conversationally and come back as ranked, eligible candidates.",
      "Business rules are enforced by deterministic code, independent of model output.",
      "Schedules are validated against the workforce-management system before approved shifts are created.",
    ],
    constraints: [
      "Scheduling actions change real employees' working hours, so mistakes are costly.",
      "Business rules and eligibility must hold 100% of the time. Probabilistic 'usually right' is not acceptable.",
      "The engine must work through the enterprise workforce-management APIs, which remain the system of record.",
    ],
    decisions: [
      {
        title: "AI reasons, rules decide",
        body: "The conversational layer interprets intent and the recommendation layer ranks. Eligibility and business rules are deterministic code paths the model cannot bypass.",
      },
      {
        title: "Signals, not a single score from the model",
        body: "Availability, preferences and historical assignments are explicit inputs to ranking, so recommendations are grounded in workforce data rather than model intuition.",
      },
      {
        title: "Validate against the system of record",
        body: "Before an approved shift is created, the schedule is validated through the workforce-management scheduling services. That system remains the final authority.",
      },
      {
        title: "Execution kept separate from conversation",
        body: "The deterministic execution path is isolated from the conversational AI layer, so it can be reasoned about and tested on its own.",
      },
    ],
    stack: [
      { group: "AI", items: ["LLM / agent workflows", "Recommendation logic"] },
      { group: "Backend", items: ["Node.js", "REST APIs"] },
      { group: "Data & integration", items: ["MongoDB", "UKG workforce-management APIs"] },
    ],
    trace: {
      title: "Manager request → approved shift",
      nodes: [
        { id: "req", label: "Manager request", kind: "input", detail: "A staffing need expressed conversationally." },
        { id: "reqs", label: "Requirement interpretation", kind: "llm", detail: "The AI layer turns the request into structured staffing requirements." },
        { id: "elig", label: "Eligible employees", kind: "rule", detail: "Deterministic eligibility filtering. Ineligible people never reach ranking." },
        { id: "avail", label: "Availability", kind: "signal", detail: "Availability signal for each eligible employee." },
        { id: "pref", label: "Preferences", kind: "signal", detail: "Employee preference signals." },
        { id: "hist", label: "Historical assignments", kind: "signal", detail: "Context from past assignments informs the recommendation." },
        { id: "rank", label: "Ranking", kind: "rank", detail: "Recommendation logic combines the signals into a ranked candidate list." },
        { id: "rules", label: "Business-rule validation", kind: "rule", detail: "Deterministic checks validate recommendations before any scheduling action." },
        { id: "ukg", label: "UKG schedule validation", kind: "system", detail: "The schedule is validated through the workforce-management scheduling services." },
        { id: "shift", label: "Approved shift created", kind: "output", detail: "Only validated, approved shifts are written to the system of record." },
      ],
      groups: [
        { label: "Conversational AI", from: "req", to: "reqs", tone: "ai" },
        { label: "Recommendation engine", from: "elig", to: "rank", tone: "neutral" },
        { label: "Deterministic execution", from: "rules", to: "shift", tone: "deterministic" },
      ],
    },
    note: ENTERPRISE_NOTE,
  },
  {
    slug: "vinny",
    name: "Vinny",
    descriptor: "Context-aware internal AI assistant",
    tier: "flagship",
    accent: "violet",
    context: "Onusworks · VYN platform",
    domain: "Employee support",
    problem:
      "In-app help that knows which screen you're on, and doesn't pay for a fresh LLM call every time someone asks a question that has been answered before.",
    problemLong:
      "Users of the VYN platform's Crew and Employee Management workflows needed guidance inside the application. A generic chatbot gives generic answers. A naive RAG bot repeats the same embedding and generation work for the same questions, and has no safe path when it can't help.",
    role: "Built the assistant's retrieval, caching, routing and memory layers.",
    contribution: [
      "Built a context-aware RAG assistant for Crew and Employee Management workflows.",
      "Made retrieval and guidance screen-aware, adapting to the user's current location in the application.",
      "Designed a three-layer cache: embedding reuse, intent-level reuse and semantic-similarity response reuse.",
      "Implemented deterministic intent routing with escalation and fallback to human L2 support.",
      "Bounded conversation storage with per-user thread limits and TTL background cleanup, plus user-feedback capture.",
    ],
    challenge:
      "Make answers specific to where the user is, cut repeated LLM work, and never let the assistant improvise when it should hand off to a human.",
    solution:
      "Screen context conditions retrieval. A deterministic router classifies each message before any model runs. Three cache layers are checked cheapest-first before generation. Unsupported cases follow a strict escalation path.",
    outcome:
      "Guidance adapts to the user's current screen, repeated questions avoid redundant LLM calls (reducing latency), unsupported requests reach human support, and feedback signals support quality monitoring.",
    outcomes: [
      "Page-level guidance instead of generic answers.",
      "Fewer repeated LLM calls and lower response latency through layered caching.",
      "Predictable escalation to human L2 support for unsupported cases.",
      "Conversation storage stays bounded, with feedback collected for continuous quality monitoring.",
    ],
    constraints: [
      "Answers must reflect the screen and workflow the user is in.",
      "LLM cost and latency matter at internal-tool scale, where many questions repeat.",
      "Some requests must go to a human. The assistant must recognise them reliably.",
      "Conversation history must not grow without bound.",
    ],
    decisions: [
      {
        title: "Cache before you generate",
        body: "Three layers ordered from cheapest to richest: reuse an embedding, reuse an answer for the same resolved intent, or reuse a semantically similar answer found via vector search. Only then call the LLM.",
      },
      {
        title: "Deterministic routing for escalation",
        body: "Classifying chit-chat vs. product questions vs. unsupported cases is done deterministically, so escalation behaviour is predictable and testable rather than model-dependent.",
      },
      {
        title: "Context is a retrieval input",
        body: "The user's current application location shapes retrieval and guidance. The same question on two screens can deserve two different answers.",
      },
      {
        title: "Bounded memory by design",
        body: "Per-user thread limits plus TTL background cleanup keep the conversation store from leaking memory in production.",
      },
    ],
    stack: [
      { group: "LLM & RAG", items: ["LangChain", "Gemini", "OpenAI Embeddings", "RAG"] },
      { group: "Retrieval & storage", items: ["MongoDB", "MongoDB Vector Search"] },
      { group: "Backend", items: ["Node.js", "JavaScript"] },
    ],
    trace: {
      title: "Message → context → cache → retrieval → answer",
      nodes: [
        { id: "user", label: "User message", kind: "input", detail: "A question asked from inside the VYN application." },
        { id: "screen", label: "Screen context", kind: "context", detail: "The user's current application location is attached to the request." },
        { id: "router", label: "Intent router", kind: "router", detail: "Deterministic classification: social chit-chat, product question, or unsupported → escalate to human L2 support." },
        {
          id: "cache",
          label: "Cache layers",
          kind: "cache",
          detail: "Checked cheapest-first. A hit returns early and skips generation.",
          layers: [
            { label: "L1 · Embedding cache", detail: "Reuses query embeddings for repeated text." },
            { label: "L2 · Intent cache", detail: "Reuses answers for the same resolved intent." },
            { label: "L3 · Semantic response cache", detail: "Reuses answers to semantically similar questions via vector similarity." },
          ],
        },
        { id: "retrieve", label: "Vector retrieval", kind: "retrieval", detail: "MongoDB Vector Search over the knowledge base, conditioned on screen context." },
        { id: "llm", label: "LLM generation", kind: "llm", detail: "Grounded answer generation from retrieved context." },
        { id: "resp", label: "Response + feedback", kind: "output", detail: "Answer returned. User feedback is captured, and the conversation is stored with thread limits and TTL cleanup." },
      ],
      groups: [{ label: "Avoid the LLM when possible", from: "router", to: "cache", tone: "deterministic" }],
    },
    note: ENTERPRISE_NOTE,
  },
  {
    slug: "edw-report-mapping",
    name: "EDW Report Rationalization",
    descriptor: "AI-assisted enterprise report mapping",
    tier: "system",
    accent: "cyan",
    context: "Onusworks",
    domain: "Enterprise data intelligence",
    problem:
      "Decide the fate of every legacy data-warehouse report, and back each decision with evidence, without weeks of manual cross-file review.",
    problemLong:
      "A legacy enterprise data warehouse (EDW) carried a large estate of reports. Each one had to be dispositioned against the current landscape: is it obsolete, does an equivalent already exist in a BI dashboard or as an ERP transaction, or does it need to be built or enhanced? The answers were scattered across many reference documents.",
    role: "Built the AI-assisted classification, mapping and evidence workflow.",
    contribution: [
      "Built an AI-assisted workflow to classify legacy EDW reports into five dispositions using enterprise reference documents.",
      "Mapped equivalent reports to internal / Power BI dashboards or SAP ERP transaction codes.",
      "Traced new and enhancement-required cases back to supporting source documents as review evidence.",
      "Used LLM-assisted document comparison and semantic mapping to consolidate the result into one review-ready deliverable.",
    ],
    challenge:
      "Report names and descriptions rarely match one-to-one across systems, and every classification has to survive human review.",
    solution:
      "LLM-assisted semantic comparison across reference documents, a fixed five-way classification scheme, and explicit evidence tracing so reviewers can verify rather than redo the work.",
    outcome:
      "Substantially reduced manual cross-file review and produced a consolidated, review-ready EDW mapping deliverable.",
    outcomes: [
      "Every report receives one of five dispositions: deprecated, existing-platform equivalent, ERP equivalent, new, or enhancement-required.",
      "Equivalents point to a specific dashboard or transaction code.",
      "New and enhancement cases carry links back to their source evidence.",
    ],
    constraints: [
      "Inputs were spreadsheets and documents, not a clean database.",
      "Naming differed across legacy, BI and ERP worlds.",
      "The output had to be auditable by business reviewers.",
    ],
    decisions: [
      {
        title: "Fixed taxonomy, flexible matching",
        body: "A closed set of five dispositions keeps outputs consistent. Semantic comparison handles the messy naming.",
      },
      {
        title: "Evidence over assertion",
        body: "Classifications for new and enhancement cases are traced to supporting documents, so reviewers check sources instead of trusting the model.",
      },
    ],
    stack: [
      { group: "AI", items: ["LLMs", "Semantic mapping", "Document intelligence"] },
      { group: "Enterprise", items: ["Power BI", "SAP (ERP T-codes)", "Excel"] },
    ],
    trace: {
      title: "Legacy report → disposition → evidence",
      nodes: [
        { id: "inv", label: "Legacy report inventory", kind: "input", detail: "The EDW report estate to be rationalized." },
        { id: "refs", label: "Reference documents", kind: "data", detail: "Enterprise reference files describing BI and ERP coverage." },
        { id: "cmp", label: "LLM semantic comparison", kind: "llm", detail: "Cross-document comparison despite naming differences." },
        { id: "cls", label: "Five-way classification", kind: "rule", detail: "Deprecated · existing-platform equivalent · ERP equivalent · new · enhancement-required." },
        { id: "map", label: "Dashboard / T-code mapping", kind: "system", detail: "Equivalents mapped to Power BI dashboards or SAP transaction codes." },
        { id: "ev", label: "Evidence tracing", kind: "guard", detail: "New and enhancement cases traced to supporting source documents." },
        { id: "out", label: "Review-ready mapping", kind: "output", detail: "One consolidated deliverable for business review." },
      ],
    },
    note: ENTERPRISE_NOTE,
  },
  {
    slug: "wikihire",
    name: "Wikihire",
    descriptor: "Enterprise AI recruitment & requisition platform",
    tier: "system",
    accent: "blue",
    context: "Onusworks",
    domain: "Recruitment SaaS · cloud",
    problem:
      "Hiring requisitions need multi-level approvals and resume intelligence, running on cloud infrastructure that is reproducible and secure across environments.",
    problemLong:
      "Wikihire orchestrates internal hiring: requisitions move through a role hierarchy (Manager, Department Head, HR) and candidates are screened with AI-assisted resume intelligence. The platform needed backend workflow services and a secure, repeatable deployment on Google Cloud.",
    role: "Co-engineered backend workflows and the GCP / Terraform infrastructure.",
    contribution: [
      "Co-engineered backend routing and workflow services, including multi-level approval flows and AI-assisted resume intelligence.",
      "Provisioned GCP resources with Terraform (infrastructure as code).",
      "Managed IAM and service-account authentication across isolated environments.",
      "Deployed services on GCP with service-account token-based authentication for secure service-to-service access.",
    ],
    challenge:
      "Keep several isolated environments consistent and secure without hand-configured cloud resources or long-lived shared credentials.",
    solution:
      "Terraform for every GCP resource, IAM-scoped service accounts per environment, and token-based service-to-service authentication. Workflow services are containerised with Docker.",
    outcome:
      "Reproducible environments without configuration drift, and secure service-to-service access across isolated deployments.",
    outcomes: [
      "Approval workflows across the Manager → Department Head → HR hierarchy.",
      "Infrastructure defined as code and reproducible per environment.",
      "Service-to-service calls authenticated with scoped service-account tokens.",
    ],
    constraints: [
      "Multiple isolated environments.",
      "Least-privilege access between services.",
      "Multi-step approval state must persist reliably.",
    ],
    decisions: [
      {
        title: "Infrastructure as code",
        body: "Terraform-provisioned GCP resources make environments reproducible and remove configuration drift.",
      },
      {
        title: "Identity per service",
        body: "IAM service accounts with token-based auth give each service only the access it needs.",
      },
    ],
    stack: [
      { group: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL"] },
      { group: "Cloud", items: ["GCP", "Terraform", "IAM", "Docker"] },
    ],
    trace: {
      title: "Requisition → approval → deployment",
      nodes: [
        { id: "req", label: "Requisition raised", kind: "input", detail: "A hiring request enters the platform." },
        { id: "appr", label: "Multi-level approvals", kind: "rule", detail: "Manager → Department Head → HR approval flow." },
        { id: "svc", label: "Workflow & routing services", kind: "system", detail: "Node.js backend services orchestrate state transitions." },
        { id: "ai", label: "Resume intelligence", kind: "llm", detail: "AI-assisted resume intelligence during screening." },
        { id: "pg", label: "PostgreSQL", kind: "data", detail: "Persistent workflow and candidate state." },
        { id: "tf", label: "Terraform → GCP", kind: "system", detail: "Every cloud resource provisioned as code." },
        { id: "iam", label: "IAM service accounts", kind: "guard", detail: "Token-based service-to-service authentication per environment." },
      ],
    },
    note: ENTERPRISE_NOTE,
  },
  {
    slug: "facial-recognition-attendance",
    name: "Facial Recognition Attendance",
    descriptor: "Face verification + geofenced attendance",
    tier: "system",
    accent: "violet",
    context: "Onusworks · major airline client",
    domain: "Identity verification",
    problem:
      "Confirm that the person checking in is the enrolled employee, and that they are actually at the office.",
    problemLong:
      "Attendance for a major airline client had to be tied to identity and location: a check-in should count only if the face matches an enrolled employee and the device is inside the office geofence.",
    role: "Built the backend integration with Amazon Rekognition and the attendance logic.",
    contribution: [
      "Built backend integration with Amazon Rekognition for employee face enrollment and real-time attendance verification.",
      "Made match-confidence thresholds configurable.",
      "Integrated geofencing and attendance logging, storing each check-in / check-out with employee, timestamp and location context.",
      "Modelled infrastructure costs for the solution.",
    ],
    challenge:
      "Both identity and location must pass, and the matching strictness has to be tunable without code changes.",
    solution:
      "Faces are enrolled into a Rekognition collection (IndexFaces). At check-in the image is searched against it (SearchFacesByImage) and accepted only above a configurable confidence threshold and inside the geofence.",
    outcome:
      "Check-in and check-out events are validated against both face match and office location, and stored with full context.",
    outcomes: [
      "Identity verified against enrolled faces, with configurable match-confidence thresholds.",
      "Location validated by geofence before attendance is accepted.",
      "Every event logged with employee, timestamp and location.",
    ],
    constraints: ["Mobile (Android) capture.", "Tunable match strictness.", "Infrastructure cost visibility for the client."],
    decisions: [
      {
        title: "Two independent checks",
        body: "Face match and geofence are separate gates. Passing one is never enough.",
      },
      {
        title: "Threshold as configuration",
        body: "Match confidence is configurable, so strictness can be tuned per deployment without redeploying code.",
      },
    ],
    stack: [
      { group: "AI service", items: ["AWS Rekognition"] },
      { group: "App & backend", items: ["Android", "REST APIs", "Backend APIs", "Geofencing"] },
      { group: "Planning", items: ["Cost modelling"] },
    ],
    trace: {
      title: "Enroll → verify → log",
      nodes: [
        { id: "enroll", label: "Face enrollment", kind: "input", detail: "Employee face indexed into a Rekognition collection (IndexFaces)." },
        { id: "capture", label: "Check-in capture", kind: "input", detail: "Image captured from the Android app at check-in / check-out." },
        { id: "geo", label: "Geofence check", kind: "rule", detail: "Device location validated against the office geofence." },
        { id: "search", label: "SearchFacesByImage", kind: "retrieval", detail: "Captured face searched against the enrolled collection." },
        { id: "thr", label: "Confidence threshold", kind: "guard", detail: "Configurable match-confidence threshold decides acceptance." },
        { id: "log", label: "Attendance log", kind: "output", detail: "Event stored with employee, timestamp and location context." },
      ],
    },
    note: "Client work for a major airline, kept anonymised. Source code is proprietary.",
  },
];

export const flagshipProjects = projects.filter((p) => p.tier === "flagship");
export const systemProjects = projects.filter((p) => p.tier === "system");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
