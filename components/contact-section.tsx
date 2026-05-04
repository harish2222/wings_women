"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { createAppointmentMessage, generateWhatsAppUrl, isMobileDevice } from "@/lib/whatsapp";
import { trackAppointmentClick } from "@/lib/analytics";

const MapEmbed = dynamic(() => import("@/components/map-embed"), {
  ssr: false,
  loading: () => <div className="h-56 w-full animate-pulse rounded-xl bg-[#C8A2C8]/20" />,
});

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
  gdprConsent: boolean;
}

interface ContactSectionProps {
  serviceContext?: string;
}

export default function ContactSection({ serviceContext = "general consultation" }: ContactSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormValues>();

const onSubmit = (data: ContactFormValues) => {
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Preferred Date: ${data.preferredDate}`,
      `Service: ${serviceContext}`,
      `Message: ${data.message}`,
    ].join("\n");
    window.open(
      `mailto:boga.viswanath@gmail.com?subject=${encodeURIComponent(
        "Appointment Request",
      )}&body=${encodeURIComponent(body)}`,
      "_self",
    );
    reset();
  };

  const isMobile = typeof window !== "undefined" && isMobileDevice(window.navigator.userAgent);
  const whatsappUrl = generateWhatsAppUrl(createAppointmentMessage(serviceContext), isMobile);

  return (
    <section className="rounded-3xl border border-[#C8A2C8]/45 bg-white/90 p-6 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] sm:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Contact & Booking</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              Phone:{" "}
              <a href="tel:+919502712812" className="font-medium text-[#A47DAB] hover:underline">
                +91 95027 12812
              </a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:boga.viswanath@gmail.com" className="font-medium text-[#A47DAB] hover:underline">
                boga.viswanath@gmail.com
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAppointmentClick("contact_section_whatsapp", serviceContext)}
                className="inline-flex rounded-full bg-[#C8A2C8] px-4 py-2 font-semibold text-[#2C2C2C] transition hover:bg-[#A47DAB] hover:text-white"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>Address: Shop 115/116, first floor, Ragamayuri complex, beside Dmart, bellary chowrastha, Kurnool, Andhra Pradesh, India</li>
          </ul>
          <div className="mt-4">
            <MapEmbed className="h-56 w-full" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Request an Appointment</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="mt-1 w-full rounded-lg border border-[#C8A2C8]/60 bg-white px-3 py-2 text-sm outline-none ring-[#A47DAB] focus:ring-2 dark:bg-[#2d2d2d]"
                  {...register("name", { required: "Name is required" })}
                />
              {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="mt-1 w-full rounded-lg border border-[#C8A2C8]/60 bg-white px-3 py-2 text-sm outline-none ring-[#A47DAB] focus:ring-2 dark:bg-[#2d2d2d]"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                  })}
                />
                {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="mt-1 w-full rounded-lg border border-[#C8A2C8]/60 bg-white px-3 py-2 text-sm outline-none ring-[#A47DAB] focus:ring-2 dark:bg-[#2d2d2d]"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: { value: 8, message: "Enter a valid phone number" },
                  })}
                />
                {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
              </div>
            </div>

            <div>
              <label htmlFor="preferredDate" className="text-sm font-medium">
                Preferred Date
              </label>
              <input
                id="preferredDate"
                type="date"
                className="mt-1 w-full rounded-lg border border-[#C8A2C8]/60 bg-white px-3 py-2 text-sm outline-none ring-[#A47DAB] focus:ring-2 dark:bg-[#2d2d2d]"
                {...register("preferredDate", { required: "Preferred date is required" })}
              />
              {errors.preferredDate ? (
                <p className="mt-1 text-xs text-red-600">{errors.preferredDate.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 w-full rounded-lg border border-[#C8A2C8]/60 bg-white px-3 py-2 text-sm outline-none ring-[#A47DAB] focus:ring-2 dark:bg-[#2d2d2d]"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message.message}</p> : null}
            </div>

            <div>
              <label className="flex items-start gap-2 text-xs leading-5 text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#A47DAB]"
                  {...register("gdprConsent", { required: "Consent is required" })}
                />
                <span>
                  I consent to Wings Women Center storing and processing my submitted data for appointment-related
                  communication in accordance with GDPR.
                </span>
              </label>
              {errors.gdprConsent ? <p className="mt-1 text-xs text-red-600">{errors.gdprConsent.message}</p> : null}
            </div>

            <button
              type="submit"
              className="inline-flex rounded-full bg-[#C8A2C8] px-6 py-2.5 text-sm font-semibold text-[#2C2C2C] transition hover:bg-[#A47DAB] hover:text-white"
            >
              Submit Request
            </button>
            {isSubmitSuccessful ? (
              <p className="text-xs text-emerald-700">Your email draft has been prepared. Please send it to confirm.</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

