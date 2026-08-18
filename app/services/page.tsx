import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import ServiceCard, { type Service } from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Services & Loans",
  description:
    "Home loans, refinancing, investment, personal and car loans — prepared and submitted by a dedicated BAI Finance broker.",
};

const SERVICES: Service[] = [
  {
    icon: "building-office",
    title: "Home Loans",
    description:
      "Buy your first home, a family home, or move up the property ladder. We compare lenders and rates to find the right fit for your budget.",
    fields: ["Amount", "Interest rate", "Lender", "Term"],
  },
  {
    icon: "sparkles",
    title: "Refinancing",
    description:
      "Unlock equity, lower your repayments, or consolidate debt — without the paperwork headache.",
    fields: ["Amount", "Interest rate", "Lender", "Purpose"],
  },
  {
    icon: "trending-up",
    title: "Investment Loans",
    description:
      "Structure property as an investment properly, with a broker who understands cash flow and the numbers behind the deal.",
    fields: ["Amount", "Interest rate", "Lender", "Term"],
  },
  {
    icon: "banknotes",
    title: "Personal & Car Loans",
    description:
      "Flexible lending for major purchases, planned around what you can genuinely afford.",
    fields: ["Amount", "Interest rate", "Lender", "Term"],
  },
];

const LENDERS = ["ANZ", "CommBank", "NAB", "Westpac", "And more"];

const APPLICATION_FIELDS = [
  {
    icon: "banknotes",
    label: "Loan amount",
    note: "How much you need — we'll advise on what's realistic for your income.",
  },
  {
    icon: "trending-up",
    label: "Interest rate",
    note: "We compare the rate your lender offers against the market.",
  },
  {
    icon: "building-office",
    label: "Lender",
    note: "ANZ, CommBank, and other leading Australian banks.",
  },
  {
    icon: "sparkles",
    label: "Purpose",
    note: "Home, refinance, investment, or personal — this shapes the loan type.",
  },
  {
    icon: "clock",
    label: "Term",
    note: "The repayment period that fits your budget and goals.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        pill="Services & Loans"
        title="Find the right loan for your next step"
        subtitle="Every application is prepared and submitted by a dedicated broker — you're never left to navigate lenders alone."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            pill="Our Lenders"
            title="Working with leading Australian lenders"
            subtitle="We partner with established banks so your loan is backed by institutions you can trust."
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {LENDERS.map((lender) => (
              <span
                key={lender}
                className="rounded-2xl border border-navy-100 bg-white px-6 py-3.5 font-display text-lg font-semibold text-navy-700 shadow-sm"
              >
                {lender}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink/60">
            BAI Finance is an independent brokerage. We never hold or move your
            funds — repayments and disbursements always happen directly with
            your chosen lender.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            pill="Your Application"
            title="What a loan application covers"
            subtitle="Your broker collects exactly what lenders need — nothing more, nothing unnecessary."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPLICATION_FIELDS.map((field) => (
              <div
                key={field.label}
                className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy-50 text-navy-700">
                  <Icon name={field.icon} className="size-5" />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-navy-700">
                  {field.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {field.note}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl bg-navy-900 p-5">
              <h3 className="font-display text-base font-semibold text-white">
                Not sure where to start?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-100">
                Book a free consultation — we&apos;ll help you figure out what
                you need.
              </p>
              <Link
                href="/book"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors duration-200 hover:bg-gold-500"
              >
                <Icon name="calendar" className="size-4" />
                Book now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
