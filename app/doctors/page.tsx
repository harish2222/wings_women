"use client";

import Image from "next/image";
import Script from "next/script";
import { useMemo, useState } from "react";

interface Doctor {
  id: string;
  name: string;
  image: string;
  primaryQualification: string;
  specializations: string[];
  biography: string;
  certificates: string[];
}

const doctors: Doctor[] = [
  {
    id: "dr-b-viswanath",
    name: "Dr. B. Viswanath",
    image: "/media/testimonials/doctor1/doctor1.jpeg",
    primaryQualification: "MBBS, DGO, DNB(AIMS), CCIVF",
    specializations: ["Natural Conception using NaProTECHNOLOGY", "Reproductive Endocrinology", "PCOS Care", "IVF and IUI"],
    biography:
      "Dr. B. Viswanath is a senior consultant specializing in evidence-based fertility treatment with extensive experience in reproductive medicine. He is dedicated to providing compassionate care and personalized treatment plans for couples seeking fertility assistance.",
    certificates: [
      "/media/testimonials/doctor1/certificate.jpeg",
      "/media/testimonials/doctor1/testimonial.jpeg",
      "/media/testimonials/doctor1/testimonials (2).jpeg",
      "/media/testimonials/doctor1/testimonials_2.jpeg",
      "/media/testimonials/doctor1/testimonials_3.jpeg",
      "/media/testimonials/doctor1/testimonials.jpeg",
      "/media/testimonials/doctor1/testimonials1.jpeg",
    ],
  },
  {
    id: "dr-durga-vijaya-sree",
    name: "Dr. Durga Vijaya Sree",
    image: "/media/testimonials/doctor2/doctor2.jpeg",
    primaryQualification: "MBBS, MS, DGO, MRCOG London, Fellow in Oncology",
    specializations: ["High Risk Pregnancy", "Antenatal", "Post Natal Services", "Deliveries"],
    biography:
      "Dr. Durga Vijaya Sree is a highly qualified specialist with international training in reproductive medicine. Her expertise includes minimally invasive fertility treatments, PCOS management, and comprehensive women's healthcare with a patient-centered approach.",
    certificates: [],
  },
];

export default function DoctorsPage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSelectDoctor = (id: string) => {
    setSelectedDoctorId(id);
    setCurrentSlide(0);
  };

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor.id === selectedDoctorId) ?? null,
    [selectedDoctorId],
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Script id="doctors-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(
          doctors.map((doctor) => ({
            "@context": "https://schema.org",
            "@type": "Person",
            name: doctor.name,
            jobTitle: "Doctor",
            worksFor: { "@type": "MedicalClinic", name: "Wings Women Center" },
            knowsAbout: doctor.specializations,
          })),
        )}
      </Script>
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5] sm:text-4xl">
          Our Expert Team
        </h1>
        <p className="mt-3 text-base leading-7 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
          Our specialists are highly qualified in fertility, gynecology, and oncology care, combining
          international training with patient-centered treatment.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-4xl lg:mx-auto">
        {doctors.map((doctor) => (
          <article
            key={doctor.id}
            className="rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#B899BF]/45 dark:bg-[#2d2d2d]"
          >
            <div className="relative mx-auto h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-[#C8A2C8]/70 dark:border-[#B899BF]/70">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                sizes="300px"
                className="object-cover"
                unoptimized
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5]">{doctor.name}</h2>
            <p className="mt-1 text-sm text-[#A47DAB] dark:text-[#D4B5D4]">{doctor.primaryQualification}</p>

            <div className="mt-4">
              <p className="text-sm font-medium">Specializations</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {doctor.specializations.map((specialization) => (
                  <li
                    key={specialization}
                    className="rounded-full border border-[#C8A2C8]/60 bg-[#F5F0E8] px-3 py-1 text-xs font-medium dark:border-[#B899BF]/60 dark:bg-[#2d2d2d]"
                  >
                    {specialization}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectDoctor(doctor.id)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#C8A2C8] px-5 py-2.5 text-sm font-semibold text-[#2C2C2C] transition-colors duration-300 hover:bg-[#A47DAB] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
              aria-label={`View full profile for ${doctor.name}`}
            >
              View Full Profile
            </button>
          </article>
        ))}
      </div>

      {selectedDoctor ? (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#2C2C2C]/60 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="doctor-profile-title"
        >
          <div className="mx-auto max-w-4xl rounded-3xl border border-[#C8A2C8]/40 bg-white p-6 shadow-2xl dark:border-[#B899BF]/40 dark:bg-[#2d2d2d] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="doctor-profile-title" className="text-2xl font-semibold sm:text-3xl">
                  {selectedDoctor.name}
                </h3>
                <p className="mt-1 text-sm text-[#A47DAB] dark:text-[#D4B5D4]">
                  {selectedDoctor.primaryQualification}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoctorId(null)}
                className="rounded-md border border-[#C8A2C8]/60 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[#C8A2C8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/60"
                aria-label="Close full profile"
              >
                Close
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold">Detailed Biography</h4>
              <p className="mt-2 leading-7 text-[#2C2C2C]/85 dark:text-[#E5E5E5]/85">{selectedDoctor.biography}</p>
            </div>

            {selectedDoctor.certificates.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold">Certifications Gallery</h4>
                <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-[#C8A2C8]/40 bg-[#F5F0E8] dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]">
                  <Image
                    src={selectedDoctor.certificates[currentSlide]}
                    alt={`Certificate ${currentSlide + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    unoptimized
                  />
                  {selectedDoctor.certificates.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCurrentSlide((currentSlide - 1 + selectedDoctor.certificates.length) % selectedDoctor.certificates.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#2C2C2C] shadow-md hover:bg-white dark:bg-[#2d2d2d]/80 dark:text-[#E5E5E5] dark:hover:bg-[#2d2d2d]"
                        aria-label="Previous slide"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentSlide((currentSlide + 1) % selectedDoctor.certificates.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#2C2C2C] shadow-md hover:bg-white dark:bg-[#2d2d2d]/80 dark:text-[#E5E5E5] dark:hover:bg-[#2d2d2d]"
                        aria-label="Next slide"
                      >
                        →
                      </button>
                      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
                        {selectedDoctor.certificates.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 w-2 rounded-full transition-colors ${
                              index === currentSlide
                                ? "bg-[#A47DAB]"
                                : "bg-white/50 dark:bg-[#E5E5E5]/50"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <p className="mt-2 text-center text-sm text-[#2C2C2C]/70 dark:text-[#E5E5E5]/70">
                  {currentSlide + 1} / {selectedDoctor.certificates.length}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/919502712812"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#A47DAB] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#8f6d97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
                aria-label={`Book appointment with ${selectedDoctor.name}`}
              >
                Book Appointment
              </a>
              <button
                type="button"
                onClick={() => setSelectedDoctorId(null)}
                className="inline-flex items-center justify-center rounded-full border border-[#C8A2C8]/60 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-[#C8A2C8]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/60"
              >
                Back to Team
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

