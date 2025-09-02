"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  maxTranslate?: number; // px
  scale?: number; // hover scale
};

export default function MagneticButton({
  href,
  className,
  children,
  maxTranslate = 10,
  scale = 1.03,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5..0.5
    setCoords({ x: relX * 2 * maxTranslate, y: relY * 2 * maxTranslate });
  }

  function onLeave() {
    setHovered(false);
    setCoords({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      animate={{
        x: hovered ? coords.x : 0,
        y: hovered ? coords.y : 0,
        scale: hovered ? scale : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.2 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}


