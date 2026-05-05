import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingBookingButton from "@/components/floating-booking-button";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wingswomencentre.vercel.app"),
  title: {
    default: "Wings Women Center | Fertility & Women's Health Clinic",
    template: "%s | Wings Women Center",
  },
  description:
    "Wings Women Center provides fertility, gynecology, and reproductive care with evidence-based treatment and compassionate support.",
  keywords: [
    "fertility clinic",
    "IVF",
    "IUI",
    "gynecology",
    "women health",
    "PCOS care",
    "endometriosis treatment",
    "India fertility clinic",
    "Kurnool fertility center",
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/media/logo/bird_favicon_transparent.png", sizes: "any", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png" },
  },
  openGraph: {
    type: "website",
    url: "https://wingswomencentre.vercel.app",
    title: "Wings Women Center | Fertility & Women's Health Clinic",
    description:
      "Specialized fertility and women's health services including IVF, IUI, PCOS care, endometriosis management, and reproductive surgery.",
    siteName: "Wings Women Center",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wings Women Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wings Women Center | Fertility & Women's Health Clinic",
    description:
      "Compassionate, evidence-based fertility and gynecology care.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="min-h-full bg-background text-foreground transition-colors duration-300">
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
        <Script id="clinic-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: "Wings Women Center",
            medicalSpecialty: ["Gynecology", "Fertility", "Obstetrics"],
            telephone: "+91-95027-12812",
            email: "boga.viswanath@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Shop 115/116, first floor, Ragamayuri complex, beside Dmart, bellary chowrastha",
              addressLocality: "Kurnool",
              addressRegion: "Andhra Pradesh",
              addressCountry: "IN",
            },
            url: "https://www.wingswomencenter.com",
          })}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-999 focus:rounded-md focus:bg-[#C8A2C8] focus:px-3 focus:py-2 focus:text-[#2C2C2C]"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingBookingButton />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

