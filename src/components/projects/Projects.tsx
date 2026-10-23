"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { SectionIcon, type SectionIconName } from "@/components/sections/SectionIcon";
import { Workspace } from "@/components/sections/Workspace";
import { Trace } from "@/components/architecture/Trace";
import { projects } from "@/data/projects";
import { projectOrder, projectPresentation } from "@/data/projectPresentation";
import type { Project } from "@/data/types";
import { asset } from "@/lib/site";
import section from "@/components/sections/ReferenceSections.module.css";
import styles from "./Projects.module.css";

const tabs = ["Overview", "Problem", "Solution", "Architecture", "Stack", "Outcome"] as const;
type ProjectTab = typeof tabs[number];
const orderedProjects = projectOrder.map(slug => projects.find(project => project.slug === slug)!);
const colors: Record<string, string> = { "vyn-insights": "#25dfed", vinny: "#b49aff", "crew-call": "#6cabff", wikihire: "#51e7c1", "edw-report-mapping": "#ffc780", "facial-recognition-attendance": "#75d6ff" };
const kindIcons: Record<string, SectionIconName> = { input: "chat", context: "document", retrieval: "search", llm: "spark", guard: "shield", rule: "shield", signal: "chart", rank: "chart", system: "network", data: "database", output: "document", router: "network", cache: "database" };

function nextIndex(event: KeyboardEvent, index: number, length: number) {
  if (event.key === "ArrowRight" || event.key === "ArrowDown") return (index + 1) % length;
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") return (index - 1 + length) % length;
  if (event.key === "Home") return 0;
  if (event.key === "End") return length - 1;
  return null;
}

function WorkflowOverview({ project }: { project: Project }) {
  const presentation = projectPresentation[project.slug];
  const [selected, setSelected] = useState(0);
  const nodes = presentation.nodeIds.map(id => project.trace.nodes.find(node => node.id === id)!);
  const node = nodes[selected];
  const buttons = useRef<HTMLDivElement>(null);

  function choose(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = nextIndex(event, index, nodes.length);
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    buttons.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  return (
    <div className={styles.overview} data-project={project.slug}>
      <div className={styles.overviewTop}>
        <span className={styles.systemIcon}><SectionIcon name={presentation.icon} width={36} height={36} /></span>
        <div><p className={styles.miniLabel}>Inside {presentation.label}</p><h4>{presentation.headline}</h4></div>
      </div>
      <div className={styles.workflowHeader}><span>Explore the workflow</span><span>Hover or select a stage <ArrowRight width={14} height={14} /></span></div>
      <div className={styles.workflow} ref={buttons} role="tablist" aria-label={`${presentation.label} workflow`}>
        {nodes.map((step, index) => <button key={step.id} type="button" role="tab" id={`workflow-${project.slug}-${step.id}`} aria-selected={selected === index} aria-controls={`workflow-detail-${project.slug}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onPointerEnter={event => event.pointerType === "mouse" && setSelected(index)} onKeyDown={event => choose(event, index)}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><SectionIcon name={kindIcons[step.kind] ?? "code"} width={25} height={25} /><strong>{step.label}</strong></button>)}
      </div>
      <div className={styles.stepDetail} role="tabpanel" id={`workflow-detail-${project.slug}`} aria-labelledby={`workflow-${project.slug}-${node.id}`} tabIndex={0}>
        <p className={styles.miniLabel}>Stage {String(selected + 1).padStart(2, "0")} / {node.kind}</p>
        <h5>{node.label}</h5><p>{node.detail}</p>
        {node.layers && <ul>{node.layers.map(layer => <li key={layer.label}><strong>{layer.label}</strong><span>{layer.detail}</span></li>)}</ul>}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return <ul className={styles.bulletList}>{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

function ProjectDetails({ project, tab }: { project: Project; tab: ProjectTab }) {
  if (tab === "Overview") return <WorkflowOverview key={project.slug} project={project} />;
  if (tab === "Architecture") return <div className={styles.details}><p className={styles.miniLabel}>How the system connects</p><h4>{project.trace.title}</h4><p>{project.solution}</p><div className={styles.trace}><Trace key={project.slug} trace={project.trace} accent={project.accent} /></div></div>;
  return (
    <div className={styles.details}>
      <p className={styles.miniLabel}>{projectPresentation[project.slug].label} / {tab}</p>
      <h4>{tab === "Problem" ? "The problem to solve" : tab === "Solution" ? "What I built" : tab === "Stack" ? "The tools behind the work" : "What the system enables"}</h4>
      {tab === "Problem" && <><p>{project.problemLong}</p><div className={styles.callout}><strong>Key challenge</strong><p>{project.challenge}</p></div><h5>Constraints</h5><BulletList items={project.constraints} /></>}
      {tab === "Solution" && <><p>{project.solution}</p><h5>My contribution</h5><BulletList items={project.contribution} /></>}
      {tab === "Stack" && <dl className={styles.stackGroups}>{project.stack.map(group => <div key={group.group}><dt>{group.group}</dt><dd>{group.items.map(item => <span key={item}>{item}</span>)}</dd></div>)}</dl>}
      {tab === "Outcome" && <><p>{project.outcome}</p><BulletList items={project.outcomes} /></>}
    </div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<ProjectTab>("Overview");
  const projectNav = useRef<HTMLDivElement>(null);
  const detailNav = useRef<HTMLDivElement>(null);
  const project = orderedProjects[selected];
  const presentation = projectPresentation[project.slug];

  function selectProject(index: number) { setSelected(index); setTab("Overview"); }
  function handleProjectKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = nextIndex(event, index, orderedProjects.length);
    if (next === null) return;
    event.preventDefault();
    selectProject(next);
    const button = projectNav.current?.querySelectorAll<HTMLButtonElement>("button")[next];
    button?.focus();
    button?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  function handleDetailKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = nextIndex(event, index, tabs.length);
    if (next === null) return;
    event.preventDefault();
    setTab(tabs[next]);
    detailNav.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className={`${section.section} ${styles.section}`}>
      <Workspace scene="projects" />
      <div className={section.inner}>
        <div className={styles.heading}><p className={section.eyebrow}>Selected work</p><h2 id="projects-title">Real problems.<br /><span>Systems I built to solve them.</span></h2><p>Six enterprise projects. Explore the thinking, architecture and work behind each one.</p></div>
        <div className={styles.projectNav} ref={projectNav} role="tablist" aria-label="Select a project">
          {orderedProjects.map((item, index) => <button key={item.slug} id={`project-select-${item.slug}`} type="button" role="tab" aria-selected={selected === index} aria-controls="selected-project" tabIndex={selected === index ? 0 : -1} onClick={() => selectProject(index)} onKeyDown={event => handleProjectKey(event, index)}><SectionIcon name={projectPresentation[item.slug].icon} width={20} height={20} /><span>{projectPresentation[item.slug].label}</span></button>)}
        </div>
        <div className={styles.projectContent} id="selected-project" role="tabpanel" aria-labelledby={`project-select-${project.slug}`} style={{ "--project-accent": colors[project.slug] } as CSSProperties}>
          <div className={styles.projectIntro}>
            <p className={styles.miniLabel}>{String(selected + 1).padStart(2, "0")} / {project.context}</p>
            <span className={styles.projectIcon}><SectionIcon name={presentation.icon} width={30} height={30} /></span>
            <h3>{presentation.label}</h3><p className={styles.descriptor}>{project.descriptor}</p>
            <p className={styles.role}>{project.role}</p>
            <div className={styles.detailNav} ref={detailNav} role="tablist" aria-label={`${presentation.label} details`}>
              {tabs.map((item, index) => <button key={item} type="button" role="tab" id={`project-tab-${item.toLowerCase()}`} aria-selected={item === tab} aria-controls="project-panel" tabIndex={item === tab ? 0 : -1} onClick={() => setTab(item)} onKeyDown={event => handleDetailKey(event, index)}>{item}<ArrowRight width={15} height={15} /></button>)}
            </div>
            <a className={styles.caseStudy} href={asset(`/projects/${project.slug}/`)}>Read full case study <ArrowRight width={16} height={16} /></a>
          </div>
          <div className={styles.contentPanel} id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${tab.toLowerCase()}`} tabIndex={0}><ProjectDetails key={`${project.slug}-${tab}`} project={project} tab={tab} /></div>
        </div>
      </div>
    </section>
  );
}
