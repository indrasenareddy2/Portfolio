import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { ACCENT } from "@/components/architecture/styles";
import { KindLegend, Trace } from "@/components/architecture/Trace";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { BASE_PATH, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name}: ${p.descriptor}`;
  const images = [{ url: `${BASE_PATH}/opengraph-image.jpg`, width: 1200, height: 630, alt: `${profile.fullName}, AI / ML Engineer` }];
  return {
    title,
    description: p.problem,
    alternates: { canonical: `${SITE_URL}/projects/${p.slug}/` },
    openGraph: { type: "article", title: `${title} · ${profile.shortName}`, description: p.problem, url: `${SITE_URL}/projects/${p.slug}/`, images },
    twitter: { card: "summary_large_image", title: `${title} · ${profile.shortName}`, description: p.problem, images },
  };
}

const TOC = [
  { id: "problem", label: "Problem" },
  { id: "constraints", label: "Constraints" },
  { id: "architecture", label: "Architecture" },
  { id: "contribution", label: "My contribution" },
  { id: "decisions", label: "Engineering decisions" },
  { id: "stack", label: "Stack" },
  { id: "outcome", label: "Outcome" },
];

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="reveal scroll-mt-28 border-t border-line pt-10">
      <p className="font-mono text-[0.7rem] text-faint">{String(n).padStart(2, "0")}</p>
      <h2 id={`${id}-h`} className="mt-2 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const accent = ACCENT[p.accent];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    headline: `${p.name}: ${p.descriptor}`,
    description: p.problem,
    author: { "@type": "Person", name: profile.fullName, url: SITE_URL },
    url: `${SITE_URL}/projects/${p.slug}/`,
    keywords: p.stack.flatMap((g) => g.items).join(", "),
  };

  return (
    <article className="relative" style={{ "--accent": accent } as CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] opacity-60" style={{ background: `radial-gradient(60rem 26rem at 70% -10%, ${accent}22, transparent 70%)` }} />

      <header className="container-x pb-14 pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)]">
        <Link href="/#projects" className="group inline-flex items-center gap-2 text-[0.9rem] text-muted transition-colors hover:text-fg">
          <ArrowLeft width={16} height={16} className="transition-transform group-hover:-translate-x-0.5" /> All projects
        </Link>
        <p className="fade-up eyebrow mt-10 flex flex-wrap gap-x-3 gap-y-1" style={{ "--delay": "60ms" } as CSSProperties}>
          <span style={{ color: accent }}>Case study</span>
          <span>{p.context}</span>
          <span>·</span>
          <span>{p.domain}</span>
        </p>
        <h1 className="display mt-5 text-[clamp(2.8rem,8vw,6.5rem)]">
          <span className="line-mask">
            <span style={{ "--delay": "120ms" } as CSSProperties}>{p.name}</span>
          </span>
        </h1>
        <p className="fade-up mt-4 text-[clamp(1.1rem,2vw,1.4rem)] text-fg-2" style={{ "--delay": "300ms" } as CSSProperties}>
          {p.descriptor}
        </p>
        <p className="fade-up text-pretty mt-8 max-w-3xl text-[clamp(1.15rem,1.8vw,1.35rem)] font-light leading-relaxed text-fg" style={{ "--delay": "420ms" } as CSSProperties}>
          {p.problem}
        </p>

        <dl className="fade-up mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3" style={{ "--delay": "540ms" } as CSSProperties}>
          {[
            { k: "Context", v: p.context },
            { k: "My role", v: p.role },
            { k: "Core stack", v: p.stack.flatMap((g) => g.items).slice(0, 5).join(" · ") },
          ].map((m) => (
            <div key={m.k} className="bg-bg p-5">
              <dt className="eyebrow">{m.k}</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-fg-2">{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container-x grid gap-12 pb-24 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-28 grid gap-1 border-l border-line">
            {TOC.map((t, k) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-[0.88rem] text-muted transition-colors hover:border-[color:var(--accent)] hover:text-fg">
                  <span className="font-mono text-[0.7rem] text-faint">{String(k + 1).padStart(2, "0")}</span>
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-16 lg:col-span-9">
          <Block id="problem" n={1} title="Problem">
            <p className="text-pretty max-w-3xl text-[1.08rem] leading-relaxed text-fg-2">{p.problemLong}</p>
            <div className="mt-6 max-w-3xl rounded-xl border border-line bg-surface p-5">
              <p className="eyebrow mb-2">Key challenge</p>
              <p className="text-[1rem] leading-relaxed text-fg">{p.challenge}</p>
            </div>
          </Block>

          <Block id="constraints" n={2} title="Constraints">
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.constraints.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border border-line p-4 text-[0.97rem] leading-relaxed text-fg-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="architecture" n={3} title="Architecture">
            <p className="text-pretty mb-6 max-w-3xl text-[1.02rem] leading-relaxed text-muted">{p.solution}</p>
            <div className="mb-5">
              <KindLegend />
            </div>
            <div className="panel p-4 sm:p-7">
              <Trace trace={p.trace} accent={p.accent} variant="full" />
            </div>
            <p className="mt-3 font-mono text-[0.68rem] text-faint">Conceptual reconstruction of the production flow. Internal names and data omitted.</p>
          </Block>

          <Block id="contribution" n={4} title="My contribution">
            <ol className="grid gap-3">
              {p.contribution.map((c, k) => (
                <li key={c} className="flex gap-4 border-b border-line pb-3 text-[1rem] leading-relaxed text-fg-2">
                  <span className="pt-0.5 font-mono text-[0.72rem]" style={{ color: accent }}>
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  {c}
                </li>
              ))}
            </ol>
          </Block>

          <Block id="decisions" n={5} title="Engineering decisions">
            <ul className="grid gap-4 md:grid-cols-2">
              {p.decisions.map((d) => (
                <li key={d.title} className="spotlight panel p-6">
                  <h3 className="text-[1.1rem] font-semibold tracking-tight">{d.title}</h3>
                  <p className="mt-3 text-[0.96rem] leading-relaxed text-muted">{d.body}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="stack" n={6} title="Stack">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {p.stack.map((g) => (
                <div key={g.group} className="bg-bg p-5">
                  <dt className="eyebrow">{g.group}</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="outcome" n={7} title="Outcome">
            <p className="text-pretty max-w-3xl text-[1.15rem] leading-relaxed text-fg">{p.outcome}</p>
            <ul className="mt-6 grid gap-2.5">
              {p.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[0.98rem] leading-relaxed text-fg-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ok" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-xl border border-dashed border-line-strong p-4 text-[0.9rem] leading-relaxed text-muted">{p.note}</p>
          </Block>

          <nav aria-label="More case studies" className="grid gap-3 border-t border-line pt-10 sm:grid-cols-2">
            <Link href={`/projects/${prev.slug}/`} className="group panel p-5 transition-colors hover:border-line-strong">
              <span className="eyebrow flex items-center gap-2">
                <ArrowLeft width={14} height={14} /> Previous
              </span>
              <span className="mt-2 block text-[1.15rem] font-semibold tracking-tight">{prev.name}</span>
            </Link>
            <Link href={`/projects/${next.slug}/`} className="group panel p-5 text-right transition-colors hover:border-line-strong">
              <span className="eyebrow flex items-center justify-end gap-2">
                Next <ArrowRight width={14} height={14} />
              </span>
              <span className="mt-2 block text-[1.15rem] font-semibold tracking-tight">{next.name}</span>
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
