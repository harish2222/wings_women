import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Expert fertility and women's health care at Wings Women Center, including IVF, gynecology, and specialized reproductive services.",
  keywords: ["fertility clinic homepage", "women health care India", "book fertility appointment"],
};

const specializations = ["Gynecology", "Fertility", "Oncology"];

const aboutCards = [
  {
    title: "Comprehensive Consultations",
    description: "Personalized care plans tailored to every stage of womanhood.",
    icon: "🩺",
  },
  {
    title: "Advanced Diagnostics",
    description: "Evidence-based testing for accurate and timely decisions.",
    icon: "🧬",
  },
  {
    title: "Holistic Support",
    description: "Compassionate counseling and care throughout your journey.",
    icon: "🤍",
  },
];

const whyChooseUs = [
  {
    title: "Specialist Expertise",
    description: "Experienced doctors in fertility, gynecology, and oncology care.",
    icon: "👩‍⚕️",
  },
  {
    title: "Modern Facilities",
    description: "Well-equipped clinical infrastructure with modern protocols.",
    icon: "🏥",
  },
  {
    title: "Patient-Centered Care",
    description: "Clear communication, empathy, and continuity at every visit.",
    icon: "🫶",
  },
  {
    title: "Trusted Outcomes",
    description: "Focused pathways designed to improve patient confidence and results.",
    icon: "📈",
  },
];

const services = [
  { name: "Natural Pregnancy (NaPro)", slug: "naprotechnology" },
  { name: "IVF / ICSI", slug: "ivf-icsi" },
  { name: "Fertility Evaluation", slug: "ovulation-induction-timed-intercourse" },
  { name: "IUI Treatment", slug: "intrauterine-insemination" },
  { name: "PCOS Care", slug: "pcos-care" },
  { name: "Endometriosis Care", slug: "endometriosis" },
];

export default function Home() {
  return (
    <div className="bg-[#F5F0E8] text-[#2C2C2C] dark:bg-[#1a1a1a] dark:text-[#E5E5E5]">
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="rounded-3xl border border-[#C8A2C8]/40 bg-[#F5F0E8] p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-0.5 dark:border-[#B899BF]/40 dark:bg-[#2d2d2d] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A47DAB] dark:text-[#D4B5D4]">
            Wings Women Center
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
            Expert Fertility &amp; Women&apos;s Health Care
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80 sm:text-lg">
            We provide compassionate, evidence-based treatment for fertility, gynecology,
            and women&apos;s oncology with a focus on safety, transparency, and long-term wellbeing.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/919502712812"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#A47DAB] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#8f6d97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
              aria-label="Book appointment on WhatsApp"
            >
              Book Appointment
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#A47DAB] px-6 py-3 text-sm font-semibold text-[#2C2C2C] transition-all duration-300 hover:bg-[#A47DAB]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:text-[#E5E5E5]"
              aria-label="View our services"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">About Wings Women Center</h2>
          <p className="mt-4 leading-7 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
            Wings Women Center is dedicated to women&apos;s health with integrated care across fertility,
            gynecology, and oncology. Our team combines clinical excellence with empathetic guidance.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {specializations.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#C8A2C8]/60 bg-white/70 px-4 py-2 text-sm font-medium dark:border-[#B899BF]/50 dark:bg-[#2d2d2d]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-[#C8A2C8]/40 bg-white/80 p-5 transition-all duration-300 hover:border-[#A47DAB] hover:shadow-md dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]"
            >
              <p className="text-2xl" aria-hidden="true">
                {card.icon}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold sm:text-3xl">Why Choose Us</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#C8A2C8]/40 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#A47DAB] hover:shadow-md dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]"
            >
              <p className="text-2xl" aria-hidden="true">
                {item.icon}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Quick Services Overview</h2>
          <Link
            href="/services"
            className="hidden text-sm font-semibold text-[#A47DAB] underline-offset-4 transition hover:underline sm:inline-flex"
          >
            View all services
          </Link>
        </div>
<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-[#C8A2C8]/40 bg-white/85 p-5 transition-all duration-300 hover:border-[#A47DAB] hover:bg-[#A47DAB]/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB] dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]"
            >
              <h3 className="text-base font-semibold">{service.name}</h3>
              <p className="mt-2 text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
                Learn more about our treatment approach and consultation process.
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-[#A47DAB] transition group-hover:translate-x-1">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#C8A2C8]/40 bg-white/90 p-7 text-center dark:border-[#B899BF]/40 dark:bg-[#2d2d2d] sm:p-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ready to start your journey?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80 sm:text-base">
            Connect with our care team and take the next step toward confident, informed women&apos;s healthcare.
          </p>
          <a
            href="https://wa.me/919502712812"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#A47DAB] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#8f6d97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A47DAB]"
            aria-label="Book your appointment on WhatsApp"
          >
            Book Appointment
          </a>
        </div>
      </section>
    </div>
  );
}

