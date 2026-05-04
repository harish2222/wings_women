"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getServiceBySlug, getServicesBySlugs } from "@/lib/services";

const ContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => <div className="h-48 animate-pulse rounded-3xl border border-[#C8A2C8]/40 bg-white/70" />,
});

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const service = getServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState(0);

  const relatedServices = service 
    ? getServicesBySlugs(service.relatedSlugs).filter((s) => s.slug !== service.slug)
    : [];

  if (!service) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5]">Service Not Found</h1>
        <p className="mt-3 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
          We could not find the requested service detail page.
        </p>
        <Link href="/services" className="mt-6 inline-flex rounded-full bg-[#A47DAB] px-6 py-3 text-sm font-semibold text-white">
          Back to Services
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="rounded-3xl border border-[#C8A2C8]/40 bg-[#F5F0E8] p-6 dark:border-[#B899BF]/40 dark:bg-[#2d2d2d] sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A47DAB] dark:text-[#D4B5D4]">
              Service Detail
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5] sm:text-4xl">
              {service.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
              {service.overview}
            </p>
          </div>
          <div className="inline-flex h-28 w-28 items-center justify-center rounded-2xl border border-[#C8A2C8]/60 bg-white/85 text-5xl dark:border-[#B899BF]/60 dark:bg-[#2d2d2d]">
            <span aria-hidden="true">{service.icon}</span>
          </div>
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <article className="rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-6 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-semibold">What to Expect</h2>
            <ul className="mt-4 space-y-3">
              {service.whatToExpect.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#A47DAB]" aria-hidden="true" />
                  <span className="text-[#2C2C2C]/85 dark:text-[#E5E5E5]/85">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-6 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] animate-in fade-in slide-in-from-bottom-4 duration-300 delay-75">
            <h2 className="text-xl font-semibold">Treatment Process Timeline</h2>
            <ol className="mt-5 space-y-4">
              {service.timeline.map((item, idx) => (
                <li key={item.step} className="relative rounded-xl border border-[#C8A2C8]/40 bg-[#F5F0E8] p-4 dark:border-[#B899BF]/40 dark:bg-[#2d2d2d]">
                  <span className="absolute -left-2 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#A47DAB] text-xs font-semibold text-white">
                    {idx + 1}
                  </span>
                  <p className="ml-5 text-sm font-semibold">{item.step}</p>
                  <p className="ml-5 mt-1 text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">{item.detail}</p>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-6 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] animate-in fade-in slide-in-from-bottom-4 duration-300 delay-150">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-3">
              {service.faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.question} className="rounded-xl border border-[#C8A2C8]/40 dark:border-[#B899BF]/40">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
                      onClick={() => setOpenFaq(open ? -1 : index)}
                      aria-expanded={open}
                    >
                      <span>{faq.question}</span>
                      <span className="text-[#A47DAB]">{open ? "−" : "+"}</span>
                    </button>
                    <div className={`overflow-hidden transition-all ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-4 pb-4 text-sm leading-6 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-5 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d]">
            <h3 className="text-base font-semibold">Related Services</h3>
            <ul className="mt-3 space-y-2">
              {relatedServices.map((item) => (
                <li key={item.slug}>
                  <Link href={`/services/${item.slug}`} className="text-sm text-[#A47DAB] transition hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <ContactSection serviceContext={service.name} />
      </div>
    </section>
  );
}