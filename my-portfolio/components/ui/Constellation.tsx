"use client";
import React, { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number };

export default function Constellation({
  density = 0.00012,   // dots per pixel
  linkDist = 120,      // max distance for lines
  speed = 0.3,
}: { density?: number; linkDist?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const resize = () => {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      spawnDots();
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => (mouseRef.current = { x: -9999, y: -9999 });

    const spawnDots = () => {
      const count = Math.floor(canvas.offsetWidth * canvas.offsetHeight * density);
      dotsRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    };
    spawnDots();

    const tick = () => {
      const dots = dotsRef.current;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight); // transparent clear only

      // move + bounce
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.offsetWidth) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.offsetHeight) d.vy *= -1;

        // Mouse interaction disabled
        // const dx = d.x - mouseRef.current.x;
        // const dy = d.y - mouseRef.current.y;
        // const dist = Math.hypot(dx, dy);
        // if (dist < linkDist * 1.2) {
        //   d.vx -= dx / 12000;
        //   d.vy -= dy / 12000;
        // }
      }

      // lines
      ctx.strokeStyle = "rgba(200,200,200,0.07)";
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.globalAlpha = 1 - dist / linkDist;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // dots
      ctx.fillStyle = "rgba(220,220,220,0.6)";
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, linkDist, speed]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: "block" }}
        aria-hidden
      />
    </div>
  );
}
