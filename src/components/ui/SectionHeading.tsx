import type { ReactNode } from "react";

export function SectionHeading({ index, eyebrow, title, id, align = "left" }: { index: string; eyebrow: string; title: ReactNode; id?: string; align?: "left" | "center" }) {
  const center = align === "center";
  return (
    <header className={`reveal mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
      <p className={`flex items-center font-mono text-[12px] uppercase tracking-[0.31em] text-[#a2bbdb] ${center ? "justify-center" : ""}`}>
        <span className="mr-[14px] text-[#00e6ed]">{index}</span>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-6 text-balance text-[clamp(32px,3.5vw,54px)] font-[650] leading-[1.12] tracking-[-0.035em] [&_span]:text-[#00dae7] ${center ? "mx-auto max-w-3xl" : "max-w-4xl"}`}
      >
        {title}
      </h2>
      <span aria-hidden className={`mt-[26px] block h-[2px] w-[52px] bg-[#00e7e2] ${center ? "mx-auto" : ""}`} />
    </header>
  );
}
