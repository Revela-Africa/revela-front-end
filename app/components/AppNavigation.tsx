"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomCta from "./CustomCta";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Revela", href: "#why-revela" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const AppNavigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 h-20
        border-b border-white/70
        backdrop-blur-[32px] backdrop-saturate-200
        transition-colors duration-300 
        ${scrolled ? "bg-[rgba(253,247,239,0.9)]" : "bg-[rgba(253,247,239,0.65)]"}
      `}
    >
      <nav className="mx-auto flex h-full w-full items-center justify-between container">
        <Link
          href="/"
          className="
            flex items-center gap-2
            text-[1.45rem] font-bold tracking-[-0.01em]
            text-(--ink)
          "
        >
          <Image
            src="/icons/primary-logo.svg"
            alt="Revela"
            width={200}
            height={200}
            className="h-auto w-50 max-w-none"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="
                  text-[0.83rem] font-medium tracking-[0.04em]
                  text-(--ink) p-2 py-3 font-dm-sans
                  transition-colors duration-200
                  hover:text-(--gold)
                "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <CustomCta label="Sell your car" href="/" className="text-white" />
        </div>
      </nav>
    </header>
  );
};

export default AppNavigation;
