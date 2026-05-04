import { NextResponse } from "next/server";
import { fetchDoctorImages, type DoctorRecord } from "@/lib/blob-media";

const fallbackDoctors: DoctorRecord[] = [
  {
    id: "doc-1",
    name: "Dr. B. Viswanath",
    qualification: "MBBS,DGO,DNB(AIMS), CCIVF",
    specialization: ["Fertility", "Gynecology"],
    yearsExperience: 16,
  },
  {
    id: "doc-2",
    name: "Dr. Durga Vijaya Sree",
    qualification: "MBBS,MS,DGO, MRCOG London, Fellow in oncology",
    specialization: ["PCOS", "Ovulation Care"],
    yearsExperience: 12,
  },
];

export async function GET() {
  try {
    const images = await fetchDoctorImages();
    const doctors = fallbackDoctors.map((doctor, index) => ({
      ...doctor,
      photo: images[index],
    }));
    return NextResponse.json({ doctors });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch doctors", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

