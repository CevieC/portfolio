"use client";
import React, { useState } from "react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { TerminalSquare, ExternalLink, Github, Linkedin, Mail, ArrowRight, FileText } from "lucide-react";
import Typewriter from "@/components/ui/Typewriter";
import InteractiveButton from "@/components/ui/InteractiveButton";
import Constellation from "@/components/ui/Constellation";
import TerminalModal from "@/components/cecibot/TerminalModal";

// Animation variants
const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

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

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

// Header component with navigation
function Header({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900/80 backdrop-blur bg-neutral-950/70">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="text-sm tracking-wide text-neutral-400">Ceci // Portfolio</div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#work" className="text-neutral-400 hover:text-neutral-200">Side Quests</a>
          <a href="#stack" className="text-neutral-400 hover:text-neutral-200">Inventory</a>
          <a href="#notes" className="text-neutral-400 hover:text-neutral-200">Scrolls</a>
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

// Hero section with typewriter effect
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

// Container for all main sections
function Sections() {
  return (
    <>
      <Work />
      <Stack />
      <Notes />
    </>
  );
}

// Side Quests section with project cards
function Work() {
  const projects = [
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
  ];

  const cardVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
      scale: 0.9,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  const containerVariants: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-8 mt-8 sm:mt-16 scroll-mt-12">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold mb-6"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ 
          type: "spring",
          bounce: 0.3,
          duration: 0.6 
        }}
        viewport={{ amount: 0.5 }}
      >
        Side Quests
      </motion.h2>
      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.3 }}
      >
        {projects.map((p, index) => (
          <motion.a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-xl border border-neutral-800 bg-neutral-900 p-5 hover:border-neutral-700 transition-colors duration-300 overflow-hidden"
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: {
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="flex items-center justify-between gap-4"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-semibold text-neutral-100 group-hover:text-white transition-colors duration-300">{p.title}</div>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300" />
              </motion.div>
            </motion.div>
            <motion.div 
              className="mt-2 text-xs uppercase tracking-wide text-neutral-500"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {p.tag}
            </motion.div>
            <motion.p 
              className="mt-3 text-sm text-neutral-400"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {p.blurb}
            </motion.p>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

// Inventory section with tech stack
function Stack() {
  const items = [
    { k: "Frontend", v: "React / Next.js, Tailwind, Framer Motion (and a lot of patience)" },
    { k: "Backend", v: "Java Spring Boot, Node/Edge, REST (the boring but reliable stuff)" },
    { k: "Data & AI", v: "Python, Pandas, LLMs, RAG, Vector DBs (making AI do cool things)" },
    { k: "Automation", v: "Excel/VBA power-user, scripts, ETL (because manual work is so 2010)" },
  ];

  const itemVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
      scale: 0.9,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
      },
    },
  };

  const containerVariants: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-8 mt-2 sm:mt-4 scroll-mt-12">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring",
          bounce: 0.4,
          duration: 0.7 
        }}
        viewport={{ amount: 0.5 }}
      >
        Inventory
      </motion.h2>
      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.3 }}
      >
        {items.map((it, index) => (
          <motion.div 
            key={it.k} 
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:border-neutral-700 transition-colors duration-300 cursor-pointer group h-full"
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: {
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }
            }}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: 'transform' }}
          >
            <motion.div 
              className="text-xs uppercase tracking-wider text-neutral-500"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {it.k}
            </motion.div>
            <motion.div 
              className="mt-2 text-sm text-neutral-300"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {it.v}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// Ancient Scrolls section with personal insights
function Notes() {
  const notes = [
    {
      title: "Why I Even Do This",
      blurb: "Honestly, I just like turning random ideas into things people can actually use. It's fun seeing something go from a silly thought in my head to a real project I can click on. I don't care about making it flashy, I just want it to work smooth and feel nice."
    },
    {
      title: "Climb Brain",
      blurb: "Bouldering is basically me arguing with a wall until I figure it out. Most of the time I fall, but that's kind of the point. Every fail shows me a better way to do it. Feels the same as debugging, just with more chalk and less coffee."
    },
    {
      title: "Powered by Food",
      blurb: "I climb a lot which means I eat a lot. Post-climb dinners, late-night coding snacks, random bread cravings. It's all part of the cycle. Food is honestly half the reason I keep going."
    },
  ];



  return (
    <section id="notes" className="mx-auto max-w-6xl px-4 py-8 mt-2 sm:mt-4 scroll-mt-12">
      <motion.h2 
        className="text-2xl sm:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -30, rotateZ: -2 }}
        whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
        transition={{ 
          type: "spring",
          bounce: 0.5,
          duration: 0.8 
        }}
        viewport={{ amount: 0.5 }}
      >
        Ancient Scrolls
      </motion.h2>
      <motion.div 
        className="grid md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {notes.map((n, index) => (
          <motion.div 
            key={n.title} 
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:border-neutral-700 transition-colors duration-300 cursor-pointer group"
            variants={{
              hidden: { opacity: 0, y: 100, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.8,
                },
              },
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: {
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="font-semibold text-neutral-100 group-hover:text-white transition-colors duration-300"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {n.title}
            </motion.div>
            <motion.p 
              className="mt-2 text-sm text-neutral-400"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {n.blurb}
            </motion.p>
          </motion.div>
                ))}
      </motion.div>
    </section>
  );
}

// Contact section with call-to-action
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

// Footer component
function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-16 text-xs text-neutral-500">
      <p>© {new Date().getFullYear()} Cecila Chew · No photos, just code and climbing stories</p>
    </footer>
  );
}