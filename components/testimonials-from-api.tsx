"use client";

import useSWR from "swr";
import Image from "next/image";
import { getPlaiceholderDataUrl, type TestimonialRecord } from "@/lib/blob-media";

interface TestimonialsApiResponse {
  testimonials: TestimonialRecord[];
}

const fetcher = async (url: string): Promise<TestimonialsApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to load testimonials");
  return response.json();
};

export default function TestimonialsFromApi() {
  const { data, error, isLoading } = useSWR<TestimonialsApiResponse>("/api/testimonials", fetcher);

  if (isLoading) return <p className="text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">Loading testimonials...</p>;
  if (error) return <p className="text-sm text-red-600">Failed to load testimonials.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data?.testimonials.map((entry) => (
        <article
          key={entry.id}
          className="rounded-2xl border border-[#C8A2C8]/40 bg-white/90 p-4 dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]"
        >
          {entry.image ? (
            <Image
              src={entry.image.url}
              alt={`${entry.patientName} testimonial`}
              width={720}
              height={480}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={getPlaiceholderDataUrl("c8a2c8")}
              className="h-44 w-full rounded-xl object-cover dark:brightness-90"
              loading="lazy"
            />
          ) : null}
          <p className="mt-3 text-sm leading-6">{entry.message}</p>
          <p className="mt-2 text-xs font-semibold text-[#A47DAB] dark:text-[#D4B5D4]">{entry.patientName}</p>
        </article>
      ))}
    </div>
  );
}

