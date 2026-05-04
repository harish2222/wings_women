import { NextResponse } from "next/server";
import { fetchCertificateImages } from "@/lib/blob-media";

export async function GET() {
  try {
    const certificates = await fetchCertificateImages();
    return NextResponse.json({ certificates });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch certificates", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

