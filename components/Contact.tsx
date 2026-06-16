import { Eye, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ContactEmail } from "./ContactEmail";
import { ContactForm } from "./ContactForm";
import { Socials } from "./Socials";
import { Button } from "./Button";

/**
 * Closing section, two columns: the direct line (email, resume, socials) on the
 * left, the form on the right. "Contact" has exactly one intent (the email is
 * the headline action); View and Download CV are two distinct actions on the
 * same resume, not competing contact CTAs.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="flex min-h-[100dvh] items-center py-24"
    >
      <div className="shell">
        <SectionHeading id="contact" index="07" title="Contact" />

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* direct line */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <p className="max-w-[42ch] text-xl leading-relaxed text-muted">
                <span className="text-ink">Open to internships and entry-level roles</span>{" "}
                in security analysis and web development. The fastest way to reach
                me is email.
              </p>
            </Reveal>

            <Reveal className="mt-8">
              <ContactEmail />
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap gap-3">
              <Button href={profile.cv} variant="secondary" external>
                View CV
                <Eye size={18} weight="bold" />
              </Button>
              <Button href={profile.cv} variant="secondary" download>
                Download
                <DownloadSimple size={18} weight="bold" />
              </Button>
            </Reveal>

            <Reveal className="mt-8">
              <Socials />
            </Reveal>
          </div>

          {/* form */}
          <Reveal className="min-w-0 lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
