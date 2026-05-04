"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-14a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1h0a1 1 0 0 1-1 1h0a1 1 0 0 1-1-1Zm0 20a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1h0a1 1 0 0 1-1 1h0a1 1 0 0 1-1-1ZM4 13a1 1 0 0 1-1-1h0a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1h0a1 1 0 0 1-1 1Zm20 0a1 1 0 0 1-1-1h0a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1h0a1 1 0 0 1-1 1ZM6.34 6.34a1 1 0 0 1-1.42 0h0a1 1 0 0 1 0-1.42h0a1 1 0 0 1 1.42 0h0a1 1 0 0 1 0 1.42Zm12.74 12.74a1 1 0 0 1-1.42 0h0a1 1 0 0 1 0-1.42h0a1 1 0 0 1 1.42 0h0a1 1 0 0 1 0 1.42ZM6.34 17.66a1 1 0 0 1 0 1.42h0a1 1 0 0 1-1.42 0h0a1 1 0 0 1 0-1.42h0a1 1 0 0 1 1.42 0Zm12.74-12.74a1 1 0 0 1 0 1.42h0a1 1 0 0 1-1.42 0h0a1 1 0 0 1 0-1.42h0a1 1 0 0 1 1.42 0Z"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={false}
        aria-label="Toggle theme"
        suppressHydrationWarning
        className="relative h-9 w-16 rounded-full border border-[#C8A2C8]/50 bg-[#F5F0E8] p-1 transition-colors hover:bg-[#C8A2C8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/50 dark:bg-[#3d3d3d] dark:hover:bg-[#4d4d4d]"
      >
        <span className="inline-flex h-7 w-7 translate-x-7 items-center justify-center rounded-full bg-[#A47DAB] text-white shadow-md transition-transform duration-300" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      suppressHydrationWarning
      className="relative h-9 w-16 rounded-full border border-[#C8A2C8]/50 bg-[#F5F0E8] p-1 transition-colors hover:bg-[#C8A2C8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/50 dark:bg-[#3d3d3d] dark:hover:bg-[#4d4d4d]"
    >
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#A47DAB] text-white shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-0" : "translate-x-7"
        }`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}