"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";

const links = [
  { href: "/feed", label: "Feed" },
  { href: "/chat", label: "Chat" },
  { href: "/events", label: "Sorties" },
  { href: "/rides", label: "Routes" },
  { href: "/gallery", label: "Galerie" },
  { href: "/telethon", label: "Téléthon" },
  { href: "/members", label: "Membres" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b-2 border-bone-50/10 bg-ink-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
        {/* Logo / Masthead-style brand */}
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            className="grid h-11 w-11 place-items-center border-2 border-flame-500 bg-flame-500 font-display text-ink-950"
          >
            <span className="text-lg leading-none">MC</span>
          </motion.div>
          <div className="leading-none">
            <div className="heading text-2xl tracking-[0.14em] text-bone-50">
              MCT <span className="editorial text-flame-400">2000</span>
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest2 text-bone-50/40">
              moto club · depuis 2000
            </div>
          </div>
        </Link>

        {/* Nav links — magazine-style index */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, label }, i) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative px-3 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors",
                  active ? "text-flame-400" : "text-bone-50/60 hover:text-bone-50",
                )}
              >
                <span className="text-bone-50/30 mr-1">{String(i + 1).padStart(2, "0")}</span>
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-2 right-2 h-px bg-flame-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
