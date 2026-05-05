export interface WhatsAppConfig {
  phone: string;
  clinicName: string;
}

export const whatsappConfig: WhatsAppConfig = {
  phone: "919502712812",
  clinicName: "Wings Women Center",
};

export function createAppointmentMessage(service: string): string {
  return `Hi, I would like to book an appointment at ${whatsappConfig.clinicName} for ${service}. Please confirm availability.`;
}

export function toDisplayServiceName(slugOrName: string): string {
  if (!slugOrName.includes("-")) return slugOrName;
  return slugOrName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function isMobileDevice(userAgent: string): boolean {
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(userAgent);
}

export function generateWhatsAppUrl(message: string, _isMobile: boolean): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappConfig.phone}?text=${encoded}`;
}

