import { list, put, type PutBlobResult } from "@vercel/blob";

export interface BlobFileMetadata {
  pathname: string;
  url: string;
  contentType?: string;
  size?: number;
  uploadedAt?: string;
}

export interface DoctorRecord {
  id: string;
  name: string;
  qualification: string;
  specialization: string[];
  yearsExperience: number;
  photo?: BlobFileMetadata;
}

export interface TestimonialRecord {
  id: string;
  patientName: string;
  message: string;
  image?: BlobFileMetadata;
}

type UploadKind = "doctors" | "testimonials" | "certificates" | "services";

function toBlobMetadata(entry: { pathname: string; url: string; contentType?: string; size?: number; uploadedAt?: Date }): BlobFileMetadata {
  return {
    pathname: entry.pathname,
    url: entry.url,
    contentType: entry.contentType,
    size: entry.size,
    uploadedAt: entry.uploadedAt?.toISOString(),
  };
}

export async function uploadMediaAsset(file: File, kind: UploadKind): Promise<PutBlobResult> {
  const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
  const pathname = `${kind}/${Date.now()}-${safeName}`;
  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || "application/octet-stream",
  });
}

export async function uploadDoctorPhoto(file: File): Promise<PutBlobResult> {
  return uploadMediaAsset(file, "doctors");
}

export async function storeServiceImage(file: File): Promise<PutBlobResult> {
  return uploadMediaAsset(file, "services");
}

export async function retrieveCertificateDocument(file: File): Promise<PutBlobResult> {
  return uploadMediaAsset(file, "certificates");
}

export async function fetchBlobFilesByPrefix(prefix: UploadKind): Promise<BlobFileMetadata[]> {
  const { blobs } = await list({ prefix: `${prefix}/` });
  return blobs.map((blob) => toBlobMetadata(blob));
}

export async function fetchTestimonialImages(): Promise<BlobFileMetadata[]> {
  return fetchBlobFilesByPrefix("testimonials");
}

export async function fetchCertificateImages(): Promise<BlobFileMetadata[]> {
  return fetchBlobFilesByPrefix("certificates");
}

export async function fetchDoctorImages(): Promise<BlobFileMetadata[]> {
  return fetchBlobFilesByPrefix("doctors");
}

export function getPlaiceholderDataUrl(hex = "c8a2c8"): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='9'><rect width='16' height='9' fill='#${hex}'/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

