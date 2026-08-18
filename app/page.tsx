import Link from "next/link";
import Icon from "@/components/Icon";
import HeroVisual from "@/components/HeroVisual";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import CallNowButton from "@/components/CallNowButton";
import ServiceCard, { type Service } from "@/components/ServiceCard";

const SERVICES: Service[] = [
  {
    icon: "building-office",
    title: "Home Loans",
    description:
      "Buy your first home or move up. We compare rates and lenders to find the right fit for your budget.",
    fields: ["Amount", "Interest rate", "Term"],
  },
  {
    icon: "sparkles",
    title: "Refinancing",
    description:
      "Unlock equity, lower your repayments, or switch lenders — without the paperwork headache.",
    fields: ["Current rate", "New lender", "Savings"],
  },
  {
    icon: "trending-up",
    title: "Investment Loans",
    description:
      "Structure property investments properly with a broker who understands the numbers.",
    fields: ["Purpose", "Deposit", "Structure"],
  },
  {
    icon: "banknotes",
    title: "Personal & Car Loans",
    description:
      "Flexible lending for big purchases, planned around what you can genuinely afford.",
    fields: ["Amount", "Purpose", "Repayment term"],
  },
];

const STEPS = [
  {
    icon: "phone",
    title: "Talk to a broker",
    description:
      "Call us or book a consultation. We listen to your goals and work out what you can afford.",
  },
  {
    icon: "document",
    title: "We prepare your application",
    description:
      "Your broker gathers your details and builds a complete application for the right lender.",
  },
  {
    icon: "paper-airplane",
    title: "We submit on your behalf",
    description:
      "Your broker submits to the lender — you never apply alone or self-submit.",
  },
  {
    icon: "envelope",
    title: "You get a secure invite",
    description:
      "Our Compliance Team verifies your details and emails you an invite to track your application.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-500 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy-500">
              <Icon name="shield-check" className="size-4 text-gold-500" />
              Secure · Invite-only tracking
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-navy-700 sm:text-5xl lg:text-6xl">
              Your trusted{" "}
              <span className="text-gold-500">friend</span> for home loans in
              the Philippines.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              BAI Finance is a loan brokerage that helps you find the right
              lender, prepares a complete application on your behalf, and lets
              you track every step securely — from submission to settlement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
              >
                <Icon name="calendar" className="size-4" />
                Book a Consultation
              </Link>
              <CallNowButton />
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink/60">
              <Icon name="check" className="size-4 text-gold-500" />
              Work with leading lenders
              <span className="font-semibold text-navy-700">ANZ · CommBank</span>
              and more
            </p>
          </div>
          <HeroVisual />
        </div>
      </section>

      <TrustBar />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            pill="Our Services"
            title="The right loan, prepared properly"
            subtitle="Whether it's a first home, a refinance, or an investment, we handle the preparation and submission so you don't have to."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-navy-500 px-6 py-3 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:bg-navy-50"
            >
              View all services
              <Icon name="arrow-right" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            pill="How It Works"
            title="Simple, transparent, broker-led"
            subtitle="There's no public sign-up — your account is created by our Compliance Team and you're invited by email. Here's the journey."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-navy-100 bg-white p-6 shadow-sm"
              >
                <span className="absolute right-5 top-5 font-display text-3xl font-bold text-navy-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-700 text-white">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-navy-700">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              pill="Track My Application"
              title="Know where your application stands"
              subtitle="Once you're invited, log in to your secure client portal to see live status, respond to document requests, and review your application history."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Live status: Submitted → In Review → Approved → Settled",
                "Upload documents only when we specifically request them",
                "Read-only communication log with your broker",
                "Multi-factor authentication and encrypted sessions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700">
                    <Icon name="check" className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/track-application"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-950"
              >
                See how tracking works
                <Icon name="arrow-right" className="size-4" />
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-500 px-6 py-3 text-sm font-semibold text-navy-700 transition-colors duration-200 hover:bg-navy-50"
              >
                <Icon name="lock" className="size-4" />
                Client Login
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">
              Application #BAI-2026-0148
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-navy-700">
              Home Loan · ₱3,500,000
            </p>
            <div className="mt-6 space-y-5">
              {[
                { status: "Submitted", done: true, current: false },
                { status: "In Review", done: true, current: false },
                { status: "Additional Info Requested", done: false, current: true },
                { status: "Approved", done: false, current: false },
                { status: "Settled", done: false, current: false },
              ].map((step) => (
                <div key={step.status} className="flex items-center gap-3">
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${
                      step.done
                        ? "bg-navy-700 text-white"
                        : step.current
                          ? "bg-gold-400 text-navy-950"
                          : "bg-navy-50 text-navy-300"
                    }`}
                  >
                    {step.done ? (
                      <Icon name="check" className="size-4" />
                    ) : (
                      step.current && <Icon name="document" className="size-4" />
                    )}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      step.current ? "text-navy-700" : "text-ink/60"
                    }`}
                  >
                    {step.status}
                  </span>
                  {step.current && (
                    <span className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-semibold text-navy-700">
                      Action needed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6">
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to talk about your loan? Let&apos;s find your{" "}
            <span className="text-gold-400">friend</span> in finance.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-colors duration-200 hover:bg-gold-500"
            >
              <Icon name="calendar" className="size-4" />
              Book a consultation
            </Link>
            <CallNowButton />
          </div>
        </div>
      </section>
    </>
  );
}
