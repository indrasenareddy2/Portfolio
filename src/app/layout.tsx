import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Cursor } from "@/components/ui/Cursor";
import { InteractionLayer } from "@/components/ui/InteractionLayer";
import { profile } from "@/data/profile";
import { SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: SITE_TITLE, template: `%s · ${profile.shortName}` },
  description: SITE_DESCRIPTION,
  applicationName: `${profile.shortName} · Portfolio`,
  authors: [{ name: profile.fullName, url: SITE_URL }],
  creator: profile.fullName,
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "Generative AI",
    "RAG",
    "LangGraph",
    "LangChain",
    "Agentic AI",
    "MongoDB Vector Search",
    "Machine Learning",
    "Indrasena Reddy",
    "Thallapalli Indrasena Reddy",
  ],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/`,
    siteName: `${profile.shortName} · AI / ML Engineer`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    firstName: "Indrasena Reddy",
    lastName: "Thallapalli",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.shortName,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Dr. M.G.R. University" },
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Generative AI", "Retrieval-Augmented Generation", "AI Agents", "LangGraph", "Machine Learning", "MongoDB Vector Search"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} no-js`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <div className="page-atmosphere" aria-hidden />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <InteractionLayer />
        <Cursor />
      </body>
    </html>
  );
}
