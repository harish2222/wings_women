import type { Metadata } from "next";
import MobileSwipeGallery from "@/components/mobile-swipe-gallery";
import MobileQuickActions from "@/components/mobile-quick-actions";
import MobileAppointmentForm from "@/components/mobile-appointment-form";

export const metadata: Metadata = {
  title: "Mobile UX Demo",
  description: "Touch-optimized mobile UI components for Wings Women Center.",
};

const galleryItems = [
  { src: "/globe.svg", alt: "Clinic facilities preview" },
  { src: "/window.svg", alt: "Consultation room preview" },
  { src: "/next.svg", alt: "Care team and support preview" },
];

export default function MobileDemoPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Mobile UX Components</h1>
      <p className="text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
        This page is optimized for touch interactions, compact screens, and quick actions.
      </p>

      <MobileQuickActions service="fertility consultation" />
      <MobileSwipeGallery items={galleryItems} />
      <MobileAppointmentForm />
    </section>
  );
}

