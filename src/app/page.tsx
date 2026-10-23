import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Education } from "@/components/education/Education";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { Lab } from "@/components/lab/Lab";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Lab />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
