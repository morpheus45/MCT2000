"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Flame, MessageSquare, Calendar, Users, Newspaper, Map, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";

const links = [
  { href: "/", label: "Accueil", icon: Flame },
  { href: "/feed", label: "Feed", icon: Newspaper },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/events", label: "Sorties", icon: Calendar },
  { href: "/rides", label: "Routes", icon: Map },
  { href: "/gallery", label: "Galerie", icon: ImageIcon },
  { href: "/members", label: "Membres", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.05 }}
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-flame-500 to-flame-700 shadow-[0_0_20px_-2px_rgba(255,84,16,0.7)]"
          >
            <Flame className="h-5 w-5 text-white" />
          </motion.div>
          <div className="leading-none">
            <div className="heading text-2xl tracking-[0.18em] gradient-text">MCT 2000</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              moto club · depuis 2000
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-white/60 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-0 -z-10 rounded-full border border-flame-500/40 bg-flame-500/10"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
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
