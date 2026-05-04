import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore fertility and reproductive services including ovulation care, PCOS treatment, IUI, and laparoscopy/hysteroscopy.",
  keywords: ["fertility services", "IUI", "PCOS care", "endometriosis treatment", "tubal blocks"],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

