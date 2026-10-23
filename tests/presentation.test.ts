import assert from "node:assert/strict";
import { test } from "node:test";
import { createMotes } from "../src/components/hero/motes.ts";
import { projects } from "../src/data/projects.ts";
import { projectOrder, projectPresentation } from "../src/data/projectPresentation.ts";
import { toolCatalog, workIndex } from "../src/data/skills.ts";
import { labItems } from "../src/data/lab.ts";

test("hero particle styles are reproducible with explicit units and bounded precision", () => {
  const motes = createMotes();
  assert.deepEqual(motes, createMotes());
  assert.equal(motes.length, 22);
  for (const mote of motes) {
    for (const value of [mote.x, mote.y]) assert.match(value, /^\d+\.\d{2}%$/);
    assert.match(mote.size, /^\d+\.\d{2}px$/);
    assert.match(mote.duration, /^\d+\.\d{2}s$/);
    assert.match(mote.delay, /^-\d+\.\d{2}s$/);
    assert.ok(parseFloat(mote.x) >= 4 && parseFloat(mote.x) <= 96);
    assert.ok(parseFloat(mote.y) >= 20 && parseFloat(mote.y) <= 95);
  }
});

test("tool map includes every project technology with a real work link", () => {
  const byName = new Map(toolCatalog.map(skill => [skill.name.toLowerCase(), skill]));
  assert.equal(byName.size, toolCatalog.length);
  for (const project of projects) for (const group of project.stack) for (const tool of group.items) {
    assert.ok(byName.get(tool.toLowerCase())?.usedIn.includes(project.slug), `${tool}: ${project.slug}`);
  }
  for (const skill of toolCatalog) for (const key of skill.usedIn) assert.ok(workIndex[key], `${skill.name}: ${key}`);
  assert.ok(!labItems.some(item => item.id === "expense-audit"));
  assert.ok(toolCatalog.every(skill => !skill.usedIn.includes("expense-audit")));
});

test("every resume project has navigation and real architecture steps", () => {
  assert.deepEqual(new Set(projectOrder), new Set(projects.map(project => project.slug)));
  assert.equal(projectOrder.length, projects.length);
  for (const project of projects) {
    const presentation = projectPresentation[project.slug];
    assert.ok(presentation, project.slug);
    assert.equal(presentation.nodeIds.length, 6);
    assert.equal(new Set(presentation.nodeIds).size, 6);
    for (const id of presentation.nodeIds) assert.ok(project.trace.nodes.some(node => node.id === id), `${project.slug}: ${id}`);
  }
});
