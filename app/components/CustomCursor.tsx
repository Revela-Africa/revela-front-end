"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cur = document.createElement("div");
    const curR = document.createElement("div");

    // ===== base styles =====
    Object.assign(cur.style, {
      position: "fixed",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "var(--gold)",
      zIndex: "9999",
      pointerEvents: "none",
      transform: "translate(-50%, -50%)",
      willChange: "transform",
      boxShadow: "0 0 18px rgba(224,152,0,0.55)",
    });

    Object.assign(curR.style, {
      position: "fixed",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      border: "1px solid rgba(224,152,0,0.45)",
      zIndex: "9998",
      pointerEvents: "none",
      transform: "translate(-50%, -50%)",
      willChange: "transform",
      opacity: "0.75",
    });

    document.body.appendChild(cur);
    document.body.appendChild(curR);

    let mx = 0,
      my = 0;
    let rx = 0,
      ry = 0;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      rx = lerp(rx, mx, 0.15);
      ry = lerp(ry, my, 0.15);

      curR.style.left = rx + "px";
      curR.style.top = ry + "px";

      requestAnimationFrame(animate);
    };

    animate();

    // ===== hover logic =====
    const interactiveSelector =
      "a, button, [role='button'], input, textarea, .bc-cta, .hero-card-main";

    const onMoveOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(interactiveSelector)) {
        cur.style.transform = "translate(-50%, -50%) scale(2)";
        curR.style.width = "60px";
        curR.style.height = "60px";
      } else {
        cur.style.transform = "translate(-50%, -50%) scale(1)";
        curR.style.width = "36px";
        curR.style.height = "36px";
      }
    };

    document.addEventListener("mouseover", onMoveOver);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onMoveOver);
      cur.remove();
      curR.remove();
    };
  }, []);

  return null;
}