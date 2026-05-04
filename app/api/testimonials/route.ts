import { NextResponse } from "next/server";
import { fetchTestimonialImages, type TestimonialRecord } from "@/lib/blob-media";

const fallbackTestimonials: TestimonialRecord[] = [
  {
    id: "tm-1",
    patientName: "Patient A",
    message: "The team was kind, clear, and supportive throughout treatment.",
  },
  {
    id: "tm-2",
    patientName: "Patient B",
    message: "Excellent consultation and highly professional fertility guidance.",
  },
];

export async function GET() {
  try {
    const images = await fetchTestimonialImages();
    const testimonials = fallbackTestimonials.map((entry, index) => ({
      ...entry,
      image: images[index],
    }));
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch testimonials", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

