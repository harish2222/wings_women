import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Wings Women Center",
  description: "Terms and conditions for using Wings Women Center website and services.",
};

const updatedOn = "May 3, 2026";

export default function TermsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-0">
      <header className="rounded-2xl border border-[#C8A2C8]/45 bg-[#F5F0E8] p-6 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] print:border-none print:bg-white print:p-0">
        <h1 className="text-3xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5] print:text-black">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80 print:text-black">
          Last updated: {updatedOn}
        </p>
        <p className="mt-3 text-sm leading-6 text-[#2C2C2C]/85 dark:text-[#E5E5E5]/85 print:text-black">
          These Terms govern your use of the Wings Women Center website and related appointment and consultation
          services.
        </p>
      </header>

      <nav
        aria-label="Table of contents"
        className="mt-6 rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-5 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] print:mt-4 print:border print:border-black/20 print:bg-white"
      >
        <h2 className="text-lg font-semibold">Table of Contents</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[#A47DAB]">
          <li><a href="#section-1" className="hover:underline">1. Service Scope and Limitations</a></li>
          <li><a href="#section-2" className="hover:underline">2. Appointment Booking Policy</a></li>
          <li><a href="#section-3" className="hover:underline">3. Cancellation and Refund Policy</a></li>
          <li><a href="#section-4" className="hover:underline">4. Medical Disclaimer</a></li>
          <li><a href="#section-5" className="hover:underline">5. Intellectual Property</a></li>
          <li><a href="#section-6" className="hover:underline">6. Limitation of Liability</a></li>
          <li><a href="#section-7" className="hover:underline">7. Governing Law and Jurisdiction</a></li>
          <li><a href="#section-8" className="hover:underline">8. Medical Records Access Policy</a></li>
        </ol>
      </nav>

      <article className="mt-6 space-y-6 rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-6 text-sm leading-7 text-[#2C2C2C]/90 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] dark:text-[#E5E5E5]/90 print:border print:border-black/20 print:bg-white print:text-black">
        <section id="section-1">
          <h2 className="text-xl font-semibold">1. Service Scope and Limitations</h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Website content is for general informational purposes and does not independently constitute medical
              diagnosis.
            </li>
            <li>
              Clinical decisions are made only after formal consultation, examination, and review of relevant records.
            </li>
            <li>
              Certain services may be subject to medical suitability, doctor availability, and legal/regulatory limits.
            </li>
          </ol>
        </section>

        <section id="section-2">
          <h2 className="text-xl font-semibold">2. Appointment Booking Policy</h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Appointments may be requested by website form, phone, email, or WhatsApp.</li>
            <li>Booking is confirmed only after acknowledgement by clinic staff.</li>
            <li>Patients must provide accurate contact and medical-intake details.</li>
            <li>Clinic schedules are subject to change due to emergency or clinical priorities.</li>
          </ol>
        </section>

        <section id="section-3">
          <h2 className="text-xl font-semibold">3. Cancellation and Refund Policy</h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Patients are requested to cancel or reschedule at least 24 hours before the consultation slot, where
              feasible.
            </li>
            <li>
              Charges for completed consultations, procedures, diagnostics, or used consumables are generally
              non-refundable unless required by applicable law.
            </li>
            <li>
              Any refund decision is subject to internal verification, payment mode rules, and statutory obligations.
            </li>
          </ol>
        </section>

        <section id="section-4">
          <h2 className="text-xl font-semibold">4. Medical Disclaimer</h2>
          <p>
            Treatment outcomes vary by individual condition, age, comorbidities, adherence, and biological factors.
            No treatment, procedure, or consultation should be interpreted as a guarantee of specific results.
          </p>
        </section>

        <section id="section-5">
          <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
          <p>
            All website content, branding, text, graphics, and materials are owned by or licensed to Wings Women
            Center. Unauthorized reproduction, distribution, or commercial use is prohibited without prior written
            consent.
          </p>
        </section>

        <section id="section-6">
          <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
          <p>
            To the extent permitted by law, Wings Women Center is not liable for indirect, incidental, consequential,
            or special damages arising from use of the website or delay/interruption of services. This does not limit
            liabilities that cannot be excluded under applicable Indian law.
          </p>
        </section>

        <section id="section-7">
          <h2 className="text-xl font-semibold">7. Governing Law and Jurisdiction</h2>
          <p>
            These Terms are governed by the laws of India. Courts of competent jurisdiction in India shall have
            exclusive jurisdiction over disputes, subject to any mandatory legal forum protections.
          </p>
        </section>

        <section id="section-8">
          <h2 className="text-xl font-semibold">8. Medical Records Access Policy</h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Patients may request copies of their medical records in accordance with applicable legal, regulatory, and
              ethical obligations.
            </li>
            <li>
              Identity verification may be required before records are released to protect patient confidentiality.
            </li>
            <li>
              Processing timelines and copying/administrative charges, if applicable, will be communicated at request
              time.
            </li>
          </ol>
          <p className="mt-3">
            For privacy details, see our{" "}
            <Link href="/privacy-policy" className="text-[#A47DAB] hover:underline">
              Privacy Policy
            </Link>.
          </p>
        </section>
      </article>
    </section>
  );
}


