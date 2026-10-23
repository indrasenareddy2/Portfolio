"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Menu } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { asset, navItems } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy on the home page.
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Mobile sheet: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a")?.focus();
    const button = menuButton.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheet.current) {
        const items = Array.from(sheet.current.querySelectorAll<HTMLElement>("a, button"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  // Close the sheet when a navigation happens.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="header-pad fixed inset-x-0 top-0 z-50 flex justify-center pt-3 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`nav-shell flex h-14 items-center justify-between rounded-2xl pr-2 transition-all duration-500 lg:pr-1 ${
          scrolled || open ? "glass shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)]" : "border border-transparent"
        }`}
      >
        <Link href="/" className="group relative flex items-center" aria-label={`${profile.shortName}, home`}>
          <span className="text-[1.05rem] font-medium tracking-[0.42em] text-fg">TIR</span>
          <span aria-hidden className="absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-2 lg:flex">
            {navItems.map((n) => {
              const current = isHome && active === n.id;
              return (
                <li key={n.id}>
                  <Link
                    href={`/#${n.id}`}
                    aria-current={current ? "true" : undefined}
                    className={`relative px-4 py-2 text-[0.74rem] font-medium uppercase tracking-[0.24em] transition-colors ${current ? "text-cyan" : "text-fg hover:text-cyan"}`}
                  >
                    {n.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-4 -bottom-0.5 h-px bg-cyan shadow-[0_0_8px_var(--color-cyan)] transition-transform duration-300 ${current ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </Link>
                </li>
              );
            })}
            <li>
              <a href={asset(profile.resume)} download className="px-4 py-2 text-[0.74rem] font-medium uppercase tracking-[0.24em] text-fg transition-colors hover:text-cyan">
                Resume
              </a>
            </li>
          </ul>
          <button
            ref={menuButton}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl text-fg transition-colors hover:bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        ref={sheet}
        hidden={!open}
        className="fixed inset-x-3 top-[4.6rem] border border-line bg-surface/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl max-h-[calc(100svh-5.5rem)] overflow-y-auto rounded-2xl p-3 sm:inset-x-4 lg:hidden"
      >
        <ul className="grid">
          {navItems.map((n, i) => (
            <li key={n.id}>
              <Link
                href={`/#${n.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between rounded-xl px-4 py-3.5 text-[1.35rem] font-medium tracking-tight transition-colors hover:bg-white/5"
              >
                {n.label}
                <span className="font-mono text-[0.7rem] text-faint">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-2 grid grid-cols-3 gap-2 border-t border-line pt-3">
          <a href={asset(profile.resume)} download className="btn btn-ghost h-11 text-[0.85rem]">
            Resume
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-11 text-[0.85rem]">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-11 text-[0.85rem]">
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
