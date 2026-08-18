import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How BAI Finance collects, uses, and protects your personal information under the Australian Privacy Principles (APPs).",
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What we collect",
    body: [
      "We collect the personal information needed to prepare and manage your loan application — typically your name, contact details, identity documents, income details, and information about the property or purpose of the loan.",
      "We only collect what the loan process actually requires, and we don't collect card or payment data — BAI Finance never handles funds.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Your information is used to prepare your application, submit it to the lender you've chosen, communicate with you about its progress, and meet our legal obligations.",
      "We share information only with the lender and the parties directly involved in your application. We never sell your data.",
    ],
  },
  {
    title: "How we protect it",
    body: [
      "All traffic is encrypted with SSL/TLS, stored data is encrypted at rest, access is invite-only, and every access or change to your application is recorded in an audit log.",
      "Identity documents are stored securely and shared only through short-lived, authorized links.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep your information only as long as it's needed for your loan relationship and standard commercial record-keeping requirements.",
      "When it's no longer needed, it's securely deleted or de-identified.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can request access to the personal information we hold about you, ask us to correct it, or ask questions about how we handle it.",
      "To make a request or a complaint, contact us by email or phone — we'll respond within a reasonable time.",
    ],
  },
  {
    title: "Contact us",
    body: [
      "Email: hello@baifinance.example.com",
      "Phone: +63 917 555 0123",
      "This policy applies to BAI Finance's operations in Australia and the Philippines and reflects the Australian Privacy Principles under the Privacy Act.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        pill="Privacy"
        title="Your privacy, taken seriously"
        subtitle="BAI Finance operates under the Australian Privacy Principles — here's what that means for your information."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-semibold text-navy-700">
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-relaxed text-ink/75"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-cream p-6 text-sm leading-relaxed text-ink/75">
            <p>
              <strong className="text-navy-700">Good to know:</strong> BAI
              Finance is a loan application tracking and brokerage platform. It
              does not hold funds, process repayments, or make lending
              decisions — those remain with your chosen lender. This means
              payment-card data isn&apos;t collected, stored, or processed by
              us.
            </p>
            <p className="mt-3">
              Questions about this policy?{" "}
              <Link
                href="/contact"
                className="font-semibold text-navy-700 underline decoration-gold-400 underline-offset-2 transition-colors duration-200 hover:text-gold-500"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
