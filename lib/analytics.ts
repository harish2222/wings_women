import { track } from "@vercel/analytics";

export function trackAppointmentClick(location: string, service?: string): void {
  track("appointment_click", {
    location,
    service: service ?? "general",
  });

  if (typeof window !== "undefined") {
    const win = window as unknown as { dataLayer?: unknown[] };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: "appointment_click",
      location,
      service: service ?? "general",
    });
  }
}

