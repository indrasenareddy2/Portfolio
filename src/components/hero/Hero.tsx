"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { ArrowRight, Download, GitHub, LinkedIn, Mail } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { profile } from "@/data/profile";
import { asset } from "@/lib/site";
import { HeroArt } from "./HeroArt";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const section = useRef<HTMLElement>(null);

  return (
    <section ref={section} id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <HeroArt sectionRef={section} />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[var(--page-max)] flex-1 px-[var(--page-pad)] flex-col justify-end pb-16 pt-[calc(54svh)] lg:justify-center lg:pb-10 lg:pt-[var(--header-h)]">
        <div className="pointer-events-auto max-w-xl">
          <p className="fade-up text-[clamp(1.05rem,1.6vw,1.45rem)] tracking-wide text-cyan" style={d(80)}>
            Hello! I&apos;m
          </p>
          <h1 id="hero-title" className="mt-2 text-[clamp(2.1rem,3.2vw,3.6rem)] font-bold uppercase leading-[1.02] tracking-[0.01em] text-[#e9f6ff]">
            <span className="line-mask">
              <span style={d(160)}>{profile.firstName}</span>
            </span>
            <span className="line-mask">
              <span style={d(280)}>{profile.lastName}</span>
            </span>
          </h1>
          <p className="fade-up mt-4 font-mono text-[clamp(0.85rem,1.2vw,1.1rem)] uppercase tracking-[0.42em] text-[#8ea3c4]" style={d(460)}>
            AI / ML Engineer
          </p>
          <span className="grow-bar mt-5 block h-[3px] w-14 rounded-full bg-gradient-to-r from-cyan to-teal" style={d(600)} aria-hidden />

          <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={d(680)}>
            <Magnetic>
              <Link href="/#projects" className="btn btn-primary">
                View Work <ArrowRight />
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={asset(profile.resume)} download className="btn btn-ghost">
                <Download /> Download Resume
              </a>
            </Magnetic>
          </div>

          <div className="fade-up mt-8 flex items-center gap-2" style={d(820)}>
            {[
              { href: profile.github, label: "GitHub", Icon: GitHub },
              { href: profile.linkedin, label: "LinkedIn", Icon: LinkedIn },
              { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full text-fg transition-all hover:-translate-y-0.5 hover:text-cyan hover:shadow-[0_0_24px_-6px_var(--color-cyan)]"
              >
                <Icon width={22} height={22} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="fade-up pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center lg:flex" style={d(1200)}>
        <span className="scroll-cue relative h-10 w-px overflow-hidden bg-white/15" />
      </div>
    </section>
  );
}
