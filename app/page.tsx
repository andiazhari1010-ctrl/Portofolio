import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Currently } from "@/components/Currently";
import { Skills } from "@/components/Skills";
import { Journey } from "@/components/Journey";
import { TechMarquee } from "@/components/TechMarquee";
import { SecurityLabs } from "@/components/SecurityLabs";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Page composition. Each section is its own component with its own layout
 * family, ordered to the brief. Motion lives inside the client leaves; this
 * stays a server component.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Currently />
        <Skills />
        <Journey />
        <TechMarquee />
        <SecurityLabs />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
