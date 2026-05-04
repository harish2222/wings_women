"use client";

import useSWR from "swr";
import Image from "next/image";
import { getPlaiceholderDataUrl, type BlobFileMetadata } from "@/lib/blob-media";

interface CertificatesApiResponse {
  certificates: BlobFileMetadata[];
}

const fetcher = async (url: string): Promise<CertificatesApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to load certificates");
  return response.json();
};

export default function CertificatesFromApi() {
  const { data, error, isLoading } = useSWR<CertificatesApiResponse>("/api/certificates", fetcher);

  if (isLoading) return <p className="text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">Loading certificates...</p>;
  if (error) return <p className="text-sm text-red-600">Failed to load certificates.</p>;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {data?.certificates.map((certificate) => (
        <div
          key={certificate.pathname}
          className="rounded-xl border border-[#C8A2C8]/40 bg-white/90 p-2 dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]"
        >
          <Image
            src={certificate.url}
            alt={`Certificate ${certificate.pathname}`}
            width={400}
            height={300}
            sizes="(max-width: 768px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL={getPlaiceholderDataUrl("b899bf")}
            className="h-28 w-full rounded-md object-cover dark:brightness-90"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

