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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      setIsAnimating(true);
      setIsMenuOpen(true);
    }
  };

  const handleClose = () => {
    setIsMenuOpen(false);
    setTimeout(() => setIsAnimating(false), 350);
  };

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-30 md:hidden"
        style={{
          transform: isAnimating
            ? "perspective(1000px) rotateX(2deg) scale(0.98)"
            : "perspective(1000px) rotateX(0deg) scale(1)",
          transformOrigin: "50% 50% 0",
          transition: isMenuOpen
            ? "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)"
            : "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          opacity: isAnimating ? 0.95 : 1,
          boxShadow: isAnimating
            ? "-20px 0 40px -10px rgba(164, 125, 171, 0.3)"
            : "none",
        }}
      />

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
            <span className="text-sm font-semibold sm:text-base">Wings Women Center</span>
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
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#C8A2C8]/50 text-[#2C2C2C] transition-all duration-200 hover:bg-[#C8A2C8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/50 dark:text-[#E5E5E5] dark:hover:bg-[#B899BF]/30 md:hidden"
            >
              <span className="sr-only">Toggle navigation menu</span>
              <span className="flex flex-col justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="fixed inset-0 top-0 z-40 md:hidden"
        style={{
          visibility: isMenuOpen ? "visible" : "hidden",
          transition: "visibility 0s linear 300ms",
        }}
      >
        <div
          className="absolute inset-0 bg-[#FAF6F0]/95 backdrop-blur-xl dark:bg-[#1a1a1a]/95"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            transition: "opacity 350ms ease-out",
          }}
          aria-hidden="true"
        />

        <div
          className="relative flex h-full flex-col items-center justify-center px-5"
          style={{
            transform: isMenuOpen
              ? "translateY(0) scale(1)"
              : "translateY(-20px) scale(0.95)",
            opacity: isMenuOpen ? 1 : 0,
            transition: "all 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C8A2C8]/60 text-[#A47DAB] transition-all duration-200 hover:scale-110 hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/60 dark:text-[#D4B5D4]"
            aria-label="Close navigation menu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
              <path
                fill="currentColor"
                d="M6.28 5.22a1 1 0 0 0-1.41 1.41L10.59 12l-5.72 5.72a1 1 0 1 0 1.41 1.41l5.72-5.72 5.72 5.72a1 1 0 0 0 1.41-1.41L13.41 12l5.72-5.72a1 1 0 0 0-1.41-1.41L12 10.59 6.28 4.78Z"
              />
            </svg>
          </button>

          <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-4">
            {navItems.map((item, index) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleClose}
                  className={`group flex items-center gap-3 rounded-2xl px-8 py-4 text-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] ${
                    active
                      ? "bg-[#C8A2C8]/30 text-[#A47DAB] dark:bg-[#B899BF]/35"
                      : "text-[#2C2C2C] hover:bg-[#C8A2C8]/20 hover:scale-105 dark:text-[#E5E5E5] dark:hover:bg-[#B899BF]/30"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className="text-2xl transition-transform duration-300 group-hover:scale-125"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-8 flex flex-col items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-widest text-[#A47DAB]/60 dark:text-[#D4B5D4]/60">
              Follow us
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "WA"].map((social) => (
                <span
                  key={social}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C8A2C8]/40 text-sm font-medium text-[#A47DAB] dark:border-[#B899BF]/40 dark:text-[#D4B5D4]"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}