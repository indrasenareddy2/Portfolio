"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { SectionIcon, type SectionIconName } from "@/components/sections/SectionIcon";
import { toolCatalog, toolClusters, workIndex, type Skill } from "@/data/skills";
import { projects } from "@/data/projects";
import { asset } from "@/lib/site";
import styles from "./Skills.module.css";

const byName = new Map(toolCatalog.map(skill => [skill.name, skill]));
const projectKeys = new Set(projects.map(project => project.slug));
const orbitTools = [
  { name: "Python", label: "Python", x: 18, y: 28 },
  { name: "OpenAI", label: "OpenAI", x: 42, y: 10 },
  { name: "LangChain", label: "LangChain", x: 73, y: 20 },
  { name: "MongoDB", label: "MongoDB", x: 84, y: 42 },
  { name: "Node.js", label: "Node.js", x: 78, y: 66 },
  { name: "MongoDB Vector Search", label: "Vector Search", x: 70, y: 86 },
  { name: "GCP", label: "GCP", x: 45, y: 97 },
  { name: "AWS Rekognition", label: "AWS", x: 20, y: 82 },
  { name: "React", label: "React", x: 13, y: 56 },
];
const toolIcons: Record<string, SectionIconName> = { LangGraph: "network", LangChain: "network", OpenAI: "spark", MongoDB: "leaf", "Node.js": "node", "MongoDB Vector Search": "database", GCP: "cloud", React: "react" };

function ToolMark({ name }: { name: string }) {
  if (name === "Python") return <span className={styles.pythonMark} aria-hidden="true">Py</span>;
  if (name === "AWS Rekognition") return <span className={styles.awsMark} aria-hidden="true">aws</span>;
  return <SectionIcon name={toolIcons[name] ?? "code"} width={29} height={29} />;
}

function UsedIn({ skill }: { skill: Skill }) {
  if (!skill.usedIn.length) return <p className={styles.noProject}>Part of my working toolkit. A specific project is not listed for this tool.</p>;
  return (
    <ul className={styles.usedIn}>
      {skill.usedIn.map(key => {
        const work = workIndex[key];
        return <li key={key}><a href={asset(work.href)}><span>{work.name}<small>{projectKeys.has(key) ? "Project case study" : "Model or experiment"}</small></span><ArrowRight width={16} height={16} /></a></li>;
      })}
    </ul>
  );
}

export function Skills() {
  const [active, setActive] = useState("LangGraph");
  const skill = byName.get(active)!;
  const related = useMemo(() => {
    const keys = new Set(skill.usedIn);
    return toolCatalog.filter(tool => tool.name !== active && tool.usedIn.some(key => keys.has(key)));
  }, [skill, active]);

  return (
    <section id="skills" aria-labelledby="skills-title" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}><p className={styles.eyebrow}><span>05</span> Skills</p><h2 id="skills-title">Tap a tool to see<br /><span>where it shipped.</span></h2><span className={styles.accent} aria-hidden="true" /><p>A quick look at the tools behind real AI systems.</p></div>
        <div className={styles.ecosystem}>
          <div className={styles.orbit} role="group" aria-label="Featured tools">
            <svg viewBox="0 0 900 530" className={styles.orbitLines} fill="none" aria-hidden="true">
              <ellipse cx="455" cy="269" rx="425" ry="206" stroke="#184265" transform="rotate(-10 455 269)" />
              <ellipse cx="455" cy="269" rx="337" ry="144" stroke="#155271" strokeDasharray="4 9" transform="rotate(13 455 269)" />
              <ellipse cx="455" cy="269" rx="169" ry="110" stroke="#0f4a6b" strokeDasharray="3 8" />
              <path d="M100 300 440 265 730 105M440 265 715 355M440 265 400 500" stroke="#163a57" strokeDasharray="3 10" />
              {[[80, 352], [168, 118], [326, 61], [633, 63], [829, 249], [651, 467], [315, 481], [505, 379]].map(([x, y], index) => <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 4 : 3} fill={index % 3 === 0 ? "#0cb6ff" : index % 2 === 0 ? "#af78fc" : "#00e1de"} />)}
            </svg>
            {orbitTools.map(tool => <button key={tool.name} type="button" aria-pressed={active === tool.name} aria-controls="selected-tool" aria-label={`${tool.name}, show projects`} data-tool={tool.name} className={styles.orbitTool} style={{ "--tool-x": `${tool.x}%`, "--tool-y": `${tool.y}%` } as CSSProperties} onClick={() => setActive(tool.name)} onPointerEnter={event => event.pointerType === "mouse" && setActive(tool.name)}><ToolMark name={tool.name} /><span>{tool.label}</span></button>)}
            <button type="button" aria-pressed={active === "LangGraph"} aria-controls="selected-tool" data-tool="LangGraph" className={`${styles.orbitTool} ${styles.centerTool}`} onClick={() => setActive("LangGraph")} onPointerEnter={event => event.pointerType === "mouse" && setActive("LangGraph")}><ToolMark name="LangGraph" /><span>LangGraph</span></button>
          </div>
          <aside id="selected-tool" className={styles.selected} aria-label="Selected skill" aria-live="polite">
            <p className={styles.cardLabel}>Selected</p><h3>{skill.name}</h3>
            <p className={styles.cardLabel}>Used in</p><UsedIn skill={skill} />
            {related.length > 0 && <><p className={styles.cardLabel}>Shipped alongside</p><div className={styles.related}>{related.slice(0, 14).map(tool => <button key={tool.name} type="button" data-tool={tool.name} aria-controls="selected-tool" onClick={() => setActive(tool.name)}>{tool.name}</button>)}</div></>}
          </aside>
        </div>
        <details className={styles.allTools}>
          <summary>Explore all {toolCatalog.length} tools <span>Browse the full toolkit <span aria-hidden="true">+</span></span></summary>
          <p className={styles.catalogIntro}>Select any tool to update the project connections above.</p>
          <div className={styles.toolGrid}>{toolClusters.filter(cluster => cluster.skills.length).map(cluster => <div key={cluster.id} className={styles.cluster}><h3>{cluster.title}</h3><ul>{cluster.skills.map(tool => <li key={tool.name}><button type="button" data-tool={tool.name} aria-pressed={active === tool.name} aria-controls="selected-tool" onClick={() => setActive(tool.name)}>{tool.name}{tool.usedIn.length > 0 && <span>{tool.usedIn.length}<span className="sr-only"> projects or experiments</span></span>}</button></li>)}</ul></div>)}</div>
        </details>
      </div>
    </section>
  );
}
