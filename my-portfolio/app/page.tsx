"use client";
import React from "react";
import { motion } from "framer-motion";
import { TerminalSquare, ExternalLink, Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  return (
    <main className="min-h-[100svh]">
      <Header />
      <Hero />
      <Sections />
      <CTA />
      <Footer />
      <FloatingChatButton />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900/80 backdrop-blur bg-neutral-950/70">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="text-sm tracking-wide text-neutral-400">Ceci // Portfolio</div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#work" className="text-neutral-400 hover:text-neutral-200">Work</a>
          <a href="#stack" className="text-neutral-400 hover:text-neutral-200">Stack</a>
          <a href="#notes" className="text-neutral-400 hover:text-neutral-200">Notes</a>
          <a href="#contact" className="text-neutral-400 hover:text-neutral-200">Contact</a>
          <a href="/cecibot/terminal" className="inline-flex items-center gap-1 text-neutral-100 hover:opacity-90">
            <TerminalSquare className="h-4 w-4" /> Chat
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <motion.h1 {...fade} className="text-3xl sm:text-6xl font-extrabold leading-tight">
          Building fast, thoughtful software
          <br className="hidden sm:block" />
          with a calm, monochrome vibe.
        </motion.h1>
        <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="mt-4 max-w-2xl text-neutral-400">
          I’m Cecila — full-stack developer (React/Next, Java Spring, Python) who loves clean UX, smart automations, and
          shipping small tools that punch above their weight.
        </motion.p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
          >
            Explore work <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/cecibot/terminal"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold hover:bg-neutral-900"
          >
            <TerminalSquare className="h-4 w-4" /> Chat with CeciBot
          </a>
        </div>
      </div>
    </section>
  );
}

function Sections() {
  return (
    <>
      <Work />
      <Stack />
      <Notes />
    </>
  );
}

function Work() {
  const projects = [
    {
      title: "Seika OS — Trader Copilot",
      tag: "AI / Crypto / UX",
      blurb:
        "Conversational agent for traders with token analysis and on-chain helpers. Minimal UI, strong guardrails.",
      href: "https://github.com/your/seikaos2",
    },
    {
      title: "Typing Simulator",
      tag: "Web • Frontend",
      blurb: "A minimalist typing app with clean stats and themes.",
      href: "https://github.com/your/typing-sim",
    },
    {
      title: "Calendar Planner",
      tag: "Full-stack",
      blurb: "Drag-and-drop planner with neat keyboard shortcuts and reminders.",
      href: "https://github.com/your/calendar-planner",
    },
    {
      title: "Boulder Buddy",
      tag: "Sports • Fun",
      blurb: "Climbing log that suggests drills and recovery plans.",
      href: "https://github.com/your/boulder-buddy",
    },
  ];
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold">Selected work</h2>
        <span className="text-xs text-neutral-500">(more on GitHub)</span>
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-neutral-700 hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="font-semibold text-neutral-100 group-hover:text-white">{p.title}</div>
              <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-neutral-300" />
            </div>
            <div className="mt-2 text-xs uppercase tracking-wide text-neutral-500">{p.tag}</div>
            <p className="mt-3 text-sm text-neutral-400">{p.blurb}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  const items = [
    { k: "Frontend", v: "React / Next.js, Tailwind, Framer Motion" },
    { k: "Backend", v: "Java Spring Boot, Node/Edge, REST" },
    { k: "Data & AI", v: "Python, Pandas, LLMs, RAG, Vector DBs" },
    { k: "Automation", v: "Excel/VBA power-user, scripts, ETL" },
  ];
  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold">Stack</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.k} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-xs uppercase tracking-wider text-neutral-500">{it.k}</div>
            <div className="mt-2 text-sm text-neutral-300">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Notes() {
  const notes = [
    {
      title: "Small tools, big leverage",
      blurb: "Why micro-apps and good defaults beat giant platforms for most workflows.",
      href: "#",
    },
    {
      title: "RAG without the drama",
      blurb: "A pragmatic setup for personal sites and side projects.",
      href: "#",
    },
    {
      title: "Clean terminals for the web",
      blurb: "Designing monochrome UIs that feel calm, not sterile.",
      href: "#",
    },
  ];
  return (
    <section id="notes" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold">Notes</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {notes.map((n) => (
          <a key={n.title} href={n.href} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:border-neutral-700">
            <div className="font-semibold">{n.title}</div>
            <p className="mt-2 text-sm text-neutral-400">{n.blurb}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Let’s build something minimal and sharp</h2>
        <p className="mt-3 max-w-2xl text-neutral-400">
          Open to collabs, freelance, or just chatting about AI × fintech × delightful tooling. Prefer no fluff, just useful.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 hover:bg-neutral-800" href="mailto:hello@cecila.dev"><Mail className="h-4 w-4" />Email</a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-4 py-2 hover:bg-neutral-900" href="https://github.com/cecila" target="_blank" rel="noreferrer"><Github className="h-4 w-4" />GitHub</a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-4 py-2 hover:bg-neutral-900" href="https://linkedin.com/in/cecila" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" />LinkedIn</a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 font-semibold hover:bg-neutral-900" href="/cecibot/terminal"><TerminalSquare className="h-4 w-4" />Chat with CeciBot</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-16 text-xs text-neutral-500">
      <p>© {new Date().getFullYear()} Cecila Chew · Monochrome theme · No photos, just code.</p>
    </footer>
  );
}

function FloatingChatButton() {
  return (
    <a
      href="/cecibot/terminal"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
      aria-label="Open CeciBot"
    >
      <TerminalSquare className="h-4 w-4" /> Chat
    </a>
  );
}
