import type { CSSProperties } from "react";
import { ArrowUpRight, GitHub } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { labItems } from "@/data/lab";
import { profile } from "@/data/profile";

const STATUS_COLOR: Record<string, string> = {
  "Public repo": "#6ee7b7",
  Evaluation: "#f5c26b",
};

export function Lab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="relative pb-[70px] pt-[90px]">
      <div className="container-x">
        <SectionHeading
          id="lab-title"
          index="04"
          eyebrow="AI Lab"
          title={
            <>
              Models, experiments<br /><span>&amp; prototypes.</span>
            </>
          }
        />

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {labItems.map((item, i) => (
            <li
              key={item.id}
              id={`lab-${item.id}`}
              className="reveal spotlight panel group relative flex scroll-mt-28 flex-col p-6 transition-colors hover:border-line-strong"
              style={{ "--delay": `${(i % 3) * 70}ms` } as CSSProperties}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-[0.14em]" style={{ color: STATUS_COLOR[item.status] ?? "#8fb3ff" }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" aria-hidden />
                  {item.status}
                </span>
                {item.href ? <ArrowUpRight className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" /> : null}
              </div>
              <h3 className="mt-5 text-[1.25rem] font-semibold leading-snug tracking-tight">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']">
                    {item.title}
                    <span className="sr-only"> (GitHub, opens in a new tab)</span>
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="text-pretty mt-2.5 text-[0.93rem] leading-relaxed text-muted">{item.summary}</p>
              <details className="relative z-10 mt-5 rounded-xl border border-line bg-bg/40 p-3">
                <summary className="cursor-pointer text-[0.8rem] font-medium text-cyan">How it works</summary>
                <ul className="mt-3 grid gap-3 text-[0.82rem] leading-relaxed text-fg-2">
                  {item.details.map(detail => <li key={detail}>{detail}</li>)}
                </ul>
              </details>
              <p className="mt-auto pt-6 font-mono text-[0.68rem] text-fg-2">{item.stack.slice(0, 4).join(" · ")}</p>
            </li>
          ))}
        </ul>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal mt-8 inline-flex items-center gap-2 text-[0.95rem] text-muted transition-colors hover:text-fg"
        >
          <GitHub width={16} height={16} /> More on GitHub @{profile.githubHandle} <ArrowUpRight width={14} height={14} />
        </a>
      </div>
    </section>
  );
}
