import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import CallNowButton from "@/components/CallNowButton";

export const metadata: Metadata = {
  title: "How to Apply",
  description:
    "Applying with BAI Finance is broker-led: book a consultation, we prepare and submit your application on your behalf, and you track it securely.",
};

const STEPS = [
  {
    icon: "calendar",
    title: "1 · Book a consultation",
    description:
      "Choose a time that suits you. We'll discuss your goals, income, and what you can afford.",
  },
  {
    icon: "document",
    title: "2 · We prepare your application",
    description:
      "Your broker gathers your documents and builds a complete, accurate application for the right lender.",
  },
  {
    icon: "paper-airplane",
    title: "3 · We submit on your behalf",
    description:
      "Your broker submits the application to the lender — you never apply alone or self-submit.",
  },
  {
    icon: "shield-check",
    title: "4 · Compliance verifies your details",
    description:
      "Our Compliance Team reviews your details and sends you a secure invite to your portal.",
  },
  {
    icon: "building-office",
    title: "5 · Track and settle",
    description:
      "Log in to see live status from submission to settlement. Repayments are handled directly with your lender.",
  },
];

const IMPORTANT = [
  "There is no public sign-up — your account is created by our Compliance Team and you receive a secure invite by email.",
  "Applications are submitted by your broker on your behalf. You never submit from scratch.",
  "BAI Finance never holds or moves your funds — disbursements and repayments happen with your chosen lender.",
  "You upload documents only when a request is pending, straight from your secure portal.",
];

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        pill="How to Apply"
        title="We do the heavy lifting. You stay informed."
        subtitle="Applying through BAI Finance is simple and fully broker-led — here's exactly what happens."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <ol className="space-y-8">
            {STEPS.map((step) => (
              <li key={step.title} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-700 text-white">
                  <Icon name={step.icon} className="size-6" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-navy-700">
                    {step.title}
                  </h2>
                  <p className="mt-1.5 leading-relaxed text-ink/70">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-navy-100 bg-cream p-7">
              <h2 className="font-display text-lg font-semibold text-navy-700">
                Get started
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                The fastest way to begin is a short conversation with a broker.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
                >
                  <Icon name="calendar" className="size-4" />
                  Book a consultation
                </Link>
                <CallNowButton />
              </div>
              <div className="mt-6 rounded-xl bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                  Good to know
                </p>
                <ul className="mt-3 space-y-2.5">
                  {IMPORTANT.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-ink/70">
                      <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-gold-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
