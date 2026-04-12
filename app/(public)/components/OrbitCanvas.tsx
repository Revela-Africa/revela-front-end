"use client";

import { useEffect, useRef } from "react";

type Orb = {
  sz: number;
  gold: boolean;
  alpha: number;
  trail: { x: number; y: number }[];
  st?: boolean;
  cx?: number;
  cy?: number;
  r?: number;
  angle?: number;
  sp?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
};

type Ring = {
  cx: number;
  cy: number;
  r: number;
  a: number;
};

const OrbitCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let orbs: Orb[] = [];
    let rings: Ring[] = [];

    let pointerX = 0;
    let pointerY = 0;

    const build = () => {
      orbs = [];
      rings = [];

      const cx = width * 0.5;
      const cy = height * 0.5;

      const cfg = [
        { r: 110, sp: 0.0006, n: 5, sz: 3.5, gold: 0.85 },
        { r: 185, sp: -0.00042, n: 8, sz: 2.5, gold: 0.6 },
        { r: 275, sp: 0.00032, n: 6, sz: 2, gold: 0.45 },
        { r: 370, sp: -0.00022, n: 9, sz: 1.6, gold: 0.35 },
        { r: 470, sp: 0.00016, n: 7, sz: 1.2, gold: 0.25 },
      ];

      cfg.forEach((c, i) => {
        rings.push({ cx, cy, r: c.r, a: 0.07 - i * 0.01 });

        for (let j = 0; j < c.n; j++) {
          orbs.push({
            cx,
            cy,
            r: c.r,
            angle: (Math.PI * 2 / c.n) * j + i * 0.8,
            sp: c.sp,
            sz: c.sz,
            gold: Math.random() < c.gold,
            alpha: 0.65 - i * 0.08,
            trail: [],
          });
        }
      });

      for (let i = 0; i < 60; i++) {
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          sz: Math.random() * 0.8 + 0.2,
          alpha: Math.random() * 0.1 + 0.03,
          gold: Math.random() > 0.65,
          trail: [],
          st: true,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      build();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const dx = (pointerX - width / 2) * 0.025;
      const dy = (pointerY - height / 2) * 0.025;
      const cx = width / 2 + dx;
      const cy = height / 2 + dy;

      rings.forEach((ring) => {
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,120,0,${ring.a})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
      glow.addColorStop(0, "rgba(255,180,0,0.1)");
      glow.addColorStop(1, "rgba(255,180,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 150, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      orbs.forEach((p) => {
        if (p.st) {
          p.x = (p.x ?? 0) + (p.vx ?? 0);
          p.y = (p.y ?? 0) + (p.vy ?? 0);

          if ((p.x ?? 0) < 0) p.x = width;
          if ((p.x ?? 0) > width) p.x = 0;
          if ((p.y ?? 0) < 0) p.y = height;
          if ((p.y ?? 0) > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x ?? 0, p.y ?? 0, p.sz, 0, Math.PI * 2);
          ctx.fillStyle = p.gold
            ? `rgba(200,120,0,${p.alpha})`
            : `rgba(180,140,80,${p.alpha * 0.6})`;
          ctx.fill();
          return;
        }

        p.angle! += p.sp!;

        const x = cx + Math.cos(p.angle!) * p.r!;
        const y = cy + Math.sin(p.angle!) * p.r!;

        p.trail.push({ x, y });
        if (p.trail.length > 20) p.trail.shift();

        for (let i = 1; i < p.trail.length; i++) {
          const a = (i / p.trail.length) * p.alpha * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y);
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
          ctx.strokeStyle = p.gold
            ? `rgba(200,130,0,${a})`
            : `rgba(160,120,60,${a * 0.5})`;
          ctx.lineWidth = p.sz * 0.7;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(200,130,0,${p.alpha})`
          : `rgba(160,120,60,${p.alpha * 0.6})`;
        ctx.fill();

        if (p.gold && p.sz > 2.5) {
          const orbGlow = ctx.createRadialGradient(x, y, 0, x, y, p.sz * 5.5);
          orbGlow.addColorStop(0, "rgba(220,140,0,0.12)");
          orbGlow.addColorStop(1, "rgba(220,140,0,0)");
          ctx.beginPath();
          ctx.arc(x, y, p.sz * 5.5, 0, Math.PI * 2);
          ctx.fillStyle = orbGlow;
          ctx.fill();
        }
      });

      rafId = window.requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} id="orbit-cv" className="absolute inset-0 w-full h-full pointer-events-none z-1" aria-hidden="true" />;
};

export default OrbitCanvas;