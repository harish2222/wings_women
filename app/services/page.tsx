import Link from "next/link";
import Script from "next/script";
import { getServicesBySlugs } from "@/lib/services";

const requestedServiceSlugs = [
  "ovulation-induction-timed-intercourse",
  "pcos-care",
  "endometriosis",
  "ovulation-disorders",
  "decreased-amh",
  "tubal-blocks",
  "uterine-polyps",
  "semen-abnormalities",
  "intrauterine-insemination",
  "laparoscopy-hysteroscopy",
  "naprotechnology",
  "ivf-icsi",
];

const services = getServicesBySlugs(requestedServiceSlugs);

export const metadata = {
  title: "Services - Wings Women Center",
  description: "Comprehensive fertility, gynecological, reproductive surgery, and support services.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Script id="services-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((service, index) => ({
            "@type": "MedicalProcedure",
            position: index + 1,
            name: service.name,
            description: service.shortDescription,
          })),
        })}
      </Script>
      <header className="rounded-3xl border border-[#C8A2C8]/40 bg-[#F5F0E8] p-6 dark:border-[#B899BF]/40 dark:bg-[#2d2d2d] sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A47DAB] dark:text-[#D4B5D4]">
          Wings Women Center
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5] sm:text-4xl">
          Fertility & Women&apos;s Health Services
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
          Explore our complete range of fertility, gynecological, reproductive surgery, and support
          services designed for safe, evidence-based, and compassionate care.
        </p>
      </header>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5]">Service Categories</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#A47DAB] hover:shadow-md dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A2C8]/25 text-xl dark:bg-[#B899BF]/25"
                  aria-hidden="true"
                >
                  {service.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#2C2C2C] dark:text-[#E5E5E5]">{service.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
              <Link
                href={`/services/${service.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-[#A47DAB] transition hover:underline"
              >
                Learn More
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}