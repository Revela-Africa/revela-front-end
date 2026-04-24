"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CustomCta from "./CustomCta";
import Hamburger from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_HEIGHT = 80;

const links = [
  { label: "How It Works", id: "how-it-works" },
  { label: "Our Model", id: "model" },
  { label: "About Revela", id: "about" },
];

export default function AppNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = NAV_HEIGHT + 20;

      for (const link of links) {
        const el = document.getElementById(link.id);
        if (!el) continue;

        const top = el.offsetTop - offset;
        const bottom = top + el.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive(link.id);
          return;
        }
      }

      setActive(null);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    history.replaceState(null, "", " ");
  };

  return (
    <>
      <header
        className={`
        fixed top-0 left-0 right-0 z-50 h-20
        border-b border-white/70 
        backdrop-blur-[32px] backdrop-saturate-200
        transition-colors duration-300 
        ${
          scrolled
            ? "bg-[rgba(253,247,239,0.9)]"
            : "bg-[rgba(253,247,239,0.65)]"
        }
      `}
      >
        <nav className="mx-auto px-5 flex h-full w-full items-center justify-between container">
          <Link
            href="/"
            className="flex items-center gap-2 text-[1.45rem] font-bold tracking-[-0.01em] text-(--ink)"
          >
            <img
              src="/icons/primary-logo.svg"
              alt="Revela"
              className="h-7.5 sm:h-auto max-w-none"
            />
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((link) => {
              const isActive = active === link.id;

              return (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`
                    relative text-[0.83rem] font-medium tracking-[0.04em]
                    p-2 py-3 font-dm-sans transition-colors duration-200
                    ${
                      isActive
                        ? "text-(--gold)"
                        : "text-(--ink) hover:text-(--gold)"
                    }
                  `}
                  >
                    {link.label}

                    <span
                      className={`
                      absolute left-1/2 -bottom-1 h-[1.5px] bg-(--gold)
                      transition-all duration-300
                      ${
                        isActive
                          ? "w-6 -translate-x-1/2 opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <CustomCta
              label="Sell your car"
              href="/login"
              className="text-white"
            />
          </div>

          <div className="lg:hidden">
            <Hamburger
              toggled={open}
              toggle={setOpen}
              size={20}
              duration={0.3}
              color="var(--ink)"
            />
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed h-dvh inset-0 z-40 font-dm-sans lg:hidden"
          >
            <div className="absolute inset-0 bg-[rgba(253,247,239,0.85)] backdrop-blur-2xl" />

            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 flex flex-col items-center justify-center h-full gap-10"
            >
              {links.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => {
                    scrollToSection(link.id);
                    setOpen(false);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-[1.4rem] font-medium tracking-wide text-(--ink) hover:text-(--gold)"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CustomCta
                  label="Sell your car"
                  href="/login"
                  className="text-white px-8 py-4"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
