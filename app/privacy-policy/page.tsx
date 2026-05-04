import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Wings Women Center",
  description: "Privacy Policy for Wings Women Center fertility clinic website.",
};

const updatedOn = "May 3, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-0">
      <header className="rounded-2xl border border-[#C8A2C8]/45 bg-[#F5F0E8] p-6 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] print:border-none print:bg-white print:p-0">
        <h1 className="text-3xl font-semibold text-[#2C2C2C] dark:text-[#E5E5E5] print:text-black">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#2C2C2C]/80 dark:text-[#E5E5E5]/80 print:text-black">
          Last updated: {updatedOn}
        </p>
        <p className="mt-3 text-sm leading-6 text-[#2C2C2C]/85 dark:text-[#E5E5E5]/85 print:text-black">
          This Privacy Policy explains how Wings Women Center collects, uses, stores, and discloses personal and
          health-related information in connection with our website and appointment services.
        </p>
      </header>

      <nav
        aria-label="Table of contents"
        className="mt-6 rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-5 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] print:mt-4 print:border print:border-black/20 print:bg-white"
      >
        <h2 className="text-lg font-semibold">Table of Contents</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[#A47DAB]">
          <li><a href="#section-1" className="hover:underline">1. Information We Collect</a></li>
          <li><a href="#section-2" className="hover:underline">2. How We Use Information</a></li>
          <li><a href="#section-3" className="hover:underline">3. Storage, Security, and Retention</a></li>
          <li><a href="#section-4" className="hover:underline">4. Patient Rights (India)</a></li>
          <li><a href="#section-5" className="hover:underline">5. Cookies and Similar Technologies</a></li>
          <li><a href="#section-6" className="hover:underline">6. Third-Party Services</a></li>
          <li><a href="#section-7" className="hover:underline">7. Medical Council / NMC Compliance</a></li>
          <li><a href="#section-8" className="hover:underline">8. Contact for Privacy Concerns</a></li>
        </ol>
      </nav>

      <article className="mt-6 space-y-6 rounded-2xl border border-[#C8A2C8]/45 bg-white/90 p-6 text-sm leading-7 text-[#2C2C2C]/90 dark:border-[#B899BF]/45 dark:bg-[#2d2d2d] dark:text-[#E5E5E5]/90 print:border print:border-black/20 print:bg-white print:text-black">
        <section id="section-1">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <h3 className="mt-3 text-base font-semibold">1.1 Personal Information</h3>
          <p>
            We may collect name, email address, phone number, appointment preferences, and communication details
            submitted through contact forms, calls, email, or WhatsApp.
          </p>
          <h3 className="mt-3 text-base font-semibold">1.2 Medical and Sensitive Data</h3>
          <p>
            For consultation and care coordination, we may collect limited health information such as symptoms,
            treatment history, and fertility-related records shared by the patient.
          </p>
          <h3 className="mt-3 text-base font-semibold">1.3 Technical Data</h3>
          <p>
            We may collect device/browser metadata, IP-derived location estimates, and usage analytics for security and
            performance.
          </p>
        </section>

        <section id="section-2">
          <h2 className="text-xl font-semibold">2. How We Use Information</h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>To schedule, confirm, and manage appointments.</li>
            <li>To communicate regarding consultations, follow-up, and service inquiries.</li>
            <li>To maintain clinical, administrative, and legal records.</li>
            <li>To improve website performance, security, and user experience.</li>
            <li>To comply with applicable Indian healthcare and data-protection obligations.</li>
          </ol>
        </section>

        <section id="section-3">
          <h2 className="text-xl font-semibold">3. Storage, Security, and Retention</h2>
          <p>
            We use reasonable administrative, technical, and organizational safeguards to protect patient and personal
            data. Access is restricted to authorized personnel on a need-to-know basis.
          </p>
          <p>
            Data is retained only as long as necessary for treatment, legal compliance, dispute resolution, and
            recordkeeping obligations under applicable Indian laws and medical practice standards.
          </p>
        </section>

        <section id="section-4">
          <h2 className="text-xl font-semibold">4. Patient Rights Under Indian Data Protection Laws</h2>
          <p>
            Subject to applicable law, patients may request access, correction, update, or erasure of personal data,
            and may withdraw consent where processing is consent-based. Requests may be limited where retention is
            required by medical, legal, or regulatory obligations.
          </p>
          <p>
            Patients may also request details regarding how their data is processed and shared, and may raise
            grievances through our privacy contact details below.
          </p>
        </section>

        <section id="section-5">
          <h2 className="text-xl font-semibold">5. Cookies and Similar Technologies</h2>
          <p>
            Our website may use essential cookies for functionality, session handling, and security, and may use
            limited analytics tools to understand traffic and improve services. You may control cookies through browser
            settings, but disabling some cookies may affect website functionality.
          </p>
        </section>

        <section id="section-6">
          <h2 className="text-xl font-semibold">6. Third-Party Services</h2>
          <h3 className="mt-3 text-base font-semibold">6.1 Vercel (Hosting/Infrastructure)</h3>
          <p>
            Our website is hosted on Vercel, which may process technical logs and infrastructure data as part of
            service delivery and security operations.
          </p>
          <h3 className="mt-3 text-base font-semibold">6.2 WhatsApp (Communication)</h3>
          <p>
            If you choose to contact us via WhatsApp, your communication is processed by WhatsApp under its own
            privacy terms. Please avoid sharing unnecessary sensitive data over chat.
          </p>
        </section>

        <section id="section-7">
          <h2 className="text-xl font-semibold">7. Medical Council / NMC Compliance</h2>
          <p>
            Wings Women Center follows professional obligations applicable to registered medical practitioners in India,
            including ethical handling of patient confidentiality and records under prevailing Medical Council of India
            principles and subsequent National Medical Commission (NMC) governance frameworks.
          </p>
        </section>

        <section id="section-8">
          <h2 className="text-xl font-semibold">8. Contact for Privacy Concerns</h2>
          <p>
            For data requests or privacy concerns, contact:
          </p>
<p className="mt-2">
            Email:{" "}
            <a href="mailto:boga.viswanath@gmail.com" className="text-[#A47DAB] hover:underline">
              boga.viswanath@gmail.com
            </a>
            <br />
            Phone:{" "}
            <a href="tel:+919502712812" className="text-[#A47DAB] hover:underline">
              +91 95027 12812
            </a>
          </p>
          <p className="mt-3">
            You may also visit our <Link href="/terms" className="text-[#A47DAB] hover:underline">Terms & Conditions</Link>.
          </p>
        </section>
      </article>
    </section>
  );
}


