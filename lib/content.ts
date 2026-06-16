/**
 * Single source of truth for everything written on the page.
 * Update social URLs and the CV file here, not in the components.
 */

export const profile = {
  name: "Andy Azhari Pane",
  nickname: "Andy",
  role: "Information Technology Student & Aspiring Cybersecurity Analyst",
  tagline: "Securing systems, building the web.",
  location: "Bandung, Indonesia",
  university: "Telkom University",
  program: "S1 Teknologi Informasi",
  gpa: "3.57",
  gpaScale: "4.00",
  email: "andiazhari1010@gmail.com",
  github: "https://github.com/andiazhari1010-ctrl",
  linkedin: "https://www.linkedin.com/in/andy-azhari-pane-858a08252",
  // Drop the real file at /public/cv.pdf (see README).
  cv: "/cv.pdf",
} as const;

export type NavItem = { id: string; index: string; label: string };

export const navItems: NavItem[] = [
  { id: "about", index: "01", label: "About" },
  { id: "skills", index: "02", label: "Skills" },
  { id: "journey", index: "03", label: "Journey" },
  { id: "labs", index: "04", label: "Labs" },
  { id: "projects", index: "05", label: "Projects" },
  { id: "credentials", index: "06", label: "Credentials" },
  { id: "contact", index: "07", label: "Contact" },
];

export const about = {
  body: [
    "I am an IT student at Telkom University focused on cybersecurity, cloud computing, and web development. My work sits where defensive security meets real, shipped software.",
    "I care most about penetration testing and building applications that are secure by default rather than secured after the fact. I like understanding a system well enough to break it, then well enough to fix it.",
  ],
  // key facts shown as a stat rail; the GPA is the single neon-lit highlight
  facts: [
    { label: "Based in", value: profile.location, mono: false },
    { label: "Program", value: `${profile.program}, ${profile.university}`, mono: false },
    { label: "Cumulative GPA", value: `${profile.gpa} / ${profile.gpaScale}`, mono: true, highlight: true },
    { label: "Focus", value: "Offensive & defensive security", mono: false },
  ],
} as const;

/**
 * Present-tense focus. Kept about the craft (what I am learning and building),
 * not availability, so it does not repeat the hero's status panel.
 */
export const now = {
  lead:
    "Right now I am deep in detection engineering: reading logs, tuning alerts, and walking incidents from the first signal to a response.",
  body:
    "Alongside that I build web applications that are secure by default, not bolted on after the fact.",
  threads: [
    { kicker: "Learning", text: "Blue-team detection and log analysis on TryHackMe." },
    { kicker: "Building", text: "Secure-by-default web apps in Laravel and React." },
    { kicker: "Sharpening", text: "Offensive fundamentals to pressure-test the defense." },
  ],
} as const;

export type JourneyEntry = { kicker: string; title: string; detail: string };

/**
 * The route from general IT to security, as honest stages rather than invented
 * calendar dates. Every detail traces back to a real fact elsewhere in this file.
 */
export const journey: JourneyEntry[] = [
  {
    kicker: "Education",
    title: "S1 Teknologi Informasi, Telkom University",
    detail:
      "Programming, systems, and networking fundamentals in Bandung. Cumulative GPA 3.57 out of 4.00.",
  },
  {
    kicker: "Focus",
    title: "Turned toward security",
    detail:
      "Moved from general IT into offensive and defensive security, anchored on the OWASP Top 10 and secure design.",
  },
  {
    kicker: "Practice",
    title: "TryHackMe blue-team track",
    detail:
      "Five rooms across intrusion detection, ELK log analysis, and Linux and Windows threat detection, plus a start on offensive basics.",
  },
  {
    kicker: "Training",
    title: "SOC analyst and web pentesting",
    detail:
      "Structured courses from JadiHacker, plus Cisco's Introduction to Cybersecurity.",
  },
];

export type SkillGroup = { title: string; note: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Security",
    note: "Finding the gap before someone else does.",
    items: ["Penetration Testing", "OWASP Top 10", "Wazuh SIEM", "NIST SP 800-115"],
  },
  {
    title: "Development",
    note: "Shipping the thing, not just planning it.",
    items: ["Laravel", "React", "Flutter", "JavaScript / TypeScript", "PHP"],
  },
  {
    title: "Cloud & Tools",
    note: "Where the work actually runs.",
    items: ["Google Cloud Platform", "Firebase", "Git"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  tags: string[];
  featured?: boolean;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Smart Parking System",
    blurb: "Object-oriented design",
    description:
      "A parking management system built for an Object-Oriented Programming course project, modeling vehicles, parking slots, and transactions as classes with clean encapsulation and inheritance.",
    tags: ["OOP", "Object-Oriented Design"],
    featured: true,
    links: [
      { label: "Source", href: "https://github.com/andiazhari1010-ctrl/smart-parking-tubes" },
    ],
  },
  {
    title: "Laravel Web Application",
    blurb: "Full-stack web app",
    description:
      "A full-stack application built on Laravel, with authentication, role-based access, and a relational data model behind a server-rendered interface.",
    tags: ["Laravel", "PHP", "MySQL", "Blade"],
    links: [{ label: "Source", href: "https://github.com/andiazhari1010-ctrl/tubes-laravel" }],
  },
  {
    title: "Flutter Mobile App",
    blurb: "Cross-platform mobile",
    description:
      "A cross-platform mobile project written once in Flutter and shipped to both Android and iOS, backed by Firebase for auth and live data.",
    tags: ["Flutter", "Dart", "Firebase"],
    links: [{ label: "Source", href: "https://github.com/andiazhari1010-ctrl/tubes-flutter" }],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  detail: string;
};

export const certifications: Certification[] = [
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    detail: "Foundations of threats, attacks, and the principles behind defending networks and data.",
  },
];

/**
 * Courses completed without a saved certificate file. Presented honestly as
 * training, not as credentials with verifiable IDs.
 */
export const training: Certification[] = [
  {
    title: "SOC Analyst Course",
    issuer: "JadiHacker",
    detail: "Security operations workflow: monitoring, log analysis, and incident triage with a SIEM.",
  },
  {
    title: "Web Pentesting Course",
    issuer: "JadiHacker",
    detail: "Practical web application penetration testing across the OWASP Top 10.",
  },
];

/**
 * Hands-on security practice. The numbers drive the count-up tiles; the focus
 * tags describe what blue-team rooms actually cover.
 */
export const labs = {
  platform: "TryHackMe",
  username: "scht6m",
  profileUrl: "https://tryhackme.com/p/scht6m",
  stats: [
    { value: 5, label: "Rooms completed" },
    { value: 2, label: "Security courses finished" },
  ],
  rooms: [
    { name: "Intrusion Detection", track: "Blue Team" },
    { name: "Servidae: Log Analysis in ELK", track: "Blue Team" },
    { name: "Linux Process Analysis", track: "Blue Team" },
    { name: "Windows Threat Detection 1", track: "Blue Team" },
    { name: "Offensive Security Intro", track: "Offensive" },
  ],
  summary:
    "Mostly TryHackMe's defensive track, with a foothold in offensive basics. Reading logs, tuning detections, and walking incidents from alert to response.",
} as const;

export const contact = {
  // Optional: paste your Formspree endpoint (https://formspree.io/f/xxxxxx) to
  // make the form send real email. If left empty, the form opens the visitor's
  // mail client with the message prefilled, so it always does something.
  formEndpoint: "",
} as const;
