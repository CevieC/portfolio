"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TerminalSquare, ExternalLink, Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import Typewriter from "@/components/ui/Typewriter";
import InteractiveButton from "@/components/ui/InteractiveButton";
import Constellation from "@/components/ui/Constellation";
import TerminalModal from "@/components/cecibot/TerminalModal";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <main className="min-h-[100svh] relative">
      <Constellation density={0.00008} linkDist={100} speed={0.2} />
      <Header onOpenTerminal={() => setIsTerminalOpen(true)} />
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
      <Sections />
      <CTA onOpenTerminal={() => setIsTerminalOpen(true)} />
      <Footer />
      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </main>
  );
}

function Header({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900/80 backdrop-blur bg-neutral-950/70">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="text-sm tracking-wide text-neutral-400">Ceci // Portfolio</div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#work" className="text-neutral-400 hover:text-neutral-200">Work</a>
          <a href="#stack" className="text-neutral-400 hover:text-neutral-200">Stack</a>
          <a href="#notes" className="text-neutral-400 hover:text-neutral-200">Notes</a>
          <a href="#contact" className="text-neutral-400 hover:text-neutral-200">Contact</a>
          <button 
            onClick={onOpenTerminal}
            className="inline-flex items-center gap-1 text-neutral-100 hover:opacity-90"
          >
            <TerminalSquare className="h-4 w-4" /> Chat
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <motion.h1
          {...fade}
          className="text-3xl sm:text-6xl font-extrabold leading-tight overflow-hidden min-h-[6.5rem] sm:min-h-[9.5rem]"
          style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
        >
          <Typewriter
            words={[
              "Debug code by day, debug climbing routes by night",
              "Turning coffee into code since 2019 ☕",
              "Professional problem solver, amateur wall climber",
              "Making computers do things they don't want to do",
            ]}
            className="inline break-words"
            typingMs={60}
            deletingMs={40}
            holdMs={1000}
          />
        </motion.h1>
        <motion.p {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="mt-4 max-w-2xl text-neutral-400">
          I'm Cecila, a full-stack developer who loves building things that actually work. When I'm not coding, you'll find me climbing or drinking coffee. Cats &gt; Dogs.
        </motion.p>
        <div className="mt-8 flex gap-3">
          <InteractiveButton
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold hover:bg-neutral-900"
          >
            <ArrowRight className="h-4 w-4" /> Side Quest Log
          </InteractiveButton>
          <InteractiveButton
            onClick={onOpenTerminal}
            className="sticky top-20 z-30 inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold hover:bg-neutral-900"
          >
            <TerminalSquare className="h-4 w-4" /> Open Terminal
          </InteractiveButton>
          <InteractiveButton
            onClick={() => window.open('https://github.com/CevieC/resume/blob/10c650268df4184a9590b06554f1963a541a0c53/Resume.pdf', '_blank')}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold hover:bg-neutral-900"
          >
            <FileText className="h-4 w-4" /> Character Sheet
          </InteractiveButton>
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
        "My attempt to make trading less stressful than my climbing projects. Conversational agent with token analysis and on-chain helpers.",
      href: "https://github.com/your/seikaos2",
    },
    {
      title: "Typing Simulator",
      tag: "Web • Frontend",
      blurb: "Because sometimes you just need to type really fast and feel good about it. Clean stats and themes included.",
      href: "https://github.com/your/typing-sim",
    },
    {
      title: "Calendar Planner",
      tag: "Full-stack",
      blurb: "The app that finally made me show up to meetings on time. Drag-and-drop with keyboard shortcuts.",
      href: "https://github.com/your/calendar-planner",
    },
    {
      title: "Boulder Buddy",
      tag: "Sports • Fun",
      blurb: "My climbing log that's more organized than my code comments. Suggests drills and recovery plans.",
      href: "https://github.com/your/boulder-buddy",
    },
  ];
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16 mt-16 sm:mt-24">
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
    { k: "Frontend", v: "React / Next.js, Tailwind, Framer Motion (and a lot of patience)" },
    { k: "Backend", v: "Java Spring Boot, Node/Edge, REST (the boring but reliable stuff)" },
    { k: "Data & AI", v: "Python, Pandas, LLMs, RAG, Vector DBs (making AI do cool things)" },
    { k: "Automation", v: "Excel/VBA power-user, scripts, ETL (because manual work is so 2010)" },
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
      blurb: "Why I build small tools instead of giant platforms (and why you should too).",
      href: "#",
    },
    {
      title: "RAG without the drama",
      blurb: "A pragmatic setup for personal sites and side projects. No over-engineering here.",
      href: "#",
    },
    {
      title: "Clean terminals for the web",
      blurb: "Designing monochrome UIs that feel calm, not sterile. Because black and white can be fun too.",
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

function CTA({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Let’s build something minimal and sharp</h2>
        <p className="mt-3 max-w-2xl text-neutral-400">
          Let's chat over coffee (or code) ☕ Open to collabs, freelance, or just geeking out about AI × fintech × delightful tooling. No fluff, just useful stuff.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 hover:bg-neutral-800" href="mailto:cecilachewyc@gmail.com"><Mail className="h-4 w-4" />Email</a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-4 py-2 hover:bg-neutral-900" href="https://github.com/CevieC" target="_blank" rel="noreferrer"><Github className="h-4 w-4" />GitHub</a>
          <a className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 px-4 py-2 hover:bg-neutral-900" href="https://linkedin.com/in/cecila-chew" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" />LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-16 text-xs text-neutral-500">
      <p>© {new Date().getFullYear()} Cecila Chew · No photos, just code and climbing stories</p>
    </footer>
  );
}