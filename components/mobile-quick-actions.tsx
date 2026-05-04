"use client";

import { createAppointmentMessage, generateWhatsAppUrl, isMobileDevice } from "@/lib/whatsapp";

interface MobileQuickActionsProps {
  service?: string;
}

export default function MobileQuickActions({ service = "general consultation" }: MobileQuickActionsProps) {
  const isMobile = typeof window !== "undefined" && isMobileDevice(window.navigator.userAgent);
  const waUrl = generateWhatsAppUrl(createAppointmentMessage(service), isMobile);
  const mapUrl = "https://www.google.com/maps/dir/?api=1&destination=15.82341047891181,78.02130790184553&travelmode=driving";
  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wings+Womens+Centre+Appointment&details=Fertility+consultation&location=Shop+115%2F116%2C+Ragamayuri+complex%2C+Kurnool";

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <a
        href="tel:+919502712812"
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C8A2C8] px-4 py-3 text-sm font-semibold text-[#2C2C2C]"
      >
        Call Clinic
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
      >
        WhatsApp
      </a>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#C8A2C8]/60 px-4 py-3 text-sm font-semibold dark:border-[#B899BF]/60"
      >
        Directions
      </a>
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#C8A2C8]/60 px-4 py-3 text-sm font-semibold dark:border-[#B899BF]/60"
      >
        Add Calendar
      </a>
    </div>
  );
}

