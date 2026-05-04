"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { createAppointmentMessage, generateWhatsAppUrl, isMobileDevice, toDisplayServiceName } from "@/lib/whatsapp";
import { trackAppointmentClick } from "@/lib/analytics";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M20.52 3.48A11.88 11.88 0 0 0 12.06 0C5.48 0 .14 5.34.14 11.92c0 2.1.55 4.15 1.59 5.96L0 24l6.3-1.66a11.93 11.93 0 0 0 5.76 1.47h.01c6.57 0 11.91-5.35 11.91-11.93 0-3.18-1.24-6.17-3.46-8.4ZM12.07 21.8h-.01a9.88 9.88 0 0 1-5.03-1.37l-.36-.21-3.74.98 1-3.64-.24-.37A9.86 9.86 0 0 1 2.2 11.92C2.2 6.47 6.62 2.05 12.07 2.05c2.63 0 5.1 1.02 6.96 2.88a9.8 9.8 0 0 1 2.88 6.99c0 5.45-4.43 9.88-9.84 9.88Zm5.41-7.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.46-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.37-1.45-.87-.78-1.46-1.75-1.63-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.66-1.59-.9-2.18-.24-.57-.49-.49-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.07 2.86 1.22 3.06.15.2 2.1 3.21 5.08 4.5.7.3 1.24.47 1.66.6.7.22 1.34.19 1.84.11.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export default function FloatingBookingButton() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    let armed = false;

    const onScroll = () => {
      if (window.scrollY < 80) return;
      if (armed) return;
      armed = true;
      timerId = setTimeout(() => {
        setShow(true);
      }, 3000);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerId) clearTimeout(timerId);
    };
  }, [pathname]);

  const serviceName = useMemo(() => {
    if (pathname.startsWith("/services/")) {
      const slug = pathname.split("/services/")[1];
      return toDisplayServiceName(slug || "a service");
    }
    if (pathname === "/doctors") return "doctor consultation";
    return "general consultation";
  }, [pathname]);

  const message = createAppointmentMessage(serviceName);
  const isMobile = typeof window !== "undefined" && isMobileDevice(window.navigator.userAgent);
  const url = generateWhatsAppUrl(message, isMobile);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book appointment on WhatsApp"
      onClick={() => trackAppointmentClick("floating_button", serviceName)}
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A2C8] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" aria-hidden="true" />
      <WhatsAppIcon />
      <span>Book Appointment</span>
    </a>
  );
}