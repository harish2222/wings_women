import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet the expert fertility and gynecology specialists at Wings Women Center.",
  keywords: ["fertility doctors", "gynecologist team", "IVF specialist India"],
};

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

