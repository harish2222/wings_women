"use client";

import useSWR from "swr";
import Image from "next/image";
import { getPlaiceholderDataUrl, type DoctorRecord } from "@/lib/blob-media";

interface DoctorsApiResponse {
  doctors: DoctorRecord[];
}

const fetcher = async (url: string): Promise<DoctorsApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to load doctor data");
  }
  return response.json();
};

export default function DoctorsFromApi() {
  const { data, error, isLoading } = useSWR<DoctorsApiResponse>("/api/doctors", fetcher);

  if (isLoading) {
    return <p className="text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">Loading doctors...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">Failed to load doctors. Please try again.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {data?.doctors.map((doctor) => (
        <article
          key={doctor.id}
          className="rounded-2xl border border-[#C8A2C8]/40 bg-white/90 p-4 dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]"
        >
          {doctor.photo ? (
            <Image
              src={doctor.photo.url}
              alt={`${doctor.name} profile photo`}
              width={720}
              height={480}
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={getPlaiceholderDataUrl("d4b5d4")}
              className="h-52 w-full rounded-xl object-cover dark:brightness-90"
              loading="lazy"
            />
          ) : (
            <div className="flex h-52 items-center justify-center rounded-xl bg-[#F5F0E8] dark:bg-[#2d2d2d]">
              <span className="text-sm text-[#2C2C2C]/70 dark:text-[#E5E5E5]/70">Photo unavailable</span>
            </div>
          )}
          <h3 className="mt-3 text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-[#A47DAB] dark:text-[#D4B5D4]">{doctor.qualification}</p>
        </article>
      ))}
    </div>
  );
}

