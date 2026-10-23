import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { roles } from "../src/data/experience.ts";
import { labItems } from "../src/data/lab.ts";
import { projects } from "../src/data/projects.ts";
import { skillClusters, workIndex } from "../src/data/skills.ts";

test("project slugs are unique and URL-safe", () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/);
});

test("every skill reference points at real work", () => {
  for (const cluster of skillClusters)
    for (const skill of cluster.skills)
      for (const key of skill.usedIn) assert.ok(workIndex[key], `${skill.name} → unknown "${key}"`);
});

test("experience tracks reference real projects", () => {
  const slugs = new Set(projects.map((p) => p.slug));
  for (const r of roles) for (const t of r.tracks) for (const p of t.projects ?? []) assert.ok(slugs.has(p), p);
});

test("trace groups reference existing nodes in order", () => {
  for (const p of projects) {
    const ids = p.trace.nodes.map((n) => n.id);
    assert.equal(new Set(ids).size, ids.length, `${p.slug} has duplicate node ids`);
    for (const g of p.trace.groups ?? []) {
      const a = ids.indexOf(g.from);
      const b = ids.indexOf(g.to);
      assert.ok(a >= 0 && b >= a, `${p.slug}: group "${g.label}" range invalid`);
    }
  }
});

test("lab ids are unique", () => {
  const ids = labItems.map((l) => l.id);
  assert.equal(new Set(ids).size, ids.length);
});

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

test("site source does not mention excluded or confidential names", () => {
  const files = walk("src").filter((f) => /\.(ts|tsx|css)$/.test(f));
  for (const f of files) {
    const text = readFileSync(f, "utf8");
    assert.doesNotMatch(text, /jarvis/i, `${f} mentions JARVIS`);
    assert.doesNotMatch(text, /air\s*india/i, `${f} names the airline client`);
  }
});

test("external links are https", () => {
  for (const l of labItems) if (l.href) assert.match(l.href, /^https:\/\//);
  for (const p of projects) for (const l of p.links ?? []) assert.match(l.href, /^https:\/\//);
});
