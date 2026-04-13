"use client";

import Link from "next/link";
import { motion } from "framer-motion";

  const date = new Date ()

  const year = date.getFullYear()

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Footer() {
  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-[#1A1208] text-[#FFFFFF8C] font-cabinet pt-20 pb-10 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          
          <motion.div variants={item} className="md:col-span-6 lg:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-2 mb-5 text-[1.45rem] font-bold tracking-[-0.01em] text-(--ink)"
            >
              <img
                src="/icons/primary-logo-dark.svg"
                alt="Revela"
                className="h-7.5 sm:h-auto max-w-none"
              />
            </Link>

            <p className="text-[15px] leading-relaxed max-w-md pr-4 mb-10">
              Revela is Nigeria's premier platform for selling end-of-life,
              accidented, and damaged vehicles. We provide a transparent,
              efficient, and formal way to dispose of vehicles while getting the
              best possible value.
            </p>

            <p className="text-[11px] font-bold tracking-[0.15em] uppercase">
              FAST. SIMPLE. TRANSPARENT. • LAGOS & ILORIN, NIGERIA
            </p>
          </motion.div>

          
          <motion.div variants={item} className="md:col-span-3 lg:col-span-3 lg:col-start-7">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6">
              Company
            </h3>

            <ul className="flex flex-col gap-4 text-[15px]">
              {["How It Works", "What We Buy", "Pricing Guide", "About Us"].map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div variants={item} className="md:col-span-3 lg:col-span-3">
            <h3 className="text-sm font-bold tracking-widest uppercase mb-6">
              Support
            </h3>

            <ul className="flex flex-col gap-4 text-[15px]">
              {["Contact Us", "WhatsApp Support", "FAQs", "Privacy Policy"].map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.2, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="origin-left border-t border-[#F3F4F6] w-full mb-8"
        />

        
        <motion.div
          variants={item}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm"
        >
          <p className="tracking-wide uppercase text-xs">
            © {year} REVELA AFRICA. ALL RIGHTS RESERVED.
          </p>

          
          <div className="flex items-center gap-8 text-xs tracking-widest uppercase">
            {["Twitter", "Instagram", "LinkedIn"].map((s) => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="hover:text-white"
              >
                {s}
              </motion.a>
            ))}
          </div>

          
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-[#22C55E]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[13px]">
              System Status: Operational
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}