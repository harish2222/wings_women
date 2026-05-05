"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const MapEmbed = dynamic(() => import("@/components/map-embed"), {
  ssr: false,
  loading: () => <div className="h-32 w-full animate-pulse rounded-lg bg-[#C8A2C8]/20" />,
});

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const social = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100064033661935" },
  { name: "Instagram", url: "https://www.instagram.com/viswanathboga/" },
  { name: "YouTube", url: "https://www.youtube.com/@bogaviswanath8031" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#C8A2C8]/40 bg-[#FAF6F0] text-[#2C2C2C] dark:border-[#B899BF]/40 dark:bg-[#2d2d2d] dark:text-[#E5E5E5]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 sm:px-8 lg:grid-cols-3 lg:px-8">
        <section aria-label="Clinic information" className="space-y-3">
          <h2 className="text-lg font-semibold">Wings Women Center</h2>
          <p className="text-sm font-medium italic text-[#A47DAB] dark:text-[#D4B5D4]">
            GIVING BIRTH TO YOUR HOPE
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#A47DAB] dark:text-[#D4B5D4]">
              Follow Us
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} profile`}
                    className="inline-flex rounded-full border border-[#C8A2C8]/70 px-3 py-1 text-xs transition-colors hover:bg-[#C8A2C8]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/70 dark:hover:bg-[#B899BF]/25"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Links" className="grid grid-cols-2 gap-8 lg:grid-cols-1 lg:gap-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#A47DAB] dark:text-[#D4B5D4]">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-[#A47DAB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#A47DAB] dark:text-[#D4B5D4]">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-[#A47DAB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Contact information" className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#A47DAB] dark:text-[#D4B5D4]">
              Contact
            </h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>
                <a
                  href="tel:+919502712812"
                  className="transition-colors hover:text-[#A47DAB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
                  aria-label="Call clinic"
                >
                  +91 95027 12812
                </a>
              </li>
              <li>
                <a
                  href="mailto:boga.viswanath@gmail.com"
                  className="transition-colors hover:text-[#A47DAB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
                  aria-label="Email clinic"
                >
                  boga.viswanath@gmail.com
                </a>
              </li>
              <li className="leading-6">
                Shop 115/116, first floor, Ragamayuri complex, beside Dmart, bellary chowrastha, Kurnool, Andhra Pradesh, India
              </li>
            </ul>
            <div className="mt-6">
              <MapEmbed className="h-40 w-full rounded-lg" />
            </div>
          </div>
        </section>
      </div>

      <div className="border-t border-[#C8A2C8]/40 px-4 py-6 text-center text-xs text-[#2C2C2C]/70 dark:border-[#B899BF]/40 dark:text-[#E5E5E5]/75">
        <p className="text-base font-semibold italic text-[#A47DAB] dark:text-[#D4B5D4]">
          &quot;We&apos;re not just another Hospital.. We&apos;re an <span className="not-italic font-bold">Experience...</span>&quot;
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Wings Women Center. All rights reserved.</p>
      </div>
    </footer>
  );
}