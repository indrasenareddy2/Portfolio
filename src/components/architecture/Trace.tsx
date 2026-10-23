"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Accent, NodeKind, Trace as TraceData } from "@/data/types";
import { useInView } from "@/lib/hooks/useInView";
import { ACCENT, KIND_STYLE, TONE } from "./styles";

function groupFor(trace: TraceData, index: number) {
  const ids = trace.nodes.map((n) => n.id);
  return trace.groups?.find((g) => index >= ids.indexOf(g.from) && index <= ids.indexOf(g.to));
}

/**
 * An execution-trace view of a system: ordered steps on a rail, illuminated in sequence.
 * `compact` shows one node's detail at a time in an inspector; `full` expands all details inline.
 */
export function Trace({ trace, accent, variant = "compact" }: { trace: TraceData; accent: Accent; variant?: "compact" | "full" }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const list = useRef<HTMLOListElement>(null);
  const [selected, setSelected] = useState(0);
  const [railLen, setRailLen] = useState(400);
  const inspectorId = useId();
  const full = variant === "full";

  useEffect(() => {
    const el = list.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setRailLen(Math.max(0, el.offsetHeight - 60)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const node = trace.nodes[selected];

  return (
    <div
      ref={ref}
      className={`trace ${inView ? "is-live" : ""}`}
      style={{ "--accent": ACCENT[accent], "--rail-len": `${railLen}px` } as CSSProperties}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
          <span className="text-[color:var(--accent)]">trace</span> · {trace.title}
        </p>
        <p className="hidden font-mono text-[0.68rem] text-faint sm:block">{trace.nodes.length} steps</p>
      </div>

      <div className="relative">
        <span className="trace-rail" aria-hidden />
        <span className="trace-pulse" aria-hidden />
        <ol ref={list} className="relative grid gap-1.5" aria-label={`${trace.title}: system steps`}>
          {trace.nodes.map((n, i) => {
            const k = KIND_STYLE[n.kind];
            const group = groupFor(trace, i);
            const groupStart = group && trace.nodes[i].id === group.from;
            const isSel = !full && selected === i;
            const body = (
              <>
                <span
                  className="trace-dot relative z-10 mt-[0.4rem] h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: k.color }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-[0.95rem] font-medium leading-snug text-fg">{n.label}</span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em]" style={{ color: k.color }}>
                      {k.tag}
                    </span>
                  </span>
                  {full && <span className="mt-1.5 block text-[0.92rem] leading-relaxed text-muted">{n.detail}</span>}
                  {n.layers && (
                    <span className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
                      {n.layers.map((l) => (
                        <span key={l.label} className="rounded-lg border border-[#5eead4]/20 bg-[#5eead4]/[0.04] px-2.5 py-2">
                          <span className="block font-mono text-[0.66rem] text-[#5eead4]">{l.label}</span>
                          {full && <span className="mt-1 block text-[0.8rem] leading-snug text-muted">{l.detail}</span>}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </>
            );
            return (
              <li key={n.id} className="relative">
                {groupStart && (
                  <p
                    className="mb-1.5 ml-9 mt-2 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em]"
                    style={{ color: TONE[group.tone] }}
                  >
                    <span className="h-px w-4" style={{ background: TONE[group.tone] }} aria-hidden />
                    {group.label}
                  </p>
                )}
                {full ? (
                  <div
                    className="trace-node flex gap-4 rounded-xl border border-transparent px-3 py-3"
                    style={{ "--i": i, "--node-color": k.color } as CSSProperties}
                  >
                    {body}
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-pressed={isSel}
                    aria-controls={inspectorId}
                    onClick={() => setSelected(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setSelected(i)}
                    className={`trace-node flex w-full gap-4 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      isSel ? "border-line-strong bg-white/[0.035]" : "border-transparent hover:bg-white/[0.02]"
                    }`}
                    style={{ "--i": i, "--node-color": k.color } as CSSProperties}
                  >
                    {body}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {!full && (
        <div id={inspectorId} aria-live="polite" className="mt-4 rounded-xl border border-line bg-surface-2/70 p-4">
          <p className="mb-1.5 flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-faint">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: KIND_STYLE[node.kind].color }} aria-hidden />
            step {String(selected + 1).padStart(2, "0")} · {KIND_STYLE[node.kind].tag}
          </p>
          <p className="text-[0.93rem] leading-relaxed text-fg-2">{node.detail}</p>
          {node.layers && (
            <ul className="mt-2 grid gap-1 text-[0.85rem] text-muted">
              {node.layers.map((l) => (
                <li key={l.label}>
                  <span className="font-mono text-[0.72rem] text-[#5eead4]">{l.label}</span> {l.detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function KindLegend() {
  const kinds: NodeKind[] = ["context", "retrieval", "llm", "guard", "cache", "output"];
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Step types">
      {kinds.map((k) => (
        <li key={k} className="flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: KIND_STYLE[k].color }} aria-hidden />
          {k === "guard" ? "guard / rule" : KIND_STYLE[k].tag}
        </li>
      ))}
    </ul>
  );
}
