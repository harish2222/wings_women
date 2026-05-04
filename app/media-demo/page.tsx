import type { Metadata } from "next";
import dynamic from "next/dynamic";

const DoctorsFromApi = dynamic(() => import("@/components/doctors-from-api"), {
  loading: () => <div className="h-40 animate-pulse rounded-2xl bg-[#C8A2C8]/20" />,
});
const TestimonialsFromApi = dynamic(() => import("@/components/testimonials-from-api"), {
  loading: () => <div className="h-40 animate-pulse rounded-2xl bg-[#C8A2C8]/20" />,
});
const CertificatesFromApi = dynamic(() => import("@/components/certificates-from-api"), {
  loading: () => <div className="h-40 animate-pulse rounded-2xl bg-[#C8A2C8]/20" />,
});

export const metadata: Metadata = {
  title: "Media Demo | Wings Women Center",
  description: "Example usage of Vercel Blob media integrations.",
};

export default function MediaDemoPage() {
  return (
    <section className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold">Blob Media Integration Demo</h1>
        <p className="mt-2 text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
          This page demonstrates API-backed loading states, error handling, and optimized images.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Doctors</h2>
        <DoctorsFromApi />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Testimonials</h2>
        <TestimonialsFromApi />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Certificates</h2>
        <CertificatesFromApi />
      </div>
    </section>
  );
}
