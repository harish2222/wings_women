"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/doctors", label: "Doctors", icon: "👩‍⚕️" },
  { href: "/services", label: "Services", icon: "🧬" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#C8A2C8]/40 bg-[#FAF6F0]/90 backdrop-blur-md transition-colors duration-300 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d]/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Wings Women Center home"
          className="inline-flex items-center gap-2 rounded-md px-1 py-1 text-[#2C2C2C] transition-colors hover:text-[#A47DAB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:text-[#E5E5E5] dark:hover:text-[#D4B5D4]"
        >
          <Image
            src="/media/logo/bird_favicon_transparent.png"
            alt="Wings Women Center Logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold sm:text-base">WINGS WOMEN</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] ${
                  active
                    ? "bg-[#C8A2C8]/30 text-[#2C2C2C] dark:bg-[#B899BF]/35 dark:text-[#E5E5E5]"
                    : "text-[#2C2C2C] hover:bg-[#C8A2C8]/20 hover:text-[#A47DAB] dark:text-[#E5E5E5] dark:hover:bg-[#B899BF]/30 dark:hover:text-[#D4B5D4]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#C8A2C8]/50 text-[#2C2C2C] transition-colors hover:bg-[#C8A2C8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/50 dark:text-[#E5E5E5] dark:hover:bg-[#B899BF]/30 md:hidden"
          >
            <span className="sr-only">Toggle navigation menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
              <path
                fill="currentColor"
                d={
                  isMenuOpen
                    ? "M6.7 5.3a1 1 0 0 0-1.4 1.4L10.6 12l-5.3 5.3a1 1 0 1 0 1.4 1.4l5.3-5.3 5.3 5.3a1 1 0 0 0 1.4-1.4L13.4 12l5.3-5.3a1 1 0 1 0-1.4-1.4L12 10.6 6.7 5.3Z"
                    : "M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm1 4a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 bg-[#F5F0E8] px-5 pt-6 transition-all duration-300 md:hidden dark:bg-[#1a1a1a] ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A47DAB] dark:text-[#D4B5D4]">Menu</p>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#C8A2C8]/60 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/60"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Mobile primary navigation" className="mt-6 space-y-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] ${
                  active
                    ? "bg-[#C8A2C8]/30 text-[#2C2C2C] dark:bg-[#B899BF]/35 dark:text-[#E5E5E5]"
                    : "text-[#2C2C2C] hover:bg-[#C8A2C8]/20 hover:text-[#A47DAB] dark:text-[#E5E5E5] dark:hover:bg-[#B899BF]/30 dark:hover:text-[#D4B5D4]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}