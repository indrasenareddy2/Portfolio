import type { SVGProps } from "react";

export type SectionIconName = "database" | "network" | "chart" | "cloud" | "education" | "document" | "settings" | "code" | "chat" | "search" | "calendar" | "shield" | "spark" | "leaf" | "react" | "node";

export function SectionIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: SectionIconName }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {name === "database" && <><ellipse cx="16" cy="7" rx="10" ry="4" /><path d="M6 7v18c0 5.3 20 5.3 20 0V7M6 13c0 5.3 20 5.3 20 0M6 19c0 5.3 20 5.3 20 0" /></>}
      {name === "network" && <><path d="m10 10 10 10M10 22l10-12" /><circle cx="7" cy="7" r="4" /><circle cx="25" cy="7" r="4" /><circle cx="7" cy="25" r="4" /><circle cx="25" cy="25" r="4" /></>}
      {name === "chart" && <><path d="M5 27h23" /><path d="M7 24v-9h4v9m4 0V9h4v15m4 0V3h4v21" strokeWidth="3" /></>}
      {name === "cloud" && <path d="M9 25a7 7 0 0 1-1-14 9 9 0 0 1 17-2 8 8 0 0 1-1 16H9Z" />}
      {name === "education" && <path d="m2 11 14-7 14 7-14 7-14-7Zm6 4v9c5 4 11 4 16 0v-9M29 12v11" />}
      {name === "document" && <path d="M7 3h12l7 7v19H7V3Zm12 0v8h7M12 16h9M12 21h9M12 26h5" />}
      {name === "settings" && <><path d="m13 3-1 4-3 2-4-1-2 5 3 3-1 4 4 4 4-1 3 3 5-2-1-4 2-3 4-1v-6l-4-1-2-3 1-4-5-2-3 3Z" transform="translate(2 1) scale(.92)" /><circle cx="16" cy="16" r="5" /></>}
      {name === "code" && <path d="m10 7-8 9 8 9m12-18 8 9-8 9M19 4l-6 24" />}
      {name === "chat" && <><path d="M6 4h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H13l-9 5v-6a4 4 0 0 1-2-3V8a4 4 0 0 1 4-4Z" /><circle cx="10" cy="15" r="1" /><circle cx="16" cy="15" r="1" /><circle cx="22" cy="15" r="1" /></>}
      {name === "search" && <><circle cx="13" cy="13" r="10" /><path d="m21 21 9 9" strokeWidth="3" /></>}
      {name === "calendar" && <><rect x="4" y="6" width="24" height="23" rx="3" /><path d="M4 13h24M10 2v8M22 2v8M10 19h3m6 0h3m-12 5h3" /></>}
      {name === "shield" && <><path d="m16 2 12 5v8c0 8-12 15-12 15S4 23 4 15V7l12-5Z" /><path d="m10 16 4 4 8-9" /></>}
      {name === "spark" && <><path d="m16 2 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" /><path d="m26 2 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" /></>}
      {name === "leaf" && <><path d="M16 2S1 17 16 29C31 17 16 2 16 2Z" fill="currentColor" stroke="none" /><path d="M16 8v23" stroke="#092b26" strokeWidth="1" /></>}
      {name === "react" && <><ellipse cx="16" cy="16" rx="15" ry="6" /><ellipse cx="16" cy="16" rx="15" ry="6" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="15" ry="6" transform="rotate(120 16 16)" /><circle cx="16" cy="16" r="2.5" fill="currentColor" /></>}
      {name === "node" && <><path d="m16 2 13 7v14l-13 7-13-7V9l13-7Z" /><path d="M12 11v10c0 4-5 4-5 1m17-9c-7-5-11 2-5 4 9 2 4 10-3 4" /></>}
    </svg>
  );
}
